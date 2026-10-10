import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <Compass size={34} />
      <span className="eyebrow">Wrong turn</span>
      <h1>
        This road
        <br />
        <em>ends here.</em>
      </h1>
      <p>
        That vehicle isn&apos;t in the atlas. Let&apos;s get you back to a road
        worth exploring.
      </p>
      <Link className="primary-button" href="/">
        <ArrowLeft size={16} /> Back to the garage
      </Link>
    </main>
  );
}
