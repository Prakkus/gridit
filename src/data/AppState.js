import InitStore from './Store.js';

// Loops through the existing schemas and builds a set of default cell attributes for each.
// Used as the initial attributes state for any cell.
export const SelectDefaultCellAttributes = (state) => {
	const types = {};
	state.schema.tables.forEach((schema) => {
		types[schema.cellAttribute] = 0;
	});

	return types;
}

const NULL_SCHEMA = {
	name: '',
	displayName: '',
	cellAttribute: '',
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
	if (schemaIndex > schemas.length - 1) return NULL_SCHEMA;
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

//// Cells
// Mutations
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

export const LoadCellData = (state, { cellData }) => {
	// Our cells are serialized as an array of objects.
	// Pull them out into a map by cellId and store that instead.
	const map = new Map(cellData.map(value => [value.cellId, {...value}]));
	state.cellData = map;
}

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
			showCoords: false			
		}
	},
	schema: {
		tables: [],
		selectedSchemaIndex: 0,
		selectedValueIndex: 0,
	},
	cellData: new Map(),
};

const state = InitStore(initialState);
export const { store, Connect, UseSelector, ApplyMutation, AddBeforeMutationListener, AddAfterMutationListener} = state;