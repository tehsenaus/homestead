import {mapValues} from 'lodash';
import {IndustrialProcess, industrialProcesses} from './entities/industries';
import {BUY_OR_SELL, PlayerActionType, PlayerEvent, PlayerEventType} from './player-actions';

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
		oil: 0,
	},
	industryCards: [
		industrialProcesses.basicAg,
		industrialProcesses.basicAg,
	],
};

export default function playerReducer(state: PlayerState = INITIAL_STATE, action: PlayerEvent): PlayerState {
	switch (action.type) {
		case PlayerEventType.BoughtOrSold: {
			const {commodityType, amount, cost} = action;

			return {
				...state,
				money: state.money - cost,
				commodities: {
					...state.commodities,
					[commodityType]: state.commodities[commodityType] + amount,
				},
			};
		}

		case PlayerEventType.Produced: {
			const {cost, inputCommodities, outputCommodities} = action;

			return {
				...state,
				money: state.money - cost,
				commodities: {
					...state.commodities,
					...mapValues(outputCommodities, (n, k) => state.commodities[k] + n),
					...mapValues(inputCommodities, (n, k) => state.commodities[k] - n),
				},
			};
		}
	}

	return state;
}
