import { Metadata } from "next";

export function generateMetadata(): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio.com";
  const title = "Dev Portfolio | Full-Stack Engineer";
  const description =
    "Full-stack developer specialising in Next.js, NestJS, and scalable web systems. Based in Luanda, Angola.";

  return {
    title,
    description,
    keywords: [
      "full-stack",
      "developer",
      "Next.js",
      "NestJS",
      "React",
      "Node.js",
      "TypeScript",
      "portfolio",
      "Angola",
    ],
    authors: [{ name: "Your Name" }],
    creator: "Your Name",
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: siteUrl,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteUrl,
      title,
      description,
      siteName: "Dev Portfolio",
      images: [
        {
          url: `${siteUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: title,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}/twitter-image.jpg`],
      creator: "@yourtwitterhandle",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: "black-translucent",
      title,
    },
  };
}
