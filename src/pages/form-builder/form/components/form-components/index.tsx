import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Draggable } from "@/components/ui/draggable";
import { Input } from "@/components/ui/input";
import { FieldOption } from "@/types";

type FormFieldOptionsProps = {
  fields: FieldOption[];
};

export const FormFieldOptions = ({ fields }: FormFieldOptionsProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl">Components</h2>
      <div>
        <Input placeholder="search components" />
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((component) => (
          <FormFieldOption key={component.id} {...component} />
        ))}
      </div>
    </div>
  );
};

const FormFieldOption = (props: FieldOption) => {
  const { Icon, ...rest } = props;

  return (
    <Draggable id={props.id} data={rest}>
      <Card className="cursor-pointer hover:bg-slate-100">
        <CardHeader>
          <Icon size={24} />
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <h3 className="text-xl">{props.label}</h3>
        </CardContent>
      </Card>
    </Draggable>
  );
};
