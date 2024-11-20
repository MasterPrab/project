import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userLogin from "@/libs/userLogin";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) return null;

                const user = await userLogin(credentials.email, credentials.password);
                if (user) {
                    return user; // Return user object on successful authentication
                }
                return null; // Return null if login fails
            },
        }),
    ],
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return { ...token, ...user }; // Merge token with user data
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token as any; // Attach token data to session user
            return session;
        },
        async redirect({ url, baseUrl }) {
            return baseUrl; // Always redirect to the base URL after login
        },
    },
};