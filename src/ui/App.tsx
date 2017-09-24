import * as React from 'react';
import GameBoard from './board/GameBoard';
import MarketBoard from './markets/MarketBoard';
import PlayerInventory from './player/PlayerInventory';
import PlayerTurn from './player/PlayerTurn';

import {food} from '../common/entities/commodities';
import {getGameBoardState, getMarketsState, getPlayerState, getPlayerUiState} from './state';

import './app.less';

export default class App extends React.Component<{}, {}> {
	public render() {
		return (
			<div className='app'>
				<PlayerInventory stateSelector={getPlayerState}/>
				<PlayerTurn
					stateSelector={getPlayerUiState}
					playerStateSelector={getPlayerState}
					gameBoardStateSelector={getGameBoardState}
				/>

				<GameBoard stateSelector={getGameBoardState}/>

				<div className='market-boards'>
					<MarketBoard commodityType='food' stateSelector={getMarketsState}/>
					<MarketBoard commodityType='metal' stateSelector={getMarketsState}/>
					<MarketBoard commodityType='oil' stateSelector={getMarketsState}/>
				</div>
			</div>
		);
	}
}
