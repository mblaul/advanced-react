import React, { Component } from 'react';
import PaginationStyles from './styles/PaginationStyles';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Head from 'next/head';
import Link from 'next/link';
import { queryState } from '../lib/queryHelper';
import { perPage } from '../config';

const PAGINATION_QUERY = gql`
	query PAGINATION_QUERY {
		itemsConnection {
			aggregate {
				count
			}
		}
	}
`;

const Pagination = (props) => (
	<Query query={PAGINATION_QUERY}>
		{({ data, error, loading }) => {
			if (error || loading) return queryState({ error, loading });

			const { page } = props;
			const count = data.itemsConnection.aggregate.count;
			const pages = Math.ceil(count / perPage);

			return (
				<PaginationStyles>
					<Head>
						<title>
							Sick Fits - Page {page} of {pages}
						</title>
					</Head>
					<Link
						prefetch
						href={{
							pathname: 'items',
							query: { page: page - 1 }
						}}
					>
						<a className="prev" aria-disabled={page <= 1}>
							{'< Prev'}
						</a>
					</Link>
					<p>
						Page {props.page} of {pages}
					</p>
					<p>{count} items total</p>
					<Link
						prefetch
						href={{
							pathname: 'items',
							query: { page: page + 1 }
						}}
					>
						<a className="next" aria-disabled={page >= pages}>
							{'Next >'}
						</a>
					</Link>
				</PaginationStyles>
			);
		}}
	</Query>
);

export default Pagination;
