import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { CURRENT_USER_QUERY } from './User';
import gql from 'graphql-tag';

const ADD_TO_CART_MUTATION = gql`
  mutation addToCart($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
    }
  }
`;

class AddToCart extends Component {
  render() {
    const { id } = this.props;
    return (
      <Mutation mutation={ADD_TO_CART_MUTATION} variables={{ id }} refetchQueries={[ { query: CURRENT_USER_QUERY } ]}>
        {(addToCart, { loading }) => (
          <button onClick={addToCart} disabled={loading}>
            Add To Cart
          </button>
        )}
      </Mutation>
    );
  }
}

export default AddToCart;
