import { FORM_COMPONENTS } from "@/data/form-components";
import { FormComponents } from "./components/form-components";

export default function FormPage() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="sm:col-span-12 md:col-span-2">
        <FormComponents components={FORM_COMPONENTS} />
      </div>

      <div className="sm:col-span-12 md:col-span-5">
        <h2>form</h2>
      </div>

      <div className="sm:col-span-12 md:col-span-5">
        <h2>config</h2>
      </div>
    </div>
  );
}
