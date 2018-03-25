

import { PlayerUiAction, PlayerUiActionType } from "./player-ui-actions";
import { PlayerState } from "../../common/player-state";
import { GameBoardActionType } from "../../common/game-board-actions";
import { GameBoardState, getLandTileAtLocation } from "../../common/board-state";
import { PlayerEventType, PlayerAction } from "../../common/player-actions";
import { createSelector } from 'reselect';
import { GameState, default as gameReducer } from "../../common/game-state";

/**
 * Tracks the intermediate state of some player actions which require
 * additional UI input.
 */
export interface PlayerUiState {
    currentPlayer: string;
    currentPlayerAction?: PlayerUiAction;

    actionsRemaining: number;
    playerActions: PlayerAction [];
}

export const INITIAL_STATE: PlayerUiState = {
    currentPlayer: "me",
    actionsRemaining: 2,
    playerActions: [],
};

export const getGameStateAfterPlayerActions = createSelector(
    (state: PlayerUiState) => state.playerActions,
    (state: PlayerUiState, initialGameState: GameState) => initialGameState, 
    (playerActions: PlayerAction [], initialGameState: GameState) => {
        return playerActions.reduce(gameReducer, initialGameState);
    }
);

export function isBuilding(state: PlayerUiState) {
    return state.currentPlayerAction && state.currentPlayerAction.type === PlayerUiActionType.Build;
}

export function getCardsForBuilding(state: PlayerUiState, playerState: PlayerState) {
    return playerState.industryCards;
}

export function isProducing(state: PlayerUiState) {
    return state.currentPlayerAction && state.currentPlayerAction.type === PlayerUiActionType.Produce;
}

export function getCardsForProduction(state: PlayerUiState, playerState: PlayerState, gameBoardState: GameBoardState) {
    if ( state.currentPlayerAction && state.currentPlayerAction.type === PlayerUiActionType.Produce) {
        const {terrainType} = getLandTileAtLocation(state.currentPlayerAction.location, gameBoardState);
        return {
            cards: playerState.industryCards,
            terrainType
        }
    }
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
        case PlayerUiActionType.Produce:
            return {
                ...state,
                currentPlayerAction: action
            }
        
        case GameBoardActionType.Build:
        case PlayerEventType.Produced:
        case PlayerUiActionType.Cancel:
            return {
                ...state,
                currentPlayerAction: undefined
            }
    }

    return state;
}
