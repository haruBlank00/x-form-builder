import { useDroppable } from "@dnd-kit/core";

export const Droppable = ({
  children,
  id,
}: {
  children?: React.ReactNode;
  id: string;
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children || null}
    </div>
  );
};
