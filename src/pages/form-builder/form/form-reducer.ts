import { swapArrayElements } from "@/lib/utils";
import { Field } from "@/types";
import { UniqueIdentifier } from "@dnd-kit/core";
import { produce } from "immer";

export const initialState = {
  past: [],
  present: [],
  future: [],
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

export type Action = AddAction | SortAction | UpdateAction;

type State = {
  past: Field[];
  present: Field[];
  future: Field[];
};

export const formReducer = (state: State, action: Action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case "ADD_FIELD":
        console.log({ action });
        draft.past.push(draft.present);
        draft.present.push(action.payload);
        draft.future = [];
        break;

      case "SORT_FIELD":
        const { activeId, overId } = action.payload;
        const activeIndex = draft.present.findIndex(
          (field) => field.name === activeId,
        );
        const overIndex = draft.present.findIndex(
          (field) => field.name === overId,
        );

        draft.present = swapArrayElements(
          draft.present,
          activeIndex,
          overIndex,
        );
        break;

      case "UPDATE_FIELD":
        const fieldIndex = draft.present.findIndex((field) => {
          return field.name === action.payload.name;
        });

        draft.present[fieldIndex] = {
          ...draft.present[fieldIndex],
          ...action.payload,
        };
        break;
      //case "UNDO":
      //  if (draft.past.length > 0) {
      //    draft.future.unshift(draft.present);
      //    draft.present = draft.past.pop()!;
      //  }
      //  break;
      //
      //case "REDO":
      //  if (draft.future.length > 0) {
      //    draft.past.push(draft.present);
      //    draft.present = draft.future.shift()!;
      //  }
      //  break;

      default:
        break;
    }
  });
