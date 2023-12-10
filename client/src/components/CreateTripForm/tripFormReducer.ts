import {
  ETransportType,
  TCreateTripFormValues,
} from "../../types/createTripFormTypes";

export enum ETripFormActionKind {
  INPUT_CHANGE = "INPUT_CHANGE",
  RATING_CHANGE = "RATING_CHANGE",
  SELECT_CHANGE = "SELECT_CHANGE",
}

interface IInputChangeAction {
  type: ETripFormActionKind;
  payload: { name: "title" | "description"; value: string };
}

interface IRatingChangeAction {
  type: ETripFormActionKind;
  payload: { name: "difficulty" | "price"; value: number };
}

interface IRadioChangeAction {
  type: ETripFormActionKind;
  payload: { name: "transportType"; value: ETransportType };
}

export type TActions =
  | IInputChangeAction
  | IRatingChangeAction
  | IRadioChangeAction;

export function tripFormReducer(
  state: TCreateTripFormValues,
  action: TActions,
) {
  const { type, payload } = action;

  switch (type) {
    case ETripFormActionKind.INPUT_CHANGE:
      return { ...state, [payload.name]: payload.value };
    case ETripFormActionKind.RATING_CHANGE:
      return { ...state, [payload.name]: payload.value };
    case ETripFormActionKind.SELECT_CHANGE:
      return { ...state, [payload.name]: payload.value };
    default:
      return state;
  }
}
