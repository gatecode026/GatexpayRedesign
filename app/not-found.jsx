import NotFound from "@/components/sections/NotFound/NotFound";

export const metadata = {
  title: "404 - Page Not Found",
  description:
    "The page you're looking for may have been moved, deleted, or is no longer available. Let's get you back on track.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function GlobalNotFound() {
  return <NotFound />;
}
