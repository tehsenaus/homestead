
import createTradingMiddleware from "../common/trading-middleware";
import {getMarketsState} from "./state";

export default [
	createTradingMiddleware({
		getMarketsState
	})
];
