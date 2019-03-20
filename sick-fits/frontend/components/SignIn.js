import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import { queryState } from '../lib/queryHelper';
import { CURRENT_USER_QUERY } from './User';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

class SignIn extends Component {
  state = {
    email: '',
    password: '',
  };

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { email, password } = this.state;

    return (
      <Mutation mutation={SIGNIN_MUTATION} variables={this.state} refetchQueries={[ { query: CURRENT_USER_QUERY } ]}>
        {(signin, { error, loading }) => {
          return (
            <Form
              method="post"
              onSubmit={async (e) => {
                e.preventDefault();
                await signin();
                this.setState({ name: '', email: '', password: '' });
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Sign in</h2>
                {error && queryState({ error })}
                <label htmlFor="email">
                  Email
                  <input type="text" name="email" value={email} onChange={this.saveToState} />
                </label>
                <label htmlFor="password">
                  Password
                  <input type="text" name="password" value={password} onChange={this.saveToState} />
                </label>

                <button type="submit">Sign In</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default SignIn;
