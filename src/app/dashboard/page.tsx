import { Dashboard } from "@/components/dashboard";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const hasSupabaseConfig = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

  if (!hasSupabaseConfig) {
    return (
      <main className="setup-screen">
        <div className="setup-panel">
          <span className="setup-mark">F</span>
          <p className="eyebrow">ONE LAST SETUP STEP</p>
          <h1>Connect your workspace.</h1>
          <p>Add your Supabase project credentials to <code>.env.local</code>, then apply the database schema to enable sign-in and milestone tracking.</p>
          <ol>
            <li>Copy <code>.env.example</code> to <code>.env.local</code> and fill in your project URL and anon key.</li>
            <li>Run <code>supabase/schema.sql</code> in your Supabase SQL editor.</li>
            <li>Restart the dev server and open the workspace again.</li>
          </ol>
          <a className="button button-dark" href="https://supabase.com/dashboard">Open Supabase <span aria-hidden="true">↗</span></a>
        </div>
      </main>
    );
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return <Dashboard email={user?.email ?? ""} />;
}