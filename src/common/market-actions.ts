import { getMarketPrice, MarketsState } from "./market-state";

export const BUY_OR_SELL = 'buyOrSell';

export enum MarketActionType {
	BuyOrSell = 'buyOrSell',
}

export enum MarketEventType {
	BoughtOrSold = 'boughtOrSold',
}

export interface MarketBuySellAction {
	type: MarketActionType.BuyOrSell;
	commodityType: string;
	amount: number;
}

export interface MarketBoughtOrSoldEvent {
	type: MarketEventType.BoughtOrSold;
	commodityType: string;
	amount: number;
	cost: number;
}

export type MarketIntent = MarketBuySellAction;
export type MarketEvent = MarketBoughtOrSoldEvent;
export type MarketAction = MarketIntent | MarketEvent;

export function buy(commodityType: string, amount: number) {
	return {
		type: BUY_OR_SELL,
		commodityType,
		amount,
	};
}

export function sell(commodityType: string, amount: number) {
	return {
		type: BUY_OR_SELL,
		commodityType,
		amount: -amount,
	};
}

export function boughtOrSold(marketsState: MarketsState, action: MarketBuySellAction) {
	const {commodityType, amount} = action;
	const buyOrSell = amount < 0 ? 'sell' : 'buy';
	const price = getMarketPrice(
		commodityType,
		buyOrSell,
		Math.abs(amount),
		marketsState,
	);

	const cost = price * amount;

	return onBoughtOrSold(action, cost);
}

export function onBoughtOrSold(action: MarketBuySellAction, cost: number): MarketBoughtOrSoldEvent {
	return {
		...action,
		type: MarketEventType.BoughtOrSold,
		cost,
	};
}
