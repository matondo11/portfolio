import * as THREE from "three";

export interface RoadmapNode {
  id: string;
  label: string;
  color: string;
  position: [number, number, number];
}

export const roadmapNodes: RoadmapNode[] = [
  { id: "logic", label: "Logic", color: "#38bdf8", position: [-5.8, -1.3, -2.4] },
  {
    id: "javascript",
    label: "JavaScript",
    color: "#60a5fa",
    position: [-3.3, -0.2, -1.35],
  },
  { id: "react", label: "React", color: "#67e8f9", position: [-0.7, 0.55, 0.4] },
  {
    id: "nextjs",
    label: "Next.js",
    color: "#a78bfa",
    position: [2.1, 1.3, 0.15],
  },
  {
    id: "backend",
    label: "Backend",
    color: "#8b5cf6",
    position: [4.7, 0.15, 1.45],
  },
  { id: "mobile", label: "Mobile", color: "#22d3ee", position: [7.1, 1.7, 2.7] },
];

export function createRoadmapCurve(nodes: RoadmapNode[]) {
  return new THREE.CatmullRomCurve3(
    nodes.map((node) => new THREE.Vector3(...node.position)),
    false,
    "catmullrom",
    0.45
  );
}

export function sampleCurvePoints(curve: THREE.CatmullRomCurve3, segments = 220) {
  return curve.getPoints(segments);
}

export function flattenVectorPoints(points: readonly THREE.Vector3[]) {
  return points.flatMap((point) => [point.x, point.y, point.z]);
}

export function getVisiblePointCount(totalPoints: number, progress: number) {
  return Math.max(2, Math.ceil(totalPoints * THREE.MathUtils.clamp(progress, 0.02, 1)));
}

export function getLabelOffset(index: number) {
  return index % 2 === 0
    ? new THREE.Vector3(-0.7, 0.8, 0.3)
    : new THREE.Vector3(0.65, 0.75, -0.3);
}

export function getCameraPose(
  curve: THREE.CatmullRomCurve3,
  progress: number,
  compact = false
) {
  const clamped = THREE.MathUtils.clamp(progress, 0, 1);
  const point = curve.getPointAt(clamped);
  const lookAhead = curve.getPointAt(Math.min(1, clamped + 0.08));
  const tangent = curve.getTangentAt(Math.min(0.999, clamped + 0.01)).normalize();
  const lateral = new THREE.Vector3().crossVectors(
    new THREE.Vector3(0, 1, 0),
    tangent
  );

  if (lateral.lengthSq() < 0.0001) {
    lateral.set(1, 0, 0);
  } else {
    lateral.normalize();
  }

  const lateralDistance = compact ? 1.55 : 2.4;
  const verticalOffset = compact ? 1.1 : 1.75;
  const tangentOffset = compact ? -2.7 : -3.9;

  const position = point
    .clone()
    .add(lateral.multiplyScalar(lateralDistance))
    .add(new THREE.Vector3(0, verticalOffset, 0))
    .add(tangent.clone().multiplyScalar(tangentOffset));

  const target = lookAhead
    .clone()
    .lerp(point, 0.24)
    .add(new THREE.Vector3(0, compact ? 0.22 : 0.35, 0));

  return { position, target };
}
