"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const errParam = params.get("error");
  const [email, setEmail] = useState("admin@lightyearglasses.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    errParam === "CredentialsSignin" ? "邮箱或密码错误" : null
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await signIn("credentials", {
      email, password, redirect: false,
    });
    setLoading(false);
    if (res?.ok) {
      router.push("/admin");
    } else {
      setError("邮箱或密码错误");
    }
  };

  return (
    <div className="admin-login-box">
      <h1>✨ Lightyear Admin</h1>
      <p>请输入后台管理员账号</p>
      <form onSubmit={onSubmit}>
        <div className="form-row">
          <label>邮箱</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="form-row">
          <label>密码</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required autoFocus />
        </div>
        {error && <div className="err">{error}</div>}
        <button type="submit" disabled={loading}>{loading ? "登录中..." : "登录"}</button>
      </form>
    </div>
  );
}
