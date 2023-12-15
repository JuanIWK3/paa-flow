import * as React from "react";
import { Handle, NodeProps, Position } from "reactflow";

const edgeStyle: React.CSSProperties = {
  background: "none",
  position: "absolute",
  top: "50%",
  right: "50%",
  zIndex: -5,
}

export const CustomNode = (nodeInfo: NodeProps) => {

  return (
    <div
      data-nodeid={nodeInfo.id}
      className="CustomNode"
      style={{
        border: "2px solid black",
        height: 30,
        position: "relative",
        pointerEvents: "all",
        width: 30,
        borderRadius: "100%",
        background: "white"
      }}
    >
      <Handle
        position={Position.Top}
        type="source"
        style={edgeStyle}
      />
      <Handle
        position={Position.Top}
        type="target"
        style={edgeStyle}
      />

      <div style={{ textAlign: "center" }}>{nodeInfo.data.label}</div>
    </div>
  );
};
