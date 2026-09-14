import type { Metadata, Viewport } from "next";
import "./globals.css";

const FAVICON_SVG = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
  <defs>
    <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0%' stop-color='#6366f1'/>
      <stop offset='50%' stop-color='#8b5cf6'/>
      <stop offset='100%' stop-color='#a78bfa'/>
    </linearGradient>
  </defs>
  <rect width='100' height='100' rx='22' fill='url(#g)'/>
  <text x='50' y='69' font-family='Arial, Helvetica, sans-serif' font-weight='700' font-size='58' fill='white' text-anchor='middle'>C</text>
</svg>`;
const FAVICON_URL = `data:image/svg+xml,${encodeURIComponent(FAVICON_SVG)}`;

const SITE_TITLE = "Cahayo OS — Earnest Achayo";
const SITE_DESCRIPTION =
  "Interactive macOS-style portfolio of Earnest Odhiambo Achayo — Data Analyst & Software Engineer specializing in SQL, Python, Power BI, and automated data pipelines.";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "Earnest Achayo",
    "Data Analyst",
    "Software Engineer",
    "Portfolio",
    "Power BI",
    "Python",
    "SQL",
    "Data Visualization",
  ],
  authors: [{ name: "Earnest Odhiambo Achayo" }],
  icons: { icon: FAVICON_URL, apple: FAVICON_URL },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "en_US",
    siteName: "Cahayo OS",
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d1b3e",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
