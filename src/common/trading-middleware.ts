
import {getMarketPrice} from "./market-state";
import {BUY_OR_SELL} from "./player-actions";

export default function createTradingMiddleware({
	getMarketsState,
	getPlayerState
}) {
	return store => next => action => {
		switch ( action.type ) {
			case BUY_OR_SELL: {
				const {commodityType, amount, player} = action;
				const state = store.getState();
				const marketsState = getMarketsState(state);

				const buyOrSell = amount < 0 ? 'sell' : 'buy';
				const price = getMarketPrice(
					commodityType,
					buyOrSell,
					Math.abs(amount),
					marketsState
				);

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
