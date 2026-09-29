import type { Metadata, Viewport } from "next";
import { Source_Serif_4, Source_Sans_3, Poppins } from "next/font/google";
import ConditionalLayout from "@/components/layout/ConditionalLayout/ConditionalLayout";
import { ContactModalProvider } from "@/components/common/ContactModal/ContactModalContext";
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

// Scoped to the Blog Insights page only (its Figma spec names this font
// explicitly for the hero/featured/article headings) — declaring the CSS
// variable here has no effect anywhere it isn't referenced, so it doesn't
// touch any other page's typography.
const sourceSansPro = Source_Sans_3({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-blog-heading-src",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://gatexpay.com"),
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
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
      </body>
    </html>
  );
}
