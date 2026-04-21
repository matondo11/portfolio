"use client";

import { useNetworkInfo } from "@/hooks/useNetworkInfo";
import { AlertCircle } from "lucide-react";
import clsx from "clsx";

export function NetworkInfo() {
  const { isSlowNetwork, connection } = useNetworkInfo();

  if (!isSlowNetwork || !connection) {
    return null;
  }

  return (
    <div
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 p-4 bg-yellow-500/10 border-b border-yellow-500/30 backdrop-blur-sm",
        "flex items-center gap-3 text-sm text-yellow-400"
      )}
    >
      <AlertCircle size={18} className="shrink-0" />
      <span>
        Slow network detected ({connection.effectiveType}). Optimizing images
        and reducing animations.
      </span>
    </div>
  );
}

export function useOptimizedContent() {
  const { isSlowNetwork } = useNetworkInfo();

  return {
    // Return reduced quality images on slow networks
    imageQuality: isSlowNetwork ? 60 : 80,
    // Disable heavy animations on slow networks
    enableAnimations: !isSlowNetwork,
    // Preload fewer items on slow networks
    preloadItems: isSlowNetwork ? 3 : 10,
    // Enable compression on slow networks
    enableCompression: isSlowNetwork,
    // Reduce video quality on slow networks
    videoQuality: isSlowNetwork ? "360p" : "720p",
  };
}
