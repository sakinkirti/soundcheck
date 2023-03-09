import client from "@/lib/sanity";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { postID, key, name } = req.body;

  try {
    await client
      .patch(name)
      .unset([`comments[_key == \"${key}\"]`])
      .commit();
    await client
      .patch(postID)
      .unset([`comments[_key == \"${key}\"]`])
      .commit();

    return res.status(200).json({ message: "Success" });
  } catch {
    return res.status(500).json({ message: "Internal server error" });
  }
}
