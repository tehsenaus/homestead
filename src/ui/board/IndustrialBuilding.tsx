
import * as React from 'react'

import './industrial-building.less'
import { IndustryType } from "../../common/entities/industries";

export interface IndustrialBuildingProps {
    industryType: IndustryType;
    industryLevel: number;
}

export default class IndustrialBuilding extends React.Component<IndustrialBuildingProps, {}> {
	render() {
		const { industryType, industryLevel } = this.props;

		return <div className={"industrial-building industry-type-"+industryType} >
			{ industryLevel }
		</div>
	}
}
