import { kruskal } from "@/utils/kruskal";
import { buildNodes, parseIntoMatrix } from "@/utils/parse";
import { ChangeEvent, useState } from "react";
import ReactFlow, { Edge, Node, useEdgesState, useNodesState } from "reactflow";
import { CustomEdge } from "./CustomEdge";
import { CustomNode } from "./CustomNode";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";
import { FileUp, FileX2, Undo } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ToolTipButton } from "./ToolTipButton";

const edgeTypes = { custom: CustomEdge };
const nodeTypes = { custom: CustomNode };

export const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [file, setFile] = useState<File | null>(null);

  const changeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];

    if (!file) {
      toast({
        title: "Error",
        description: "No file selected",
        variant: "destructive",
        duration: 2000,
      });

      return;
    }

    let graph: { nodes: Node[]; edges: Edge[] } = { nodes: [], edges: [] };

    if (!file) {
      toast({
        title: "Error",
        description: "No file selected",
        variant: "destructive",
        duration: 2000,
      });

      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target?.result;
      const nodes: number[] = [];
      const edges: Edge[] = [];

      if (!text) return;

      const matrix = parseIntoMatrix(text);

      matrix.forEach((node, fromIdx) => {
        nodes.push(fromIdx);

        node.forEach((weight, toIdx) => {
          if (weight > 0) {
            if (
              edges.find(
                (edge) =>
                  edge.source === toIdx.toString() &&
                  edge.target === fromIdx.toString()
              )
            )
              return;

            edges.push({
              id: `${fromIdx}-${toIdx}`,
              source: fromIdx.toString(),
              target: toIdx.toString(),
              label: weight.toString(),
              style: { stroke: "#aaa" },
              type: "custom",
            });
          }
        });
      });

      graph = {
        nodes: buildNodes(nodes),
        edges: edges,
      };

      setNodes(graph.nodes);
      setEdges(graph.edges);
    };

    reader.readAsText(file);
  };

  const applyExample = () => {
    const nodes: number[] = [];
    const edges: Edge[] = [];

    const exampleMatrix = [
      [0, 7, 0, 5, 0, 0, 0],
      [7, 0, 8, 9, 7, 0, 0],
      [0, 8, 0, 0, 5, 0, 0],
      [5, 9, 0, 0, 15, 6, 0],
      [0, 7, 5, 15, 0, 8, 9],
      [0, 0, 0, 6, 8, 0, 11],
      [0, 0, 0, 0, 9, 11, 0],
    ];

    exampleMatrix.forEach((node, fromIdx) => {
      nodes.push(fromIdx);

      node.forEach((weight, toIdx) => {
        if (weight > 0) {
          if (
            edges.find(
              (edge) =>
                edge.source === toIdx.toString() &&
                edge.target === fromIdx.toString()
            )
          )
            return;

          edges.push({
            id: `${fromIdx}-${toIdx}`,
            source: fromIdx.toString(),
            target: toIdx.toString(),
            label: weight.toString(),
            style: { stroke: "#aaa" },
            type: "custom",
          });
        }
      });
    });

    setNodes(buildNodes(nodes));
    setEdges(edges);
  };

  const applyKruskal = () => {
    if (nodes.length === 0 || edges.length === 0) {
      toast({
        title: "Error",
        description: "No graph to apply Kruskal's algorithm",
        variant: "destructive",
        duration: 2000,
      });

      return;
    }

    const kruskalEdges = kruskal({ nodes: nodes, edges: edges });

    setEdges(
      edges.map((edge, i) => {
        const kruskalEdge = kruskalEdges.find(
          (kruskalEdge) =>
            kruskalEdge.source === edge.source &&
            kruskalEdge.target === edge.target
        );
        if (kruskalEdge)
          return {
            ...edge,
            ...{
              ...edge,
              style: {
                stroke: "#f00",
              },
            },
          };
        return edge;
      })
    );
  };

  const removeKruskal = () => {
    setEdges(
      edges.map((edge, i) => {
        return {
          ...edge,
          ...{
            ...edge,
            style: {
              stroke: "#aaa",
            },
          },
        };
      })
    );
  };

  const removeGraph = () => {
    setNodes([]);
    setEdges([]);
  };


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
      <div className="flex flex-col z-10 absolute gap-2 top-0 left-1/2 -translate-x-1/2 p-4 items-center">
        <div className="flex gap-4">
          <Input
            className="w-full w-[250px]"
            type="file"
            onChange={changeFile}
          />

          <ToolTipButton tip="Apply Kruskal's algorithm">
            <Button variant={"outline"} onClick={applyKruskal}>
              Kruskal
            </Button>
          </ToolTipButton>

          <ToolTipButton tip="Remove Kruskal's algorithm">
            <Button className="w-10 p-3" onClick={() => removeKruskal()}>
              <Undo />
            </Button>
          </ToolTipButton>

          <ToolTipButton tip="Use a example">
            <Button
              className="bg-blue-500"
              variant={"secondary"}
              onClick={() => applyExample()}
            >
              Example
            </Button>
          </ToolTipButton>

          <ToolTipButton tip="Remove graph">
            <Button
              className="w-10 p-3"
              variant={"destructive"}
              onClick={removeGraph}
            >
              <FileX2 />
            </Button>
          </ToolTipButton>
        </div>
      </div>
    </ReactFlow>
  );
};

