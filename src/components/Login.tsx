import * as React from 'react';
import {
	Button,
	Icon,
	Input,
} from 'semantic-ui-react';

interface LoginProps {
  callbackParent: Function;
}

interface LoginState {
}

export default class Login extends React.Component < LoginProps, LoginState > {
  constructor (props: any) {
    super(props);
		  this.state = {};

		  this.createUser = this.createUser.bind(this);
  }

  createUser (event: any) {
    this.props.callbackParent(true);
  }

  render () {
    return(
			<div className="main-wrapper--login">
				<Input
					icon={<Icon name="user" inverted={true} circular={true} link={true} color="blue" />}
					iconPosition="left"
					placeholder="John Bohnam"
					size="large"
				/>
				<Input
					icon={<Icon name="lock" inverted={true} circular={true} link={true} color="blue" />}
					iconPosition="left"
					placeholder="Password"
					size="large"
					type="password"
				/>
				<Button
					primary={true}
					size="huge"
				>
					Login
				</Button>
				<Button
					primary={true}
					size="huge"
					onClick={this.createUser}
				>
					Create User
				</Button>
			</div>
    );
  }
}
