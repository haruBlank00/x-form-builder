//@ts-nocheck
import { useGetForm } from "@/hooks/form/useGetForm";
import { generateDefaultNResolver } from "@/lib/generate_default_&_resolver";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { Form } from "@/components/ui/form";
import { XFieldsGenerator } from "@/components/form-builder/x-fields-generator";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useSaveFormResponse } from "@/hooks/form/useSaveFormResponse";

export const UserForm = () => {
  const params = useParams() as { formId: string };

  const { form: formData } = useGetForm(params.formId);
  const { saveFormResponse } = useSaveFormResponse();

  const { defaultValues, resolver } = generateDefaultNResolver(
    formData?.data.fields,
  );

  const form = useForm({
    defaultValues,
    resolver,
  });

  const onSubmit = (data) => {
    const payload = {
      formId: params.formId,
      data,
    };

    saveFormResponse(payload, {
      onSuccess: () => {
        toast.success("Form saved successfully");
      },
      onError: () => {
        toast.error("Failed to save form");
      },
    });
  };

  return (
    <div className="container mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <h1 className="text-3xl mb-4">Form</h1>
          <XFieldsGenerator form={form} fields={formData?.data.fields || []} />
          <Button>Save</Button>
        </form>
      </Form>
    </div>
  );
};
