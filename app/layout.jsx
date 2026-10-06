import { Source_Serif_4, Source_Sans_3, Poppins } from "next/font/google";
import ConditionalLayout from "@/components/layout/ConditionalLayout/ConditionalLayout";
import { ContactModalProvider } from "@/components/common/ContactModal/ContactModalContext";
import { Analytics } from "@vercel/analytics/next";
import "@/styles/globals.css";
const sourceSerifPro = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-heading-src",
  display: "swap",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body-src",
  display: "swap",
});
// Scoped to the Blog Insights page only for the hero/featured/article headings.
const sourceSansPro = Source_Sans_3({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-blog-heading-src",
  display: "swap",
});
export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://gatexpay.com"
  ),
  title: {
    default: "GateXPay | Enterprise Payment Infrastructure",
    template: "%s | GateXPay",
  },
  description:
    "GateXPay helps businesses secure, process, and scale digital payments with robust, developer-friendly enterprise payment infrastructure.",
  keywords: [
    "GateXPay",
    "payment gateway",
    "payment processing",
    "secure transactions",
    "enterprise payments",
    "digital banking",
    "fintech infrastructure",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  robots: { index: true, follow: true },
};
export const viewport = { width: "device-width", initialScale: 1 };
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${sourceSerifPro.variable} ${poppins.variable} ${sourceSansPro.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ContactModalProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </ContactModalProvider>
        <Analytics />
      </body>
    </html>
  );
}
