export const AppendSchema = (state, {schema}) => state.schema.tables.push({...schema}) - 1;
export const DeleteAllSchema = (state) => state.schema.tables = [];
export const SetValuesForSchema = (state, {schemaIndex, schemaValues}) => {
	const schema = state.schema.tables[schemaIndex];
	state.schema.tables[schemaIndex] = {...schema, values: [...schemaValues]};
}
export const SetJsonData = (state, {rawJson}) => {
    state.loadedJson.rawJson = rawJson;
    state.loadedJson.parsedJson = JSON.parse(rawJson);
    state.loadedJson.title = state.loadedJson.parsedJson.title;
};

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

export const SetSelectedSchemaValue = (state, { schemaIndex, valueIndex }) => {
	state.schema.selectedSchemaIndex = schemaIndex;
	state.schema.selectedValueIndex = valueIndex;
}

//// Cells
export const ClearAllCellData = (state) => {
	state.cellData.clear();
}

export const LoadCellData = (state, { cellData }) => {
	// Our cells are serialized as an array of objects.
	// Pull them out into a map by cellId and store that instead.
	const map = new Map(cellData.map(value => [value.cellId, {...value}]));
	state.cellData = map;
}

// Todo: Remove data for cells which were once changed, but once again match the defaults.
// The store only tracks cells which have been modified, but doesn't know if something has been modified, then reset.
// If I update a cell's attributes, it gets added to CellData and those values are used instead of the default values. 
// If I then change those attributes back so that the cell matches the 'default' values again, it remains in cellData unecessarily.
export const UpdateCells = (state, { cellIds, attributeUpdates, defaultCellAttributes }) => {
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
			const newEntry = {
				cellId,
				attributes: {
					...defaultCellAttributes,
					...attributeUpdates
				}
			}
			state.cellData.set(cellId, newEntry);
		}
	});
}