export default (initialState) => {
	const store = {...initialState};

	const UseSelector = (selector) => selector(store);

	return { store,  UseSelector }
}