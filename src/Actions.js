import { DeleteAllSchema, AppendSchema, LoadCellData, SetSelectedSchemaValue as SetSelectedSchemaValueMutation, ClearAllCellData as ClearAllCellDataMutation, UpdateGridSize, UpdateGridDisplayOptions, UpdateGridName as UpdateGridNameMutation, SetJsonData, SetValuesForSchema as SetValuesForSchemaMutation } from "./Mutations.js";
import { ApplyMutation, SelectLoadedSchemas, SelectLoadedJsonData, UseSelector, SelectGridSize, SelectGridDisplayOptions } from "./data/AppState.js";
 

// Load a grid save file into the store.
export const LoadGridJsonData = (jsonText) => {
	ApplyMutation(SetJsonData, {rawJson: jsonText});
    RefreshGridFromLoadedJson();
}

// Loads a configuration profile (not a grid save file!).
const LoadGridProfile = ({title, config, schema}) => {
    // Clear the current profile.
    ApplyMutation(ClearCurrentProfile);
    // Update grid attributes.
    ApplyMutation(UpdateGridDisplayOptions, { cellSize: config.cellSize, cellGap: config.cellGap, showCoords: config.showCoords });
    ApplyMutation(UpdateGridSize, { width: config.columnCount, height: config.rowCount });
    UpdateGridName(title);
    // Load schema.
    schema.forEach((schemaDef) => {
        AddSchema(schemaDef);
    });
}


 //// Grid
 export const UpdateGridConfig = (width, height, cellSize, cellGap, showCoords) => {
    // Only dispatch these if they actually will change.
    let currentSize = UseSelector(SelectGridSize);
    if (width != currentSize.x || height != currentSize.y) {
        ApplyMutation(UpdateGridSize, { width, height });
    }
    let currentOptions = UseSelector(SelectGridDisplayOptions);
    if (cellSize != currentOptions.cellSize || cellGap != currentOptions.cellGap || showCoords != currentOptions.showCoords) {
        ApplyMutation(UpdateGridDisplayOptions, { cellSize, cellGap, showCoords });
    }
}

export const RefreshGridFromLoadedJson = () => {
	const profile = UseSelector(SelectLoadedJsonData);
	LoadGridProfile(profile);
	ApplyMutation(LoadCellData, { cellData: profile.cellData });
}

export const ClearAllCellData = () => {
	ApplyMutation(ClearAllCellDataMutation, {});
}

export const UpdateGridName = (name) => {
    ApplyMutation(UpdateGridNameMutation, { name });
}

//// Schema
export const ClearCurrentProfile = () => {
    ApplyMutation(DeleteAllSchema, {});
    ApplyMutation(SetSelectedSchemaValue, { schemaIndex: 0, valueIndex: 0 });
}

export const AddSchema = (schema) => {
    const newIndex = UseSelector(SelectLoadedSchemas).length;
    ApplyMutation(AppendSchema, { schema });
    ApplyMutation(SetValuesForSchemaMutation, { schemaIndex: newIndex, schemaValues: schema.values });
}

export const SetValuesForSchema = (index, values) => {
    ApplyMutation(SetValuesForSchemaMutation, { schemaIndex: index, schemaValues: values });
}

export const SetSelectedSchemaValue = (schemaIndex, valueIndex) => {
    ApplyMutation(SetSelectedSchemaValueMutation, { schemaIndex, valueIndex });
}