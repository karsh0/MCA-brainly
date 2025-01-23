import { NextAuthOptions, User, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt"
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: {
                        username: credentials.username
                    }
                });

                if (!user) {
                    return null;
                }

                const ispassword = await bcrypt.compare(credentials.password, user.password);

                if (!ispassword) {
                    return null;
                }

                return {
                    id: user.id,
                    username: user.username
                };
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }: { token: JWT, user: User }) {
            if (user) {
                token.id = user.id
                token.username = user.username
            }
            return token
        },
        async session({ session, token }: { session: Session, token: JWT }) {
            if (token) {
                session.user = {
                    id: token.id as string,
                    username: token.username as string
                }
            }
            return session;

        }
    },
    // debug: true
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }



