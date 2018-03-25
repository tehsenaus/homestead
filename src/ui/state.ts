import { combineReducers, compose } from 'redux';
import { default as playerUiReducer, PlayerUiState } from './player/player-ui-state';
import * as gs from "../common/game-state";

export interface UiState {
	game: gs.GameState;
	playerUi: PlayerUiState;
}

export const getGameState = ({game}: UiState) => game;
export const getPlayerUiState = ({playerUi}) => playerUi;

export const getMarketsState = compose(gs.getMarketsState, getGameState);
export const getPlayerState = compose(gs.getPlayersState, getGameState);
export const getGameBoardState = compose(gs.getGameBoardState, getGameState);
export const gameBoardStateSelector = getGameBoardState;

export default combineReducers({
	game: gs.gameReducer,
	playerUi: playerUiReducer,
});
