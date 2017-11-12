import * as React from 'react';

import Cards from './Cards';

interface AppProps {
  message: string;
}

export default class App extends React.Component < AppProps, any > {
  constructor (props: any) {
    super(props);
    this.state = {};
  }

  render () {
    return(
			<div className="main-wrapper">
				<Cards message="kavita" />
			</div>
    );
  }
}
