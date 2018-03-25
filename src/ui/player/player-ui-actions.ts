
import { GameBoardLocation } from "../../common/game-board-actions";
import { Action } from "redux";

export enum PlayerUiActionType {
    WrappedAction = "player-ui/wrapped-action",
    Build = "player-ui/build",
    Produce = "player-ui/produce",
    Cancel = "player-ui/cancel"
}

export interface PlayerUiWrappedAction {
    type: PlayerUiActionType.WrappedAction;
    action: Action;
}

export interface PlayerUiBuildAction {
    type: PlayerUiActionType.Build;
    location: GameBoardLocation;
}

export interface PlayerUiProduceAction {
    type: PlayerUiActionType.Produce;
    location: GameBoardLocation;
}

export type PlayerUiAction = PlayerUiWrappedAction | PlayerUiBuildAction | PlayerUiProduceAction | { type: PlayerUiActionType.Cancel };

export function wrapAction(action: Action): PlayerUiWrappedAction {
    return { type: PlayerUiActionType.WrappedAction, action };
}

export function build(location: GameBoardLocation) {
    return { type: PlayerUiActionType.Build, location };
}

export function produce(location: GameBoardLocation) {
    return { type: PlayerUiActionType.Produce, location };
}

export function cancel() {
    return { type: PlayerUiActionType.Cancel }
}
