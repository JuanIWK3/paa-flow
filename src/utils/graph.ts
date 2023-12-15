import { Edge, Node } from "reactflow";

const initialNodes: Node[] = [
  {
    id: '1',
    data: { label: '1' },
    position: { x: 0, y: 0 },
    type: 'custom'
  },
  {
    id: '2',
    data: { label: '2' },
    position: { x: 100, y: 100 },
    type: 'custom'
  },
];

const initialEdges: Edge[] = [
  { id: '1-2', source: '1', target: '2', label: '1', type: 'custom', data: { label: '1' } },
];

export const graph = {
  nodes: initialNodes,
  edges: initialEdges
};