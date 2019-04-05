import React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import SickButton from './styles/SickButton';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import CloseButton from './styles/CartStyles';

const LOCAL_STATE_QUERY = gql`
  query {
    cartOpen @client
  }
`;

const Cart = () => {
  return (
    <Query query={LOCAL_STATE_QUERY}>
      {({ data }) => (
        <CartStyles open={data.cartOpen}>
          <header>
            <CloseButton title="close">&times;</CloseButton>
            <Supreme>Your Cart</Supreme>
            <p>You have __ items in your cart</p>
          </header>
          <footer>
            <p>$10.10</p>
            <SickButton>Checkout</SickButton>
          </footer>
        </CartStyles>
      )}
    </Query>
  );
};

export default Cart;
