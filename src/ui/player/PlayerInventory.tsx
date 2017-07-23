
import * as React from 'react'
import {connect} from 'react-redux'
import * as commodities from '../../common/entities/commodities';
import {PlayerState} from '../../common/player-state';

export interface PlayerInventoryProps {
	commodities: {[commodityType: string]: number};
}

export class PlayerInventory extends React.Component<PlayerInventoryProps, {}> {
	render() {
		const { money, commodities } = this.props;

		return <div className="player-inventory">
			${money}
			{ Object.keys(commodities).map(k => `${k}: ${commodities[k]}`) }
		</div>
	}
}

export default connect(
	(globalState, {
		player,
		stateSelector
	}) => {
		const {money, commodities} = stateSelector(globalState);
		return {
			money,
			commodities
		}
	},
	(dispatch, {commodityType}) => {
		return {

		}
	}
)(PlayerInventory)
