import Image from "next/image";
import Link from "next/link";
import { NavClock } from "@/components/nav-clock";

// Menu items light up blue on hover, like an open macOS menu title.
const item = "rounded-[4px] px-2.5 py-1 font-medium text-black/85 transition-colors duration-100 hover:bg-[#2a6ce6] hover:text-white sm:px-3";

/**
 * Full-width macOS menu bar in the glossy Tiger style: logo · bold name · sections,
 * with a live status and clock at the right end.
 */
export function Nav() {
  return (
    <header className="sticky top-0 z-20 w-full">
      <nav className="flex h-11 items-center gap-0.5 border-b border-black/10 bg-[linear-gradient(to_bottom,rgb(255_255_255/0.72)_0%,rgb(243_243_243/0.55)_50%,rgb(226_226_226/0.5)_51%,rgb(236_236_236/0.6)_100%)] px-2 text-[14px] shadow-[inset_0_1px_0_rgb(255_255_255/0.9),0_1px_6px_-2px_rgb(0_0_0/0.25)] backdrop-blur-xl backdrop-saturate-[1.8] sm:gap-1 sm:px-4">
        <Link href="/" aria-label="Home" className="group mr-1 flex items-center gap-2.5 rounded-[4px] px-1.5 py-0.5 sm:mr-2">
          {/* Traced AA mark, transparent SVG; unoptimized because next/image doesn't process SVGs */}
          <Image
            src="/logo-aa.svg"
            alt=""
            width={45}
            height={24}
            priority
            unoptimized
            className="h-6 w-auto transition duration-300 group-hover:scale-110"
          />
          <span className="font-bold text-black">
            Aman<span className="hidden sm:inline"> Kumar Chhari</span>
          </span>
        </Link>

        <Link href="/#about" className={item}>About</Link>
        <Link href="/#work" className={item}>Work</Link>
        <Link href="/#experience" className={`${item} hidden md:inline`}>Experience</Link>
        <Link href="/#hiring" className={`${item} hidden md:inline`}>Hiring</Link>
        <Link href="/#contact" className={item}>Contact</Link>

        <span className="ml-auto hidden shrink-0 items-center gap-4 whitespace-nowrap pr-1 font-medium text-black/85 lg:flex">
          <span className="flex items-center gap-1.5">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-moss/60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-moss" />
            </span>
            Open to work
          </span>
          <NavClock />
        </span>
      </nav>
    </header>
  );
}
