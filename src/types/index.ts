import { AxiosResponse } from "axios";
import { LucideIcon } from "lucide-react";

export type InputTypes = "email" | "password" | "text" | "number";

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

type NumberField = {
  id: string;
  type: "number";
  label: string;
  placeholder: string;
  required: boolean;
  name: string;
};

type EmailField = {
  id: string;
  type: "email";
  label: string;
  placeholder: string;
  required: boolean;
  name: string;
};

type PasswordField = {
  id: string;
  type: "password";
  label: string;
  placeholder: string;
  required: boolean;
  name: string;
};

export type Field =
  | InputField
  | SelectField
  | CheckboxField
  | NumberField
  | EmailField
  | PasswordField;

export type FieldConfig = Field & {
  for: "label" | "placeholder" | "required";
};

export type SaveFormData = Field[];
/*
 * Success response type which our api will return
 */
export type SuccessResponse<T> = {
  data: T;
  error: null;
  message: string;
};

/*
 * Error response type which our api will return
 */
export type ErrorResponse = {
  data: null;
  error: string; //lets keep it simple
  message: string;
};
