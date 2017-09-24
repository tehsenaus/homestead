import createMarketMiddleware from '../common/market-middleware';
import createPlayerMiddleware from '../common/player-middleware';
import {gameBoardStateSelector, getMarketsState} from './state';

export default [
	createPlayerMiddleware({
		gameBoardStateSelector,
	}),
	createMarketMiddleware({
		getMarketsState,
	}),
];
