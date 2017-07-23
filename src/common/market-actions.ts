
export const BUY_OR_SELL = "buyOrSell";

export interface MarketBuySellAction {
	type: "buyOrSell";
	commodityType: string;
	amount: number;
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
