import { useDraggable } from "@dnd-kit/core";

export const Draggable = ({
  children,
  id,
  data = {},
}: {
  children: React.ReactNode;
  id: string;
  data?: any;
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </button>
  );
};
