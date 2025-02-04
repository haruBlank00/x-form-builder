import { xAxsios } from "@/lib/x-axios";
import { ErrorResponse, SaveFormData, SuccessResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useSaveForm = () => {
  const mutation = useMutation<
    SuccessResponse<SaveFormData & { id: string }>,
    ErrorResponse,
    SaveFormData
  >({
    mutationKey: ["saveForm"],
    mutationFn: async (data) =>
      (
        await xAxsios.post<SuccessResponse<SaveFormData & { id: string }>>(
          "/form-builder/form",
          data,
        )
      ).data,
  });

  return {
    saveForm: mutation.mutateAsync,
    isSaving: mutation.isPending,
    mutation,
  };
};
