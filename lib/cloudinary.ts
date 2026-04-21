import type { ProjectMediaType } from "@/types";

type CloudinaryTransformOptions = {
  width?: number;
  height?: number;
  crop?: "fill" | "limit" | "fit";
  quality?: "auto" | number;
  format?: "auto" | "webp" | "avif" | "jpg" | "mp4";
};

export function getOptimizedCloudinaryUrl(
  url: string,
  {
    width,
    height,
    crop = "limit",
    quality = "auto",
    format = "auto",
  }: CloudinaryTransformOptions = {}
) {
  if (!url.includes("res.cloudinary.com") || !url.includes("/upload/")) {
    return url;
  }

  const transforms = [`f_${format}`, `q_${quality}`];

  if (width) {
    transforms.push(`w_${width}`);
  }

  if (height) {
    transforms.push(`h_${height}`);
  }

  if (width || height) {
    transforms.push(`c_${crop}`);
  }

  return url.replace("/upload/", `/upload/${transforms.join(",")}/`);
}

export function getProjectMediaUrl(
  url: string,
  type: ProjectMediaType,
  width: number,
  height?: number
) {
  return getOptimizedCloudinaryUrl(url, {
    width,
    height,
    crop: type === "image" ? "fill" : "limit",
    quality: "auto",
    format: "auto",
  });
}

export function getCloudinaryVideoPoster(url: string, width = 1200) {
  if (!url.includes("res.cloudinary.com") || !url.includes("/video/upload/")) {
    return url;
  }

  const [baseUrl, queryString] = url.split("?");
  const posterUrl = getOptimizedCloudinaryUrl(baseUrl, {
    width,
    crop: "limit",
    quality: "auto",
    format: "jpg",
  })
    .replace("/video/upload/", "/video/upload/so_0/")
    .replace(/\.(mp4|mov|m4v|webm)$/i, ".jpg");

  return queryString ? `${posterUrl}?${queryString}` : posterUrl;
}
