import { FORM_FIELD_OPTIONS } from "@/data/form-field-options";
import { FormFieldOptions } from "./components/form-components";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { FormOutput } from "./components/form-output";
import { useEffect, useMemo, useReducer, useState } from "react";
import { formReducer, initialState } from "./form-reducer";
import { makeID } from "@/lib/utils";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Field, FieldOption } from "@/types";
import { FormConfig } from "./components/form-config";
import { useParams } from "react-router";
import { useGetForm } from "@/hooks/form/useGetForm";

export default function FormPage() {
  const params = useParams() as { formId: string };
  const isEditPage = params?.formId !== "create";

  const { form } = useGetForm(params.formId, isEditPage);

  const [state, dispatch] = useReducer(formReducer, initialState);

  const [selectedFieldId, setSelectedFieldId] = useState("");

  const onDragEnd = (e: DragEndEvent) => {
    const { type } = e.active?.data.current! as FieldOption;

    // we will need unique name for each field so let's add it here :)
    const name = `${type}__${makeID()}`;

    const payload = {
      name,
      type,
      label: "Customize your label",
      placeholder: "Customize your placeholder",
      required: false,
    } as Field;

    setSelectedFieldId(name);

    dispatch({
      type: "ADD_FIELD",
      payload,
    });
  };

  const onSortEnd = (e: DragEndEvent) => {
    const activeId = e.active.id;
    const overId = e.over?.id;

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
    console.info("*** SELECTED FIELD ID ***", { selectedFieldId });
  }, [state]);

  useEffect(() => {
    const fields = form?.data.fields || [];

    console.log(fields, "fields ishere");

    if (fields) {
      dispatch({
        type: "SET_FIELDS",
        payload: fields || [],
      });
    }
  }, [form?.data]);

  const selectedField: Field | undefined = useMemo(() => {
    const field = state.present.find(
      (field: Field) => field.name === selectedFieldId,
    );

    return field;
  }, [selectedFieldId]);

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
              <FormOutput
                fields={state.present}
                setSelectedFieldId={setSelectedFieldId}
                dispatch={dispatch}
              />
            </SortableContext>
          </DndContext>
        </div>

        <div className="sm:col-span-12 md:col-span-5">
          <FormConfig
            selectedField={selectedField}
            setSelectedFieldId={setSelectedFieldId}
            dispatch={dispatch}
            presentState={state.present}
          />
        </div>
      </div>
    </DndContext>
  );
}
