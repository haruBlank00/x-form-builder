import { LucideIcon } from "lucide-react";

export type InputTypes = "email" | "password" | "text" | "number" | "textarea";

export type FieldOption = {
  id: string;
  label?: string;
  type: InputTypes;
  Icon: LucideIcon;
};

type InputField = {
  id: string;
  type: "text";
  label: string;
  placeholder: string;
  required: boolean;
  name: string;
};

type SelectField = {
  id: string;
  type: "select";
  label: string;
  placeholder: string;
  required: boolean;
  name: string;
  options: {
    label: string;
    value: string;
  }[];
};

type CheckboxField = {
  id: string;
  type: "checkbox";
  label: string;
  required: boolean;
  name: string;
};

export type Field = InputField | SelectField | CheckboxField;

export type FieldConfig = Field & {
  for: "label" | "placeholder" | "required";
};
