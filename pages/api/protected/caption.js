import client from "@/lib/sanity";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { postID, caption } = req.body;

    await client
      .patch(postID)
      .set({
        caption,
      })
      .commit();

    console.log(req.body);

    return res.status(200).json({ message: "Success" });
  } catch {
    return res.status(500).json({ message: "Something went wrong" });
  }
}
