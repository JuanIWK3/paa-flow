import { useCallback } from "react";
import ReactFlow, { Background, Controls, Edge, Node, applyNodeChanges } from "reactflow";
import { CustomEdge } from "./CustomEdge";
import { CustomNode } from "./CustomNode";

const edgeTypes = { 'custom': CustomEdge }
const nodeTypes = { 'custom': CustomNode };

type FlowProps = {
  nodes: Node[],
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>,
  edges: Edge[],
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>
}

export const Flow = ({ nodes, setNodes, edges, setEdges }: FlowProps) => {
  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );

  return (
    <ReactFlow
      className="min-h-screen"
      nodes={nodes}
      onNodesChange={onNodesChange}
      edges={edges}
      edgeTypes={edgeTypes}
      nodeTypes={nodeTypes}
      fitView
    >
      <Background />
      <Controls />
    </ReactFlow>
  )
}