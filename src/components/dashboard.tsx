"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, Check, ChevronDown, Circle, ClipboardList, Flag, Layers3, LogOut, Plus, Sparkles, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { ProjectTask } from "@/lib/tasks";

const weeks = [
  {
    number: 1, phase: "ALIGN", title: "Scope definition & baseline analysis", status: "IN PROGRESS",
    summary: "Get the right people aligned on what success looks like.",
    objectives: ["Audit current domain workflows and baseline tools (Next.js / React, Node.js / Express, Supabase / PostgreSQL)", "Conduct stakeholder interviews / market research to map core project requirements", "Define success metrics (KPIs/OKRs) and establish workspace documentation structure", "Create project master sheet / workspace dashboard"],
    deliverables: ["Baseline audit report", "Project charter & KPI document", "Workspace setup"],
  },
  {
    number: 2, phase: "ARCHITECT", title: "Authentication & data foundation", status: "UP NEXT",
    summary: "Turn the approved scope into a secure, relational foundation.",
    objectives: ["Map user and project entities and define relational constraints", "Configure Supabase authentication and protected application routes", "Apply row-level security policies to user-owned records"],
    deliverables: ["Relational schema and migration", "Sign-in and sign-up flows", "Protected route and access policy"],
  },
  {
    number: 3, phase: "BUILD", title: "CRUD workflows & project dashboard", status: "PLANNED",
    summary: "Build the everyday workflows around projects and milestones.",
    objectives: ["Create, read, update, and delete project milestones", "Connect responsive dashboard controls to authenticated APIs", "Handle empty, loading, success, and error states"],
    deliverables: ["User-scoped CRUD endpoints", "Responsive project dashboard", "Milestone management workflow"],
  },
  {
    number: 4, phase: "VERIFY", title: "API validation & release readiness", status: "PLANNED",
    summary: "Prove the contract, polish the edges, and prepare to ship.",
    objectives: ["Validate request payloads and API error responses", "Automate endpoint and authorization checks", "Review accessibility, responsive behavior, and deployment configuration"],
    deliverables: ["Automated API test suite", "Release readiness checklist", "Deployment handoff"],
  },
];

export function Dashboard({ email }: { email: string }) {
  const [tasks, setTasks] = useState<ProjectTask[]>([]);
  const [expanded, setExpanded] = useState(1);
  const [drafts, setDrafts] = useState<Record<number, string>>({});
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const completed = tasks.filter((task) => task.completed).length;

  async function loadTasks() {
    const response = await fetch("/api/tasks");
    if (response.ok) setTasks(await response.json());
  }

  useEffect(() => { void loadTasks(); }, []);

  async function addTask(week: number) {
    const title = drafts[week]?.trim();
    if (!title) return;
    setBusy(true);
    setError("");
    const response = await fetch("/api/tasks", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ week, title }) });
    const result = await response.json();
    if (!response.ok) setError(typeof result.error === "string" ? result.error : "Could not add this milestone.");
    else { setTasks((current) => [...current, result]); setDrafts((current) => ({ ...current, [week]: "" })); }
    setBusy(false);
  }

  async function toggleTask(task: ProjectTask) {
    const response = await fetch(`/api/tasks/${task.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ completed: !task.completed }) });
    if (response.ok) { const updated = await response.json(); setTasks((current) => current.map((item) => item.id === task.id ? updated : item)); }
  }

  async function removeTask(id: string) {
    const response = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    if (response.ok) setTasks((current) => current.filter((task) => task.id !== id));
  }

  async function signOut() {
    await createClient().auth.signOut();
    window.location.assign("/auth");
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="/dashboard"><span className="brand-mark"><Layers3 size={18} /></span> fieldnotes</a>
        <div className="workspace-label">WORKSPACE</div>
        <div className="workspace-switcher"><span className="workspace-avatar">D</span><span><strong>DataCrumbs</strong><small>Product build</small></span><ChevronDown size={15} /></div>
        <div className="nav-label">PROJECT</div>
        <a className="nav-item active" href="#roadmap"><ClipboardList size={16} /> Roadmap <span className="nav-count">04</span></a>
        <a className="nav-item" href="#milestones"><Flag size={16} /> Milestones</a>
        <div className="sidebar-bottom"><div className="sidebar-note"><Sparkles size={16} /><p><strong>Small steps add up.</strong><br />Keep the next milestone in sight.</p></div><button className="profile-button" onClick={signOut}><span className="profile-avatar">{email.slice(0, 1).toUpperCase() || "U"}</span><span className="profile-email">{email || "Your account"}</span><LogOut size={15} /></button></div>
      </aside>

      <section className="main-panel" id="roadmap">
        <header className="topbar"><div className="breadcrumb">Projects <span>/</span> <strong>DataCrumbs</strong></div><div className="topbar-meta"><span className="status-dot" /> Workspace active <span className="topbar-divider" /> <span className="date-label">PROJECT PLAN · 4 WEEKS</span></div></header>
        <div className="content-wrap">
          <div className="page-heading"><div><p className="eyebrow">PROJECT WORKSPACE <span className="heading-dot">/</span> OCT 2026</p><h1>Make the next step <em>obvious.</em></h1><p className="page-subtitle">A shared plan for shaping, building, and shipping your full-stack app.</p></div><button className="button button-dark export-button" onClick={() => window.print()}><ArrowDown size={15} /> Export plan</button></div>

          <section className="metric-row" aria-label="Project overview">
            <article className="metric-card metric-highlight"><span className="metric-label">PROJECT PHASE</span><strong>Scope & alignment</strong><span className="metric-foot"><span className="metric-pill">WEEK 01</span> · Baseline analysis</span></article>
            <article className="metric-card"><span className="metric-label">ROADMAP</span><strong>04 <small>weeks</small></strong><span className="metric-foot">One clear path to launch</span></article>
            <article className="metric-card"><span className="metric-label">YOUR MILESTONES</span><strong>{completed}<small> / {tasks.length}</small></strong><span className="metric-foot">{tasks.length ? `${Math.round(completed / tasks.length * 100)}% complete` : "Add your first milestone"}</span></article>
            <article className="metric-card metric-kpi"><span className="metric-label">NORTH STAR</span><strong>100%</strong><span className="metric-foot">Stakeholder alignment & scope approval</span></article>
          </section>

          <div className="section-heading"><div><p className="eyebrow">THE PLAN</p><h2>Project roadmap</h2></div><span className="roadmap-hint">SELECT A WEEK TO EXPLORE <ArrowDown size={13} /></span></div>

          <section className="roadmap-list" aria-label="Weekly project roadmap">
            {weeks.map((week) => {
              const weekTasks = tasks.filter((task) => task.week === week.number);
              const isOpen = expanded === week.number;
              return <article className={`week-card ${isOpen ? "week-open" : ""}`} key={week.number}>
                <button className="week-trigger" onClick={() => setExpanded(isOpen ? 0 : week.number)} aria-expanded={isOpen}>
                  <span className={`week-number ${week.number === 1 ? "week-current" : ""}`}>{String(week.number).padStart(2, "0")}</span>
                  <span className="week-title-wrap"><span className="week-phase">{week.phase} <span>·</span> WEEK {String(week.number).padStart(2, "0")}</span><strong>{week.title}</strong><small>{week.summary}</small></span>
                  <span className={`week-status ${week.number === 1 ? "status-current" : ""}`}>{week.status}</span>
                  <span className="week-chevron">{isOpen ? <ArrowUpRight size={18} /> : <ChevronDown size={18} />}</span>
                </button>
                {isOpen && <div className="week-details">
                  <div className="detail-column"><h3>Objectives</h3><ul className="objective-list">{week.objectives.map((objective) => <li key={objective}><span className="objective-bullet"><Circle size={7} /></span>{objective}</li>)}</ul></div>
                  <div className="detail-column deliverables-column"><h3>Milestone deliverables <span>{week.deliverables.length + weekTasks.length}</span></h3><ul className="deliverable-list">{week.deliverables.map((deliverable) => <li key={deliverable}><span className="deliverable-check"><Check size={12} /></span>{deliverable}</li>)}{weekTasks.map((task) => <li className="custom-task" key={task.id}><button className={`task-toggle ${task.completed ? "task-done" : ""}`} onClick={() => void toggleTask(task)} aria-label={task.completed ? "Mark incomplete" : "Mark complete"}>{task.completed && <Check size={12} />}</button><span className={task.completed ? "task-completed" : ""}>{task.title}</span><button className="icon-button delete-task" onClick={() => void removeTask(task.id)} aria-label={`Delete ${task.title}`} title="Delete milestone"><Trash2 size={14} /></button></li>)}</ul>
                    <form className="add-task-form" onSubmit={(event) => { event.preventDefault(); void addTask(week.number); }}><input aria-label="New milestone" placeholder="Add a milestone..." value={drafts[week.number] ?? ""} onChange={(event) => setDrafts((current) => ({ ...current, [week.number]: event.target.value }))} maxLength={120} /><button type="submit" disabled={busy || !drafts[week.number]?.trim()} aria-label="Add milestone"><Plus size={16} /></button></form>
                    {error && <p className="inline-error" role="alert">{error}</p>}</div>
                  <div className="week-footer"><span>WEEK {String(week.number).padStart(2, "0")} OF 04</span><span>{week.number === 1 ? "ALIGNMENT IS THE FIRST DELIVERABLE." : "BUILD WITH CLARITY. SHIP WITH CONFIDENCE."}</span><a href="#milestones">View milestones <ArrowUpRight size={13} /></a></div>
                </div>}
              </article>;
            })}
          </section>
          <footer className="page-footer" id="milestones"><span>FIELDNOTES <span className="footer-dot">·</span> DATACRUMBS PROJECT</span><span>Made for steady progress <span className="footer-star">✳</span></span></footer>
        </div>
      </section>
    </main>
  );
}