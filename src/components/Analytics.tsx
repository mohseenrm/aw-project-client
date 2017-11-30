import * as React from 'react';
import {
	Button,
	Select,
	Input,
} from 'semantic-ui-react';
import { PieTooltip } from 'react-d3-tooltip';

const data = [];

interface AnalyticsProps {
}

interface AnalyticsState {
}

export default class Analytics extends React.Component < AnalyticsProps, AnalyticsState > {
  constructor (props: any) {
    super(props);
    this.state = {};
  }

  render () {
    return(
			<div className="analytics-wrapper">
				
			</div>
    );
  }
}
