import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Loader2 } from "lucide-react";
import { contactApi } from "@/lib/db";
import { isFirebaseConfigured, getFirebaseSetupMessage } from "@/lib/firebase";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  message: z.string().trim().min(10, "Tell us a bit more").max(1000),
});

export const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => { errs[String(i.path[0])] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});

    if (!isFirebaseConfigured) {
      toast.error(getFirebaseSetupMessage() || "Contact form is unavailable.");
      return;
    }

    setIsSubmitting(true);
    try {
      await contactApi.submit(result.data);
      toast.success("Thanks — we'll get back to you within one business day.");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Contact submit failed:", error);
      toast.error("Could not send your message. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 border-t border-border/60 bg-surface/60">
      <div className="container-px grid lg:grid-cols-2 gap-12">
        <div>
          <span className="eyebrow">Get in touch</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">Talk to our team</h2>
          <p className="mt-3 text-muted-foreground max-w-md">
            Looking for a quote, bulk pricing or a tailored solution? Send us a message and we'll respond within one business day.
          </p>
          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-accent" /> sales@primelinktech.co</li>
            <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-accent" /> +254 703 617 164</li>
            <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-accent" /> +254 742 628 137</li>
            <li className="flex items-center gap-3"><MapPin className="h-4 w-4 text-accent" /> Nairobi, Kenya</li>
          </ul>
        </div>
        <form onSubmit={submit} className="rounded-xl border border-border bg-card p-6 sm:p-8 flex flex-col gap-4" noValidate>
          <div>
            <label htmlFor="name" className="text-xs font-medium text-muted-foreground">Name</label>
            <input
              id="name"
              value={form.name}
              maxLength={100}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1.5 w-full rounded-md bg-secondary/60 border border-border px-3 py-2.5 text-sm outline-none focus:border-accent transition-colors"
            />
            {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="text-xs font-medium text-muted-foreground">Email</label>
            <input
              id="email"
              type="email"
              value={form.email}
              maxLength={255}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-1.5 w-full rounded-md bg-secondary/60 border border-border px-3 py-2.5 text-sm outline-none focus:border-accent transition-colors"
            />
            {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="message" className="text-xs font-medium text-muted-foreground">How can we help?</label>
            <textarea
              id="message"
              rows={5}
              value={form.message}
              maxLength={1000}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="mt-1.5 w-full rounded-md bg-secondary/60 border border-border px-3 py-2.5 text-sm outline-none focus:border-accent transition-colors resize-none"
            />
            {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-md accent-gradient px-5 py-3 text-sm font-semibold text-accent-foreground hover:brightness-110 transition-all disabled:opacity-60"
          >
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {isSubmitting ? "Sending..." : "Send message"}
          </button>
        </form>
      </div>
    </section>
  );
};
