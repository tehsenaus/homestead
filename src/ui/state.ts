
import {combineReducers} from "redux"
import {default as marketsReducer} from "../common/market-state";
import {default as playersReducer} from "../common/player-state";
import {default as gameBoardReducer} from "../common/board-state";

export const getMarketsState = ({markets}) => markets;
export const getPlayerState = ({players}) => players;
export const getGameBoardState = ({gameBoard}) => gameBoard;

export default combineReducers({
	markets: marketsReducer,
	players: playersReducer,
	gameBoard: gameBoardReducer
});
