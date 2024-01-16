import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

export const ToolTipButton = (props: { children: React.ReactNode; tip: string }) => {
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
