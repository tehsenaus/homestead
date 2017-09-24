import {IndustryType} from './entities/industries';

export enum GameBoardActionType {
	Explore = 'explore',
	ClaimLand = 'claim-land',
	Build = 'build',
	Produce = 'produce',
}

export const EXPLORE = GameBoardActionType.Explore;
export const CLAIM_LAND = GameBoardActionType.ClaimLand;

export interface GameBoardLocation {
	x: number;
	y: number;
}

export interface ExploreAction {
	type: GameBoardActionType.Explore;
}

export interface ClaimLandAction {
	type: GameBoardActionType.ClaimLand;
	location: GameBoardLocation;
	player?: string;
}

export interface BuildAction {
	type: GameBoardActionType.Build;
	location: GameBoardLocation;
	industryType: IndustryType;
}

export interface ProduceAction {
	type: GameBoardActionType.Produce;
	location: GameBoardLocation;
}

export type GameBoardAction = ExploreAction | ClaimLandAction | BuildAction | ProduceAction;

export function explore() {
	return {
		type: EXPLORE,
	};
}

export function claimLand(location: GameBoardLocation) {
	return {
		type: CLAIM_LAND,
		location,
		player: 'me',
	};
}

export function build(location: GameBoardLocation, industryType: IndustryType) {
	return {
		type: GameBoardActionType.Build,
		location,
		industryType,
	};
}
