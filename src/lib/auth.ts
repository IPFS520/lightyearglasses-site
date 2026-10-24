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
        if (!credentials?.email || !credentials?.password) return null;
        if (credentials.email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) return null;
        // 无 hash 时回退到明文（开发/首次部署）
        const ok = ADMIN_HASH
          ? await bcrypt.compare(credentials.password, ADMIN_HASH)
          : credentials.password === process.env.ADMIN_PASSWORD;
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
