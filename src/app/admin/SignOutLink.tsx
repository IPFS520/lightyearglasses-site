"use client";

import { signOut } from "next-auth/react";

export function SignOutLink() {
  return (
    <div
      className="logout"
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
    >
      退出登录
    </div>
  );
}
