// Loops through the existing schemas and builds a set of default cell attributes for each.
// Used as the initial attributes state for any cell.
export const SelectDefaultCellAttributes = (state) => {
	const types = {};
	state.schema.tables.forEach((schema) => {
		types[schema.cellAttribute] = 0;
	});

	return types;
}

export const SelectCellById = (state, { cellId }) => {
	return state.cellData.all.get(cellId);
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

export const SelectGridName = (state) => {
	return state.grid.name;
}

// Schema
const SelectAllSchemaData = (state) => {
	return state.schema;
}
export const SelectLoadedSchemas = (state) => {
	return SelectAllSchemaData(state).tables;
} 
export const SelectSchema = (state, { schemaIndex }) => {
	return SelectLoadedSchemas(state)[schemaIndex];
}
export const SelectSchemaDisplayName = (state, { schemaIndex }) => {
	return SelectSchema(state, { schemaIndex }).displayName;
}
export const SelectSchemaValue = (state, { schemaIndex, valueIndex }) => {
	return SelectSchema(state, { schemaIndex }).values[valueIndex];
}
export const SelectSchemaValues = (state, { schemaIndex }) => {
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
export const SelectCurrentlySelectedAttributeUpdate = state => {
	const { selectedSchemaIndex, selectedValueIndex } = SelectCurrentlySelectedSchemaValue(state);
	const loadedSchemas = SelectLoadedSchemas(state);
	return { 
		[loadedSchemas[selectedSchemaIndex].cellAttribute] : selectedValueIndex
	};
}
export const loadValuesIntoSchema = (state, { schemaIndex, schemaValues }) => {
	const schema = state.schema.tables[schemaIndex];
	state.schema.tables[schemaIndex] = {...schema, values: [...schemaValues]};
}
export const loadSchema = (state, { schema }) => {
	const newIndex = state.schema.tables.push({...schema}) - 1;
	loadValuesIntoSchema(state, { schemaIndex: newIndex, schemaValues: schema.values });
}

export const SelectSaveData = (state) => {
	const gridName = SelectGridName(state);
	const gridSize = SelectGridSize(state);
	const { cellSize, cellGap, showCoords } = SelectGridDisplayOptions(state);
	const schemaTables = SelectLoadedSchemas(state);
	const cellData = Array.from(SelectAllCellData(state).values());
	console.log(cellData);
	return {
		title: gridName, 
		config: {
			columnCount: gridSize.x,
			rowCount: gridSize.y, 
			cellSize,
			cellGap,
			showCoords
		},
		schema: schemaTables, 
		cellData
	}
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

// Cells
export const UpdateCells = (state, { cellIds, attributeUpdates }) => {
	cellIds.forEach((cellId) => {
		const existingData = state.cellData.all.get(cellId);
		if (existingData) {
			// If the cell already exists, update its attributes
			existingData.attributes = {
				...existingData.attributes,
				...attributeUpdates
			}
		} else {
			// Otherwise we need to create a new data entry for this cell.
			const defaultAttributes = SelectDefaultCellAttributes(state);
			console.log(defaultAttributes);
			const newEntry = {
				cellId,
				attributes: {
					...defaultAttributes,
					...attributeUpdates
				}
			}
			state.cellData.all.set(cellId, newEntry);
		}
	})
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
			UpdateGridSize(state, { width: config.columnCount, height: config.rowCount });
			UpdateGridName(state, { name: title });
			// Load schema.
			schema.forEach((schemaDef) => {
				loadSchema(state, { schema: schemaDef });
			});
		}
		const profile = SelectLoadedJsonData(state);
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
	// Our cells are serialized as an array of objects.
	// Pull them out into a map by cellId and store that instead.
	const map = new Map(cellData.map(value => [value.cellId, value]));
	state.cellData.setCellData(map);
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