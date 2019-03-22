import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import { queryState } from '../lib/queryHelper';
import { CURRENT_USER_QUERY } from './User';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

class RequestReset extends Component {
  state = {
    email: '',
  };

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { email } = this.state;

    return (
      <Mutation
        mutation={REQUEST_RESET_MUTATION}
        variables={this.state}
        refetchQueries={[ { query: CURRENT_USER_QUERY } ]}
      >
        {(requestReset, { error, loading, called }) => {
          return (
            <Form
              method="post"
              onSubmit={async (e) => {
                e.preventDefault();
                await requestReset();
                this.setState({ email: '' });
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Request a password reset</h2>
                {error && queryState({ error })}
                {!error && !loading && called && <p>Success! Check your email for a link</p>}
                <label htmlFor="email">
                  Email
                  <input type="text" name="email" value={email} onChange={this.saveToState} />
                </label>
                <button type="submit">Request Reset</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default RequestReset;
