export type MyEdge = {
  from: number,
  to: number,
  weight: number
}


export function kruskal(graph: { nodes: number[], edges: MyEdge[] }) {
  const { nodes, edges } = graph;
  const sortedEdges = edges.sort((a, b) => a.weight - b.weight);
  const parent = new Array(nodes.length).fill(0).map((_, i) => i);
  const rank = new Array(nodes.length).fill(0);
  const result: MyEdge[] = [];
  for (const edge of sortedEdges) {
    const { from, to } = edge;
    const fromRoot = find(from, parent);
    const toRoot = find(to, parent);
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

