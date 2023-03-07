import client from "@/lib/sanity";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { postID, name, type, createdAt } = req.body;

  try {
    if (type === "like") {
      await client
        .patch(name)
        .append("likes", [
          {
            _type: "reference",
            _ref: postID,
            _key: createdAt,
          },
        ])
        .commit();
      await client
        .patch(postID)
        .append("likes", [
          {
            _type: "like",
            _key: createdAt,
            createdAt,
            user: {
              _type: "reference",
              _ref: name,
            },
          },
        ])
        .commit();
    } else if (type === "unlike") {
      await client
        .patch(name)
        .unset([`likes[_ref == \"${postID}\"]`])
        .commit();
      await client
        .patch(postID)
        .unset([`likes[user._ref == \"${name}\"]`])
        .commit();
    }

    return res.status(200).json({ message: "Success" });
  } catch {
    return res.status(500).json({ message: "Internal server error" });
  }
}
