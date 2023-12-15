"use client";

import { CustomEdge } from "@/components/CustomEdge";
import { CustomNode } from "@/components/CustomNode";
import { useCallback, useState } from "react";
import ReactFlow, {
  Background,
  BaseEdge,
  Controls,
  Edge,
  EdgeLabelRenderer,
  Node,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  getStraightPath,
  useReactFlow,
} from "reactflow";



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


const edgeTypes = { 'custom': CustomEdge }

const nodeTypes = { 'custom': CustomNode };

export default function Home() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  return (
    <div style={{ height: '100%' }}>
      <ReactFlow
      className="min-h-screen"
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        edgeTypes={edgeTypes}
        nodeTypes={nodeTypes}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}