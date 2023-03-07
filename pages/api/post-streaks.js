import client from "@/lib/sanity";
import { userIDsQuery, hasPostedYesterdayQuery } from "@/lib/queries";

export default async function handler(req, res) {
  try {
    const userIDs = await client.fetch(userIDsQuery);

    userIDs.forEach(async (userID) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      yesterday.setHours(0, 0, 0, 0);

      const { hasPostedYesterday, postStreak } = await client.fetch(
        hasPostedYesterdayQuery,
        {
          name: userID,
          todayStart: today.toISOString(),
          yesterdayStart: yesterday.toISOString(),
        }
      );

      await client
        .patch(userID)
        .set({
          postStreak: hasPostedYesterday ? postStreak : 0,
        })
        .commit();
    });

    return res.status(200).json({ message: "Success" });
  } catch {
    return res.status(500).json({ message: "Internal server error" });
  }
}
