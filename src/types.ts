import { Edge, Node } from "reactflow"

export type Graph = {
  nodes: Node[],
  edges: Edge[],
}

export type MyEdge = {
  from: number,
  to: number,
  weight: number
}