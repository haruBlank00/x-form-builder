import { FORM_COMPONENTS } from "@/data/form-components";
import { FormComponents } from "./components/form-components";
import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { FormOutput } from "./components/form-output";

export default function FormPage() {
  const onDragStart = (e: DragStartEvent) => {
    console.log({ e }, "started...");
  };

  const onDragEnd = (e: DragEndEvent) => {
    console.log({ e }, "ended...");
  };

  return (
    <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div className="grid grid-cols-12 gap-4">
        <div className="sm:col-span-12 md:col-span-2">
          <FormComponents components={FORM_COMPONENTS} />
        </div>

        <div className="sm:col-span-12 md:col-span-5">
          <FormOutput />
        </div>

        <div className="sm:col-span-12 md:col-span-5">
          <h2>config</h2>
        </div>
      </div>
    </DndContext>
  );
}
