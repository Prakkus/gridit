import InitStore from './Store.js';

// Loops through the existing schemas and builds a set of default cell attributes for each.
// Used as the initial attributes state for any cell.
export const SelectDefaultCellAttributes = (state) => {
	const types = {};
	state.schema.tables.forEach((schema) => {
		types[schema.name] = 0;
	});

	return types;
}

export const NULL_SCHEMA = {
	name: '',
	displayName: '',
	values : [
	]	
}

export const IsAnyCellDataLoaded = (state) => {
	return SelectAllCellData(state).size > 0;
}

export const SelectCellById = (state) => {
	return (cellId) => {
		if (!state.cellData.has(cellId)) {
			const defaultAttributes = SelectDefaultCellAttributes(state);
			const nullCell = {
				cellId,
				attributes: {...defaultAttributes}
			}
			// Todo: maybe this can be handled somewhere more globally?
			return nullCell;
		}
		
		return state.cellData.get(cellId);
	}
}

export const SelectAllCellData = (state) => {
	return state.cellData;
}

export const SelectLoadedJsonData = (state) => {
	return state.loadedJson.parsedJson;
}

//// Schema
// Selectors
const SelectAllSchemaData = (state) => {
	return state.schema;
}
export const SelectLoadedSchemas = (state) => {
	return SelectAllSchemaData(state).tables;
} 
export const SelectSchema = (state, { schemaIndex }) => {
	const schemas = SelectLoadedSchemas(state);
	if (schemaIndex < 0 || schemaIndex > schemas.length - 1) return NULL_SCHEMA;
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
export const SelectSchemasOfType = (state, { schemaType }) => {
	return SelectLoadedSchemas(state).filter(schema => schema.type === schemaType);
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
		[loadedSchemas[selectedSchemaIndex].name] : selectedValueIndex
	};
}
export const SelectSaveData = (state) => {
	const gridName = SelectGridName(state);
	const gridSize = SelectGridSize(state);
	const { cellSize, cellGap, backgroundColor, showCoords } = SelectGridDisplayOptions(state);
	const schemaTables = SelectLoadedSchemas(state);
	const cellData = Array.from(SelectAllCellData(state).values());
	return {
		title: gridName, 
		config: {
			columnCount: gridSize.x,
			rowCount: gridSize.y, 
			cellSize,
			cellGap,
			backgroundColor,
			showCoords
		},
		schema: schemaTables, 
		cellData
	}
}

//// Grid 
// Selectors
export const SelectGridDisplayOptions = (state) => {
	return state.grid.displayOptions;
}

export const SelectGridSize = (state) => {
	return state.grid.size;
}

export const SelectGridName = (state) => {
	return state.grid.name;
}


// App Data
const initialState = {
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
			backgroundColor: '000',
			showCoords: false			
		}
	},
	schema: {
		tables: [],
		selectedSchemaIndex: -1,
		selectedValueIndex: -1,
	},
	cellData: new Map(),
};

const state = InitStore(initialState);
export const { store, Connect, UseSelector, ApplyMutation, AddBeforeMutationListener, AddAfterMutationListener} = state;