import {IndustryProductionRule} from './entities/industries';
import {GameBoardActionType, GameBoardLocation, ProduceAction} from './game-board-actions';
import {buy, BUY_OR_SELL, MarketBoughtOrSoldEvent, MarketBuySellAction, MarketEventType, sell} from './market-actions';
export {BUY_OR_SELL};

export enum PlayerActionType {
	Explore = 'explore',
	ClaimLand = 'claim-land',
	Build = 'build',
}
export namespace PlayerActionType {
	export const Produce = GameBoardActionType.Produce;
}

export interface PlayerProduceAction extends ProduceAction {
	productionRule: IndustryProductionRule;
}

export interface PlayerBuySellAction extends MarketBuySellAction {
	player: string;
	cost?: number;
}

export enum PlayerEventType {
	Produced = 'produced',
}
export namespace PlayerEventType {
	export const BoughtOrSold = MarketEventType.BoughtOrSold;
}

export interface PlayerProducedEvent {
	type: PlayerEventType.Produced;
	cost: number;
	inputCommodities: {[commodityType: string]: number};
	outputCommodities: {[commodityType: string]: number};
}

export type PlayerIntent = PlayerBuySellAction | PlayerProduceAction;
export type PlayerEvent = PlayerProducedEvent | MarketBoughtOrSoldEvent;
export type PlayerAction = PlayerIntent | PlayerEvent;

export function explore(player: string) {

}

export function claimLand(player: string) {

}

export function produce(location: GameBoardLocation, productionRule: IndustryProductionRule) {
	return {
		type: PlayerActionType.Produce,
		location,
		productionRule,
	};
}

export function onPlayerProduced(location: GameBoardLocation, productionRule: IndustryProductionRule) {
	return {
		type: PlayerEventType.Produced,
		cost: 0,
		inputCommodities: productionRule.inputCommodities,
		outputCommodities: productionRule.outputCommodities,
	};
}

export function buyFromMarket(player: string, commodityType: string, amount: number) {
	return {
		...buy(commodityType, amount),
		player,
	};
}

export function sellToMarket(player: string, commodityType: string, amount: number) {
	return {
		...sell(commodityType, amount),
		player,
	};
}
