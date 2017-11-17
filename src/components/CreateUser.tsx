import axios from 'axios';
import * as React from 'react';

import {
	Button,
	Form,
	Input,
 } from 'semantic-ui-react';

interface CreateUserProps {
  callbackParent: Function;
}

interface CreateUserState {
	first_name: string;
	last_name: string;
	user_name: string;
	password: string;
}

export default class CreateUser extends React.Component < CreateUserProps, CreateUserState > {
  constructor (props: any) {
    super(props);
		this.state = {
			first_name: '',
			last_name: '',
			user_name: '',
			password: '',
		};

		this.backToLogin = this.backToLogin.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange (e: any, state: any) {
		console.log(e.target);
		const { name, value } = e.target;

		this.setState(
			Object.assign(
				{},
				this.state,
				{ [name]: value },
			),
		);
	}
	
	sendRequest (event: any) {
		console.log(this.state);
	}

  backToLogin (event: any) {
    this.props.callbackParent(false);
  }

  render () {
    return(
			<div className="main-wrapper--create-user">
				<Form size="big" onSubmit={this.sendRequest}>
					<Form.Group unstackable={true} widths="equal">
						<Form.Field
							label="First name"
							name="first_name"
							onChange={this.handleChange}
							control="input"
							placeholder="First name"
							width={4}
						/>
						<Form.Field
							label="Last name"
							name="last_name"
							onChange={this.handleChange}
							control="input"
							placeholder="Last name"
							width={4}
						/>
					</Form.Group>
					<Form.Group unstackable={true} widths="equal">
						<Form.Field
							label="Username"
							name="user_name"
							onChange={this.handleChange}
							control="input"
							placeholder="john_bohnam"
							width={4}
						/>
						<Form.Field
							label="Password"
							name="password"
							onChange={this.handleChange}
							control="input"
							placeholder="password"
							width={4}
						/>
					</Form.Group>
					<div className="main-wrapper--create-user--buttons">
						<Form.Button
							primary={true}
							size="huge"
						>
							Submit
						</Form.Button>
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
