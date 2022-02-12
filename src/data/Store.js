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
				const propData = mapStateToProps(store);
				const allProps = {...userProps, ...propData};
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

	const RenderAllConnected = () => {
		connectedComponents.forEach(({ Render }) => {
			Render();
		});
	}

	const UseSelector = (selector) => {
		return selector(store);
	}
	
	const ApplyMutation = (mutation, args) => {
		mutation(store, args);
		console.log("mutation applied: " + mutation.name);
		// Todo: What if this mutation was a no-op? Can we detect that and bail quicker than just rendering everything?
		RenderAllConnected();
		// OnMutationCompleted.forEach((listener) => listener(store, mutation, args));
	}

	// const AddMutationStartingListener = (listener) => {
	// 	OnMutationCompleted.add(listener);
	// }

	// const RemoveMutationStartingListener = (listener) => {
	// 	OnMutationCompleted.remove(listener);
	// }

	return { store, Connect, UseSelector, ApplyMutation, }
}