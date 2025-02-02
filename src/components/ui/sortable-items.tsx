import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";

export const SortableItem = (props: {
  id: string;
  children: React.ReactNode;
  onClick: (id: string) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.id,
    });

  /*
   * Track whether the item is being dragged or not
   * we need it to prevent clicks when dragging
   * as we will need to trigger a click action as well
   */
  const [isDragging, setIsDragging] = useState(false);
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  /**
   * Handles the start of the pointer interaction.
   * This resets the `isDragging` state because we don't yet know if it's a click or a drag.
   */
  const handlePointerDown = () => {
    setIsDragging(false); // Assume it's a click unless movement occurs
  };

  /**
   * Detects pointer movement, indicating a drag action.
   * If there's any movement after pointer down, we set `isDragging` to true.
   */
  const handlePointerMove = () => {
    setIsDragging(true); // Mark as dragging to prevent triggering click later
  };

  /**
   * Handles the click event.
   * Only fires if no dragging has occurred (i.e., it's a simple click).
   * This prevents accidental clicks when the user is trying to drag.
   */
  const handleClick = () => {
    if (!isDragging) {
      props.onClick(props.id);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onPointerDown={handlePointerDown} // Resets dragging state
      onPointerMove={handlePointerMove} // Detects dragging
      onClick={handleClick} // Fires only if it was a click, not a drag
      className={clsx(
        "p-4 rounded-md transition-all duration-200 border-2 border-dashed border-gray-300 hover:border-blue-500 hover:shadow-md cursor-move",
      )}
    >
      {props.children}
    </div>
  );
};
