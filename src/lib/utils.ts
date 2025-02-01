import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { nanoid } from "nanoid";
import { produce } from "immer";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function makeID() {
  return nanoid();
}

export function swapArrayElements<T>(
  array: T[],
  index1: number,
  index2: number,
) {
  return produce(array, (draft) => {
    const temp = draft[index1];
    draft[index1] = draft[index2];
    draft[index2] = temp;
  });
}
