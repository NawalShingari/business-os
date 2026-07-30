import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Minus } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BusinessOS — The AI operating system for expert practices" },
      {
        name: "description",
        content:
          "An AI business operating system that remembers every client, predicts revenue and prepares your day. Built for clinics, studios, firms and practices.",
      },
      { property: "og:title", content: "BusinessOS — Your practice, quietly intelligent" },
      {
        property: "og:description",
        content: "AI daily briefings, business memory, scheduling and payments in one calm workspace.",
      },
    ],
  }),
  component: Landing,
});

const industries = [
  ["Clinic", "Patient recall, prescriptions and lab synchronisation."],
  ["Legal", "Case timelines, billable hours and document memory."],
  ["Studio", "Project phases, retainer tracking and client approvals."],
  ["Consulting", "Engagement health, utilisation and renewal signals."],
  ["Salon", "Rebooking rhythm, stylist load and no-show prediction."],
  ["Coaching", "Session cadence, progress notes and package balance."],
];

const capabilities = [
  ["Daily briefing", "Every morning, one paragraph of what actually matters — written, not charted."],
  ["Business memory", "It remembers that Rahul books evenings and Priya reacts to lidocaine. Forever."],
  ["Quiet automation", "Reminders, follow-ups and invoices drafted and waiting for one tap of approval."],
  ["Natural commands", "“Schedule Rahul tomorrow.” “Who owes me money?” The workspace answers."],
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 px-6 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div className="text-sm font-bold uppercase tracking-tighter">BusinessOS</div>
          <div className="hidden gap-8 text-[13px] font-medium md:flex">
            <a href="#product" className="text-muted-foreground hover:text-foreground">Product</a>
            <a href="#industries" className="text-muted-foreground hover:text-foreground">Solutions</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground">Pricing</a>
          </div>
          <Link
            to="/auth"
            className="shrink-0 rounded-full bg-primary px-4 py-1.5 text-[13px] font-medium text-primary-foreground"
          >
            Get started
          </Link>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-6">
        <section className="mx-auto max-w-3xl py-20 text-center sm:py-24">
          <h1 className="animate-reveal mb-8 text-balance text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
            The business operating system for modern experts.
          </h1>
          <p className="animate-reveal mx-auto mb-10 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground [animation-delay:100ms] sm:text-lg">
            BusinessOS remembers every client detail, predicts your revenue flow and handles the busywork.
            It’s not a dashboard; it’s your new chief of staff.
          </p>
          <div className="animate-reveal flex flex-wrap items-center justify-center gap-3 [animation-delay:150ms]">
            <Link
              to="/onboarding"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-95"
            >
              Set up your practice
            </Link>
            <Link
              to="/app"
              className="rounded-full border border-border bg-surface px-6 py-3 text-sm font-medium transition-colors hover:bg-accent"
            >
              View live demo
            </Link>
          </div>
        </section>

        <ProductPreview />

        <section id="product" className="grid gap-12 border-t border-border py-20 md:grid-cols-4">
          <div>
            <h2 className="mb-4 text-2xl font-bold tracking-tight">Intelligence, not dashboards.</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Four capabilities that replace the tab-switching most practices call software.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 md:col-span-3">
            {capabilities.map(([title, body]) => (
              <div key={title} className="space-y-2 border-l border-border pl-5">
                <div className="text-sm font-bold">{title}</div>
                <div className="text-sm leading-relaxed text-muted-foreground">{body}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 border-t border-border py-20 md:grid-cols-3">
          {[
            ["01", "It watches", "Every appointment, payment and note becomes structured memory automatically."],
            ["02", "It understands", "Patterns surface: who drifts, who pays late, when your week overheats."],
            ["03", "It acts", "Drafts, reminders and schedule fixes arrive ready — you approve or ignore."],
          ].map(([n, t, d]) => (
            <div key={n} className="panel p-6">
              <div className="label-mono mb-6">{n}</div>
              <div className="mb-2 text-lg font-semibold">{t}</div>
              <p className="text-sm leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </section>

        <section id="industries" className="grid gap-12 border-t border-border py-20 md:grid-cols-4">
          <div className="col-span-1">
            <h3 className="mb-4 text-2xl font-bold tracking-tight">For every expert.</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              The underlying intelligence adapts to the nuances of your specific profession.
            </p>
          </div>
          <div className="col-span-3 grid grid-cols-2 gap-8 md:grid-cols-3">
            {industries.map(([name, desc]) => (
              <div key={name} className="space-y-2">
                <div className="text-sm font-bold">{name}</div>
                <div className="text-xs leading-relaxed text-muted-foreground">{desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 border-t border-border py-20 md:grid-cols-3">
          {[
            [
              "“I stopped opening five tools every morning. The briefing tells me what matters in one paragraph.”",
              "Dr. Aris Menon",
              "Cardiology, Bengaluru",
            ],
            [
              "“It flagged three clients drifting before I noticed. That’s ₹40,000 we would have quietly lost.”",
              "Ira Kulkarni",
              "Design studio, Pune",
            ],
            [
              "“The memory is uncanny. It knows my clients’ habits better than my front desk did.”",
              "Marcus Bell",
              "Legal practice, London",
            ],
          ].map(([quote, name, role]) => (
            <figure key={name} className="panel flex flex-col justify-between p-6">
              <blockquote className="text-sm leading-relaxed">{quote}</blockquote>
              <figcaption className="mt-6">
                <div className="text-sm font-semibold">{name}</div>
                <div className="label-mono">{role}</div>
              </figcaption>
            </figure>
          ))}
        </section>

        <section id="pricing" className="border-t border-border py-20">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { name: "Solo", price: "₹2,400", note: "One practitioner, unlimited clients.", feats: ["AI daily briefing", "Business memory", "Scheduling & payments"], primary: false },
              { name: "Practice", price: "₹6,900", note: "Up to 10 team members.", feats: ["Everything in Solo", "Team workload balancing", "Advanced analytics", "Automated follow-ups"], primary: true },
              { name: "Group", price: "Custom", note: "Multi-location networks.", feats: ["Everything in Practice", "Cross-location memory", "Custom AI policies", "Dedicated success lead"], primary: false },
            ].map((p) => (
              <div
                key={p.name}
                className={
                  p.primary
                    ? "rounded-xl border border-foreground bg-primary p-8 text-primary-foreground"
                    : "panel p-8"
                }
              >
                <div className={p.primary ? "label-mono !text-primary-foreground/60" : "label-mono"}>{p.name}</div>
                <div className="mb-1 mt-4 text-4xl font-extrabold tracking-tight">
                  {p.price}
                  {p.price !== "Custom" && <span className="text-base font-normal opacity-60">/mo</span>}
                </div>
                <p className={p.primary ? "mb-8 text-sm opacity-70" : "mb-8 text-sm text-muted-foreground"}>{p.note}</p>
                <ul className="mb-8 space-y-3 text-sm">
                  {p.feats.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 opacity-60" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/onboarding"
                  className={
                    p.primary
                      ? "block rounded-full bg-primary-foreground py-2.5 text-center text-sm font-semibold text-primary"
                      : "block rounded-full border border-border py-2.5 text-center text-sm font-semibold hover:bg-accent"
                  }
                >
                  Start 14-day trial
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-border py-20">
          <div className="grid gap-12 md:grid-cols-3">
            <h3 className="text-2xl font-bold tracking-tight">Questions, answered plainly.</h3>
            <div className="md:col-span-2">
              <Accordion type="single" collapsible>
                {[
                  ["Is my client data used to train models?", "No. Your business memory is isolated to your workspace and never used to train shared models."],
                  ["Can I migrate from my current system?", "Yes. Import clients, appointments and payment history as CSV during onboarding — memory builds from day one."],
                  ["Does it work for non-medical businesses?", "It's built for any appointment or client-based practice: legal, design, coaching, salons, consulting and more."],
                  ["What happens after the trial?", "Nothing disappears. Choose a plan or export everything you've entered."],
                ].map(([q, a]) => (
                  <AccordionItem key={q} value={q}>
                    <AccordionTrigger className="text-left text-sm font-medium">{q}</AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className="rounded-2xl border border-border bg-surface-sunken p-10 text-center sm:p-14">
            <h4 className="label-mono mb-4">Ready when you are</h4>
            <p className="mx-auto mb-8 max-w-lg text-balance text-2xl font-bold tracking-tight sm:text-3xl">
              Give your practice a mind of its own.
            </p>
            <Link
              to="/onboarding"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-95"
            >
              Start your 14-day trial <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-6 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-[11px] uppercase tracking-widest text-muted-foreground sm:flex-row" style={{ fontFamily: "var(--font-mono)" }}>
          <span>© 2026 BusinessOS</span>
          <div className="flex gap-8">
            <a href="#product">Privacy</a>
            <a href="#product">Terms</a>
            <a href="#product">Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ProductPreview() {
  return (
    <div className="animate-reveal relative mb-24 overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl [animation-delay:200ms]">
      <div className="grid min-h-[560px] grid-cols-12">
        <aside className="col-span-12 flex gap-6 border-b border-border bg-background/50 p-6 md:col-span-3 md:flex-col md:border-b-0 md:border-r">
          <div className="flex items-center gap-3">
            <div className="size-8 shrink-0 rounded-lg bg-primary" />
            <span className="truncate text-sm font-semibold">Dr. Aris Clinic</span>
          </div>
          <div className="hidden flex-col gap-1 md:flex">
            <div className="rounded-md bg-accent px-3 py-2 text-sm font-medium">Briefing</div>
            <div className="px-3 py-2 text-sm text-muted-foreground">Appointments</div>
            <div className="px-3 py-2 text-sm text-muted-foreground">Clients</div>
            <div className="px-3 py-2 text-sm text-muted-foreground">Payments</div>
          </div>
          <div className="mt-auto hidden border-t border-border pt-6 md:block">
            <div className="label-mono mb-3">Business memory</div>
            <div className="text-xs leading-tight text-muted-foreground">
              1,284 facts retained
              <br />
              Last synced 2m ago
            </div>
          </div>
        </aside>

        <div className="col-span-12 p-6 sm:p-10 md:col-span-9">
          <div className="max-w-2xl">
            <header className="mb-10">
              <span className="label-mono">Thursday, Oct 24</span>
              <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">Good morning, Aris.</h2>
            </header>

            <div className="space-y-8">
              <div className="animate-reveal space-y-4 rounded-xl border border-border bg-surface-sunken p-6 [animation-delay:400ms]">
                <p className="text-base leading-relaxed sm:text-lg">
                  You have <span className="font-bold">8 appointments</span> today.{" "}
                  <span className="text-muted-foreground">
                    Rahul usually prefers late evenings, but he’s booked for 10 AM; you might want to confirm
                    if he needs a reschedule.
                  </span>
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="rounded-md border border-border bg-surface px-3 py-1 text-xs font-medium">
                    Prepare today’s notes
                  </span>
                  <span className="rounded-md border border-border bg-surface px-3 py-1 text-xs font-medium">
                    Message Rahul
                  </span>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-xl border border-border p-5">
                  <div className="label-mono mb-4">Revenue insight</div>
                  <div className="text-2xl font-bold">₹1,21,300</div>
                  <div className="text-sm font-medium text-positive">+12% vs last month</div>
                  <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-surface-sunken">
                    <div className="h-full w-2/3 bg-foreground" />
                  </div>
                </div>
                <div className="rounded-xl border border-border p-5">
                  <div className="label-mono mb-4">Pending actions</div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2"><Minus className="size-3" /> Follow-up: Sarah K.</li>
                    <li className="flex items-center gap-2"><Minus className="size-3" /> Invoice #9283-A</li>
                    <li className="flex items-center gap-2"><Minus className="size-3" /> Lab report review</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="label-mono">Today’s schedule</h3>
                <div className="space-y-2 font-mono text-[13px]">
                  {[
                    ["09:30 — Sarah Jenkins", "Check-up"],
                    ["10:45 — James Wu", "Follow-up"],
                    ["13:00 — Elena Rodriguez", "Consult"],
                  ].map(([l, r]) => (
                    <div
                      key={l}
                      className="flex justify-between gap-4 rounded-lg border border-border bg-surface p-3"
                    >
                      <span className="truncate">{l}</span>
                      <span className="shrink-0 text-muted-foreground">{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 w-full max-w-md -translate-x-1/2 px-4">
        <div className="flex items-center gap-4 rounded-2xl bg-primary p-3 text-primary-foreground shadow-xl">
          <div className="grid size-6 shrink-0 place-items-center rounded bg-primary-foreground/20 font-mono text-[10px]">
            K
          </div>
          <span className="truncate text-sm opacity-60">Ask BusinessOS or command…</span>
        </div>
      </div>
    </div>
  );
}
