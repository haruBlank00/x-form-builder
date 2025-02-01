import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Draggable } from "@/components/ui/draggable";
import { Input } from "@/components/ui/input";
import { LucideIcon } from "lucide-react";

type FormComponentProps = {
  components: Component[];
};

export const FormComponents = ({ components }: FormComponentProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl">Components</h2>
      <div>
        <Input placeholder="search components" />
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
        {components.map((component) => (
          <FormComponent key={component.id} {...component} />
        ))}
      </div>
    </div>
  );
};

export type Component = {
  id: string;
  label: string;
  type: "text" | "email" | "password" | "number" | "textarea";
  Icon: LucideIcon;
};

const FormComponent = (props: Component) => {
  const { label, Icon, id, type } = props;

  return (
    <Draggable id={id} data={{ type, id }}>
      <Card className="cursor-pointer hover:bg-slate-100">
        <CardHeader>
          <Icon size={24} />
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <h3 className="text-xl">{label}</h3>
        </CardContent>
      </Card>
    </Draggable>
  );
};
