import { Edge, Node } from "reactflow"
import { calculatePosition } from "./get-node-position"
import { kruskal } from "./kruskal"
import { graph } from "./graph"
import { Graph } from "@/types"

export const parseIntoMatrix = (txt: string | ArrayBuffer): number[][] => {
  const lines = txt.toString().split("\n")

  return lines.map((line) => {
    const weights = line.split(",").map((weight) => Number(weight.replaceAll(";", "")))

    return weights.map(weight => {
      return weight
    })
  })
}

export const buildNodes = (nodes: number[]): Node[] => {
  return nodes.map((node, i) => {
    return {
      id: node.toString(),
      data: { label: node.toString() },
      position: {
        x: calculatePosition(node, nodes).x,
        y: calculatePosition(node, nodes).y
      },
      type: "custom"
    }
  })
}

export const paintKruskalEdges = (graph: Graph): Edge[] => {
  const kruskalEdges = kruskal({ nodes: graph.nodes, edges: graph.edges })

  graph.edges.forEach((edge) => {
    kruskalEdges.forEach((kruskalEdge) => {
      if (edge.source === kruskalEdge.source && edge.target === kruskalEdge.target) {
        edge.style = { stroke: "#f00", strokeWidth: 2 }
      }
    })
  })

  return graph.edges
}