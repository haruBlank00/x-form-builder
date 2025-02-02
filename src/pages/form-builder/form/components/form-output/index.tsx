import { XFieldsGenerator } from "@/components/form-builder/x-fields-generator";
import { Droppable } from "@/components/ui/droppable";
import { Form } from "@/components/ui/form";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

type Props = {
  setSelectedFieldId: Dispatch<SetStateAction<string>>;
  fields: any[];
};
export const FormOutput = (props: Props) => {
  const { fields, setSelectedFieldId } = props;
  const form = useForm();

  const onFieldClick = (fieldId: string) => {
    setSelectedFieldId(fieldId);
  };
  console.log({ fields }, "for output");

  return (
    <Droppable id="form-output">
      <Form {...form}>
        <XFieldsGenerator
          fields={fields}
          mode="edit"
          form={form}
          onFieldClick={onFieldClick}
        />
      </Form>
    </Droppable>
  );
};
