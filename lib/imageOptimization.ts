// Image optimization utilities
export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  formats?: Array<"webp" | "avif">;
  sizes?: string;
}

export function getOptimizedImageUrl(
  src: string,
  {
    width = 800,
    quality = 80,
    format = "webp",
  }: {
    width?: number;
    quality?: number;
    format?: "webp" | "avif";
  } = {}
): string {
  // For Cloudinary URLs
  if (src.includes("cloudinary.com")) {
    const transformations = `w_${width},q_${quality},f_${format},c_limit`;
    return src.replace("/upload/", `/upload/${transformations}/`);
  }

  // For other CDN providers
  return src;
}

export function getResponsiveSizes(
  breakpoints: Record<string, number> = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
  }
): string {
  return Object.entries(breakpoints)
    .map(([, size]) => `(max-width: ${size}px) ${size}px`)
    .join(", ");
}

// Cache strategies for slow networks
export const cacheStrategies = {
  // Cache-first: Return cached version, fallback to network
  cacheFirst: {
    revalidate: 3600, // 1 hour
  },
  // Network-first: Try network, fallback to cache
  networkFirst: {
    revalidate: 60, // 1 minute
  },
  // Stale-while-revalidate: Return cached, update in background
  staleWhileRevalidate: {
    revalidate: 3600,
  },
  // Static: Cache forever
  static: {
    revalidate: false,
  },
};

// Preload images for better performance
export function preloadImage(src: string): void {
  if (typeof window !== "undefined") {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = src;
    document.head.appendChild(link);
  }
}

// Image blur placeholder generator
export function generateBlurDataURL(color = "F3F4F6"): string {
  return `data:image/svg+xml;base64,${Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1">
      <rect width="1" height="1" fill="#${color}"/>
    </svg>`
  ).toString("base64")}`;
}
