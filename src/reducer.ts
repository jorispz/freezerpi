import { Reducer } from "redux";
import { action, ActionType } from "typesafe-actions";

const enum DoorActionType {
  DOOR_OPENED = "DOOR_OPENED",
  DOOR_CLOSED = "DOOR_CLOSED",
  ESCALATE = "ESCALATE"
}

export const actions = {
  doorClosed: () => action(DoorActionType.DOOR_CLOSED),
  doorOpened: () => action(DoorActionType.DOOR_OPENED),
  escalate: () => action(DoorActionType.ESCALATE)
};

type DoorAction = ActionType<typeof actions>;

const enum WarningLevel {
  NONE,
  LOW,
  MEDIUM,
  HIGH
}

export interface DoorState {
  openSince: Date | undefined;
  warningLevel: WarningLevel;
}

const initialState: DoorState = {
  openSince: new Date(2018, 9, 23),
  warningLevel: WarningLevel.NONE
};

export const doorReducer: Reducer<DoorState> = (
  state = initialState,
  action: DoorAction
) => {
  switch (action.type) {
    case DoorActionType.DOOR_OPENED:
      return { openSince: new Date(), warningLevel: WarningLevel.LOW };
    case DoorActionType.DOOR_CLOSED:
      return initialState;
    case DoorActionType.ESCALATE:
      if (state.openSince === undefined) {
        console.log("Can't escalate because door is closed");
        return state;
      } else {
        switch (state.warningLevel) {
          case WarningLevel.NONE:
            return { ...state, warningLevel: WarningLevel.LOW };
          case WarningLevel.LOW:
            return { ...state, warningLevel: WarningLevel.MEDIUM };
          case WarningLevel.MEDIUM:
            return { ...state, warningLevel: WarningLevel.HIGH };
        }
      }
  }
  return state;
};
