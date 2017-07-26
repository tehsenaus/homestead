
import * as React from 'react'
import * as commodities from '../../common/entities/commodities';
import {PlayerState} from '../../common/player-state';

import './card.less';

export interface CardProps {
	title: string;
	cost: number;
}

export default class Card extends React.Component<CardProps, {}> {
	render() {
		const {title, cost} = this.props;

		return <div className="card">
			<h1>{title}</h1>
			<div className="card-cost">{cost}</div>
			{ this.props.children }
		</div>
	}
}
