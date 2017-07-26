
import * as React from 'react'
import MarketBoard from "./markets/MarketBoard";
import PlayerInventory from "./player/PlayerInventory";
import GameBoard from "./board/GameBoard";
import Card from "./cards/IndustryCard";

import {food} from "../common/entities/commodities"
import {industrialProcesses} from "../common/entities/industries"
import {getMarketsState, getPlayerState, getGameBoardState} from "./state";

import "./app.less"

export default class App extends React.Component<{}, {}> {
	render() {
		return <div className="app">
			<Card industrialProcess={ industrialProcesses['mechAg'] } />

			<PlayerInventory stateSelector={getPlayerState} />

			<GameBoard stateSelector={getGameBoardState} />

			<div className="market-boards">
				<MarketBoard commodityType="food" stateSelector={getMarketsState} />
				<MarketBoard commodityType="metal" stateSelector={getMarketsState} />
				<MarketBoard commodityType="oil" stateSelector={getMarketsState} />
			</div>
		</div>
	}
}
