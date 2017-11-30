import * as React from 'react';
import {
	Button,
	Select,
	Input,
} from 'semantic-ui-react';
import { Chart } from 'react-google-charts';

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
				<Chart
          chartType="PieChart"
          data={[
						[ 'Language', 'Count' ],
						[ 'C', 23 ],
						[ 'C++', 14 ],
						[ 'CSS', 53 ],
						[ 'HTML', 235 ],
						[ 'JavaScript', 75 ],
						[ 'JSON', 40 ],
						[ 'Markdown', 30 ],
						[ 'Ruby', 6 ],
						[ 'Rust', 9 ],
						[ 'Scala', 7 ],
						[ 'SQL', 39 ],
          ]}
          options={{
            title: 'Languages',
            pieHole: 0.4,
            is3D: false,
          }}
          graph_id="ScatterChart"
          width="100%"
          height="400px"
          legend_toggle={true}
				/>
				<Chart
          chartType="AreaChart"
          data={[
						[ 'Week', 'User', 'Others' ],
						[ 'Week 1', 17, 17 ],
						[ 'Week 2', 12, 64 ],
						[ 'Week 3', 1, 6 ],
						[ 'Week 4', 7, 34 ],
						[ 'Week 5', 18, 4 ],
						[ 'Week 6', 13, 25 ],
						[ 'Week 7', 7, 10 ],
						[ 'Week 8', 16, 24 ],
          ]}
          options={{
            title: 'Something',
            is3D: false,
          }}
          graph_id="AreaChart"
          width="100%"
          height="400px"
          legend_toggle={true}
				/>
			</div>
    );
  }
}
