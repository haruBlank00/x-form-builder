import { xAxsios } from "@/lib/x-axios";
import { useQuery } from "@tanstack/react-query";

export const useGetSubmittedForms = (formId: string) => {
  const { data, isLoading } = useQuery<any>({
    queryKey: ["getSubmittedForms", formId],
    queryFn: async () => {
      const { data } = await xAxsios.get(`/form/${formId}`);
      return data;
    },
  });

  return {
    isGettingSubmittedForms: isLoading,
    submittedForms: data,
  };
};
