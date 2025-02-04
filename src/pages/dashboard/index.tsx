import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Start building your app with XFormBuilder</p>
      <p>Form insights and metrics here</p>

      <Button asChild>
        <Link to="/form-builder/form/create">Lets build form</Link>
      </Button>
    </div>
  );
}
