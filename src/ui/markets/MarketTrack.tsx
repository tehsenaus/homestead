
import * as React from 'react'
import {Commodity} from '../../common/entities/commodities';
import {range} from 'lodash/fp';

import './market-track.less'

export interface MarketTrackProps {
	commodity: Commodity;
}

const SELL = <span className="sell">🡇</span>;
const BUY = <span className="buy">🡅</span>;

export default class MarketTrack extends React.Component<MarketTrackProps, {}> {
  render() {
    const { commodity, amount } = this.props;

	const marketLevels = commodity.marketLevels.slice(0).reverse();
	const marketTrackLevels = marketLevels.slice(1,-1);
	const numColumns = marketTrackLevels
		.map(({minAmount}, i) => marketLevels[i].minAmount - minAmount)
		.reduce((a,b) => Math.max(a,b));
	const exportLevel = marketLevels[0];
	const importLevel = marketLevels[marketLevels.length-1];

    return <table className="market-track">
		<tr className="header">
			<td className="bidAsk">{SELL} / {BUY}</td>
			<td colSpan={numColumns}>{SELL} {exportLevel.bid}</td>
		</tr>
		{ marketTrackLevels.map(({bid, ask, minAmount}, i) => <tr key={i}>
			<td className="bidAsk">{bid} / {ask}</td>
			{ range(minAmount, marketLevels[i].minAmount).map(n => {
				return <td className={"box " + (amount >= n ? 'filled' :'')}>{n}</td>
			}) }
		</tr>) }
		<tr className="footer">
			<td className="bidAsk"></td>
			<td colSpan={numColumns}>{BUY} {importLevel.ask}</td>
		</tr>
	</table>
  }
}
