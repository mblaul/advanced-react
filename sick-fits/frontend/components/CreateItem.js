import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';

class CreateItem extends Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		return (
			<Form>
				<fieldset>
					<label htmlFor="title">
						<input type="text" id="title" name="title" placeholder="Title" />
					</label>
				</fieldset>
			</Form>
		);
	}
}

export default CreateItem;
