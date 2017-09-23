
import { GameBoardLocation } from "../../common/game-board-actions";

export enum PlayerUiActionType {
    Build = "player-ui/build",
    Produce = "player-ui/produce"
}

export interface PlayerUiBuildAction {
    type: PlayerUiActionType.Build;
    location: GameBoardLocation;
}

export interface PlayerUiProduceAction {
    type: PlayerUiActionType.Produce;
    location: GameBoardLocation;
}

export type PlayerUiAction = PlayerUiBuildAction | PlayerUiProduceAction;

export function build(location: GameBoardLocation) {
    return { type: PlayerUiActionType.Build, location };
}

export function produce(location: GameBoardLocation) {
    return { type: PlayerUiActionType.Produce, location };
}
