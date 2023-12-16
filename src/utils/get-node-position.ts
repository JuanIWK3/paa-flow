export const calculatePosition = (node: number, nodes: number[]) => {
  const nodeCount = nodes.length;
  const angle = node * (360 / nodeCount);

  const x = Math.sin(angle) * 100;
  const y = Math.cos(angle) * 100;

  return { x, y };
}