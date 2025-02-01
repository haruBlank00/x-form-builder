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
import { Field } from "@/pages/form-builder/form/components/form-components";
import { SortableItem } from "../ui/sortable-items";

type FieldGeneratorProps = {
  field: {
    name: string;
  } & Field;

  form: UseFormReturn<any>;
  mode: "edit" | "view";
};

const FieldGenerator = (props: FieldGeneratorProps) => {
  const { form, field: formField, mode } = props;
  const { type, name } = formField;
  const control = form.control;

  const isEditMode = mode === "edit";

  return (
    <FormField
      key={name}
      control={control}
      name={name}
      render={({ field }) => {
        if (["text", "email", "number"].includes(type)) {
          const toRender = (
            <FormItem>
              <FormLabel>{formField.label}</FormLabel>
              <FormControl>
                <Input {...field} type={type} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          );

          if (isEditMode) {
            return <SortableItem id={formField.name}>{toRender}</SortableItem>;
          }

          return toRender;
        }

        return <></>;
      }}
    />
  );
};

export const XFieldsGenerator = (props: {
  fields: (Field & { name: string })[];
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
