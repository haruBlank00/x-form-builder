import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function FormBuilderPage() {
  return (
    <div>
      <Button asChild>
        <Link to="create">Create Form</Link>
      </Button>
      <div>heyoo</div>
    </div>
  );
}
