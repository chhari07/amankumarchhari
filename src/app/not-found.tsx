import Link from "next/link";
import { Pill } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center py-32 text-center">
      <Pill label="404" />
      <p className="display mt-8 text-5xl text-bright sm:text-7xl">Nothing here</p>
      <p className="mt-3 text-muted">This page doesn&apos;t exist.</p>
      <Link href="/" className="term-btn term-btn-solid mt-8">Back home</Link>
    </div>
  );
}
