
import {getMarketPrice} from "./market-state";
import {PlayerActionType} from "./player-actions";
import { getLandTileAtLocation } from "./board-state";

export default function createProductionMiddleware({
	gameBoardStateSelector
}) {
	return store => next => action => {
		switch ( action.type ) {
			case PlayerActionType.Produce: {
				const {location} = action;
				const state = store.getState();
                const gameBoardState = gameBoardStateSelector(state);
                const {terrainType} = getLandTileAtLocation(gameBoardState, location);

				

				const cost = price * amount;

				return next({
					...action,
					cost
				})
			}
		}

		return next(action);
	}
}
