import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import mongoose from 'mongoose'
import User from '@/models/User'
import connectDB from '@/app/db/connectDB';

export const authoptions = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: 'read:user user:email',
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email }) {
      if (account.provider === "github") {
        try {
          await connectDB();

          // Check if the user already exists in the database
          const currentUser = await User.findOne({ email: user.email });
          if (!currentUser) {
            // Create a new user if it does not exist
            await User.create({
              email: user.email,
              username: user.email.split("@")[0],
            });
          }
          return true;
        } catch (error) {
          console.error("Error in signIn callback:", error);
          return false;
        }
      }
      return false;
    },

    async session({ session }) {
      try {
        const dbUser = await User.findOne({ email: session.user.email });
        if (dbUser) {
          session.user.name = dbUser.username;
        }
        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return session;
      }
    },
  },
});

export { authoptions as GET, authoptions as POST };