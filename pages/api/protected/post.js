import { hasPostedYesterdayQuery } from "@/lib/queries";
import client from "@/lib/sanity";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const {
    caption,
    songName,
    songUrl,
    previewUrl,
    artists,
    albumName,
    albumUrl,
    albumImage,
    playedAt,
    name,
  } = req.body;

  try {
    const { _id } = await client.create({
      _type: "post",
      caption,
      songName,
      songUrl,
      previewUrl,
      artists,
      albumName,
      albumUrl,
      albumImage,
      likes: [],
      comments: [],
      playedAt: new Date(playedAt).toISOString(),
      createdAt: new Date().toISOString(),
      user: {
        _type: "reference",
        _ref: name,
      },
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const { hasPostedYesterday, postStreak } = await client.fetch(
      hasPostedYesterdayQuery,
      {
        name,
        todayStart: today.toISOString(),
        yesterdayStart: yesterday.toISOString(),
      }
    );

    await client
      .patch(name)
      .set({
        postStreak: hasPostedYesterday ? postStreak + 1 : 1,
      })
      .append("posts", [
        {
          _type: "reference",
          _ref: _id,
          _key: today.toISOString(),
        },
      ])
      .commit();

    return res.status(200).json({ message: "Success", _id });
  } catch {
    return res.status(500).json({ message: "Internal server error" });
  }
}
