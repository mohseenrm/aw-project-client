import * as React from 'react';
import {
	Button,
	Select,
	Input,
} from 'semantic-ui-react';

interface DashboardProps {
}

interface DashboardState {
}

export default class Dashboard extends React.Component < DashboardProps, DashboardState > {
  constructor (props: any) {
    super(props);
    this.state = {};
  }

  render () {
    return(
			<div className="dashboard-wrapper">
				Hola
			</div>
    );
  }
}
