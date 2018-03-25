import {combineReducers} from 'redux';
import { default as gameBoardReducer, GameBoardState, getLandTileAtLocation, isLandTileActive } from './board-state';
import { default as marketsReducer, MarketsState, getMarketPrice } from './market-state';
import {default as playersReducer} from './player-state';
import { PlayersState, getPlayerState as _getPlayerState } from "./players-state";
import { GameBoardAction } from "./game-board-actions";
import { MarketAction, MarketActionType, onBoughtOrSold, boughtOrSold } from "./market-actions";
import { PlayerAction, PlayerActionType, onPlayerProduced } from "./player-actions";

export interface GameState {
    markets: MarketsState;
    players: PlayersState;
    gameBoard: GameBoardState;
}

export type GameAction = PlayerAction;

export const getMarketsState = ({markets}: GameState) => markets;
export const getPlayersState = ({players}: GameState) => players;
export const getPlayerState = (playerId: string, state: GameState) => _getPlayerState(playerId, getPlayersState(state));
export const getGameBoardState = ({gameBoard}: GameState) => gameBoard;

export const defaultGameReducer = combineReducers({
	markets: marketsReducer,
	players: playersReducer,
	gameBoard: gameBoardReducer,
});
export const INITIAL_STATE = defaultGameReducer(undefined, { type: '@@INIT' });

/**
 * The main game reducer is chiefly concerned with validating actions the
 * player is trying to take, before dispatching those actions as events
 * which update the game state.
 */
export function gameReducer(state: GameState = INITIAL_STATE, action: GameAction): GameState {
    switch ( action.type ) {
        case MarketActionType.BuyOrSell: {
            // Assign prices depending on the current market state
            const event = boughtOrSold(getMarketsState(state), action);
            const nextState = gameReducer(defaultGameReducer(state, action), event);

            // Check for validitity: if player had enough inventory
            if ( getPlayerState(action.player, state) !== getPlayerState(action.player, nextState) ) {
                return nextState;
            } else {
                return state;
            }
        }

        case PlayerActionType.Produce: {
            const {location, productionRule} = action;
            const gameBoardState = getGameBoardState(state);
            const landTile = getLandTileAtLocation(location, gameBoardState);

            // Firstly, the location must be active (not produced already in this turn).
            // Also terrain type must match the production rule.
            if (!isLandTileActive(landTile) || landTile.terrainType !== productionRule.terrainType) {
                return state;
            }

            // TODO: The player must have a card with the production rule they are trying to use
            // TODO: validate input resources

            const event = onPlayerProduced(location, productionRule);
            const nextState = gameReducer(defaultGameReducer(state, action), event);
            return nextState;
        }
    }

    return defaultGameReducer(state, action);
}

export default gameReducer;
