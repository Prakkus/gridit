const initialCellState = {
	cellId: '-1,-1',
	x: -1,
	y: -1,
	fillColor: 'default'
}

const constructCellMap = (rows, columns) => {
	let cellData = new Map();
	for (var x = 0; x < rows; x++) {
		for (var y = 0; y < columns; y++) {
			const cellState = {
				...initialCellState,
				cellId: x + ',' + y,
				x: x,
				y: y
			}
			cellData.set(cellState.cellId, cellState);
		}
	}
	return cellData;
}

const GridData = () => {
	let listeners = new Set();
	let cellData = new Map();  //Map of cellId->cellState (what is the state of a given cellId?)

	const onCellStateUpdated = (cellState) => {
		listeners.forEach((listener) => listener(cellState));
	}

	const updateCellStateById = (cellId, propUpdates) => {
		const currentState = cellData.get(cellId);
		updateCellState(currentState, propUpdates);
	}

	const updateCellState = (cellState, { fillColor } = propUpdates) => {
		const newState = { 
			...cellState,
			fillColor: fillColor
		};
		cellData.set(cellState.cellId, newState);
		onCellStateUpdated(newState);
	}


	const resetAllCellStates = () => {
		cellData.forEach((cellState, cellId) => {
			updateCellState(cellState, initialCellState);
		});
	}

	const getAllCells = () => cellData;

	const getCellStateById = (cellId) => cellData.get(cellId);

	const addUpdateListener = (callback) => listeners.add(callback);

	const initGridData = (rowCount, columnCount) => {
		listeners.clear();
		//If this grid was previously initalized, copy the state of any cells which still exist to the resized grid
		const newMap = constructCellMap(rowCount, columnCount, initialCellState); //Map of cellId->cellState (what is the state of a given cellId?)
		cellData.forEach((oldCell, oldId) => {
			if (!newMap.has(oldId)) return;
			newMap.set(oldId, oldCell);
		});
		cellData = newMap;
	}

	return { initGridData, resetAllCellStates, getCellStateById, updateCellStateById, getAllCells, addUpdateListener };
}
		
export default GridData;