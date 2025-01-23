import { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt"
import NextAuth from "next-auth";

export const authOptions: NextAuthOptions = {
    providers:[
        CredentialsProvider({
            name: "Credentials",
            credentials:{
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials){
                if (!credentials?.username || !credentials.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where:{
                        username: credentials.username
                    }
                });
                
                if (!user) {
                    return null;
                }

                const ispassword = bcrypt.compare(credentials.password, user.password);
                
                if (!ispassword) {
                    return null;
                }

                return{
                    id: user.id,
                    username: user.username
                };
            }
        })
    ],
    session:{
        strategy: "jwt"
    },
    callbacks:{
        async jwt({ token , user }) {
            if (user) {
                token.username = user.username
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
              session.user.id = token.sub!;
              session.user.username = token.username as string;
            }
            return session;
          }
    }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };