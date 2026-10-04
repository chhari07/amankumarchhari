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
    <footer id="contact" className="mx-auto w-full max-w-xl scroll-mt-20 py-16">
      <Pill label="contact" />
      <p className="mt-8 text-bright">Let&apos;s connect</p>
      <p className="mt-1 text-muted">
        Available immediately · {site.location.split("·")[1]?.trim()}.
      </p>
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-muted">
        {links.map(({ icon: Icon, label, href }) => (
          <li key={label}>
            <a href={href} className="flex items-center gap-1.5 transition hover:text-bright">
              <Icon className="size-3.5" aria-hidden /> {label}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-16 text-center text-xs text-dim">© {new Date().getFullYear()} {site.name}</p>
    </footer>
  );
}
