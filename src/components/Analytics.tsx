import * as React from 'react';
import {
	Button,
	Select,
	Input,
} from 'semantic-ui-react';
import { Chart } from 'react-google-charts';

const data = [
	{ name:'HTML', count:235 },
	{ name:'JavaScript', count:75 },
	{ name:'C++', count:14 },
	{ name:'C', count:23 },
	{ name:'SQL', count:39 },
	{ name:'CSS', count:53 },
	{ name:'JSON', count:40 },
	{ name:'Markdown', count:30 },
	{ name:'Scala', count:7 },
	{ name:'Ruby', count:6 },
	{ name:'Rust', count:9 },
];

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
			</div>
    );
  }
}
