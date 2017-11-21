import * as React from 'react';

import Profile from './Profile';
import Login from './Login';
import CreateUser from './CreateUser';

interface AppProps {
  message: string;
}

interface AppState {
  auth: boolean;
  create: boolean;
  token: string;
  username: string;
}

export default class App extends React.Component < AppProps, AppState > {
  constructor (props: any) {
    super(props);
    this.state = {
      auth: false,
      create: false,
      token: '',
      username: '',
    };

    /* This pattern is used to bind context of the current component */
    this.shouldCreateUser = this.shouldCreateUser.bind(this);
    this.getCreateUserData = this.getCreateUserData.bind(this);
    this.getLoginUserData = this.getLoginUserData.bind(this);
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

  getCreateUserData (create: boolean, token: string = '', username: string = '') {
    this.setState(
      Object.assign(
        {},
        this.state,
        {
          create,
          token,
          username,
        },
      ),
    );
  }

  getLoginUserData (auth: boolean, token: string, username: string) {
    this.setState(
      Object.assign(
        {},
        this.state,
        {
          auth,
          token,
          username,
        },
      ),
    );
  }

  render () {
    if (this.state.create) {
      return(
        <CreateUser
          callbackParent={this.shouldCreateUser}
          getCreateUserData={this.getCreateUserData}
        />
      );
    } else if (this.state.auth) {
      return(
        <div className="main-wrapper">
          <Profile
            token={this.state.token}
            username={this.state.username}
          />
        </div>
      );
    } else {
      return(
        <div className="main-wrapper">
          <Login
            callbackParent={this.shouldCreateUser}
            token={this.state.token}
            username={this.state.username}
            getLoginUserData={this.getLoginUserData}
          />
        </div>
      );
    }
  }
}
