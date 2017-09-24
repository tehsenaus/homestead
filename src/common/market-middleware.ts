import {MarketActionType, onBoughtOrSold} from './market-actions';
import {getMarketPrice} from './market-state';

/**
 * Market middleware is responsible for assigning costs to buy/sell actions
 * on the commodity market, based on the current market state.
 */
export default function createMarketMiddleware({
	getMarketsState,
}) {
	return (store) => (next) => (action) => {
		switch (action.type) {
			case MarketActionType.BuyOrSell: {
				const {commodityType, amount} = action;
				const state = store.getState();
				const marketsState = getMarketsState(state);

				const buyOrSell = amount < 0 ? 'sell' : 'buy';
				const price = getMarketPrice(
					commodityType,
					buyOrSell,
					Math.abs(amount),
					marketsState,
				);

				const cost = price * amount;

				return next(onBoughtOrSold(action, cost));
			}
		}

		return next(action);
	};
}
