
import * as React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {TerrainType} from "../../common/entities/land-tiles";
import {LandTile, getLandTileAt, getLandTileLocation} from "../../common/board-state";
import {GameBoardLocation, explore, claimLand} from "../../common/game-board-actions";
import {range} from "lodash";

import './game-board.less'

export interface GameBoardTileProps {
	landTile?: LandTile;

	onExplore: () => void;
	onClaim: (location: GameBoardLocation) => void;
}

export class GameBoardTile extends React.Component<GameBoardTileProps, {}> {
	onClaim = () => {
		this.props.onClaim(getLandTileLocation(this.props.landTile));
	}

	render() {
		if (this.props.landTile) {
			const {terrainType, claimedBy} = this.props.landTile;

			return <div className={`land-tile land-tile-${terrainType}`}>
				{ !claimedBy && <button onClick={this.onClaim}>Claim</button> }
				<button>Build</button>

				{ claimedBy && <div className={`land-claim claimed-by-${claimedBy}`} /> }
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

		return {
			landTile: getLandTileAt(x, y, state)
		}
	},
	(dispatch) => bindActionCreators({
		onExplore: explore,
		onClaim: claimLand
	}, dispatch)
)(GameBoardTile);
