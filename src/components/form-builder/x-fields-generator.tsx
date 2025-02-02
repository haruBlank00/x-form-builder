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
import { SortableItem } from "../ui/sortable-items";
import { Field } from "@/types";

type FieldGeneratorProps = {
  field: Field;

  form: UseFormReturn<any>;
  mode: "edit" | "view";
  onFieldClick?: (fieldId: string) => void;
};

const inputTypes = ["text", "email", "number"];

const FieldGenerator = (props: FieldGeneratorProps) => {
  const { form, field: formField, mode, onFieldClick } = props;
  const { type, name } = formField;
  const control = form.control;

  const isEditMode = mode === "edit";

  return (
    <FormField
      key={name}
      control={control}
      name={name}
      render={({ field }) => {
        if (type === "checkbox") {
          return (
            <FormItem className="flex gap-4">
              <FormLabel className="flex-1" htmlFor={name}>
                {formField.label}
              </FormLabel>
              <FormControl>
                <Input {...field} type={type} id={name} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          );
        }

        if (inputTypes.includes(type)) {
          console.log({ field });
          const toRender = (
            <FormItem>
              <FormLabel className="flex gap-2">
                {formField.label}
                {formField.required && <span className="text-red-500">*</span>}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type={type}
                  placeholder={formField.placeholder}
                  required={formField.required}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          );

          if (isEditMode) {
            return (
              <SortableItem
                id={formField.name}
                onClick={onFieldClick || (() => {})}
              >
                {toRender}
              </SortableItem>
            );
          }

          return toRender;
        }

        return <></>;
      }}
    />
  );
};

type XFieldsGeneratorProps = {
  fields: (Field & { name: string })[];
  form: UseFormReturn<any>;
  mode: "edit" | "view";
  onFieldClick?: (fieldId: string) => void;
};

export const XFieldsGenerator = (props: XFieldsGeneratorProps) => {
  const { fields, form, mode, onFieldClick } = props;

  return (
    <>
      <DevTool control={form.control} />
      {fields.map((field) => (
        <FieldGenerator
          key={field.name}
          field={field}
          form={form}
          mode={mode}
          onFieldClick={onFieldClick}
        />
      ))}
    </>
  );
};
