import { Field } from "@/types";
import { DEFAULT_VALUES, VALIDATORS } from "@/validators";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const generateDefaultNResolver = (fields: Field[]) => {
  const { validators, defaultValues } = fields.reduce<{
    defaultValues: Record<string, any>;
    validators: any;
  }>(
    (acc, field) => {
      //@ts-ignore
      acc.defaultValues[field.name] = DEFAULT_VALUES[field.type] ?? null;

      //@ts-ignore
      acc.validators[field.name] = VALIDATORS[field.type] ?? null;
      return acc;
    },
    {
      defaultValues: {},
      validators: {},
    },
  );

  const zodSchema = z.object(validators);

  const resolver = zodResolver(zodSchema);

  return {
    defaultValues,
    resolver,
  };
};
