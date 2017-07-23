
export const EXPLORE = 'explore';
export const CLAIM_LAND = 'claim-land';

export interface GameBoardLocation {
	x: number;
	y: number;
}

export interface ExploreAction {
	type: 'explore';
}

export interface ClaimLandAction {
	type: 'claim-land';
	location: GameBoardLocation;
	player?: string;
}

export function explore() {
	return {
		type: EXPLORE
	}
}

export function claimLand(location: GameBoardLocation) {
	return {
		type: CLAIM_LAND,
		location,
		player: 'me'
	}
}
