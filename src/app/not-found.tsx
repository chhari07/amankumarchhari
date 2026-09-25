import Link from "next/link";
import { Prompt } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="py-32">
      <Prompt cmd="cd this-page" />
      <p className="mt-2">bash: cd: this-page: No such file or directory</p>
      <p className="mt-6 text-5xl font-bold text-bright sm:text-7xl">404</p>
      <Link href="/" className="term-btn term-btn-solid mt-8">[ cd ~ ]</Link>
    </div>
  );
}
