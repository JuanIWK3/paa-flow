import React from "react";
import { EdgeLabelRenderer, EdgeProps, getStraightPath } from "reactflow";

/**
 * STYLES
 */
const DEFAULT_EDGE_STYLES = {};
export const HIGHLIGHTED_EDGE_STYLES: React.CSSProperties = {
  filter: "drop-shadow( 0px 3px 1px rgba(0, 0, 0, .9))"
};

export const CustomEdge = React.memo((edgeInfo: EdgeProps) => {
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX: edgeInfo.sourceX,
    sourceY: edgeInfo.sourceY,
    targetX: edgeInfo.targetX,
    targetY: edgeInfo.targetY
  });
  console.log(`RENDER - edgeinfo`, edgeInfo);
  return (
    <>
      <path
        className="react-flow__edge-path"
        data-edgeid={edgeInfo.id}
        style={{ ...DEFAULT_EDGE_STYLES }}
        onMouseOver={(event) => {
          const edge = event.target as HTMLElement;
          console.log(`[CustomEdge]`, edge);
          edge.style.filter = "drop-shadow( 0px 3px 5px rgba(0, 0, 0, .9))";
        }}
        onMouseLeave={(event) => {
          const edge = event.target as HTMLElement;
          edge.style.filter = "";
        }}
        d={edgePath}
        markerEnd={edgeInfo.markerEnd}
      />
      <text>
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
          className="nodrag nopan"
        >
          {edgeInfo.label}
        </div>
      </EdgeLabelRenderer>
      </text>
    </>
  );
});
