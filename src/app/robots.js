const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://motor-atlas.example";

export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
