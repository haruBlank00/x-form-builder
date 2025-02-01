import { swapArrayElements } from "@/lib/utils";
import { UniqueIdentifier } from "@dnd-kit/core";
import { produce } from "immer";

export const initialState = {
  past: [],
  present: [],
  future: [],
};

type AddAction = {
  type: "ADD_FIELD";
  payload: any;
};

type SortAction = {
  type: "SORT_FIELD";
  payload: {
    activeId: UniqueIdentifier;
    overId: UniqueIdentifier;
  };
};

type Action = AddAction | SortAction;

type State = {
  past: any[];
  present: any[];
  future: any[];
};

export const formReducer = (state: State, action: Action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case "ADD_FIELD":
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
        console.log({ activeIndex, overIndex });

        draft.present = swapArrayElements(
          draft.present,
          activeIndex,
          overIndex,
        );
        break;

      //case "UPDATE_FIELD":
      //  draft.past.push(draft.present);
      //  const index = draft.present.findIndex(
      //    (field) => field.id === action.payload.id,
      //  );
      //  if (index !== -1) {
      //    draft.present[index] = { ...draft.present[index], ...action.payload };
      //  }
      //  draft.future = [];
      //  break;
      //
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
