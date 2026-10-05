export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gatexpay.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/dashboard/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
