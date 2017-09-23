
import * as React from 'react'

import './player-card.less';

export interface PlayerCardProps {
    label: string;
}

export default class PlayerCard extends React.Component<PlayerCardProps, {}> {
    render() {
        const { label } = this.props;
        
        return <div className="player-card">
            {label}
        </div>
    }
}
