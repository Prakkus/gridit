export const AppendSchema = (state, {schema}) => state.schema.tables.push({...schema}) - 1;
export const ClearAllSchema = (state) => state.schema.tables = [];
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