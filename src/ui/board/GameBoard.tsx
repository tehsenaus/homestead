
import * as React from 'react'
import {TerrainType} from "../../common/entities/land-tiles";
import {GameBoardState} from "../../common/board-state";
import {range} from "lodash";
import GameBoardTile from "./GameBoardTile";

import './game-board.less'

export interface GameBoardProps {
	stateSelector: (state: any) => GameBoardState;
	size?: number;
}

export default class GameBoard extends React.Component<GameBoardProps, {}> {
	render() {
		const { size = 5 } = this.props;

		return <div className="game-board">
			{ range(size).map(y => range(size).map(x => this.renderTile(x, y))) }
			<div className="land-tile">
				<button>Explore</button>
			</div>
		</div>
	}

	renderTile(x: number, y: number) {
		return <GameBoardTile stateSelector={this.props.stateSelector} x={x} y={y} />
	}
}
