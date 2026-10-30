import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <>
      <SiteHeader home={false} />
      <main id="main" className="section">
        <div className="container not-found">
          <p className="eyebrow">404 / NOT FOUND</p>
          <h1 className="h-section">
            That number moved. <em className="serif-accent">This page didn’t.</em>
          </h1>
          <p className="section-intro">The page you’re looking for doesn’t exist, or it has moved.</p>
          <div>
            <Link className="btn btn-primary" href="/">
              Back to the portfolio
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
