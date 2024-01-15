import { ClearAllSchema, AppendSchema, UpdateGridSize, UpdateGridDisplayOptions, UpdateGridName, SetJsonData, SetValuesForSchema as SetValuesForSchemaMutation } from "./Mutations.js";
import { ApplyMutation, SelectLoadedSchemas, SetSelectedSchemaValue, SelectLoadedJsonData, LoadCellData, UseSelector } from "./data/AppState.js";
 

// Load a grid save file into the store.
export const LoadGridJsonData = (jsonText) => {
	ApplyMutation(SetJsonData, {rawJson: jsonText});
}

// Loads a configuration profile (not a grid save file!).
const LoadGridProfile = ({title, config, schema}) => {
    // Clear the current profile.
    ApplyMutation(ClearCurrentProfile);
    // Update grid attributes.
    ApplyMutation(UpdateGridDisplayOptions, { cellSize: config.cellSize, cellGap: config.cellGap, showCoords: config.showCoords });
    ApplyMutation(UpdateGridSize, { width: config.columnCount, height: config.rowCount });
    ApplyMutation(UpdateGridName,  { name: title });
    // Load schema.
    schema.forEach((schemaDef) => {
        AddSchema(schemaDef);
    });
}


 //// Grid
 export const UpdateGridConfig = (width, height, cellSize, cellGap, showCoords) => {
    ApplyMutation(UpdateGridSize, { width, height });
    ApplyMutation(UpdateGridDisplayOptions, { cellSize, cellGap, showCoords });
}

export const RefreshGridFromLoadedJson = () => {
	const profile = UseSelector(SelectLoadedJsonData);
	LoadGridProfile(profile);
	ApplyMutation(LoadCellData, { cellData: profile.cellData });
}



//// Schema
export const ClearCurrentProfile = () => {
    ApplyMutation(ClearAllSchema, {});
    ApplyMutation(SetSelectedSchemaValue, { schemaIndex: 0, valueIndex: 0 });
}

export const AddSchema = (schema) => {
    const newIndex = UseSelector(SelectLoadedSchemas).length;
    ApplyMutation(AppendSchema, {schema});
    ApplyMutation(SetValuesForSchemaMutation, {schemaIndex: newIndex, schemaValues: schema.values});
}

export const SetValuesForSchema = (index, values) => {
    ApplyMutation(SetValuesForSchemaMutation, {schemaIndex: index, schemaValues: values});
}

