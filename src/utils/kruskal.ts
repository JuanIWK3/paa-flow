import { Edge, Node } from "reactflow";

export type MyEdge = {
  from: number,
  to: number,
  weight: number
}


export function kruskal(graph: { nodes: Node[], edges: Edge[] }) {
  const { nodes, edges } = graph;
  const sortedEdges = edges.sort((a, b) => +a.data - +b.data);
  const parent = new Array(nodes.length).fill(0).map((_, i) => i);
  const rank = new Array(nodes.length).fill(0);
  const result: Edge[] = [];
  for (const edge of sortedEdges) {
    const { source, target } = edge;
    const fromRoot = find(+source, parent);
    const toRoot = find(+target, parent);
    if (fromRoot !== toRoot) {
      result.push(edge);
      union(fromRoot, toRoot, parent, rank);
    }
  }
  return result;
}

function find(x: number, parent: number[]) {
  if (parent[x] === x) return x;
  parent[x] = find(parent[x], parent);
  return parent[x];
}

function union(x: number, y: number, parent: number[], rank: number[]) {
  if (rank[x] > rank[y]) {
    parent[y] = x;
  } else if (rank[x] < rank[y]) {
    parent[x] = y;
  } else {
    parent[y] = x;
    rank[x]++;
  }
}

