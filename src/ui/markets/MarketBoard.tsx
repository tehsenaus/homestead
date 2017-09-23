
import * as React from 'react'
import {connect} from 'react-redux'
import * as commodities from '../../common/entities/commodities';
import {MarketsState, getAmountInMarket} from '../../common/market-state';
import {buy, sell} from '../../common/market-actions';
import MarketTrack from './MarketTrack';

import './market-board.less';

export interface MarketProps {
	commodityType: string;
	commodity: commodities.Commodity;
	amount: number;

	onBuy: (amount?: number) => void;
	onSell: (amount?: number) => void;
}

export class MarketBoard extends React.Component<MarketProps, {}> {
	render() {
		const { commodityType, commodity, amount, onBuy, onSell } = this.props;

		const marketLevels = commodity.marketLevels.slice(0).reverse();

		return <div className={"market-board market-board-"+commodityType}>
			<h1>{ commodity.name }</h1>
			<button onClick={() => onBuy()}>Buy</button>
			<button onClick={() => onSell()}>Sell</button>
			<MarketTrack commodity={commodity} amount={amount} />
		</div>
	}
}

export default connect(
	(state: MarketsState, {
		commodityType,
		stateSelector = v => v
	}) => {
		return {
			commodityType,
			commodity: commodities[commodityType],
			amount: getAmountInMarket(commodityType, stateSelector(state))
		}
	},
	(dispatch, {commodityType}) => {
		return {
			onBuy: (n=1) => dispatch(buy(commodityType, n)),
			onSell: (n=1) => dispatch(sell(commodityType, n))
		}
	}
)(MarketBoard)
