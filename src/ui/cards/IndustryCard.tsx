
import {range} from "lodash";
import * as React from 'react'
import * as commodities from '../../common/entities/commodities';
import { IndustrialProcess, IndustryConstructionRule } from '../../common/entities/industries'
import Card from './Card';

import './industry-card.less'

export interface IndustryCardProps {
	industrialProcess: IndustrialProcess;

	onBuild?: (card: IndustrialProcess, rule: IndustryConstructionRule) => void;
}

const TerrainType = ({terrainType}) => <div className={`terrain-type terrain-type-${terrainType}`} />;
const Commodity = ({type}) => <div className={`commodity commodity-${type}`} />;

export default class IndustryCard extends React.Component<IndustryCardProps, {}> {
	render() {
		const {name, patentCost, constructionRules, productionRules, level} = this.props.industrialProcess;

		return <Card title={name} cost={patentCost}>
			<div className="industry-card-production">
				<h2>Level {level||1}</h2>

				<h2>Construction</h2>
				{ constructionRules.map(rule => <div
					className="industry-card-production-rule"
					onClick={ (() => {
						if (!this.props.onBuild) return;
						this.props.onBuild( this.props.industrialProcess, rule )
					}) }
				>
					<div className="cost">{rule.cost}</div>
					{ this.renderCommodityList(rule.inputCommodities) }
					<span className="arrow">⇨</span>
					<div className="player-industry" />
				</div>) }

				<h2>Production</h2>
				{ productionRules.map(rule => <div className="industry-card-production-rule">
					<TerrainType terrainType={rule.terrainType} />
					<span className="colon">:</span>
					{ this.renderCommodityList(rule.inputCommodities) }
					<span className="arrow">⇨</span>
					{ this.renderCommodityList(rule.outputCommodities) }
				</div>) }
			</div>
		</Card>
	}

	renderCommodityList(commodities) {
		return Object.keys(commodities)
			.map(c => range(commodities[c]).map(() => <Commodity type={c} />));
	}
}
