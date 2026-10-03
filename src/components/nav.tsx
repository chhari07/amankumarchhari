import Link from "next/link";
import { LuBriefcase, LuFileText, LuFolderGit2, LuMail, LuTerminal, LuUser } from "react-icons/lu";
import { site } from "@/content/site";
import { user } from "./ui";

const item = "flex items-center gap-1.5 px-2 text-muted hover:bg-moss hover:text-bg";

/** tmux-style status bar */
export function Nav() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-bg/80 backdrop-blur">
      <nav className="mx-auto flex h-10 max-w-5xl items-center justify-between px-4 text-[13px] sm:px-8">
        <Link href="/" className="flex items-center gap-1.5 bg-fg px-2 font-bold text-bg">
          <LuTerminal className="size-3.5" aria-hidden />
          {user}@portfolio
        </Link>
        <div className="flex items-center">
          <Link href="/#about" className={`${item} hidden sm:flex`}><LuUser aria-hidden />about</Link>
          <Link href="/#work" className={item}><LuFolderGit2 aria-hidden />work</Link>
          <Link href="/#experience" className={`${item} hidden md:flex`}><LuBriefcase aria-hidden />experience</Link>
          <a href={site.links.resume} className={`${item} hidden sm:flex`}><LuFileText aria-hidden />resume</a>
          <a href={`mailto:${site.email}`} className={item}><LuMail aria-hidden />contact</a>
        </div>
      </nav>
    </header>
  );
}
