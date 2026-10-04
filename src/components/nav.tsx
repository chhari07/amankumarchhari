import Link from "next/link";
import { LuPlay } from "react-icons/lu";

const item = "rounded-full px-2.5 py-0.5 text-muted transition hover:bg-line/60 hover:text-bright";

/** Floating pill, as on a media player: status dot · play · sections */
export function Nav() {
  return (
    <header className="sticky top-0 z-20 flex justify-center pt-4">
      <nav className="flex items-center gap-1 rounded-full border border-line bg-surface2/80 px-2 py-1 text-xs shadow-sm backdrop-blur">
        <Link href="/" aria-label="Home" className="grid size-5 place-items-center">
          <span className="size-2 rounded-full bg-dim" />
        </Link>
        <span className="h-3 w-px bg-line" aria-hidden />
        <LuPlay className="mx-1 size-2.5 fill-bright text-bright" aria-hidden />
        <span className="h-3 w-px bg-line" aria-hidden />
        <Link href="/#about" className={item}>about</Link>
        <Link href="/#work" className={item}>work</Link>
        <Link href="/#experience" className={`${item} hidden sm:inline`}>experience</Link>
        <Link href="/#hiring" className={`${item} hidden sm:inline`}>hiring</Link>
        <Link href="/#contact" className={item}>contact</Link>
      </nav>
    </header>
  );
}
