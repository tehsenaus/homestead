
import createMarketMiddleware from "../common/market-middleware";
import createPlayerMiddleware from "../common/player-middleware";
import {getMarketsState, gameBoardStateSelector} from "./state";

export default [
	createPlayerMiddleware({
		gameBoardStateSelector
	}),
	createMarketMiddleware({
		getMarketsState
	})
];
