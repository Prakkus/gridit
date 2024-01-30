import { EventBus } from "../Utils.js";

// A generic store to contain the core app state. Consumers can apply mutations via
// Apply if they want to trigger events or directly if not. Events can be hooked into
// to react to the app state changing.
export default (initialState) => {
	const store = {...initialState};
	// let OnMutationCompleted = new Set();
	let beforeMutationEvent = EventBus();
	let afterMutationEvent = EventBus();

	// Todo: I should probably have a way to unsubscribe 
	// but there's no case where I'd do that in this app so I'm not worrying about it.
	const AddBeforeMutationListener = (callback) => beforeMutationEvent.AddListener(callback);
	const AddAfterMutationListener = (callback) => afterMutationEvent.AddListener(callback);


	const UseSelector = (selector) => {
		return selector(store);
	}
	
	const ApplyMutation = (mutation, args) => {
		beforeMutationEvent.Trigger(mutation, args);
		mutation(store, args);
		console.log("mutation applied: " + mutation.name);
		// Todo: What if this mutation was a no-op? Can we detect that and bail quicker?
		afterMutationEvent.Trigger(mutation, args);
	}

	return { store, UseSelector, ApplyMutation, AddBeforeMutationListener, AddAfterMutationListener}
}