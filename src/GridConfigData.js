const GridConfigData = ({ rowCount, columnCount,cellSize, cellGap, showCoords }) => {
	let listeners = new Set();
	let data = {
		rowCount,
		columnCount,
		cellSize,
		cellGap,
		showCoords
	}

	const onValuesUpdated = (newValues) => {
		listeners.forEach((listener) => listener(newValues));
	}

	const subscribe = (callback) => listeners.add(callback);

	const update = (params) => {
		const validUpdates = Object.fromEntries(
			Object.entries(params).filter(([property, value]) => {
				if (property in data === false) return false;
				if (data[property] === value) return false;
				return true;
		}));
		// Todo: properly handle input types here. Right now this will only work if
		// all the data here is ints and bools
		Object.entries(validUpdates).forEach(([property, value]) => {
			if (typeof value == 'boolean') {
				data[property] = value;
			} else {
				data[property] = parseInt(value);
			}
		});
		onValuesUpdated(validUpdates);
	}

	const read = () => {
		return {...data};
	}

	return {read, subscribe, update};
}

export default GridConfigData;