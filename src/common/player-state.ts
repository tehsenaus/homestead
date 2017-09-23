
import {BUY_OR_SELL} from "./player-actions";
import {IndustrialProcess, industrialProcesses} from "./entities/industries";

export interface PlayerState {
	money: number;
	commodities: {[commodityType: string]: number};
	industryCards: IndustrialProcess [];
}

const INITIAL_STATE: PlayerState = {
	money: 20,
	commodities: {
		food: 0,
		metal: 0,
		oil: 0
	},
	industryCards: [
		industrialProcesses.basicAg,
		industrialProcesses.basicAg
	]
}

export default function playerReducer(state: PlayerState = INITIAL_STATE, action): PlayerState {
	switch (action.type) {
		case BUY_OR_SELL: {
			const {commodityType, amount, cost} = action;

			return {
				...state,
				money: state.money - cost,
				commodities: {
					...state.commodities,
					[commodityType]: state.commodities[commodityType] + amount
				}
			}
		}
	}

	return state;
}
