import { xAxsios } from "@/lib/x-axios";
import { ErrorResponse, SuccessResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Field } from "react-hook-form";

type Response = SuccessResponse<{
  id: string;
  fields: Field[];
}>;
export const useGetForm = (formId: string, enabled: boolean = true) => {
  const query = useQuery<Response, ErrorResponse>({
    queryKey: ["getForm", formId],
    queryFn: async () => {
      return await xAxsios.get(`/form-builder/form/${formId}`);
    },
    enabled,
  });

  return {
    isGettingForm: query.isLoading,
    form: query.data,
  };
};
