
import {find, random} from "lodash/fp";
import {terrainTypes} from "./entities/land-tiles";
import {EXPLORE, CLAIM_LAND, GameBoardLocation} from "./game-board-actions";

export interface LandTile extends GameBoardLocation {
	terrainType: string;
	x: number;
	y: number;
	claimedBy?: string;
}

export interface GameBoardState {
	tiles: LandTile [];
}

export const INITIAL_STATE: GameBoardState = {
	tiles: [{x:0,y:0,terrainType:'grass'}]
}

export function getLandTileAt(x: number, y: number, state: GameBoardState) {
	return find({x,y})(state.tiles);
}

export function getLandTileLocation({x,y}: LandTile): GameBoardLocation {
	return {x,y}
}

export default function boardStateReducer(state: GameBoardState = INITIAL_STATE, action) {
	switch (action.type) {
		case EXPLORE: {

			// TODO: replace with deterministic RNG
			const terrainTypeNames = Object.keys(terrainTypes);
			const terrainType = terrainTypeNames[random(0, terrainTypeNames.length-1)];

			return {
				...state,
				tiles: [
					...state.tiles,
					{
						terrainType,
						x: state.tiles.length % 5,
						y: Math.floor(state.tiles.length / 5)
					}
				]
			}
		}

		case CLAIM_LAND: {
			const {location, player} = action;

			return {
				...state,
				tiles: state.tiles.map(tile => {
					if ( tile.x === location.x && tile.y === location.y ) {
						if ( !tile.claimedBy ) {
							return {
								...tile,
								claimedBy: player
							}
						}
					}

					return tile;
				})
			}
		}
	}

	return state;
}
