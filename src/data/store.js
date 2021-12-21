// Schema values
const defaultSymbolValue = {
	name: 'defaultSymbol',
	display: '',
	xOffset: 0,
	yOffset: 0,
	fontSize: '100%' 
};

const defaultColorValue = {
	name: 'defaultColor',
	hex: '71717A'
};

const defaultTileValue = {
	imageDataUrl: ''
};

const schemaDefaultMap = {
	background_color: defaultColorValue,
	symbol: defaultSymbolValue,
	tile_index_background: defaultTileValue
}


// Grid Values
import { getDefaultAttributes } from '../config/default-profile.js';

const defaultAttributes = getDefaultAttributes();

const initialCellState = {
	cellId: '-1,-1',
	x: -1,
	y: -1,
	attributes: defaultAttributes
}


const constructCellMap = (rows, columns) => {
	let cellData = new Map();
	for (var y = rows - 1; y >= 0; y--) {
		for (var x = 0; x < columns; x++) {
			const cellState = {
				...initialCellState,
				cellId: x + ',' + y,
				x: x,
				y: y
			}
			cellData.set(cellState.cellId, cellState);
		}
	}
	return cellData;
}

const initStore = () => {
	return {
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
			},
			updateName: function(name) {
				this.name = name;
			},
			updateGridSize: function(width, height) {
				this.size.x = width;
				this.size.y = width;
			},
			updateGridDisplayOptions: function(cellSize, cellGap, showCoords) {
				this.displayOptions.cellSize = cellSize;
				this.displayOptions.cellGap = cellGap;
				this.displayOptions.showCoords = showCoords;
			}
		},
		schema: {
			tables: [],
			selectedSchemaIndex: 0,
			selectedValueIndex: 0,
			getValue: (schemaIndex, valueIndex) => {
				return this.tables[schemaIndex].values[valueIndex];
			},
			clearCurrentProfile: function() {
				this.tables = [];
				this.setSelected(0, 0);	
			},
			setSelected: function(schemaIndex, valueIndex) {
				this.selectedSchemaIndex = schemaIndex;
				this.selectedValueIndex = valueIndex;
			},
			loadValuesIntoSchema: function(schemaIndex, schemaValues) {
				const schema = this.tables[schemaIndex];
				const defaultValue = schemaDefaultMap[schema.name];	
				this.tables[schemaIndex] = {...schema, values: [defaultValue, ...schemaValues]};
			},
			loadSchema: function(schema) {
				const newIndex = this.tables.push({...schema}) - 1;
				this.loadValuesIntoSchema(newIndex, schema.values);
			}
		},
		cellData: {
			all: new Map(),
			updateCellStateById: function(cellId, propUpdates) {
				const currentState = this.all.get(cellId);
				updateCellState(currentState, propUpdates);
			},
			updateCellState: function(cellState, propUpdates) {
				const newState = { 
					...cellState,
					attributes: {
						...cellState.attributes,
						...propUpdates
					}
				};
				this.all.set(cellState.cellId, newState);
			},
			resetAllCellStates: function() {
				this.all.forEach((cellState, cellId) => {
					updateCellState(cellState, initialCellState.attributes);
				});
			},
			getAllCells: function() {
				return new Map(this.all);
			},
			getCellStateById : function(cellId) {
				return this.all.get(cellId);
			},
			setCellData: function(cellData) {
				this.all = cellData;
			}
		},




		// Commands
		// Load a grid save file into the store.
		loadGridJsonData : function(jsonText) {
			this.loadedJson.rawJson = jsonText;
			this.loadedJson.parsedJson = JSON.parse(jsonText);
			this.loadedJson.title = this.loadedJson.parsedJson.title;
		},
		// Updates the grid data to match the currently loaded json.
		refreshGridFromLoadedJson: function() {
			const profile = this.loadedJson.parsedJson;
			this.loadGridProfile(profile);
			this.loadCellData(profile.cellData, this.grid.size);
		},
		loadCellData: function(cellData, gridSize) {
			//If this grid was previously initalized, copy the state of any cells which still exist to the resized grid
			const newMap = constructCellMap(gridSize.x, gridSize.y, initialCellState); //Map of cellId->cellState (what is the state of a given cellId?)
			cellData.forEach((oldCell, oldId) => {
				if (!newMap.has(oldId)) return;
				newMap.set(oldId, oldCell);
			});
			this.cellData.setCellData(newMap);
		},
		// Loads a configuration profile (not a grid save file!).
		loadGridProfile : function({title, config, schema}) {
			// Clear the current profile.
			this.schema.clearCurrentProfile();
			// Update grid attributes.
			this.grid.updateGridDisplayOptions(config.cellSize, config.cellGap, config.showCoords);
			this.grid.updateGridSize(config.rowCount, config.columnCount);
			this.grid.updateName(title);
			// Load schema.
			schema.forEach((schemaDef) => {
				this.schema.loadSchema(schemaDef);
			});		
		}
	}
}
export default initStore;