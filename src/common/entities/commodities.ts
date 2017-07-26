
export const FOOD = 'food';
export const OIL = 'oil';

export type PriceClass = 'cheap' | 'normal' | 'expensive';
export const PRICE_CHEAP: PriceClass = 'cheap';
export const PRICE_NORMAL: PriceClass = 'normal';
export const PRICE_EXPENSIVE: PriceClass = 'expensive';


export interface MarketLevel {
	minAmount: number;
	bid: number;
	ask: number;
	priceClass: PriceClass;
}

export interface Commodity {
	name: string;
	colour: string;
	marketLevels: MarketLevel [];
	initialAmount: number;
	ephemeral?: boolean;
}

export const food = {
	name: 'Food',
	colour: 'yellow',
	marketLevels: [
		{ minAmount: 0, bid: 7, ask: 10, priceClass: PRICE_EXPENSIVE },
		{ minAmount: 1, bid: 6, ask: 8, priceClass: PRICE_EXPENSIVE },
		{ minAmount: 6, bid: 4, ask: 6, priceClass: PRICE_EXPENSIVE },
		{ minAmount: 11, bid: 3, ask: 5, priceClass: PRICE_NORMAL },
		{ minAmount: 16, bid: 2, ask: 4, priceClass: PRICE_NORMAL },
		{ minAmount: 21, bid: 1, ask: 3, priceClass: PRICE_CHEAP },
		{ minAmount: 26, bid: 1, ask: 2, priceClass: PRICE_CHEAP },
		{ minAmount: 31, bid: 0, ask: 1, priceClass: PRICE_CHEAP }
	],
	initialAmount: 10
}

export const metal = {
	name: 'Metal',
	colour: 'gray',
	marketLevels: [
		{ minAmount: 0, bid: 7, ask: 10, priceClass: PRICE_EXPENSIVE },
		{ minAmount: 1, bid: 6, ask: 8, priceClass: PRICE_EXPENSIVE },
		{ minAmount: 6, bid: 4, ask: 6, priceClass: PRICE_EXPENSIVE },
		{ minAmount: 11, bid: 3, ask: 5, priceClass: PRICE_NORMAL },
		{ minAmount: 16, bid: 2, ask: 4, priceClass: PRICE_NORMAL },
		{ minAmount: 21, bid: 1, ask: 3, priceClass: PRICE_CHEAP },
		{ minAmount: 26, bid: 1, ask: 2, priceClass: PRICE_CHEAP },
		{ minAmount: 31, bid: 0, ask: 1, priceClass: PRICE_CHEAP }
	],
	initialAmount: 10
}

export const oil = {
	name: 'Oil',
	colour: 'black',
	marketLevels: [
		{ minAmount: 0, bid: 7, ask: 10, priceClass: PRICE_EXPENSIVE },
		{ minAmount: 1, bid: 6, ask: 8, priceClass: PRICE_EXPENSIVE },
		{ minAmount: 6, bid: 4, ask: 6, priceClass: PRICE_EXPENSIVE },
		{ minAmount: 11, bid: 3, ask: 5, priceClass: PRICE_NORMAL },
		{ minAmount: 16, bid: 2, ask: 4, priceClass: PRICE_NORMAL },
		{ minAmount: 21, bid: 1, ask: 3, priceClass: PRICE_CHEAP },
		{ minAmount: 26, bid: 1, ask: 2, priceClass: PRICE_CHEAP },
		{ minAmount: 31, bid: 0, ask: 1, priceClass: PRICE_CHEAP }
	],
	initialAmount: 5
}

export const energy = {
	name: 'Energy',
	colour: 'white',
	ephemeral: true,
	marketLevels: [
		{ minAmount: 0, bid: 7, ask: 10, priceClass: PRICE_EXPENSIVE },
		{ minAmount: 1, bid: 6, ask: 8, priceClass: PRICE_EXPENSIVE },
		{ minAmount: 6, bid: 4, ask: 6, priceClass: PRICE_EXPENSIVE },
		{ minAmount: 11, bid: 3, ask: 5, priceClass: PRICE_NORMAL },
		{ minAmount: 16, bid: 2, ask: 4, priceClass: PRICE_NORMAL },
		{ minAmount: 21, bid: 1, ask: 3, priceClass: PRICE_CHEAP },
		{ minAmount: 26, bid: 1, ask: 2, priceClass: PRICE_CHEAP },
		{ minAmount: 31, bid: 0, ask: 1, priceClass: PRICE_CHEAP }
	],
	initialAmount: 10
}
