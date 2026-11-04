// Tools and UI kits. Every fact here is from the real builds; private tools have no code link.
import type { Link } from "./portfolio";

export type ToolIcon = "clock" | "usb" | "pocket" | "calendar" | "reply" | "topbar";

export type Tool = {
  slug: string;
  name: string;
  kind: string;
  color: string;
  icon: ToolIcon;
  logo: string; // real app icon (or one designed for this site when the tool has none of its own)
  tagline: string;
  problem: string;
  does: string[];
  built: string[];
  stack: string;
  status: string;
  links: Link[];
  // Real app screens (rendered from the app's own HTML, framed). The first one is the hover preview on /tools.
  shots?: { src: string; alt: string; label: string }[];
  // Wide thumbnail (1280x640) shown under the header; also used as the page's social preview image.
  cover?: { src: string; og: string; alt: string };
};

export const tools: Tool[] = [
  {
    slug: "wakeface",
    logo: "/icons/wakeface.svg",
    name: "Wakeface",
    kind: "Android app · clock + lock screen",
    color: "#ff6a3d",
    icon: "clock",
    tagline: "A flip clock that is also my lock screen.",
    problem:
      "Stock clock apps look the same on every phone, and the lock screen can't be styled. I wanted one big, readable clock face for alarms, the lock screen and music, in my own type.",
    does: [
      "Big flip-clock face in Anton digits that auto-fit the screen.",
      "Alarms set through Android's own alarm clock API, so they ring reliably.",
      "Works as the main lock screen: fingerprint, face or PIN still unlock the phone.",
      "Music controls with drag-to-seek on the lock face.",
    ],
    built: [
      "Java app with a WebView UI (HTML/CSS faces in the app's assets).",
      "Gradle-free build script: aapt2, javac and d8, signed with my release key.",
      "When the original source folder was lost, I rebuilt the Java source by hand from the installed APK's bytecode, keeping every alarm on the phone.",
    ],
    stack: "Java · Android WebView · HTML/CSS · aapt2 / d8",
    status: "v1.7, in daily use on my phone. Not published.",
    links: [],
    shots: [
      { src: "/tools/wakeface-lock.webp", alt: "Wakeface lock screen with big clock and music player", label: "Lock screen" },
      { src: "/tools/wakeface-clock.webp", alt: "Wakeface Clock tab with big digits and the bottom tab bar", label: "Clock tab" },
      { src: "/tools/wakeface-saver.webp", alt: "Wakeface night screen saver with colour glows", label: "Screen saver" },
    ],
  },
  {
    slug: "otg-switch",
    logo: "/icons/otg-switch.svg",
    name: "OTG Switch",
    kind: "Android app · one-tap OTG",
    color: "#22c55e",
    icon: "usb",
    tagline: "One tap to turn on USB OTG, from the home screen.",
    problem:
      "On my OnePlus phone, USB OTG hides deep in Settings and switches itself off after 10 minutes. Plugging in a pen drive meant digging through menus every time.",
    does: [
      "Tap the app icon, the widget or the quick-settings tile to flip OTG.",
      "A 'Keep on' switch turns OTG back on after the system's auto-off.",
      "A USB-C plug animation slides in when OTG turns on and pulls out when it turns off.",
    ],
    built: [
      "I decompiled SystemUI and found that writing the OTG setting alone does nothing: the real switch is a charger hardware call.",
      "So v3 uses an accessibility service that opens the real OTG switch in Settings and taps it, behind a full-screen animation.",
      "A background job keeps the widget and tile in sync with the real state, and re-arms after a reboot.",
    ],
    stack: "Java · Android accessibility service · App widgets · Quick Settings tile",
    status: "v3.0, in daily use on my phone. Not published.",
    links: [],
  },
  {
    slug: "github-phone-widgets",
    logo: "/icons/github-widgets.webp",
    name: "GitHub Widgets",
    kind: "Android home-screen widgets",
    color: "#facc15",
    icon: "calendar",
    tagline: "My GitHub contribution calendar and repos on my home screen.",
    problem:
      "I check my GitHub streak and repos many times a day. Opening the app or a browser for that is slow.",
    does: [
      "Contribution calendar widget, the same green grid as my GitHub profile.",
      "Repo widget with a compact layout for a one-row slot.",
      "No token or login: it reads only public data. Opening the app refreshes both widgets.",
    ],
    built: [
      "Android RemoteViews widgets with size-aware layouts.",
      "Calendar data from the public contributions page; repo data from GitHub's public API, 5 calls per refresh.",
      "Desktop versions of the same widgets ship in my open-source Ubuntu Widgets kit.",
    ],
    stack: "Java · Android App Widgets · GitHub public API",
    status: "In daily use on my phone. Not published.",
    links: [{ label: "Desktop version", href: "/ui-kit#ubuntu-widgets" }],
    cover: {
      src: "/thumbnails/github-phone-widgets.webp",
      og: "/thumbnails/github-phone-widgets-og.png",
      alt: "GitHub Widgets thumbnail: contribution calendar and repo widgets on an Android home screen",
    },
  },
  {
    slug: "mac-bar",
    logo: "/icons/mac-bar.webp",
    name: "Mac Bar",
    kind: "GNOME Shell extension",
    color: "#3b6bff",
    icon: "topbar",
    tagline: "A macOS-style top bar and dock for Ubuntu.",
    problem:
      "I like the calm, glassy macOS desktop but work on Ubuntu. Themes change colours and icons, not how the bar and dock behave.",
    does: [
      "Blurred, translucent top bar with an Ubuntu logo menu and the clock on the right.",
      "Dock magnification on hover and a bounce when an app starts, like macOS.",
      "A sticky-notes button, plus an optional desktop pile of photos and PDFs.",
    ],
    built: [
      "GNOME Shell extension in JavaScript, tested on GNOME 46.",
      "The dock clips its icons, so the magnify effect draws cloned icons in a layer above it.",
      "Ships inside my open-source Ubuntu Mac Kit installer.",
    ],
    stack: "JavaScript (GJS) · GNOME Shell · Clutter",
    status: "Open source, part of Ubuntu Mac Kit.",
    links: [
      { label: "In Ubuntu Mac Kit", href: "/ui-kit#ubuntu-mac-kit" },
      { label: "GitHub", href: "https://github.com/chhari07/ubuntu-mac-kit" },
    ],
  },
];

export const getTool = (slug: string) => tools.find((t) => t.slug === slug);

export type Kit = {
  slug: string;
  logo: string;
  name: string;
  color: string;
  tagline: string;
  install: string;
  installNote: string;
  includes: string[];
  images: { src: string; alt: string }[];
  video: string;
  links: Link[];
  meta: string;
  cover?: { src: string; og: string; alt: string };
};

export const kits: Kit[] = [
  {
    slug: "ubuntu-mac-kit",
    logo: "/icons/ubuntu-mac-kit.webp",
    name: "Ubuntu Mac Kit",
    color: "#3b6bff",
    tagline: "A complete macOS-style desktop on Ubuntu, in one installer.",
    install: "tar -xzf ubuntu-mac-kit.tar.gz && cd ubuntu-mac-kit && ./install.sh",
    installNote: "Download ubuntu-mac-kit.tar.gz from the latest release first. No sudo; everything goes into your home folder.",
    includes: [
      "WhiteSur-dark icons with regenerated blue macOS folders and white page file icons",
      "macOS cursor, dark GTK styling, window buttons on the left",
      "Mac Bar: blurred top bar, Ubuntu logo menu, dock magnify + bounce",
      "Sticky notes, optional Desktop Stack pile and GitHub widget",
      "Backup on install; the uninstaller restores your old settings",
    ],
    images: [{ src: "/kits/mac-kit-desktop.webp", alt: "Drawing of a macOS-style Ubuntu desktop: glass top bar, Finder-style window, blue folders, dock" }],
    video: "/videos/ubuntu-mac-kit-brand.mp4",
    links: [
      { label: "GitHub", href: "https://github.com/chhari07/ubuntu-mac-kit" },
      { label: "Latest release", href: "https://github.com/chhari07/ubuntu-mac-kit/releases/latest" },
    ],
    meta: "Ubuntu 24.04+ · GNOME 46 · v1.1.0 · open source",
    cover: {
      src: "/thumbnails/ubuntu-mac-kit.webp",
      og: "/thumbnails/ubuntu-mac-kit-og.png",
      alt: "Ubuntu Mac Kit thumbnail: a macOS-style Ubuntu desktop with the Mac Bar",
    },
  },
  {
    slug: "ubuntu-widgets",
    logo: "/icons/ubuntu-widgets.webp",
    name: "Ubuntu Widgets",
    color: "#22c55e",
    tagline: "Glass GitHub widgets for the Ubuntu desktop.",
    install: "curl -fsSL https://github.com/chhari07/ubuntu-widgets/releases/latest/download/install.sh | bash",
    installNote: "One command. Installs both widgets into your home folder.",
    includes: [
      "GitHub Repo Analyser: pick a repo, see commits per day and replay its latest merged pull request",
      "GitHub Contribution Calendar: your contribution grid on the desktop",
      "Glass cards that sit on the desktop and toggle on and off",
    ],
    images: [
      { src: "/kits/widgets-repo.webp", alt: "GitHub Repo Analyser widget" },
      { src: "/kits/widgets-calendar.webp", alt: "GitHub Contribution Calendar widget" },
    ],
    video: "/videos/ubuntu-widgets-brand.mp4",
    links: [
      { label: "GitHub", href: "https://github.com/chhari07/ubuntu-widgets" },
      { label: "Latest release", href: "https://github.com/chhari07/ubuntu-widgets/releases/latest" },
    ],
    meta: "Ubuntu 24.04 · v1.0.1 · MIT licence",
    cover: {
      src: "/thumbnails/ubuntu-widgets.webp",
      og: "/thumbnails/ubuntu-widgets-og.png",
      alt: "Ubuntu Widgets thumbnail: GitHub repo analyser and contribution calendar on the Ubuntu desktop",
    },
  },
];
