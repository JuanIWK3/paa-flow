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

  return (
    <>
      <path
        className="react-flow__edge-path"
        data-edgeid={edgeInfo.id}
        style={edgeInfo.style}
        d={edgePath}
        markerEnd={edgeInfo.markerEnd}
      />
      <text>
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              background: 'white',
              padding: '5px',
            }}
          >
            {edgeInfo.label}
          </div>
        </EdgeLabelRenderer>
      </text>
    </>
  );
});
