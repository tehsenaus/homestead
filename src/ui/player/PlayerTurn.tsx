
import * as React from 'react'
import {connect} from 'react-redux'
import * as ReactModal from 'react-modal';
import * as commodities from '../../common/entities/commodities';
import { IndustrialProcess, industrialProcesses, IndustryConstructionRule, IndustryProductionRule } from "../../common/entities/industries"
import {PlayerState} from '../../common/player-state';
import PlayerCard from "../cards/PlayerCard";
import Card from "../cards/IndustryCard";
import { isBuilding, getCardsForBuilding, getPlayerActionLocation, isProducing, getCardsForProduction } from "./player-ui-state";
import { GameBoardLocation, build } from "../../common/game-board-actions";
import { bindActionCreators } from "redux";
import { TerrainType } from "../../common/entities/land-tiles";
import { produce } from "../../common/player-actions";
import { cancel } from "./player-ui-actions";

export interface PlayerTurnProps {
    chooseCardForBuild?: IndustrialProcess [];
    chooseCardForProduce?: {
        cards: IndustrialProcess [];
        terrainType: TerrainType
    };
    location?: GameBoardLocation;
    
    onChooseCardForBuild(location: GameBoardLocation, card: IndustrialProcess, rule: IndustryConstructionRule): void;
    onChooseCardForProduce(location: GameBoardLocation, card: IndustrialProcess, rule: IndustryProductionRule): void;
    onCancel(): void;
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

    onChooseCardForProduce = (card, rule) => {
        if ( !this.props.location ) throw "missing location";
        this.props.onChooseCardForProduce(this.props.location, card, rule);
    }

	render() {
		const { chooseCardForBuild, chooseCardForProduce } = this.props;

		return <div className="player-turn">

			<ReactModal
				isOpen={!!chooseCardForBuild || !!chooseCardForProduce}
				onRequestClose={this.props.onCancel}
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

                { chooseCardForProduce && chooseCardForProduce.cards.map(card =>
                    <Card industrialProcess={ card }
                        onProduce={this.onChooseCardForProduce} 
                        terrainType={chooseCardForProduce.terrainType} />
                ) }
			</ReactModal>
		</div>
	}
}

export default connect(
	(globalState, {
        stateSelector,
        playerStateSelector,
        gameBoardStateSelector
	}) => {
        const state = stateSelector(globalState);
        const playerState = playerStateSelector(globalState);
        const gameBoardState = gameBoardStateSelector(globalState);

		return {
            chooseCardForBuild: isBuilding(state) && getCardsForBuilding(state, playerState),
            chooseCardForProduce: isProducing(state) && getCardsForProduction(state, playerState, gameBoardState),
            location: getPlayerActionLocation(state)
		}
	},
	(dispatch, {}) => {
		return bindActionCreators({
            onChooseCardForBuild: (location, {industryType}) => build(location, industryType),
            onChooseCardForProduce: (location, card, rule) => produce(location, rule),
            onCancel: cancel
		}, dispatch);
	}
)(PlayerTurn)
