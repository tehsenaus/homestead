
import * as React from 'react'
import {connect} from 'react-redux'
import * as ReactModal from 'react-modal';
import * as commodities from '../../common/entities/commodities';
import {IndustrialProcess, industrialProcesses} from "../../common/entities/industries"
import {PlayerState} from '../../common/player-state';
import PlayerCard from "../cards/PlayerCard";
import Card from "../cards/IndustryCard";

export interface PlayerInventoryProps {
	money: number;
	commodities: {[commodityType: string]: number};
	cards: {
		label: string;
		card: IndustrialProcess;
	} [];
}

export interface PlayerInventoryState {
	showCard?: IndustrialProcess;
}

export class PlayerInventory extends React.Component<PlayerInventoryProps, PlayerInventoryState> {
	constructor() {
		super();

		this.state = {};
	}

	render() {
		const { money, commodities, cards } = this.props;
		const { showCard } = this.state;

		return <div className="player-inventory">
			${money}
			{ Object.keys(commodities).map(k => `${k}: ${commodities[k]}`) }

			<div className="player-cards">
				{ cards.map((card) =>
					<a href="#" onClick={e => {
						this.setState({ ...this.state, showCard: card.card });
						e.preventDefault();
					}}>
						<PlayerCard {...card} />
					</a>
				) }
			</div>

			
			<ReactModal
				isOpen={showCard}
				onRequestClose={ e => {
					this.setState({ ...this.state, showCard: undefined });
				} }
				style={{
					content: {
						position: "static",
						textAlign: "center",
						margin: "0 auto",
						width: "20em",
						marginTop: "4em"
					}
				}}
			>
				{ showCard && <Card industrialProcess={ showCard } /> }
			</ReactModal>
		</div>
	}
}

export default connect(
	(globalState, {
		player,
		stateSelector
	}) => {
		const {money, commodities, industryCards} = stateSelector(globalState);
		return {
			money,
			commodities,
			cards: industryCards.map(c => {
				return {
					label: c.shortName,
					card: c
				}
			})
		}
	},
	(dispatch, {commodityType}) => {
		return {

		}
	}
)(PlayerInventory)
