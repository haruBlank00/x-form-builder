import { swapArrayElements } from "@/lib/utils";
import { Field } from "@/types";
import { UniqueIdentifier } from "@dnd-kit/core";
import { produce } from "immer";

export const initialState = {
  past: [] as Field[][],
  present: [] as Field[],
  future: [] as Field[][],
};

type AddAction = {
  type: "ADD_FIELD";
  payload: Field;
};

type SortAction = {
  type: "SORT_FIELD";
  payload: {
    activeId: UniqueIdentifier;
    overId: UniqueIdentifier;
  };
};

type UpdateAction = {
  type: "UPDATE_FIELD";
  payload: Field;
};

type DeleteAction = {
  type: "DELETE_FIELD";
  payload: {
    fieldId: string;
  };
};

type SetFieldsAction = {
  type: "SET_FIELDS";
  payload: Field[];
};

type UndoAction = { type: "UNDO" };
type RedoAction = { type: "REDO" };

export type FormReducerAction =
  | AddAction
  | SortAction
  | UpdateAction
  | DeleteAction
  | SetFieldsAction
  | UndoAction
  | RedoAction;

type State = {
  past: Field[][];
  present: Field[];
  future: Field[][];
};

export const formReducer = (state: State, action: FormReducerAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case "ADD_FIELD": {
        draft.past.push([...draft.present]); // Save current state to past
        draft.present.push(action.payload); // Add new field
        draft.future = []; // Clear future for valid redo
        break;
      }

      case "SORT_FIELD": {
        const { activeId, overId } = action.payload;
        const activeIndex = draft.present.findIndex(
          (field) => field.name === activeId,
        );
        const overIndex = draft.present.findIndex(
          (field) => field.name === overId,
        );

        if (activeIndex !== -1 && overIndex !== -1) {
          draft.past.push([...draft.present]); // Save current state to past
          draft.present = swapArrayElements(
            draft.present,
            activeIndex,
            overIndex,
          );
          draft.future = []; // Clear future after sorting
        }
        break;
      }

      case "UPDATE_FIELD": {
        const index = draft.present.findIndex(
          (field) => field.name === action.payload.name,
        );

        if (index !== -1) {
          draft.past.push([...draft.present]); // Save current state to past
          draft.present[index] = {
            ...draft.present[index],
            ...action.payload,
          };
          draft.future = []; // Clear future after update
        }
        break;
      }

      case "DELETE_FIELD": {
        const index = draft.present.findIndex(
          (field) => field.name === action.payload.fieldId,
        );

        if (index !== -1) {
          draft.past.push([...draft.present]); // Save current state to past
          draft.present = draft.present.filter((_, i) => i !== index);
          draft.future = []; // Clear future after deletion
        }
        break;
      }

      case "SET_FIELDS": {
        draft.present = action.payload;
        break;
      }

      case "UNDO": {
        if (draft.past.length > 0) {
          const previous = draft.past.pop()!; // Get the last state from past
          draft.future.unshift([...draft.present]); // Move current state to future
          draft.present = previous; // Revert to the previous state
        }
        break;
      }

      case "REDO": {
        if (draft.future.length > 0) {
          const next = draft.future.shift()!; // Get the next state from future
          draft.past.push([...draft.present]); // Move current state to past
          draft.present = next; // Apply the next state
        }
        break;
      }

      default:
        break;
    }
  });
