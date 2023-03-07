import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import client from "@/lib/sanity";

export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 3600,
  },
  callbacks: {
    async signIn({ account, user }) {
      if (account.provider !== "spotify") return false;

      const { name, email, image } = user;
      await client.createIfNotExists({
        _type: "user",
        _id: name,
        name,
        email,
        image,
        postStreak: 0,
        createdAt: new Date().toISOString(),
        posts: [],
        likes: [],
        comments: [],
        following: [],
        followers: [],
      });

      user.access_token = account.access_token;

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
  pages: {
    error: "/",
  },
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    }),
  ],
});
