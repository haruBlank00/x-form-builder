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
import { FormTabs } from "./components/form-tabs";

export default function FormPage() {
  return <FormTabs />;
}
