"use client";

import { Flow } from "@/components/Flow";
import { makeMatrix } from "@/utils/buildMatrix";
import { kruskal } from "@/utils/kruskal";
import { useState } from "react";
import { Edge, Node } from "reactflow";

type Graph = {
  nodes: Node[],
  edges: Edge[],
  kruskalEdges?: Edge[]
}

export type MyEdge = {
  from: number,
  to: number,
  weight: number
}

export default function Home() {
  const [input, setInput] = useState("");
  const [graph, setGraph] = useState<Graph>({ nodes: [], edges: [] })

  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const getGraph = () => {
    if (!input) return;
    let matrixNodes: number[] = []
    let matrixEdges: MyEdge[] = []
    let newGraph: Graph = { nodes: [], edges: [] }

    const matrix = makeMatrix(input);

    matrix.forEach((row, node) => {
      matrixNodes.push(node)

      row.forEach((weightStr, idx) => {
        const weight = Number(weightStr);

        if (weight > 0) {
          console.log(`to ${idx} with weight ${weight}`)
          matrixEdges.push({
            from: node,
            to: idx,
            weight: weight
          })
        }
      })
    })

    newGraph.nodes = matrixNodes.map((node) => {
      return {
        id: node.toString(),
        data: { label: node.toString() },
        position: { x: 0 + node * 50, y: 0 + node * 50 },
        type: "custom"
      }
    })

    newGraph.edges = matrixEdges.map((edge) => {
      return {
        id: `${edge.from}-${edge.to}`,
        source: edge.from.toString(),
        target: edge.to.toString(),
        label: edge.weight.toString(),
        style: { stroke: "#aaa" },
        type: "custom"
      }
    })

    const matrixKruskalEdges: MyEdge[] = kruskal({ nodes: matrixNodes, edges: matrixEdges })

    console.log("matrixKruskalEdges ", matrixKruskalEdges);


    // make edges that are in kruskal red
    newGraph.edges.forEach((edge) => {
      matrixKruskalEdges.forEach((kruskalEdge) => {
        if (edge.source === kruskalEdge.from.toString() && edge.target === kruskalEdge.to.toString()) {
          console.log("edge ", edge);
          edge.style = { stroke: "#f00", strokeWidth: 2 }
        }
      })
    })

    setNodes(newGraph.nodes);
    setEdges(newGraph.edges);

    console.log("newGraph ", newGraph.edges);

  }

  return (
    <div className="min-h-screen">
      <div className="z-10 absolute border border-gray-500 top-0 left-1/2 -translate-x-1/2 mt-5 px-4 py-2 rounded">
        <textarea value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          placeholder="matrix"
        />
        <button onClick={getGraph} className="border rounded px-4 py-2 bg-gray-800 text-white">build</button>
      </div>
      <Flow nodes={nodes} setNodes={setNodes} edges={edges} setEdges={setEdges} />
    </div>
  );
} 