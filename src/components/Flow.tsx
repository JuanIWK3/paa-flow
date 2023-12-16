import { useGraphStore } from "@/app/store";
import { paintKruskalEdges } from "@/utils/parse";
import { Play } from "lucide-react";
import { ChangeEvent, useEffect } from "react";
import ReactFlow, { ControlButton, Controls, useEdgesState, useNodesState } from "reactflow";
import { useShallow } from "zustand/react/shallow";
import { CustomEdge } from "./CustomEdge";
import { CustomNode } from "./CustomNode";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const edgeTypes = { 'custom': CustomEdge }
const nodeTypes = { 'custom': CustomNode };

export const Flow = () => {
  const { nodes: myNodes, edges: myEdges } = useGraphStore(useShallow((state) => state))
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  const update = () => {
    const newEdges = paintKruskalEdges({ nodes, edges })
    console.log("newEdges", newEdges)
    setEdges(newEdges)
    console.log("edges", edges);
  }

  const upload = (e: ChangeEvent<HTMLInputElement>) => { }

  useEffect(() => {
    setNodes(myNodes)
    setEdges(myEdges)
  }, [myNodes, myEdges])

  return (
    <ReactFlow
      className="min-h-screen"
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      edgeTypes={edgeTypes}
      nodeTypes={nodeTypes}
      fitView
    >
      <Controls className="bg-neutral-800 text-black p-2">
        <ControlButton className="" onClick={() => update()}>
          <Play />
        </ControlButton>
        <ControlButton className="mt-2">
          <Input onChange={(e) => upload} type="file" />
        </ControlButton>
      </Controls>
    </ReactFlow>
  )
}