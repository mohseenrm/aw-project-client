import * as React from 'react';

import Cards from './Cards';
import Login from './Login';
import CreateUser from './CreateUser';

interface AppProps {
  message: string;
}

interface AppState {
  auth: boolean;
  create: boolean;
}

export default class App extends React.Component < AppProps, AppState > {
  constructor (props: any) {
    super(props);
    this.state = {
      create: false,
      auth: false,
    };

    /* This pattern is used to bind context of the current component */
    this.shouldCreateUser = this.shouldCreateUser.bind(this);
  }

  shouldCreateUser (create: boolean) {
    this.setState(
      Object.assign(
        {},
        this.state,
        { create },
      ),
    );
  }

  render () {
    if (this.state.create) {
      console.log('here');
      return <CreateUser callbackParent={this.shouldCreateUser} />;
    } else if (this.state.auth) {
      return(
        <div className="main-wrapper">
          <Cards message="kavita" />
        </div>
      );
    } else {
      return(
        <div className="main-wrapper">
          <Login callbackParent={this.shouldCreateUser} />
        </div>
      );
    }
  }
}
