

import { PlayerUiAction, PlayerUiActionType } from "./player-ui-actions";
import { PlayerState } from "../../common/player-state";
import { GameBoardActionType } from "../../common/game-board-actions";

export interface PlayerUiState {
    currentPlayer: string;
    currentPlayerAction?: PlayerUiAction;
}

export const INITIAL_STATE = {
    currentPlayer: "me"
};

export function isBuilding(state: PlayerUiState) {
    return state.currentPlayerAction && state.currentPlayerAction.type === PlayerUiActionType.Build;
}

export function getCardsForBuilding(state: PlayerUiState, playerState: PlayerState) {
    return playerState.industryCards;
}

export function isProducing(state: PlayerUiState) {
    return state.currentPlayerAction && state.currentPlayerAction.type === PlayerUiActionType.Produce;
}

export function getCardsForProduction(state: PlayerUiState, playerState: PlayerState) {
    return playerState.industryCards;
}

export function getPlayerActionLocation(state: PlayerUiState) {
    if ( state.currentPlayerAction ) switch ( state.currentPlayerAction.type ) {
        case PlayerUiActionType.Build:
        case PlayerUiActionType.Produce:
            return state.currentPlayerAction.location;
    }
}

export default function playerUiStateReducer(state: PlayerUiState = INITIAL_STATE, action) {
    switch ( action.type ) {
        case PlayerUiActionType.Build:
            return {
                ...state,
                currentPlayerAction: action
            }
        
        case GameBoardActionType.Build:
            return {
                ...state,
                currentPlayerAction: undefined
            }
    }

    return state;
}
