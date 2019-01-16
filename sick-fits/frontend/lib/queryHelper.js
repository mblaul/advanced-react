import Error from '../components/ErrorMessage';

export function queryState({ error, loading }) {
	if (error) return <Error error={error} />;
	if (loading) return <p>Loading...</p>;
}
