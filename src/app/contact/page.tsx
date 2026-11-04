import type { Metadata } from "next";
import { Footer, MenuBar } from "@/components/chrome";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/content/portfolio";

export const metadata: Metadata = { title: "Contact", description: `Email ${site.name}: ${site.email}` };

export default function ContactPage() {
  return (
    <div className="contact-page">
      <MenuBar dark />
      <main className="pad">
        <p className="label">(Contact) Available from now</p>
        <h1 className="display">Say hi</h1>
        <a className="mail" href={`mailto:${site.email}`}>
          {site.email}
        </a>
        <div className="contact-grid">
          <ContactForm email={site.email} />
          <dl>
            {site.links.map((l) => (
              <div key={l.href}>
                <dt className="label">{l.label}</dt>
                <dd>
                  <a href={l.href} target="_blank" rel="noopener">
                    {l.href.replace(/^https:\/\/(www\.)?/, "").replace(/\/$/, "")} ↗
                  </a>
                </dd>
              </div>
            ))}
            <div>
              <dt className="label">Resume</dt>
              <dd>
                <a href="/Aman_Kumar_Chhari_Resume_Design_Engineer.pdf" target="_blank">
                  Design Engineer ↓
                </a>
                {" · "}
                <a href="/Aman_Kumar_Chhari_Resume_AI_Product_Engineer.pdf" target="_blank">
                  AI Product ↓
                </a>
              </dd>
            </div>
            <div>
              <dt className="label">Based in</dt>
              <dd>{site.location}</dd>
            </div>
          </dl>
        </div>
      </main>
      <Footer />
    </div>
  );
}
