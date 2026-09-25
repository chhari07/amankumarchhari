import { LuDownload, LuGithub, LuLinkedin, LuMail } from "react-icons/lu";
import { site } from "@/content/site";
import { Prompt } from "./ui";

export function Footer() {
  return (
    <footer id="contact" className="scroll-mt-16 border-t border-line py-10">
      <Prompt cmd={`echo "let's build something"`} />
      <p className="mt-2 text-2xl font-bold text-bright sm:text-4xl">let&apos;s build something.</p>
      <p className="mt-2 max-w-xl text-muted">
        Available immediately · {site.location.split("·")[1]?.trim()}.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <a href={`mailto:${site.email}`} className="term-btn term-btn-solid"><LuMail aria-hidden /> {site.email}</a>
        <a href={site.links.github} className="term-btn"><LuGithub aria-hidden /> github</a>
        <a href={site.links.linkedin} className="term-btn"><LuLinkedin aria-hidden /> linkedin</a>
        <a href={site.links.resume} className="term-btn"><LuDownload aria-hidden /> resume.pdf</a>
      </div>
      <div className="mt-10">
        <Prompt cursor />
      </div>
      <p className="mt-6 text-xs text-dim">© {new Date().getFullYear()} {site.name} · process exited with code 0</p>
    </footer>
  );
}
