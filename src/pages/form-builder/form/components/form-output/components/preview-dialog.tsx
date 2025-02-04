import { XFieldsGenerator } from "@/components/form-builder/x-fields-generator";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { generateDefaultNResolver } from "@/lib/generate_default_&_resolver";
import { Field } from "@/types";
import { Eye } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const PreviewDialog = (props: { fields: Field[] }) => {
  const { defaultValues, resolver } = generateDefaultNResolver(props.fields);
  console.log({ defaultValues, resolver });
  const form = useForm({
    defaultValues,
    resolver,
  });

  const onSubmit = (data) => {
    toast.success("Form submitted successfully");
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button type="button" onClick={() => console.log("clicked")}>
          <Eye /> Preview
        </Button>
        ;
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Your form Preview</DialogTitle>
        </DialogHeader>

        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <XFieldsGenerator form={form} fields={props.fields} mode="view" />
              <Button type="submit">Save</Button>
              <Button type="reset">Reset</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
