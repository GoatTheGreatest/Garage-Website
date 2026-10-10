import { vehicles } from "@/lib/vehicles";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://motor-atlas.example";

export default function sitemap() {
  const generatedAt = new Date();
  return [
    {
      url: siteUrl,
      lastModified: generatedAt,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...vehicles.map((vehicle) => ({
      url: `${siteUrl}/vehicles/${vehicle.slug}`,
      lastModified: generatedAt,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  ];
}
