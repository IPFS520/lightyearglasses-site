import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@lightyearglasses.com";
const ADMIN_HASH = process.env.ADMIN_PASSWORD_HASH || "";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("[AUTH] authorize called:", {
          email: credentials?.email,
          hasPassword: !!credentials?.password,
          envEmail: process.env.ADMIN_EMAIL,
          hashLen: (process.env.ADMIN_PASSWORD_HASH || "").length,
          hashPrefix: (process.env.ADMIN_PASSWORD_HASH || "").slice(0, 20),
          ADMIN_HASH_prefix: ADMIN_HASH.slice(0, 20),
          hasBcrypt: typeof bcrypt !== "undefined",
        });
        if (!credentials?.email || !credentials?.password) return null;
        if (credentials.email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
          console.log("[AUTH] email mismatch:", credentials.email, "!=", ADMIN_EMAIL);
          return null;
        }
        const ok = ADMIN_HASH
          ? await bcrypt.compare(credentials.password, ADMIN_HASH)
          : credentials.password === process.env.ADMIN_PASSWORD;
        console.log("[AUTH] bcrypt result:", ok, "ADMIN_HASH present:", !!ADMIN_HASH);
        if (!ok) return null;
        return { id: "1", name: "Admin", email: ADMIN_EMAIL };
      },
    }),
  ],
  pages: { signIn: "/admin/login" },
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
  callbacks: {
    async jwt({ token }) {
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.sub;
      }
      return session;
    },
  },
};

// 开发工具：生成 bcrypt hash
// import { hashPassword } from "@/lib/auth"; hashPassword("admin123").then(console.log);
export async function hashPassword(pw: string) {
  return bcrypt.hash(pw, 10);
}
