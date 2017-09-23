
import {GRASS,PLAINS} from "./land-tiles";
import {FOOD,OIL} from "./commodities";

export enum IndustryType {
	Agriculture = "agriculture"
}
export const AGRICULTURE = IndustryType.Agriculture;

export interface IndustryConstructionRule {
	cost: number;
	inputCommodities: {[commodityType: string]: number};
}

export interface IndustryProductionRule {
	terrainType: string;

	inputCommodities: {[commodityType: string]: number};
	outputCommodities: {[commodityType: string]: number};
}

export interface IndustrialProcess {
	name: string;
	shortName: string;
	industryType: IndustryType;
	patentCost: number;
	level?: number;

	constructionRules: IndustryConstructionRule [];
	productionRules: IndustryProductionRule [];
}

export function constructionCostOnly(cost: number): IndustryConstructionRule [] {
	return [{
		cost,
		inputCommodities: {}
	}];
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
		shortName: 'Agri',
		industryType: AGRICULTURE,
		patentCost: 3,

		constructionRules: constructionCostOnly(2),
		productionRules: singleCommodityDependentOnTerrainType(
			{}, FOOD, {
				[GRASS]: 2,
				[PLAINS]: 1
			}
		)
	},

	mechAg: {
		name: 'Mechanized Agriculture',
		shortName: 'MechAg',
		industryType: AGRICULTURE,
		patentCost: 7,

		constructionRules: constructionCostOnly(2),
		productionRules: singleCommodityDependentOnTerrainType(
			{ [OIL]: 1 }, FOOD, {
				[GRASS]: 3,
				[PLAINS]: 2
			}
		)
	}
}
