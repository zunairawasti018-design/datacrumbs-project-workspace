"use client";

import { useState } from "react";
import { ArrowRight, Check, Layers3 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const supabase = createClient();
    const result = mode === "signin"
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });

    if (result.error) {
      setMessage(result.error.message);
    } else if (mode === "signup" && !result.data.session) {
      setMessage("Check your inbox to confirm your email, then sign in.");
    } else {
      window.location.assign("/dashboard");
    }
    setLoading(false);
  }

  return (
    <main className="auth-shell">
      <aside className="auth-aside">
        <a className="brand brand-light" href="/auth"><span className="brand-mark"><Layers3 size={18} /></span> fieldnotes</a>
        <div className="auth-aside-copy">
          <p className="eyebrow">YOUR PROJECT, IN VIEW</p>
          <h1>Good work starts with a clear next step.</h1>
          <p>One calm place to shape the scope, track the details, and ship with confidence.</p>
        </div>
        <div className="auth-proof"><span><Check size={14} /> Private workspace</span><span><Check size={14} /> Built for real progress</span></div>
      </aside>
      <section className="auth-main">
        <div className="auth-form-wrap">
          <div className="auth-mobile-brand"><span className="brand-mark"><Layers3 size={18} /></span> fieldnotes</div>
          <p className="eyebrow">PROJECT WORKSPACE</p>
          <h2>{mode === "signin" ? "Welcome back." : "Start your workspace."}</h2>
          <p className="auth-subtitle">{mode === "signin" ? "Sign in to pick up where you left off." : "Create an account to keep your project moving."}</p>
          <form onSubmit={submit} className="auth-form">
            <label htmlFor="email">Email address</label>
            <input id="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@company.com" />
            <label htmlFor="password">Password</label>
            <input id="password" type="password" autoComplete={mode === "signin" ? "current-password" : "new-password"} minLength={8} required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 8 characters" />
            {message && <p className="form-message" role="status">{message}</p>}
            <button className="button button-dark auth-submit" disabled={loading} type="submit">{loading ? "One moment..." : mode === "signin" ? "Sign in" : "Create account"}<ArrowRight size={16} /></button>
          </form>
          <p className="auth-switch">{mode === "signin" ? "New to Fieldnotes?" : "Already have an account?"} <button onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setMessage(""); }}>{mode === "signin" ? "Create an account" : "Sign in"}</button></p>
        </div>
      </section>
    </main>
  );
}