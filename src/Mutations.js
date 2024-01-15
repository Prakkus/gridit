export const AppendSchema =  (schema) => (state) => state.schema.tables.push({...schema}) - 1;
export const ClearAllSchema = (state) => state.schema.tables = [];
export const SetValuesForSchema = (schemaIndex, schemaValues) => (state) => {
	const schema = state.schema.tables[schemaIndex];
	state.schema.tables[schemaIndex] = {...schema, values: [...schemaValues]};
}