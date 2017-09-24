import {clamp} from 'lodash';
import {Commodity, energy, food, MarketLevel, metal, oil} from './entities/commodities';
import {BUY_OR_SELL, MarketEventType} from './market-actions';

export interface MarketCommodityState {
	commodity: Commodity;
	amount: number;
}

export interface MarketsState {
	[commodityType: string]: MarketCommodityState;
}

export const INITIAL_STATE: MarketsState = {
	food: createMarketCommodityState(food),
	metal: createMarketCommodityState(metal),
	oil: createMarketCommodityState(oil),
	energy: createMarketCommodityState(energy),
};

export function createMarketCommodityState(commodity: Commodity) {
	return {
		commodity,
		amount: commodity.initialAmount,
	};
}

export function getCommodity(commodityType: string, state: MarketsState) {
	return state[commodityType].commodity;
}

export function getAmountInMarket(commodityType: string, state: MarketsState) {
	return state[commodityType].amount;
}

export function getMarketLevel(
	commodityType: string,
	state: MarketsState,
	amount: number = getAmountInMarket(commodityType, state)): MarketLevel {

	const marketLevels: MarketLevel [] = state[commodityType].commodity.marketLevels;

	for (let i = marketLevels.length - 1; i >= 0; i--) {
		if (amount >= marketLevels[i].minAmount) {
			return marketLevels[i];
		}
	}

	return marketLevels[0];
}

export function getMarketPrice(
	commodityType: string,
	buyOrSell: 'buy' | 'sell',
	amount: number,
	state: MarketsState): number {

	const amountBefore = getAmountInMarket(commodityType, state);
	const amountAfter = clamp(
		amountBefore + (buyOrSell === 'buy' ? -amount : amount),
		0,
		getMarketLevel(commodityType, state, Infinity).minAmount,
	);

	const {bid, ask} = getMarketLevel(commodityType, state, amountAfter);

	return buyOrSell === 'buy' ? ask : bid;
}

export default function marketsReducer(state: MarketsState = INITIAL_STATE, action) {
	switch (action.type) {
		case MarketEventType.BoughtOrSold: {
			const {amount, commodityType} = action;

			return {
				...state,
				[commodityType]: {
					...state[commodityType],
					amount: clamp(
						state[commodityType].amount - amount,
						0,
						getMarketLevel(commodityType, state, Infinity).minAmount - 1,
					),
				},
			};
		}
	}

	return state;
}
