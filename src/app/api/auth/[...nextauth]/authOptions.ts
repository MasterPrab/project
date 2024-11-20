import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userLogin from "@/libs/userLogin";// Adjust the path based on your project structure

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      // The name shown on the sign-in page
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) return null;

        const user = await userLogin(credentials.email, credentials.password);

        if (user) {
          // The returned object is saved in the user property of the JWT
          return user;
        } else {
          // Return null to indicate an authentication error
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Merging user information with the JWT token
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      // Adding token information to the session object
      session.user = token as any;
      return session;
    },
  },
};