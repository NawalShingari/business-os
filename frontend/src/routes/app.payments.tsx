import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { PageHeader, Panel, Pill } from "@/components/os-kit";
import { currency, payments, revenueByMonth } from "@/lib/demo-data";

export const Route = createFileRoute("/app/payments")({
  head: () => ({
    meta: [
      { title: "Payments — BusinessOS" },
      { name: "description", content: "Revenue overview, pending invoices, transaction history and AI payment insights." },
      { property: "og:title", content: "Payments — BusinessOS" },
      { property: "og:description", content: "Revenue, pending invoices and payment insights." },
    ],
  }),
  component: Payments,
});

function Payments() {
  const pending = payments.filter((p) => p.status !== "Paid");
  const outstanding = pending.reduce((s, p) => s + p.amount, 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-12">
      <PageHeader
        eyebrow="October 2026"
        title="Payments"
        sub={`${currency(outstanding)} outstanding across ${pending.length} invoices.`}
      />

      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        {[
          ["Collected this month", currency(121300), "+12% vs Sep"],
          ["Outstanding", currency(outstanding), `${pending.length} invoices`],
          ["Average settle time", "6.4 days", "-1.8 days vs Sep"],
        ].map(([l, v, s]) => (
          <div key={l} className="panel p-5">
            <div className="label-mono mb-3">{l}</div>
            <div className="text-2xl font-extrabold tracking-tight">{v}</div>
            <div className="text-xs text-muted-foreground">{s}</div>
          </div>
        ))}
      </div>

      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        <Panel title="Revenue trend" className="lg:col-span-2">
          <div className="flex h-32 items-end gap-2">
            {revenueByMonth.map((m, i) => (
              <div key={m.month} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className={`w-full rounded-t-sm ${i === revenueByMonth.length - 1 ? "bg-foreground" : "bg-border"}`}
                  style={{ height: `${(m.revenue / 130000) * 110}px` }}
                />
                <span className="label-mono">{m.month}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Payment insight">
          <p className="text-sm leading-relaxed">
            Invoices sent on the day of service settle in <strong>3.1 days</strong>. Sent later, they take{" "}
            <strong>11.7 days</strong>. Two of your overdue invoices were sent late.
          </p>
          <button
            onClick={() => toast.success("Same-day invoicing enabled.")}
            className="mt-4 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground"
          >
            Invoice same-day automatically
          </button>
        </Panel>
      </div>

      <Panel
        title="Transactions"
        action={
          <button
            onClick={() => toast.success("2 reminders drafted for your approval.")}
            className="label-mono hover:text-foreground"
          >
            Draft reminders
          </button>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                {["Invoice", "Client", "Date", "Method", "Amount", "Status"].map((h) => (
                  <th key={h} className="label-mono pb-3 font-normal">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="border-b border-border/60 last:border-0">
                  <td className="py-3 font-mono text-xs text-muted-foreground">#{p.id}</td>
                  <td className="py-3">{p.client}</td>
                  <td className="py-3 text-xs text-muted-foreground">{p.date}</td>
                  <td className="py-3 text-xs text-muted-foreground">{p.method}</td>
                  <td className="py-3 font-mono text-xs">{currency(p.amount)}</td>
                  <td className="py-3">
                    <Pill tone={p.status === "Paid" ? "positive" : p.status === "Overdue" ? "danger" : "warning"}>
                      {p.status}
                    </Pill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
