import { LuFileText, LuGithub, LuLinkedin, LuMail } from "react-icons/lu";
import { site } from "@/content/site";
import { Pill } from "./ui";

const links = [
  { icon: LuMail, label: "Email", href: `mailto:${site.email}` },
  { icon: LuLinkedin, label: "LinkedIn", href: site.links.linkedin },
  { icon: LuGithub, label: "GitHub", href: site.links.github },
  { icon: LuFileText, label: "Resume", href: site.links.resume },
];

export function Footer() {
  return (
    <footer id="contact" className="w-full scroll-mt-20 border-t border-line py-14">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Pill label="contact" center={false} />
          <p className="display ink mt-6 text-3xl sm:text-4xl">Let&apos;s connect.</p>
          <p className="mt-2 text-muted">
            Available immediately · {site.location.split("·")[1]?.trim()}.
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
          {links.map(({ icon: Icon, label, href }) => (
            <li key={label}>
              <a href={href} className="flex items-center gap-1.5 transition hover:text-bright">
                <Icon className="size-4" aria-hidden /> {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-14 text-xs text-dim">© {new Date().getFullYear()} {site.name}</p>
    </footer>
  );
}
