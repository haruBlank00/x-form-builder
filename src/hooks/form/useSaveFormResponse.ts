import { xAxsios } from "@/lib/x-axios";
import { useMutation } from "@tanstack/react-query";

export const useSaveFormResponse = () => {
  const mutation = useMutation({
    mutationKey: ["saveForm"],
    mutationFn: async ({ formId, data }: { formId: string; data: any }) => {
      console.log({ formId, data });
      return await xAxsios.post(`/form/${formId}/submit`, data);
    },
  });

  return {
    saveFormResponse: mutation.mutateAsync,
    isSaving: mutation.isPending,
    mutation,
  };
};
