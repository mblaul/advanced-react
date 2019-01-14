import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';

const CREATE_ITEM_MUTATION = gql`
	mutation CREATE_ITEM_MUTATION(
		$title: String!
		$description: String!
		$price: Int!
		$image: String
		$largeImage: String
	) {
		createItem(title: $title, description: $description, price: $price, image: $image, largeImage: $largeImage) {
			id
		}
	}
`;

class CreateItem extends Component {
	state = {
		title: 'Jordans',
		description: 'These are HOT',
		price: 240.0,
		image: 'nike.png',
		largeImage: 'nikes.png'
	};

	handleChange = (e) => {
		const { name, type, value } = e.target;

		const val = type === 'number' ? parseFloat(value) : value;

		this.setState({ [name]: val });
	};

	render() {
		const { title, price, description } = this.state;

		return (
			<Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
				{(createItem, { loading, error }) => (
					<Form
						onSubmit={async (e) => {
							// Stop form from submitting
							e.preventDefault();
							// Call the mutation
							const res = await createItem();
							// Move user to single item page
							Router.push({
								pathname: '/item',
								query: { id: res.data.createItem.id }
							});
						}}
					>
						<Error error={error} />
						<fieldset disabled={loading} aria-busy={loading}>
							<label htmlFor="title">
								Title
								<input
									type="text"
									id="title"
									name="title"
									placeholder="Title"
									required
									value={title}
									onChange={this.handleChange}
								/>
							</label>
							<label htmlFor="price">
								Price
								<input
									type="number"
									id="price"
									name="price"
									placeholder="Price"
									required
									value={price}
									onChange={this.handleChange}
								/>
							</label>
							<label htmlFor="description">
								Description
								<textarea
									id="description"
									name="description"
									placeholder="Enter A Description"
									required
									value={description}
									onChange={this.handleChange}
								/>
							</label>
						</fieldset>
						<button type="submit">Submit</button>
					</Form>
				)}
			</Mutation>
		);
	}
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };
