import { EventBus } from "../Utils.js";

// Todo: There's probably a smarter way to diff these.
const ObjectsAreDeepEqual = (obj1, obj2) =>
  Object.keys(obj1).length === Object.keys(obj2).length &&
  Object.keys(obj1).every(key => {
	if (typeof obj1[key] === 'object') {
		return ObjectsAreDeepEqual(obj1[key], obj2[key]);
	} else {
		return obj1[key] === obj2[key];
	}
  });

export default (initialState) => {
	const store = {...initialState};
	// let OnMutationCompleted = new Set();
	let connectedComponents = new Map();
	let beforeMutationEvent = EventBus();
	let afterMutationEvent = EventBus();
	let nextID = 0;

	const Connect = (mapStateToProps) => {
		return (renderComponent) => {
			const thisID = nextID;
			nextID++;
			const connectionRecord = { lastPropsUpdate: {}, Render: () => {} }
			connectedComponents.set(thisID, connectionRecord);
			// Todo: do I ever pass in userProps? Maybe they only make sense if components render their own children.
			const Render = (userProps) => {
				console.log(`[${thisID}] Render called, mapping state to props...`);
				console.log("UserProps is: " + JSON.stringify(userProps));
				const propData = mapStateToProps(store, userProps);
				const allProps = {...userProps, ...propData};
				console.log("FINALProps is: " + JSON.stringify(allProps));

				const previousProps = {...connectionRecord.lastPropsUpdate};
				// Don't re-render if the props are the same as last time.
				// console.log(JSON.stringify(propData));
				if (ObjectsAreDeepEqual(allProps, previousProps)) return;
				console.log(`[${thisID}] Has new data, re-rendering!`);
				// console.log(`[${thisID}] old: `, JSON.stringify(previousProps));
				// console.log(`[${thisID}] new: `, JSON.stringify(allProps));
				renderComponent(allProps);
				connectionRecord.lastPropsUpdate = {...allProps};
			}
			connectionRecord.Render = Render;
			return Render;
		}
	}

	// Todo: I should probably have a way to unsubscribe 
	// but there's no case where I'd do that in this app so I'm not worrying about it.
	const AddBeforeMutationListener = (callback) => beforeMutationEvent.AddListener(callback);
	const AddAfterMutationListener = (callback) => afterMutationEvent.AddListener(callback);

	const RenderAllConnected = () => {
		connectedComponents.forEach(({ Render }) => {
			Render();
		});
	}

	const UseSelector = (selector) => {
		return selector(store);
	}
	
	const ApplyMutation = (mutation, args) => {
		beforeMutationEvent.Trigger(mutation, args);
		mutation(store, args);
		console.log("mutation applied: " + mutation.name);
		// Todo: What if this mutation was a no-op? Can we detect that and bail quicker than just rendering everything?
		afterMutationEvent.Trigger(mutation, args);
		RenderAllConnected();
		// OnMutationCompleted.forEach((listener) => listener(store, mutation, args));
	}

	// const AddMutationStartingListener = (listener) => {
	// 	OnMutationCompleted.add(listener);
	// }

	// const RemoveMutationStartingListener = (listener) => {
	// 	OnMutationCompleted.remove(listener);
	// }

	return { store, Connect, UseSelector, ApplyMutation, AddBeforeMutationListener, AddAfterMutationListener}
}