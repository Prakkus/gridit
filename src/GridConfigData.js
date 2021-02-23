const GridConfigData = (initialRowCount, initialColumnCount,initialCellSize, initialCellGap) => {
	let listeners = new Set();
	let data = {
		rowCount: initialRowCount,
		columnCount: initialColumnCount,
		cellSize: initialCellSize,
		cellGap: initialCellGap
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
		Object.entries(validUpdates).forEach(([property, value]) => {
			data[property] = parseInt(value);
		});
		onValuesUpdated(validUpdates);
	}

	const read = () => {
		return {...data};
	}

	return {read, subscribe, update};
}

export default GridConfigData;