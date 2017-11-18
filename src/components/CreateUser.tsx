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
  email: string;
  password: string;
}

export default class CreateUser extends React.Component < CreateUserProps, CreateUserState > {
  constructor (props: any) {
	/* tslint:disable */
		super(props);
		this.state = {
			first_name: '',
			last_name: '',
			email: '',
			password: '',
		};

		this.backToLogin = this.backToLogin.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.sendRequest = this.sendRequest.bind(this);
		/* tslint:enable */
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

  sendRequest (event: any) {
		/* tslint:disable */
		const { first_name, last_name, email, password } = this.state;

		const payload = {
			email,
			pswd: password,
			details: {
				first_name,
				last_name,
			}
		};
		return axios({
			method: 'post',
			url: 'http://ec2-18-221-144-47.us-east-2.compute.amazonaws.com/userservice/createuser/',
			responseType: 'json',
			headers: {
				'Accept': 'application/json',
				'Content-Type':'application/json',
				// 'Origin': ['POST','PUT','DELETE', 'GET', 'HEAD', 'OPTIONS', 'PATCH'],
			},
			data: JSON.stringify(payload),
		}).then(response => console.log(response))
		.catch(error => console.log(error));
		/* tslint:enable */
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
							label="Email"
							name="email"
							onChange={this.handleChange}
							control="input"
							placeholder="john_bohnam@asu.edu"
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
