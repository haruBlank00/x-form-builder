import { UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DevTool } from "@hookform/devtools";

type TInputElField = {
  name: string;
  label: string;
  placeholder: string;
  type: "text" | "email" | "password" | "number" | "textarea";
  required?: boolean;
};

type TSelectField = {
  name: string;
  label: string;
  defaultValue: string;
  type: "select";
  options: { label: string; value: string }[];
  required?: boolean;
};

type TTextArea = {
  name: string;
  label: string;
  placeholder: string;
  type: "textarea";
  required?: boolean;
};

export type Field = TInputElField | TSelectField | TTextArea;

type FieldGeneratorProps = {
  field: Field;
  form: UseFormReturn<any>;
};

const FieldGenerator = (props: FieldGeneratorProps) => {
  const { form, field, mode } = props;
  const { type, name } = field;
  const control = form.control;

  switch (field.type) {
    case "text":
    case "email":
    case "password":
    case "number":
      const { label, placeholder } = props.field as TInputElField;
      return (
        <FormField
          key={name}
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>

              <FormControl>
                <Input {...field} placeholder={placeholder} type={type} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
      );

    case "select":
      return (
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
      );

    default:
      const message = `Field type ${type} not supported`;
      throw new Error(message);
  }
};

export const FieldsGenerator = (props: {
  fields: Field[];
  form: UseFormReturn<any>;
  mode: "edit" | "view";
}) => {
  const { fields, form, mode } = props;

  return (
    <>
      <DevTool control={form.control} />
      {fields.map((field) => (
        <FieldGenerator
          key={field.name}
          field={field}
          form={form}
          mode={mode}
        />
      ))}
    </>
  );
};
