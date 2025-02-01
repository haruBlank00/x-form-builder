import { makeID } from "@/lib/utils";
import { Field } from "@/pages/form-builder/form/components/form-components";
import { Pencil, Calendar, Hash, Phone, AtSign, List } from "lucide-react";

export const FORM_FIELD_OPTIONS: Field[] = [
  {
    id: makeID(),
    Icon: Pencil,

    label: "Text",
    type: "text",
    placeholder: "anything goes here...",
  },
  {
    id: makeID(),
    Icon: AtSign,

    label: "Email",
    type: "email",
    placeholder: "johndoe@xcenter.com",
  },
  //{
  //  id: makeID(),
  //  label: "Date",
  //  type: "date",
  //  Icon: Calendar,
  //},
  {
    id: makeID(),
    label: "Number",
    type: "number",
    Icon: Hash,
    placeholder: "1111",
  },
  //{
  //  id: makeID(),
  //  label: "Phone Number",
  //  type: "tel",
  //  Icon: Phone,
  //},
  //{
  //  id: makeID(),
  //  label: "Select",
  //  type: "select",
  //  Icon: List,
  //  options: ["Option 1", "Option 2", "Option 3"], // Example options for the select field
  //},
];
