
import {getMarketPrice} from "./market-state";
import { PlayerActionType, onPlayerProduced, PlayerAction } from "./player-actions";
import { getLandTileAtLocation, isLandTileActive } from "./board-state";

/**
 * The player middleware is chiefly concerned with validating actions the
 * player is trying to take, before dispatching those actions as events
 * which update the game state.
 */
export default function createPlayerMiddleware({
	gameBoardStateSelector
}) {
	return store => next => (action: PlayerAction) => {
		switch ( action.type ) {
			case PlayerActionType.Produce: {
				const {location, productionRule} = action;
				const state = store.getState();
                const gameBoardState = gameBoardStateSelector(state);
                const landTile = getLandTileAtLocation(location, gameBoardState);

                // Firstly, the location must be active (not produced already in this turn).
                // Also terrain type must match the production rule.
                if (!isLandTileActive(landTile) || landTile.terrainType !== productionRule.terrainType) {
                    return;
                }

                // TODO: The player must have a card with the production rule they are trying to use

				
                next(action);
				return next(onPlayerProduced(location, productionRule))
			}
		}

		return next(action);
	}
}
