// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/library/db";
import User from "@/models/User";

const handler = NextAuth({
  providers: [
    // Credentials Provider (for email/password login)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect(); // Connect to the database

        // Find the user by email
        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("No user found with this email.");
        }

        // Check if the password matches (without hashing)
        if (credentials.password !== user.password) {
          throw new Error("Incorrect password.");
        }

        // Return the user object if credentials are valid
        return { id: user._id, name: user.name, email: user.email };//this is user object passed to jwt 
        // //When the authorize function returns an object, NextAuth.js treats it as the authenticated user.
        //This object is then used to create a JWT token and session.
      },
    }),
  ],
  session: {
    strategy: "jwt", // Use JWT for sessions
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add user ID to the token on sign-in
      if (user) {
        token.id = user.id;//token modification
      }
      return token;
    },
    async session({ session, token }) {
      // Add user ID to the session object
      session.user.id = token.id; //By adding the user's ID to the session object, you ensure that it is consistently available across your application.
      return session;
    },
  },
  secret:"secret_key", // Required for JWT encryption
});

export { handler as GET, handler as POST };