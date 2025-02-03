import { XFieldsGenerator } from "@/components/form-builder/x-fields-generator";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { INPUT_FIELD_CONFIGS } from "@/data/form-field-options";
import { Field } from "@/types";
import { Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormReducerAction } from "../../form-reducer";

type Props = {
  selectedField: Field | undefined;
  dispatch: React.Dispatch<FormReducerAction>;
  presentState: Field[];
  setSelectedFieldId: React.Dispatch<React.SetStateAction<string>>;
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
    form.reset(selectedField);
  }, [selectedField?.name]);

  useEffect(() => {
    if (!selectedField) return;

    const subscription = form.watch((value) => {
      const { label = "", placeholder = "", required = false } = value;

      // TODO: make payload based on field type
      // it will fix type error
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

  const onDelete = () => {
    dispatch({
      type: "DELETE_FIELD",
      payload: {
        fieldId: selectedField!.name,
      },
    });

    props.setSelectedFieldId("");
  };

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

        <Button type="button" onClick={onDelete}>
          <Trash2 /> Remove
        </Button>
      </Form>
    </div>
  );
};
