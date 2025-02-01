import { XFieldsGenerator } from "@/components/form-builder/x-fields-generator";
import { Droppable } from "@/components/ui/droppable";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

export const FormOutput = ({ fields }: { fields: any }) => {
  const form = useForm();

  return (
    <Droppable id="form-output">
      <Form {...form}>
        <XFieldsGenerator fields={fields} mode="edit" form={form} />
      </Form>
    </Droppable>
  );
};
