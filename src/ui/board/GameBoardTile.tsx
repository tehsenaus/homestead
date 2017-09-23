
import * as React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {TerrainType} from "../../common/entities/land-tiles";
import {LandTile, getLandTileAt, getLandTileLocation} from "../../common/board-state";
import {GameBoardLocation, explore, claimLand} from "../../common/game-board-actions";
import {range} from "lodash";

import './game-board.less'
import { build, produce } from "../player/player-ui-actions";
import { getPlayerUiState } from "../state";
import IndustrialBuilding from "./IndustrialBuilding";

export interface GameBoardTileProps {
	landTile?: LandTile;
	currentPlayer: string;

	onExplore: () => void;
	onClaim: (location: GameBoardLocation) => void;
	onBuild: (location: GameBoardLocation) => void;
	onProduce: (location: GameBoardLocation) => void;
}

export class GameBoardTile extends React.Component<GameBoardTileProps, {}> {
	onClaim = () => {
		if (!this.props.landTile) return;
		this.props.onClaim(getLandTileLocation(this.props.landTile));
	}

	onBuild = () => {
		if (!this.props.landTile) return;
		this.props.onBuild(getLandTileLocation(this.props.landTile));
	}

	onProduce = () => {
		if (!this.props.landTile) return;
		this.props.onProduce(getLandTileLocation(this.props.landTile));
	}

	render() {
		if (this.props.landTile) {
			const {terrainType, claimedBy, industryType, industryLevel} = this.props.landTile;
			const iOwn = claimedBy === this.props.currentPlayer;
			const canBuild = !claimedBy || iOwn;
			const canProduce = iOwn && industryType;

			return <div className={`land-tile land-tile-${terrainType}`}>
				{ !claimedBy && <button onClick={this.onClaim}>Claim</button> }
				{ canBuild && <button onClick={this.onBuild}>Build</button> }
				{ canProduce && <button onClick={this.onProduce}>Produce</button> }

				{ claimedBy && <div className={`land-claim claimed-by-${claimedBy}`} /> }

				{ industryType && industryLevel && <IndustrialBuilding {...{industryType, industryLevel}} /> }
			</div>
		} else {
			return <div className={`land-tile land-tile-empty`}>
				<button onClick={this.props.onExplore}>Explore</button>
			</div>
		}
	}
}

export default connect(
	(globalState, {x, y, stateSelector}) => {
		const state = stateSelector(globalState);
		const { currentPlayer } = getPlayerUiState(globalState);

		return {
			landTile: getLandTileAt(x, y, state),
			currentPlayer
		}
	},
	(dispatch) => bindActionCreators({
		onExplore: explore,
		onClaim: claimLand,
		onBuild: build,
		onProduce: produce
	}, dispatch)
)(GameBoardTile);
