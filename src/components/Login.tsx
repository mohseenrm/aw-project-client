import axios from 'axios';
import * as React from 'react';

import {
	Button,
	Icon,
  Input,
  Message,
} from 'semantic-ui-react';

interface LoginProps {
  callbackParent: Function;
  getLoginUserData: Function;
  token: string;
  username: string;
}

interface LoginState {
  email: string;
  password: string;
}

export default class Login extends React.Component < LoginProps, LoginState > {
  constructor (props: any) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.createUser = this.createUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sendAuthRequest = this.sendAuthRequest.bind(this);
  }

  createUser (event: any) {
    this.props.callbackParent(true);
  }

  sendAuthRequest () {
    const { email, password } = this.state;

    return axios({
      method: 'post',
      url: 'http://ec2-18-221-144-47.us-east-2.compute.amazonaws.com/userservice/uservalidation/',
      responseType: 'json',
      data: {
        email,
        pswd: password,
        remember_me: '1',
      },
    }).then((response: any) => {
      const auth = response.data.responseData.content.is_authorized || false;
      const token = response.data.responseData.content['X-Authorization-Token'] || '';
      const username = response.data.responseData.content.username || '';
      this.props.getLoginUserData(auth, token, username);
    })
    .catch((error: any) => console.log(error));
  }

  handleChange (e: any, state: any) {
    const { name, value } = e.target;

    this.setState(
			Object.assign(
				{},
				this.state,
				{ [name]: value },
			),
		);
  }

  render () {
    if (this.props.username !== '') {
      return(
        <div className="main-wrapper--login">
          <Input
            className="m-1"
            icon={<Icon name="user" inverted={true} circular={true} link={true} color="blue" />}
            iconPosition="left"
            name="email"
            onChange={this.handleChange}
            placeholder="John Bohnam"
            size="huge"
          />
          <Input
            className="m-1"
            icon={<Icon name="lock" inverted={true} circular={true} link={true} color="blue" />}
            iconPosition="left"
            name="password"
            onChange={this.handleChange}
            placeholder="Password"
            size="huge"
            type="password"
          />
          <div className="main-wrapper--login--buttons">
            <Button
              primary={true}
              size="huge"
              onClick={this.sendAuthRequest}
            >
              Login
            </Button>
            <Button
              secondary={true}
              size="huge"
              onClick={this.createUser}
            >
              Create User
            </Button>
          </div>
          <Message success={true}>
            <Message.Header>
              User: {this.props.username} was created successfully!
            </Message.Header>
            Token: {this.props.token}
          </Message>
        </div>
      );
    } else {
      return(
        <div className="main-wrapper--login">
          <Input
            className="m-1"
            icon={<Icon name="user" inverted={true} circular={true} link={true} color="blue" />}
            iconPosition="left"
            name="email"
            onChange={this.handleChange}
            placeholder="John Bohnam"
            size="huge"
          />
          <Input
            className="m-1"
            icon={<Icon name="lock" inverted={true} circular={true} link={true} color="blue" />}
            iconPosition="left"
            name="password"
            onChange={this.handleChange}
            placeholder="Password"
            size="huge"
            type="password"
          />
          <div className="main-wrapper--login--buttons">
            <Button
              primary={true}
              size="huge"
              onClick={this.sendAuthRequest}
            >
              Login
            </Button>
            <Button
              size="huge"
              onClick={this.createUser}
            >
              Create User
            </Button>
          </div>
        </div>
      );
    }
  }
}
