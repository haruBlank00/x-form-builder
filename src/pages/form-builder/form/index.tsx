import { FORM_COMPONENTS } from "@/data/form-components";
import { FormComponents } from "./components/form-components";
import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { FormOutput } from "./components/form-output";
import { useEffect, useReducer } from "react";
import { formReducer, initialState } from "./form-reducer";
import { makeID } from "@/lib/utils";

export default function FormPage() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const onDragStart = (e: DragStartEvent) => {
    console.log({ e }, "started...");
  };

  const onDragEnd = (e: DragEndEvent) => {
    const currentData = e.active?.data.current!;

    // we will need unique name for each field so let's add it here :)
    const name = `${currentData.type}-${makeID()}`;
    dispatch({
      type: "ADD_FIELD",
      payload: {
        ...currentData,
        name,
      },
    });
  };

  useEffect(() => {
    console.info("*** FORM STATE ***", { state });
  }, [state]);

  return (
    <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div className="grid grid-cols-12 gap-4">
        <div className="sm:col-span-12 md:col-span-2">
          <FormComponents components={FORM_COMPONENTS} />
        </div>

        <div className="sm:col-span-12 md:col-span-5 border-4 border-dotted border-purple-400">
          <FormOutput fields={state.present} />
        </div>

        <div className="sm:col-span-12 md:col-span-5">
          <h2>config</h2>
        </div>
      </div>
    </DndContext>
  );
}
