import { makeID } from "@/lib/utils";
import { Field, FieldOption } from "@/types";
import { Pencil, Hash, AtSign } from "lucide-react";

export const FORM_FIELD_OPTIONS: FieldOption[] = [
  {
    id: makeID(),
    Icon: Pencil,

    label: "Text",
    type: "text",
  },
  {
    id: makeID(),
    Icon: AtSign,

    label: "Email",
    type: "email",
  },
  {
    id: makeID(),
    label: "Number",
    type: "number",
    Icon: Hash,
  },
];

export const INPUT_FIELD_CONFIGS: Field[] = [
  {
    id: makeID(),
    type: "text",
    label: "Label",
    placeholder: "Enter your field label",
    required: true,
    name: "label",
  },
  {
    id: makeID(),
    type: "text",
    label: "Placeholder",
    placeholder: "Enter your field placeholder",
    required: true,
    name: "placeholder",
  },
  {
    id: makeID(),
    type: "checkbox",
    label: "Is this field required?",
    required: true,
    name: "required",
  },
];
