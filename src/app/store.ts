import { Graph } from "@/types"
import { Edge, Node } from "reactflow"
import { create } from "zustand"

type GraphStore = {
  nodes: Node[],
  setNodes: (nodes: Node[]) => void,
  edges: Edge[],
  setEdges: (edges: Edge[]) => void,
  inputMatrix: number[][],
  setInputMatrix: (inputMatrix: number[][]) => void,

}

export const useGraphStore = create<GraphStore>((set) => ({
  nodes: [],
  setNodes: (nodes: Node[]) => set({ nodes }),
  edges: [],
  setEdges: (edges: Edge[]) => set({ edges }),
  inputMatrix: [],
  setInputMatrix: (inputMatrix: number[][]) => set({ inputMatrix }),
}))