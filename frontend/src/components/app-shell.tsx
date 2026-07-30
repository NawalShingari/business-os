import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  CalendarDays,
  CreditCard,
  LayoutGrid,
  MessageSquare,
  Settings,
  Sparkle,
  Users,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";
import { CommandBar } from "@/components/command-bar";

const nav = [
  { to: "/app", label: "Briefing", icon: LayoutGrid, exact: true },
  { to: "/app/appointments", label: "Appointments", icon: CalendarDays },
  { to: "/app/clients", label: "Clients", icon: Users },
  { to: "/app/payments", label: "Payments", icon: CreditCard },
  { to: "/app/assistant", label: "Assistant", icon: MessageSquare },
  { to: "/app/analytics", label: "Analytics", icon: Activity },
  { to: "/app/settings", label: "Settings", icon: Settings },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname === to || pathname.startsWith(to + "/");

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-border bg-sidebar px-4 py-6 lg:flex">
        <Link to="/app" className="mb-8 flex items-center gap-3 px-2">
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Sparkle className="size-4" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold">Aris Clinic</span>
            <span className="block truncate text-[11px] text-muted-foreground">BusinessOS · Practice</span>
          </span>
        </Link>

        <nav className="flex flex-col gap-0.5">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive(item.to, "exact" in item ? item.exact : false)
                  ? "bg-accent font-medium text-foreground"
                  : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
              )}
            >
              <item.icon className="size-4 shrink-0" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto space-y-3 border-t border-border pt-5">
          <div className="label-mono">Business memory</div>
          <p className="text-xs leading-relaxed text-muted-foreground">
            1,284 facts retained
            <br />
            Last synced 2 minutes ago
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-positive animate-breathe" />
            Learning continuously
          </div>
        </div>
      </aside>

      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/85 px-4 py-3 backdrop-blur lg:hidden">
        <Link to="/app" className="flex min-w-0 items-center gap-2">
          <span className="grid size-7 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground">
            <Sparkle className="size-3.5" />
          </span>
          <span className="truncate text-sm font-semibold">Aris Clinic</span>
        </Link>
        <button
          onClick={() => setOpen(true)}
          className="shrink-0 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground"
        >
          Ask BusinessOS
        </button>
      </header>

      <main className="pb-28 lg:pb-24 lg:pl-64">{children}</main>

      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-border bg-background/95 backdrop-blur lg:hidden">
        {nav.slice(0, 5).map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={cn(
              "flex flex-col items-center gap-1 py-2.5 text-[10px]",
              isActive(item.to, "exact" in item ? item.exact : false)
                ? "text-foreground"
                : "text-muted-foreground",
            )}
          >
            <item.icon className="size-[18px]" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="pointer-events-none fixed inset-x-0 bottom-16 z-30 hidden justify-center px-4 lg:bottom-6 lg:flex lg:pl-64">
        <button
          onClick={() => setOpen(true)}
          className="pointer-events-auto flex w-full max-w-md items-center gap-3 rounded-2xl bg-primary px-4 py-3 text-left text-sm text-primary-foreground shadow-xl transition-transform hover:-translate-y-0.5"
        >
          <span className="grid size-6 shrink-0 place-items-center rounded bg-primary-foreground/20 font-mono text-[10px]">
            K
          </span>
          <span className="min-w-0 flex-1 truncate opacity-70">Ask BusinessOS or type a command…</span>
        </button>
      </div>

      <CommandBar open={open} onOpenChange={setOpen} />
    </div>
  );
}
