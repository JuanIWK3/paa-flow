export const calculatePosition = (node: number, nodes: number[]) => {
  const nodeIdx = nodes.indexOf(node);
  const nodeCount = nodes.length;
  const angle = nodeIdx * (360 / nodeCount);

  const x = Math.sin(angle) * 100;
  const y = Math.cos(angle) * 100;

  return { x, y };
}