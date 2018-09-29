import { Reducer } from "redux";
import { action, ActionType } from "typesafe-actions";

const enum DoorActionType {
  DOOR_OPENED = "DOOR_OPENED",
  DOOR_CLOSED = "DOOR_CLOSED"
}

export const actions = {
  doorClosed: () => action(DoorActionType.DOOR_CLOSED),
  doorOpened: () => action(DoorActionType.DOOR_OPENED)
};

type DoorAction = ActionType<typeof actions>;

export interface DoorState {
  openSince: Date | undefined;
}

const initialState: DoorState = {
  openSince: undefined
};

export const doorReducer: Reducer<DoorState> = (state = initialState, action: DoorAction) => {
  switch (action.type) {
    case DoorActionType.DOOR_OPENED:
      return { openSince: new Date() };
    case DoorActionType.DOOR_CLOSED:
      return initialState;
  }
  return state;
};
