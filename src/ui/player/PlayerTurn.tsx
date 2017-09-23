
import * as React from 'react'
import {connect} from 'react-redux'
import * as ReactModal from 'react-modal';
import * as commodities from '../../common/entities/commodities';
import { IndustrialProcess, industrialProcesses, IndustryConstructionRule } from "../../common/entities/industries"
import {PlayerState} from '../../common/player-state';
import PlayerCard from "../cards/PlayerCard";
import Card from "../cards/IndustryCard";
import { isBuilding, getCardsForBuilding, getPlayerActionLocation, isProducing, getCardsForProduction } from "./player-ui-state";
import { GameBoardLocation, build } from "../../common/game-board-actions";
import { bindActionCreators } from "redux";

export interface PlayerTurnProps {
    chooseCardForBuild?: IndustrialProcess [];
    location?: GameBoardLocation;
    
    onChooseCardForBuild(location: GameBoardLocation, card: IndustrialProcess, rule: IndustryConstructionRule): void;
}

export interface PlayerInventoryState {
	
}

export class PlayerTurn extends React.Component<PlayerTurnProps, PlayerInventoryState> {
	constructor() {
		super();

		this.state = {};
    }

    onChooseCardForBuild = (card, rule) => {
        if ( !this.props.location ) throw "missing location";
        this.props.onChooseCardForBuild(this.props.location, card, rule);
    }

	render() {
		const { chooseCardForBuild } = this.props;

		return <div className="player-turn">

			<ReactModal
				isOpen={!!chooseCardForBuild}
				onRequestClose={ e => {
					this.setState({ ...this.state, showCard: undefined });
				} }
				style={{
					content: {
						position: "static",
						textAlign: "center",
						margin: "0 auto",
						width: "60em",
						marginTop: "4em"
					}
				}}
			>
				{ chooseCardForBuild && chooseCardForBuild.map(card =>
                    <Card industrialProcess={ card } onBuild={this.onChooseCardForBuild} />
                ) }
			</ReactModal>
		</div>
	}
}

export default connect(
	(globalState, {
        stateSelector,
        playerStateSelector
	}) => {
        const state = stateSelector(globalState);
        const playerState = playerStateSelector(globalState);

		return {
            chooseCardForBuild: isBuilding(state) && getCardsForBuilding(state, playerState),
            chooseCardForProduce: isProducing(state) && getCardsForProduction(state, playerState),
            location: getPlayerActionLocation(state)
		}
	},
	(dispatch, {}) => {
		return bindActionCreators({
            onChooseCardForBuild: (location, {industryType}) => build(location, industryType),
            onChooseCardForProduction: (location, card, rule) => produce(location, card, rule)
		}, dispatch);
	}
)(PlayerTurn)
