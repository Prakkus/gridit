// Schema values
const defaultSymbolValue = {
	name: 'defaultSymbol',
	display: '',
	xOffset: 0,
	yOffset: 0,
	fontSize: '100%' 
};

const defaultColorValue = {
	name: 'defaultColor',
	hex: '71717A'
};

const defaultTileValue = {
	imageDataUrl: ''
};

const schemaDefaultMap = {
	background_color: defaultColorValue,
	symbol: defaultSymbolValue,
	tile_index_background: defaultTileValue
}


// Grid Values

// export const initialCellState = {
// 	cellId: '-1,-1',
// 	x: -1,
// 	y: -1,
// 	attributes: defaultAttributes
// }


// const constructCellMap = (rows, columns, defaultAttributes) => {
// 	let cellData = new Map();
// 	for (var y = rows - 1; y >= 0; y--) {
// 		for (var x = 0; x < columns; x++) {
// 			const cellState = {
// 				cellId: x + ',' + y,
// 				x: x,
// 				y: y,
// 				attributes: defaultAttributes
// 			}
// 			cellData.set(cellState.cellId, cellState);
// 		}
// 	}
// 	return cellData;
// }

// Loops through the existing schema and builds a set of default attributes for each.
// Used as the initial state for any cell.
export const SelectDefaultCellAttributes = (state) => {
	const types = {};
	state.schema.tables.forEach((schema) => {
		types[schema.cellAttribute] = 0;
	});

	return types;
}

export const SelectAllCellData = (state) => {
	return state.cellData.all;
}

export const SelectLoadedJsonData = (state) => {
	return state.loadedJson.parsedJson;
}

export const SelectGridDisplayOptions = (state) => {
	return state.grid.displayOptions;
}

export const SelectGridSize = (state) => {
	return state.grid.size;
}

// Schema
export const SelectLoadedSchemas = (state) => {
	return state.schema.tables;
} 
export const SelectSchema = (state, { schemaIndex }) => {
	return state.schema.tables[schemaIndex];
}
export const SelectSchemaDisplayName = (state, { schemaIndex }) => {
	return SelectSchema(state, { schemaIndex }).displayName;
}
export const SelectSchemaValue = (state, { schemaIndex, valueIndex }) => {
	return SelectSchema(state, { schemaIndex }).values[valueIndex];
}
export const SelectSchemaValues = (state, { schemaIndex, valueIndex }) => {
	return SelectSchema(state, { schemaIndex }).values;
}
export const SelectSchemaName = (state, { schemaIndex }) => {
	return SelectSchema(state, { schemaIndex }).name;
}
export const SelectSchemaTables = (state, { schemaIndex }) => {
	return SelectSchema(state, { schemaIndex }).tables;
}

export const ClearCurrentProfile = (state) => {
	state.schema.tables = [];
	SetSelectedSchemaValue(state, { schemaIndex: 0, valueIndex: 0 });	
}
export const SetSelectedSchemaValue = (state, { schemaIndex, valueIndex }) => {
	state.schema.selectedSchemaIndex = schemaIndex;
	state.schema.selectedValueIndex = valueIndex;
}
export const SelectCurrentlySelectedSchemaValue = (state) => {
	return {
		selectedSchemaIndex: state.schema.selectedSchemaIndex,
		selectedValueIndex: state.schema.selectedValueIndex
	}
}
export const loadValuesIntoSchema = (state, { schemaIndex, schemaValues }) => {
	const schema = state.schema.tables[schemaIndex];
	const defaultValue = schemaDefaultMap[schema.name];	
	state.schema.tables[schemaIndex] = {...schema, values: [defaultValue, ...schemaValues]};
}
export const loadSchema = (state, { schema }) => {
	const newIndex = state.schema.tables.push({...schema}) - 1;
	loadValuesIntoSchema(state, { schemaIndex: newIndex, schemaValues: schema.values });
}


// Grid 
export const UpdateGridName = (state, { name }) => {
	state.grid.name = name;
}

export const UpdateGridSize = (state, { width, height }) => {
	state.grid.size.x = width;
	state.grid.size.y = height;
}

export const UpdateGridDisplayOptions = (state, { cellSize, cellGap, showCoords }) => {
	state.grid.displayOptions.cellSize = cellSize;
	state.grid.displayOptions.cellGap = cellGap;
	state.grid.displayOptions.showCoords = showCoords;
}

// Commands
// Load a grid save file into the store.
export const loadGridJsonData = (state, { jsonText }) => {
	const refreshGridFromLoadedJson = (state) => {
		// Loads a configuration profile (not a grid save file!).
		const loadGridProfile = (state, {title, config, schema}) => {
			// Clear the current profile.
			ClearCurrentProfile(state);
			// Update grid attributes.
			UpdateGridDisplayOptions(state, { cellSize: config.cellSize, cellGap: config.cellGap, showCoords: config.showCoords });
			UpdateGridSize(state, { width: config.rowCount, height: config.columnCount });
			UpdateGridName(state, { name: title });
			// Load schema.
			schema.forEach((schemaDef) => {
				loadSchema(state, { schema: schemaDef });
			});
		}
		const profile = SelectLoadedJsonData(state);
		// Load the profile, then pull the new default cell state and use it to load the cellData.
		// Todo: maybe the initial state should be cached and I just update it when I load schemas.
		loadGridProfile(state, profile);
		console.log(profile.cellData);
		loadCellData(state, { cellData: profile.cellData });
	}
	state.loadedJson.rawJson = jsonText;
	state.loadedJson.parsedJson = JSON.parse(jsonText);
	state.loadedJson.title = state.loadedJson.parsedJson.title;
	refreshGridFromLoadedJson(state);
}

export const loadCellData = (state, { cellData }) => {
	state.cellData.setCellData(new Map(cellData));
}

const initStore = () => {
	let store =  {
		isDirty: true,
		loadedJson: {
			title: '',
			rawJson: '',
			parsedJson: '',
		},
		grid: {
			name: 'untitled',
			size: {
				x: 0,
				y: 0
			},
			displayOptions: {
				cellSize: 0,
				cellGap: 0,
				showCoords: false			
			}
		},
		schema: {
			tables: [],
			selectedSchemaIndex: 0,
			selectedValueIndex: 0,
		},
		cellData: {
			all: new Map(),
			// updateCellStateById: function(cellId, propUpdates) {
			// 	const currentState = this.all.get(cellId);
			// 	updateCellState(currentState, propUpdates);
			// },
			// updateCellState: function(cellState, propUpdates) {
			// 	const newState = { 
			// 		...cellState,
			// 		attributes: {
			// 			...cellState.attributes,
			// 			...propUpdates
			// 		}
			// 	};
			// 	this.all.set(cellState.cellId, newState);
			// },
			// resetAllCellStates: function() {
			// 	this.all.forEach((cellState, cellId) => {
			// 		updateCellState(cellState, initialCellState.attributes);
			// 	});
			// },
			// getAllCells: function() {
			// 	return new Map(this.all);
			// },
			// getCellStateById : function(cellId) {
			// 	return this.all.get(cellId);
			// },
			setCellData: function(cellData) {
				this.all = cellData;
			}
		}
	}
	const UseSelector = (selector) => selector(store);
	return { UseSelector, store }
}
export default initStore;