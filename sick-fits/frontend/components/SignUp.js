import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import queryState from '../lib/queryHelper';

class SignUp extends Component {
	state = {
		email: '',
		name: '',
		password: ''
	};

	saveToState = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		const { email, name, password } = this.state;

		return (
			<Form>
				<fieldset>
					<h2>Sign up for an account</h2>
					<label htmlFor="email">
						Email
						<input type="text" name="email" value={email} onChange={this.saveToState} />
					</label>
					<label htmlFor="name">
						Name
						<input type="text" name="name" value={name} onChange={this.saveToState} />
					</label>
					<label htmlFor="password">
						Password
						<input type="text" name="password" value={password} onChange={this.saveToState} />
					</label>

					<button type="submit">Sign Up!</button>
				</fieldset>
			</Form>
		);
	}
}

export default SignUp;
