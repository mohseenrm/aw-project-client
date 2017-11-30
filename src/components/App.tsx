import * as React from 'react';
import { Tab } from 'semantic-ui-react';

import Analytics from './Analytics';
import CreateUser from './CreateUser';
import Dashboard from './Dashboard';
import Explore from './Explore';
import Login from './Login';
import Profile from './Profile';
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
    this.getCreateUserData = this.getCreateUserData.bind(this);
    this.getLoginUserData = this.getLoginUserData.bind(this);
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
      const panes = [
        {
          menuItem: {
            content: 'Cards',
            icon: 'user',
            inverted: true,
            key: 'user',
            size: 'massive',
          },
          render: () => {
            return(
              <div className="profile-wrapper">
                <Profile
                  token={this.state.token}
                  username={this.state.username}
                />
              </div>
            );
          },
        },
        {
          menuItem: {
            content: 'Feed',
            icon: 'line chart',
            inverted: true,
            key: 'feed',
            size: 'massive',
          },
          render: () => <Tab.Pane>Tab 2 Content</Tab.Pane>,
        },
        {
          menuItem: {
            content: 'Explore',
            icon: 'search',
            inverted: true,
            key: 'explore',
            size: 'massive',
          },
          render: () => <Explore />,
        },
        {
          menuItem: {
            content: 'Analytics',
            icon: 'search',
            inverted: true,
            key: 'analytics',
            size: 'massive',
          },
          render: () => <Analytics />,
        },
        {
          menuItem: {
            content: 'Dashboard',
            icon: 'search',
            inverted: true,
            key: 'dashboard',
            size: 'massive',
          },
          render: () => <Dashboard />,
        },
      ];

      return(
        <Tab
          panes={panes}
        />
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
