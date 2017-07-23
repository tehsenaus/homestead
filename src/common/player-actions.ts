
import { BUY_OR_SELL, buy, sell, MarketBuySellAction } from "./market-actions";
export { BUY_OR_SELL };

export interface PlayerBuySellAction extends MarketBuySellAction {
	player: string;
	cost?: number;
}

export function explore(player: string) {

}

export function claimLand(player: string) {

}

export function buyFromMarket(player: string, commodityType: string, amount: number) {
	return {
		...buy(commodityType, amount),
		player
	}
}

export function sellToMarket(player: string, commodityType: string, amount: number) {
	return {
		...sell(commodityType, amount),
		player
	}
}
