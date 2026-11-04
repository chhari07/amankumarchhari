"use client";

import { useState } from "react";

// No backend: the form opens the visitor's email app with the message filled in.
export function ContactForm({ email }: { email: string }) {
  const [sent, setSent] = useState(false);
  return (
    <form
      className="cform"
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const subject = `Portfolio enquiry from ${f.get("name")}`;
        const body = `${f.get("message")}\n\n${f.get("name")} · ${f.get("from")}`;
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setSent(true);
      }}
    >
      <label>
        <span className="label">Your name</span>
        <input name="name" required autoComplete="name" />
      </label>
      <label>
        <span className="label">Email</span>
        <input name="from" type="email" required autoComplete="email" />
      </label>
      <label>
        <span className="label">What do you need?</span>
        <textarea name="message" rows={3} required />
      </label>
      <button className="pill accent" type="submit">
        Send message →
      </button>
      {sent && <p className="label mute">Your email app should open now. If not, write to {email}.</p>}
    </form>
  );
}
