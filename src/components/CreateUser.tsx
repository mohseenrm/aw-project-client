import * as React from 'react';
import {
	Button,
	Divider,
	Form,
	Icon,
	Input,
 } from 'semantic-ui-react';

interface CreateUserProps {
  callbackParent: Function;
}

interface CreateUserState {
}

export default class CreateUser extends React.Component < CreateUserProps, CreateUserState > {
  constructor (props: any) {
    super(props);
		  this.state = {};
		  this.backToLogin = this.backToLogin.bind(this);
  }

  backToLogin (event: any) {
    this.props.callbackParent(false);
  }

  render () {
    return(
			<div className="main-wrapper--create-user">
				<Form size="big">
					<Form.Group unstackable={true} widths="equal">
						<Form.Field
							label="First name"
							control="input"
							placeholder="First name"
							width={4}
						/>
						<Form.Field
							label="Last name"
							control="input"
							placeholder="Last name"
							width={4}
						/>
					</Form.Group>
					<Form.Group unstackable={true} widths="equal">
						<Form.Field
							label="Username"
							control="input"
							placeholder="john_bohnam"
							width={4}
						/>
						<Form.Field
							label="Password"
							control="input"
							placeholder="password"
							width={4}
						/>
					</Form.Group>
					<div className="main-wrapper--create-user--buttons">
						<Button
							primary={true}
							size="huge"
						>
							Submit
						</Button>
						<Button
							primary={false}
							size="huge"
							onClick={this.backToLogin}
						>
							Close
						</Button>
					</div>
				</Form>
			</div>
    );
  }
}
