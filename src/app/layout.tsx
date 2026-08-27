import type { Metadata, Viewport } from "next";
import JsonLd from "@/components/JsonLd";
import UtmForwarder from "@/components/UtmForwarder";
import { organizationSchema } from "@/lib/schema";
import { LOCALE, SITE_NAME, SITE_URL, buildMetadata } from "@/lib/seo";
import "./globals.css";

/**
 * Root metadata carries the site-wide defaults from Appendix A1. Every route
 * overrides title, description, canonical and OG/Twitter via `buildMetadata`.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  ...buildMetadata("/"),
  openGraph: {
    ...buildMetadata("/").openGraph,
    siteName: SITE_NAME,
    locale: LOCALE,
  },
  robots: { index: true, follow: true },
};

/**
 * A single colour, not a prefers-color-scheme pair: the theme follows the
 * toggle rather than the OS, and ThemeToggle keeps this tag in step.
 */
export const viewport: Viewport = {
  themeColor: "#F6F6F8",
};

/* Applied before first paint so a stored theme choice does not flash. */
const themeBootstrap = `(function(){try{var t=localStorage.getItem("sd-theme");if(t==="light"||t==="dark"){document.documentElement.dataset.sdTheme=t}}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-sd-theme="light" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f%5B%5D=switzer@300,400,500,600,700&display=swap"
        />
        <JsonLd schemas={[organizationSchema]} />
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body>
        <UtmForwarder />
        {children}
      </body>
    </html>
  );
}
