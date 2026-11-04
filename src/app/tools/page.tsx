import type { Metadata } from "next";
import { MenuBar, Dot, Footer, Rise } from "@/components/chrome";
import { ToolIndex } from "@/components/tool-index";
import { tools } from "@/content/tools";

export const metadata: Metadata = {
  title: "Tools",
  description: "Small tools I built for my own phone and desktop: Android apps, home-screen widgets and a GNOME extension.",
};

export default function ToolsPage() {
  return (
    <>
      <MenuBar />
      <main>
        <header className="page-hero pad">
          <p className="label mute">
            <Dot i={1} />
            Built for myself, used every day
          </p>
          <h1 className="display" aria-label="Tools">
            <Rise text="Tools" />
          </h1>
          <p className="page-intro fade">
            Small tools I made because something in my own day was slow or annoying: Android apps, home-screen widgets and a desktop extension.
            Each one solves one problem.
          </p>
        </header>

        <section className="pad" style={{ paddingTop: 0 }}>
          <div className="sechead label">
            <span>Index</span>
            <span className="mute">{tools.length} tools</span>
          </div>
          <ToolIndex tools={tools} />
        </section>
      </main>
      <Footer />
    </>
  );
}
