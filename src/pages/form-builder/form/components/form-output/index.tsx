import { XFieldsGenerator } from "@/components/form-builder/x-fields-generator";
import { Droppable } from "@/components/ui/droppable";
import { Form } from "@/components/ui/form";
import { XIf } from "@/components/ui/x-if";
import { XTooltip } from "@/components/ui/x-tooltip";
import { Eye, Paperclip, Redo2, SaveIcon, Undo2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { FormReducerAction } from "../../form-reducer";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useSaveForm } from "@/hooks/form/useSaveForm";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { Field } from "@/types";
import { PreviewDialog } from "./components/preview-dialog";

type Props = {
  setSelectedFieldId: Dispatch<SetStateAction<string>>;
  fields: Field[];
  dispatch: Dispatch<FormReducerAction>;
};
export const FormOutput = (props: Props) => {
  const { fields, setSelectedFieldId, dispatch } = props;
  const form = useForm();
  const { saveForm, isSaving } = useSaveForm();
  const navigate = useNavigate();

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

  const onSaveForm = () => {
    saveForm(fields, {
      onError: (error) => {
        console.log({ error });
        toast.error(error.message);
      },

      onSuccess: (responseData) => {
        const { data, message } = responseData;
        console.log({ data, message, responseData });
        toast.success(message);
        navigate(`/form-builder/form/${data?.id}`);
      },
    });
  };

  const onPreview = () => {};

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
          <div className="flex flex-col">
            <div className="space-y-4">
              <XFieldsGenerator
                fields={fields}
                mode="edit"
                form={form}
                onFieldClick={onFieldClick}
              />
            </div>

            <XIf condition={isNotEmpty}>
              <Separator className="" />
              <div>
                <Button disabled={isSaving} type="button" onClick={onSaveForm}>
                  <SaveIcon />
                  Save
                </Button>

                <Button>
                  <Paperclip /> Save as draft
                </Button>

                <PreviewDialog fields={fields} />
              </div>
            </XIf>
          </div>
        </Form>
      </div>
    </Droppable>
  );
};
