import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import queryState from '../lib/queryHelper';

const SIGNUP_MUTATION = gql`
	mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
		signup(email: $email, name: $name, password: $password) {
			id
			email
			Name
		}
	}
`;

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
			<Mutation mutation={SIGNUP_MUTATION} variables={this.state}>
				{(signup, { error, loading }) => {
					return (
						<Form>
							<fieldset disabled={loading} aria-busy={loading}>
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
				}}
			</Mutation>
		);
	}
}

export default SignUp;
