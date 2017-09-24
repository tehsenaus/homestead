
export const BUY_OR_SELL = "buyOrSell";

export enum MarketActionType {
	BuyOrSell = 'buyOrSell'
}

export enum MarketEventType {
	BoughtOrSold = 'boughtOrSold'
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

export function buy(commodityType: string, amount: number) {
	return {
		type: BUY_OR_SELL,
		commodityType,
		amount
	}
}

export function sell(commodityType: string, amount: number) {
	return {
		type: BUY_OR_SELL,
		commodityType,
		amount: -amount
	}
}

export function onBoughtOrSold(action: MarketBuySellAction, cost: number): MarketBoughtOrSoldEvent {
	return {
		...action,
		type: MarketEventType.BoughtOrSold,
		cost
	}
}
