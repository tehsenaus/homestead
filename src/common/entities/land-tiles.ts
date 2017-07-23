
export interface TerrainType {
	name: string;
	colour: string;
	numberOfTiles: number;
}

export const terrainTypes: {[type: string]: TerrainType} = {
	grass: {
		name: 'Grassland',
		colour: 'green',
		numberOfTiles: 10
	},
	plains: {
		name: 'Plains',
		colour: 'orange',
		numberOfTiles: 10
	},
	desert: {
		name: 'Desert',
		colour: 'yellow',
		numberOfTiles: 10
	},
	mountains: {
		name: 'Mountains',
		colour: 'gray',
		numberOfTiles: 10
	}
}
