import * as React from 'react';

import Cards from './Cards';
import Login from './Login';

interface AppProps {
  message: string;
}

interface AppState {
  login: boolean;
}

export default class App extends React.Component < AppProps, AppState > {
  constructor (props: any) {
    super(props);
    this.state = { login: false };
  }

  render () {
    if (this.state.login) {
      return(
        <div className="main-wrapper">
          <Cards message="kavita" />
        </div>
      );
    }
    return(
			<div className="main-wrapper">
				<Login />
			</div>
    );
  }
}
