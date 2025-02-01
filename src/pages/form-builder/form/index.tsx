import { FORM_FIELD_OPTIONS } from "@/data/form-field-options";
import { FormFieldOptions } from "./components/form-components";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { FormOutput } from "./components/form-output";
import { useEffect, useReducer } from "react";
import { formReducer, initialState } from "./form-reducer";
import { makeID } from "@/lib/utils";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export default function FormPage() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const onDragEnd = (e: DragEndEvent) => {
    const currentData = e.active?.data.current!;

    // we will need unique name for each field so let's add it here :)
    const name = `${currentData.type}-${makeID()}`;

    const payload = {
      ...currentData,
      name,
    };

    console.log("*** PAYLOAD ***", { payload });

    dispatch({
      type: "ADD_FIELD",
      payload,
    });
  };

  const onSortEnd = (e: DragEndEvent) => {
    const activeId = e.active.id;
    const overId = e.over?.id;
    console.log({ activeId, overId });

    if (!overId) return;

    if (activeId !== overId) {
      dispatch({
        type: "SORT_FIELD",
        payload: {
          activeId,
          overId,
        },
      });
    }
  };

  useEffect(() => {
    console.info("*** FORM STATE ***", { state });
  }, [state]);

  return (
    <DndContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-12 gap-4">
        <div className="sm:col-span-12 md:col-span-2">
          <FormFieldOptions fields={FORM_FIELD_OPTIONS} />
        </div>

        <div className="sm:col-span-12 md:col-span-5 border-4 border-dotted border-purple-400">
          <DndContext onDragEnd={onSortEnd}>
            <SortableContext
              items={state.present}
              strategy={verticalListSortingStrategy}
            >
              <FormOutput fields={state.present} />
            </SortableContext>
          </DndContext>
        </div>

        <div className="sm:col-span-12 md:col-span-5">
          <h2>config</h2>
        </div>
      </div>
    </DndContext>
  );
}
