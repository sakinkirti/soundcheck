import client from "@/lib/sanity";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { postID, name, text, createdAt, type } = req.body;

  if (!["edit", "post"].includes(type)) {
    return res.status(400).json({ message: "Bad request" });
  }

  try {
    if (type === "edit") {
      await client
        .patch(postID)
        .unset([`comments[_key == \"${createdAt}\"]`])
        .commit();
      await client
        .patch(name)
        .unset([`comments[_key == \"${createdAt}\"]`])
        .commit();
    }
    const newComment = {
      _key: createdAt,
      _type: "comment",
      text,
      user: {
        _type: "reference",
        _ref: name,
      },
      createdAt,
    };
    await client
      .patch(name)
      .append("comments", [
        {
          _type: "reference",
          _ref: postID,
          _key: createdAt,
        },
      ])
      .commit();
    await client.patch(postID).append("comments", [newComment]).commit();
    return res.status(200).json({ message: "Success" });
  } catch {
    return res.status(500).json({ message: "Internal server error" });
  }
}
