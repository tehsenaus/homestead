
import {GRASS,PLAINS} from "./land-tiles";
import {FOOD,OIL} from "./commodities";

export const AGRICULTURE = 'agriculture';
export type IndustryType = string;

export interface IndustryProductionRule {
	terrainType: string;

	inputCommodities: {[commodityType: string]: number};
	outputCommodities: {[commodityType: string]: number};
}

export interface IndustrialProcess {
	name: string;
	industryType: IndustryType;
	patentCost: number;
	level?: number;

	productionRules: IndustryProductionRule [];
}

export function singleCommodityDependentOnTerrainType(
	inputCommodities: {[commodityType: string]: number},
	outputCommodityType: string,
	terrainTypes: {[terrainType: string]: number}
): IndustryProductionRule [] {
	return Object.keys(terrainTypes).map(terrainType => {
		return {
			terrainType,
			inputCommodities,
			outputCommodities: {
				[outputCommodityType]: terrainTypes[terrainType]
			}
		}
	})
}

export const industrialProcesses: {[id: string]: IndustrialProcess} = {
	basicAg: {
		name: 'Basic Agriculture',
		industryType: AGRICULTURE,
		patentCost: 3,

		productionRules: singleCommodityDependentOnTerrainType(
			{}, FOOD, {
				[GRASS]: 2,
				[PLAINS]: 1
			}
		)
	},

	mechAg: {
		name: 'Mechanized Agriculture',
		industryType: AGRICULTURE,
		patentCost: 7,

		productionRules: singleCommodityDependentOnTerrainType(
			{ [OIL]: 1 }, FOOD, {
				[GRASS]: 3,
				[PLAINS]: 2
			}
		)
	}
}
