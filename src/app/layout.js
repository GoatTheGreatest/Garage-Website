import "./globals.css";
import Script from "next/script";
import SiteFooter from "@/components/site-footer";

const themeInitializer = `try {
  const saved = localStorage.getItem("motor-atlas-theme");
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.dataset.theme = saved === "dark" || saved === "light" ? saved : systemDark ? "dark" : "light";
} catch {
  document.documentElement.dataset.theme = "light";
}`;

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://motoratlas.example",
  ),
  title: {
    default: "Motor Atlas — Find your kind of drive",
    template: "%s | Motor Atlas",
  },
  description:
    "A thoughtful field guide to cars, motorcycles, bikes, trucks, and the machines that move us. Compare useful specs, real-world fit, and estimated prices.",
  applicationName: "Motor Atlas",
  keywords: [
    "vehicle guide",
    "car specs",
    "vehicle types",
    "cars",
    "motorcycles",
    "bicycles",
    "vehicle prices",
  ],
  authors: [{ name: "Motor Atlas" }],
  openGraph: {
    type: "website",
    siteName: "Motor Atlas",
    title: "Motor Atlas — Find your kind of drive",
    description: "A thoughtful field guide to the machines that move us.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Motor Atlas — Find your kind of drive",
    description: "A thoughtful field guide to the machines that move us.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <Script id="theme-initializer" strategy="beforeInteractive">
          {themeInitializer}
        </Script>
      </head>
      <body className="min-h-full flex flex-col antialiased">
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
