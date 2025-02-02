import { XFieldsGenerator } from "@/components/form-builder/x-fields-generator";
import { Form } from "@/components/ui/form";
import { INPUT_FIELD_CONFIGS } from "@/data/form-field-options";
import { Field } from "@/types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type Props = {
  selectedField: Field | undefined;
  dispatch: React.Dispatch<any>;
  presentState: any;
};

export const FormConfig = (props: Props) => {
  const { selectedField, dispatch } = props;
  const form = useForm({
    defaultValues: {
      label: "",
      placeholder: "",
      required: false,
    },
  });

  const noFieldSelected = !selectedField;

  useEffect(() => {
    form.reset();
  }, [selectedField?.name]);

  useEffect(() => {
    if (!selectedField) return;

    const subscription = form.watch((value, { name, type }) => {
      const { label = "", placeholder = "", required = false } = value;

      const payload: Field = {
        ...selectedField,
        label,
        placeholder,
        required,
      };

      dispatch({
        type: "UPDATE_FIELD",
        payload,
      });
    });

    return () => subscription.unsubscribe();
  }, [selectedField, dispatch, form]);

  if (noFieldSelected) {
    return <h1>No field selected</h1>;
  }

  return (
    <div>
      <h2 className="text-xl">Config your field :)</h2>
      <h3 className="text-lg">{`Field type: ${selectedField.type}`}</h3>

      <Form {...form}>
        <XFieldsGenerator
          mode="view"
          form={form}
          fields={INPUT_FIELD_CONFIGS}
        />
      </Form>
    </div>
  );
};
