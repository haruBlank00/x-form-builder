import { XFieldsGenerator } from "@/components/form-builder/x-fields-generator";
import { Droppable } from "@/components/ui/droppable";
import { Form } from "@/components/ui/form";
import { XIf } from "@/components/ui/x-if";
import { XTooltip } from "@/components/ui/x-tooltip";
import { Redo2, Undo2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { FormReducerAction } from "../../form-reducer";

type Props = {
  setSelectedFieldId: Dispatch<SetStateAction<string>>;
  fields: any[];
  dispatch: Dispatch<FormReducerAction>;
};
export const FormOutput = (props: Props) => {
  const { fields, setSelectedFieldId, dispatch } = props;
  const form = useForm();

  const isNotEmpty = fields.length > 0;

  const onFieldClick = (fieldId: string) => {
    setSelectedFieldId(fieldId);
  };

  const onUndo = () => {
    dispatch({ type: "UNDO" });
  };

  const onRedo = () => {
    dispatch({ type: "REDO" });
  };

  return (
    <Droppable id="form-output">
      <div className="p-4">
        <XIf condition={isNotEmpty}>
          <div className="flex justify-end gap-2">
            <XTooltip title="Undo">
              <Undo2 onClick={onUndo} />
            </XTooltip>

            <XTooltip title="Redo">
              <Redo2 onClick={onRedo} />
            </XTooltip>
          </div>
        </XIf>

        <Form {...form}>
          <div className="space-y-4">
            <XFieldsGenerator
              fields={fields}
              mode="edit"
              form={form}
              onFieldClick={onFieldClick}
            />
          </div>
        </Form>
      </div>
    </Droppable>
  );
};
