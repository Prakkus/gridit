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
	return state.cellData.get(cellId);
}

export const SelectAllCellData = (state) => {
	return state.cellData;
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
// Todo: Remove data for cells which were once changed, but once again match the defaults.
// The store only tracks cells which have been modified, but doesn't know if something has been modified, then reset.
// If I update a cell's attributes, it gets added to CellData and those values are used instead of the default values. 
// If I then change those attributes back so that the cell matches the 'default' values again, it remains in cellData unecessarily.
export const UpdateCells = (state, { cellIds, attributeUpdates }) => {
	cellIds.forEach((cellId) => {
		const existingData = state.cellData.get(cellId);
		if (existingData) {
			// If the cell already exists, update its attributes
			existingData.attributes = {
				...existingData.attributes,
				...attributeUpdates
			}
		} else {
			// Otherwise we need to create a new data entry for this cell.
			const defaultAttributes = SelectDefaultCellAttributes(state);
			const newEntry = {
				cellId,
				attributes: {
					...defaultAttributes,
					...attributeUpdates
				}
			}
			state.cellData.set(cellId, newEntry);
		}
	});
}
export const ClearAllCellData = (state) => {
	state.cellData.clear();
}

// Commands
// Load a grid save file into the store.
export const loadGridJsonData = (state, { jsonText }) => {
	state.loadedJson.rawJson = jsonText;
	state.loadedJson.parsedJson = JSON.parse(jsonText);
	state.loadedJson.title = state.loadedJson.parsedJson.title;
	refreshGridFromLoadedJson(state);
}
export const refreshGridFromLoadedJson = (state) => {
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
	loadCellData(state, { cellData: profile.cellData });
}

export const loadCellData = (state, { cellData }) => {
	// Our cells are serialized as an array of objects.
	// Pull them out into a map by cellId and store that instead.
	const map = new Map(cellData.map(value => [value.cellId, {...value}]));
	state.cellData = map;
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
		cellData: new Map()
	}
	const UseSelector = (selector) => selector(store);
	return { UseSelector, store }
}
export default initStore;