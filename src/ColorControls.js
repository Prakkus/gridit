import { getSchemaValueId } from './default-profile.js';

const defaultStyle =
`
	.cursor-controls .toolbar-section-title {
		display: flex;
		margin-top: 24px;
		margin-bottom: 8px;
		display: flex;
		justify-content: space-between;
	}

	.brush-selection-button:nth-child(6n) {
		margin-right: 0;
	}

	.brush-selection-button {
		width: 50px;
		height: 50px;
		margin-right: 6px;
		margin-bottom: 6px;
		outline: 1px solid rgba(255,255,255, .5);
		font-size: 24px;
		background-size: cover;
	}
	.color-swatch:hover, .active-color {
		outline: 2px solid rgba(255,255,255, .7);
	}

	.schema-toolbar {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
`;
const template = 
`

`;

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


const ColorControls = (schemaProfile) => {
	let loadedSchemas = [];
	let selectedSchemaIndex = 0;
	let selectedValueIndex = 0;

	const colorSwatchNodes = new Map(); //Map of colorName->colorSwatchNode so that we can update their active state easily 

	const ColorControlsElement = document.createElement('div');
	ColorControlsElement.innerHTML = template;
	ColorControlsElement.classList.add('cursor-controls');


	const getSchemaValue = (schemaIndex, valueIndex) => {
		return loadedSchemas[schemaIndex].values[valueIndex];
	}

	const activateSelectionHighlight = (schemaIndex, valueIndex) => {
		if (loadedSchemas.length < 1) return;
		ColorControlsElement.querySelector(`[data-selection-id=${getSchemaValueId(loadedSchemas[schemaIndex], valueIndex)}]`).classList.add('active-color');
	}
	const deactivateSelectionHighlight = (schemaIndex, valueIndex) => {
		if (loadedSchemas.length < 1) return;
		console.log(loadedSchemas);
		ColorControlsElement.querySelector(`[data-selection-id=${getSchemaValueId(loadedSchemas[schemaIndex], valueIndex)}]`).classList.remove('active-color');
	}

	const setSelectedWriteValue = (schemaIndex, valueIndex) => {
		deactivateSelectionHighlight(selectedSchemaIndex, selectedValueIndex);
		selectedSchemaIndex = schemaIndex;
		selectedValueIndex = valueIndex;
		activateSelectionHighlight(selectedSchemaIndex, selectedValueIndex);
	}

	const buildBrushSelectionButton = (schemaIndex, valueIndex) => {
		let swatchButton = document.createElement('button');
		const schema = loadedSchemas[schemaIndex];

		swatchButton.classList.add("brush-selection-button");
		swatchButton.dataset.selectionId = getSchemaValueId(schema, valueIndex);

			
		if (schema.name === 'background_color') {
			swatchButton.style.backgroundColor = '#' + getSchemaValue(schemaIndex, valueIndex).hex;
		} else if (schema.name === 'symbol') {
			swatchButton.textContent = getSchemaValue(schemaIndex, valueIndex).display;
		} else if (schema.name === 'tile_index_background') {
			swatchButton.style.backgroundImage = `url('${getSchemaValue(schemaIndex, valueIndex).imageDataUrl}')`;
		} else {
			console.warn("Unsupported tileset name: " + schema.name);
		}

		swatchButton.addEventListener("click", () => {
			setSelectedWriteValue(schemaIndex, valueIndex);
		});

		return swatchButton;
	};

	//make sure to always have an 'empty' default
	//how to handle title sections, made it so i can load a schema and have it replace that section
	const buildSchemaSection = (schemaIndex) => {
		const schema = loadedSchemas[schemaIndex];
		//If a schema with this name already exists, we replace it
		const sectionWrapper = document.createElement('div');

		//Render a button for each schema value
		schema.values.forEach((schemaValue, index) => {
			const button = buildBrushSelectionButton(schemaIndex, index);
			sectionWrapper.appendChild(button);
			colorSwatchNodes.set(getSchemaValueId(schema, index), button);
		})
		sectionWrapper.classList.add(schema.name + '-toolbar');
		sectionWrapper.classList.add('schema-toolbar');

		return sectionWrapper;
	}

	const insertSchemaSection = (schemaIndex) => {
		const schema = loadedSchemas[schemaIndex];

		const schemaTitle = 	
		`
		<span class='toolbar-section-title ${schema.name}-toolbar-section-title'>
			${schema.displayName}
		</span>

		`;

		//Add the schema title
		ColorControlsElement.insertAdjacentHTML('beforeend', schemaTitle);
		//Add the section
		const schemaSectionElement = buildSchemaSection(schemaIndex);
		ColorControlsElement.appendChild(schemaSectionElement);

	}

	const buildAndRenderSectionForSchema = (schemaIndex) => {
		const schema = loadedSchemas[schemaIndex];
		const schemaSection = buildSchemaSection(schemaIndex);
		const existingSection = ColorControlsElement.querySelector('.' + schema.name + '-toolbar');
		if (existingSection === null) {
			insertSchemaSection(schemaIndex);
		} else {
			existingSection.insertAdjacentElement('afterend', schemaSection);
			existingSection.remove();
		}
	}

	//Load values into an existing schema by index
	const loadValuesIntoSchema = (schemaIndex, schemaValues) => {
		const schema = loadedSchemas[schemaIndex];
		const defaultValue = schemaDefaultMap[schema.name];	
		loadedSchemas[schemaIndex] = {...schema, values: [defaultValue, ...schemaValues]};
		buildAndRenderSectionForSchema(schemaIndex);

	}

	//Load a schema from a profile
	const loadSchema = (schema) => {
		const newIndex = loadedSchemas.push({...schema}) - 1;
		loadValuesIntoSchema(newIndex, schema.values);
		buildAndRenderSectionForSchema(newIndex);
	}

	const clearCurrentProfile = () => {
		loadedSchemas = [];
		setSelectedWriteValue(0, 0);	
	}

	const importAndLoadProfile = ({schema}) => {
		clearCurrentProfile();
		schema.forEach((schemaDef) => {
			loadSchema(schemaDef);
		});
	}

	//should i just have this potentially return multiple pairs?
	const getSelectedUpdateKVP = () => {
		return { 
			key: loadedSchemas[selectedSchemaIndex].cellAttribute,
			value: selectedValueIndex
		};
	}

	//We want to export everything except the first value in each schema, since those are the defaults which we generate when loading a schema
	const readData = () => {
		return loadedSchemas.map(schema => {
			return {...schema, values: [...schema.values.slice(1)] }
		});
	}

	importAndLoadProfile(schemaProfile);


	// const button = 
	// `
	// 		<button>Import a tileset</button>
	// `;
	// const buttonNode = document.querySelector('.tile_index_background-toolbar-section-title').insertAdjacentHTML('beforeend', button);
	// buttonNode.addEventListener('click', () => {} );
	
	return { defaultStyle, readData, ColorControlsElement, importAndLoadProfile, getSelectedUpdateKVP, loadValuesIntoSchema, getSchemaValue };
} 


export default ColorControls;