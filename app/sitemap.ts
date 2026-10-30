import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";
import { work } from "@/content/work";
import { isVisible } from "@/lib/flags";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 },
    ...work.filter(isVisible).map((w) => ({ url: `${siteUrl}/work/${w.slug}`, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
