import { produce } from "immer";

export const initialState = {
  past: [],
  present: [],
  future: [],
};

type ActionType =
  | "ADD_FIELD"
  | "UPDATE_FIELD"
  | "DELETE_FIELD"
  | "UNDO"
  | "REDO"
  | "RESET";

type Action = {
  type: ActionType;
  payload: any;
};

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

      case "UPDATE_FIELD":
        draft.past.push(draft.present);
        const index = draft.present.findIndex(
          (field) => field.id === action.payload.id,
        );
        if (index !== -1) {
          draft.present[index] = { ...draft.present[index], ...action.payload };
        }
        draft.future = [];
        break;

      case "UNDO":
        if (draft.past.length > 0) {
          draft.future.unshift(draft.present);
          draft.present = draft.past.pop()!;
        }
        break;

      case "REDO":
        if (draft.future.length > 0) {
          draft.past.push(draft.present);
          draft.present = draft.future.shift()!;
        }
        break;

      default:
        break;
    }
  });
