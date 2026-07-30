import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Sparkle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — BusinessOS" },
      { name: "description", content: "Access your BusinessOS workspace: AI briefings, client memory and scheduling." },
      { property: "og:title", content: "Sign in — BusinessOS" },
      { property: "og:description", content: "Access your BusinessOS workspace." },
    ],
  }),
  component: Auth,
});

type Mode = "signin" | "signup" | "forgot" | "recover";

function Auth() {
  const [mode, setMode] = useState<Mode>("signin");
  const navigate = useNavigate();

  const copy: Record<Mode, { title: string; sub: string; cta: string }> = {
    signin: { title: "Welcome back.", sub: "Your briefing has been waiting since 6:00 this morning.", cta: "Enter workspace" },
    signup: { title: "Create your workspace.", sub: "Two minutes to set up. Memory starts building immediately.", cta: "Create workspace" },
    forgot: { title: "Reset your access.", sub: "We'll email a secure link. It expires in 15 minutes.", cta: "Send reset link" },
    recover: { title: "Account recovery.", sub: "Lost access to your email? Verify with your practice code.", cta: "Start recovery" },
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "signin") {
      navigate({ to: "/app" });
    } else if (mode === "signup") {
      navigate({ to: "/onboarding" });
    } else {
      toast.success("This is a demo — no email was actually sent.");
      setMode("signin");
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden flex-col justify-between border-r border-border bg-surface-sunken p-12 lg:flex">
        <Link to="/" className="flex items-center gap-2 text-sm font-bold uppercase tracking-tighter">
          <span className="grid size-7 place-items-center rounded-md bg-primary text-primary-foreground">
            <Sparkle className="size-3.5" />
          </span>
          BusinessOS
        </Link>
        <div className="max-w-md space-y-6">
          <p className="text-2xl font-bold leading-snug tracking-tight text-balance">
            “Good morning. You have 12 appointments today, 3 follow-ups are pending, and revenue is
            improving. Shall I prepare the plan?”
          </p>
          <div className="label-mono">Your briefing, every day at 06:00</div>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="size-1.5 rounded-full bg-positive animate-breathe" />
          1,284 facts retained across 61 clients
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <Link
            to="/"
            className="mb-10 inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground lg:hidden"
          >
            <ArrowLeft className="size-3.5" /> Back
          </Link>

          <h1 className="animate-reveal mb-2 text-3xl font-extrabold tracking-tight">{copy[mode].title}</h1>
          <p className="animate-reveal mb-10 text-sm text-muted-foreground [animation-delay:80ms]">
            {copy[mode].sub}
          </p>

          <form onSubmit={submit} className="animate-reveal space-y-4 [animation-delay:140ms]">
            {mode === "signup" && <Field label="Your name" placeholder="Aris Menon" />}
            {mode === "recover" ? (
              <Field label="Practice code" placeholder="ARIS-CLINIC-4821" />
            ) : (
              <Field label="Email" type="email" placeholder="you@practice.com" />
            )}
            {(mode === "signin" || mode === "signup") && (
              <Field label="Password" type="password" placeholder="••••••••" />
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.01] active:scale-95"
            >
              {copy[mode].cta}
            </button>
          </form>

          <div className="mt-6 space-y-2 text-xs text-muted-foreground">
            {mode === "signin" && (
              <>
                <button onClick={() => setMode("forgot")} className="block hover:text-foreground">
                  Forgot your password?
                </button>
                <button onClick={() => setMode("signup")} className="block hover:text-foreground">
                  No workspace yet? Create one
                </button>
              </>
            )}
            {mode === "signup" && (
              <button onClick={() => setMode("signin")} className="block hover:text-foreground">
                Already have a workspace? Sign in
              </button>
            )}
            {mode === "forgot" && (
              <>
                <button onClick={() => setMode("recover")} className="block hover:text-foreground">
                  No longer have access to that email?
                </button>
                <button onClick={() => setMode("signin")} className="block hover:text-foreground">
                  Back to sign in
                </button>
              </>
            )}
            {mode === "recover" && (
              <button onClick={() => setMode("signin")} className="block hover:text-foreground">
                Back to sign in
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, type = "text", placeholder }: { label: string; type?: string; placeholder: string }) {
  return (
    <label className="block">
      <span className="label-mono mb-2 block">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
      />
    </label>
  );
}
