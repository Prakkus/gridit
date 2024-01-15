import { ClearAllSchema, AppendSchema, SetValuesForSchema as SetValuesForSchemaMutation } from "./Mutations.js";
import { ApplyMutation, UpdateGridSize, UpdateGridDisplayOptions, UpdateGridName, SetSelectedSchemaValue, SelectLoadedJsonData, LoadCellData } from "./data/AppState.js";
 

 //// Grid
 export const UpdateGridConfig = (width, height, cellSize, cellGap, showCoords) => {
    ApplyMutation(UpdateGridSize, { width, height });
    ApplyMutation(UpdateGridDisplayOptions, { cellSize, cellGap, showCoords });
}

export const RefreshGridFromLoadedJson = (state) => {
	// Loads a configuration profile (not a grid save file!).
	const LoadGridProfile = (state, {title, config, schema}) => {
		// Clear the current profile.
		ClearCurrentProfile(state);
		// Update grid attributes.
		UpdateGridDisplayOptions(state, { cellSize: config.cellSize, cellGap: config.cellGap, showCoords: config.showCoords });
		UpdateGridSize(state, { width: config.columnCount, height: config.rowCount });
		UpdateGridName(state, { name: title });
		// Load schema.
		schema.forEach((schemaDef) => {
			AddSchema(state, { schema: schemaDef });
		});
	}
	const profile = SelectLoadedJsonData(state);
	LoadGridProfile(state, profile);
	LoadCellData(state, { cellData: profile.cellData });
}



//// Schema
export const ClearCurrentProfile = () => {
    ApplyMutation(ClearAllSchema, {});
    ApplyMutation(SetSelectedSchemaValue, { schemaIndex: 0, valueIndex: 0 });
}

export const AddSchema = (schema) => {
    ApplyMutation(AppendSchema(schema), {});
    ApplyMutation(SetValuesForSchemaMutation(newIndex, schema.values), {});
}

export const SetValuesForSchema = (index, values) => {
    ApplyMutation(SetValuesForSchemaMutation(index, values), {});
}

