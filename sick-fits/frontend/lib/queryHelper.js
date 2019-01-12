export function queryState({ error, loading }) {
	error && <p>{error.message}</p>;
	loading && <p>Loading...</p>;
}
