import { makeID } from "@/lib/utils";
import { Component } from "@/pages/form-builder/form/components/form-components";
import { Pencil, Calendar, Hash, Phone, AtSign, List } from "lucide-react";

export const FORM_COMPONENTS: Component[] = [
  {
    id: makeID(),
    label: "Text",
    type: "text",
    Icon: Pencil,
    placeholder: "Enter text",
  },
  {
    id: makeID(),
    label: "Email",
    type: "email",
    Icon: AtSign,
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
