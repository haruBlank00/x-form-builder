import { useGetSubmittedForms } from "@/hooks/form/useGetSubmittedForms";
import { useParams } from "react-router";

export const TabSubmitted = () => {
  const { formId } = useParams() as { formId: string };

  const { submittedForms = [] } = useGetSubmittedForms(formId);

  const isEmpty = submittedForms.length === 0;
  console.log({ submittedForms, isEmpty });
  return (
    <div>
      <h1>Submitted</h1>
      {submittedForms.map((form: any) => {
        return (
          <pre key={form.formId} className="border border-red-500 my-2">
            {JSON.stringify(form, null, 2)}
          </pre>
        );
      })}
    </div>
  );
};
