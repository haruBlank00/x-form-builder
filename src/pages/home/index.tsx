import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function HomePage() {
  return (
    <div>
      <h1>Home sweet home.</h1>
      <p>Now go build something great.</p>
      <p>Starting with a form </p>
      <Button asChild>
        <Link to="/dashboard">Lets gooo</Link>
      </Button>
    </div>
  );
}
