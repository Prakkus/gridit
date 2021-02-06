const defaultAttributes = {
	fillColor: 'default',
	symbol: ''
}

const initialCellState = {
	cellId: '-1,-1',
	x: -1,
	y: -1,
	attributes: defaultAttributes
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

const serializeCells = (cellData) => {
	return Array.from(cellData.values());
}

//ES6 map's aren't serialized by default, so we have to do that manually.
//Plus it's just nice to be able to customize how we serialize our grid values.
// const gridJsonReplacer = (key, value) => {
//   if(value instanceof Map) {
//     return {
//       dataType: 'Map',
//       value: value.entries().map(([key, value]) => value), // or with spread: value: [...value]
//     };
//   } else {
//     return value;
//   }
// }

// const gridJsonReviver = (key, value) => {
// 	if(typeof value === 'object' && value !== null) {
//     	if (value.dataType === 'Map') {
//       		return new Map(value.value);
//     	}
//   	}
//   	return value;
// }

const GridData = () => {
	let listeners = new Set();
	let cellData = new Map();  //Map of cellId->cellState (what is the state of a given cellId?)

	let rowCount;
	let columnCount;

	const onCellStateUpdated = (cellState) => {
		listeners.forEach((listener) => listener(cellState));
	}

	const updateCellStateById = (cellId, propUpdates) => {
		const currentState = cellData.get(cellId);
		updateCellState(currentState, propUpdates);
	}

	const updateCellState = (cellState, propUpdates) => {
		const newState = { 
			...cellState,
			attributes: {
				...cellState.attributes,
				...propUpdates
			}
		};
		cellData.set(cellState.cellId, newState);
		onCellStateUpdated(newState);
	}


	const resetAllCellStates = () => {
		cellData.forEach((cellState, cellId) => {
			updateCellState(cellState, initialCellState.attributes);
		});
	}

	const getAllCells = () => new Map(cellData);

	const getCellStateById = (cellId) => cellData.get(cellId);

	const addUpdateListener = (callback) => listeners.add(callback);

	const initGridData = (rows, cols) => {
		rowCount = rows;
		columnCount = cols;
		listeners.clear();
		//If this grid was previously initalized, copy the state of any cells which still exist to the resized grid
		const newMap = constructCellMap(rowCount, columnCount, initialCellState); //Map of cellId->cellState (what is the state of a given cellId?)
		cellData.forEach((oldCell, oldId) => {
			if (!newMap.has(oldId)) return;
			newMap.set(oldId, oldCell);
		});
		cellData = newMap;
	}

	const getNonDefaultCells = () => {
		return serializeCells(cellData).filter((cellState) => cellState.attributes.fillColor != initialCellState.attributes.fillColor || cellState.attributes.symbol != initialCellState.attributes.symbol);
	}

	const getExportData = () => {
		const data = {
			config: {
				rowCount,
				columnCount
			},
			cells: getNonDefaultCells()
		}
		return data;
	}

	return { initialCellState, initGridData, resetAllCellStates, getCellStateById, updateCellStateById, getAllCells, addUpdateListener, getExportData, getNonDefaultCells };
}
		
export default GridData;