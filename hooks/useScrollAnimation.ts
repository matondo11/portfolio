"use client";

import { MutableRefObject, RefObject, useEffect } from "react";

export interface RoadmapNodeAnimationState {
  reveal: number;
}

export interface RoadmapAnimationState {
  drawProgress: number;
  cameraProgress: number;
  ambientProgress: number;
  nodes: RoadmapNodeAnimationState[];
}

export function createRoadmapAnimationState(
  nodeCount: number
): RoadmapAnimationState {
  return {
    drawProgress: 0.04,
    cameraProgress: 0,
    ambientProgress: 0.35,
    nodes: Array.from({ length: nodeCount }, () => ({ reveal: 0 })),
  };
}

export function useScrollAnimation(
  sectionRef: RefObject<HTMLElement | null>,
  animationRef: MutableRefObject<RoadmapAnimationState>
) {
  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) {
      return;
    }

    let mounted = true;
    let cleanup: () => void = () => {};

    async function setup() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (!mounted || !sectionRef.current) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top+=96",
            end: "bottom bottom",
            scrub: 1.15,
            invalidateOnRefresh: true,
          },
        });

        timeline.to(
          animationRef.current,
          {
            drawProgress: 1,
            cameraProgress: 1,
            ambientProgress: 1,
            duration: 1,
          },
          0
        );

        animationRef.current.nodes.forEach((node, index) => {
          timeline.to(
            node,
            {
              reveal: 1,
              duration: 0.18,
            },
            0.08 + index * 0.14
          );
        });

        ScrollTrigger.refresh();
      }, sectionRef);

      cleanup = () => ctx.revert();
    }

    void setup();

    return () => {
      mounted = false;
      cleanup();
    };
  }, [animationRef, sectionRef]);
}
