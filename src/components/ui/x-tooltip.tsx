import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

type Props = {
  children: React.ReactNode;
  title: string;
};

export const XTooltip = (props: Props) => {
  return (
    <Tooltip>
      <TooltipTrigger>{props.children}</TooltipTrigger>

      <TooltipContent>
        <p>{props.title}</p>
      </TooltipContent>
    </Tooltip>
  );
};
