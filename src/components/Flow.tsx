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

    setFile(file);
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

  const upload = () => {
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

          <ToolTipButton tip="Upload graph">
            <Button className="w-10 p-3" onClick={upload}>
              <FileUp />
            </Button>
          </ToolTipButton>

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

const ToolTipButton = (props: { children: React.ReactNode; tip: string }) => {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>{props.children}</TooltipTrigger>
        <TooltipContent>
          <p>{props.tip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
