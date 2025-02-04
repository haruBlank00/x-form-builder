import { xAxsios } from "@/lib/x-axios";
import { ErrorResponse, SaveFormData, SuccessResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { Field } from "react-hook-form";

export const useSaveForm = () => {
  const mutation = useMutation<
    SuccessResponse<{
      fields: Field[];
      id: string;
    }>,
    ErrorResponse,
    SaveFormData
  >({
    mutationKey: ["saveForm"],
    mutationFn: async (data) => await xAxsios.post("/form-builder/form", data),
  });

  return {
    saveForm: mutation.mutateAsync,
    isSaving: mutation.isPending,
    mutation,
  };
};
