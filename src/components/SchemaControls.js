import { Connect, ApplyMutation, SetSelectedSchemaValue, SelectCurrentlySelectedSchemaValue, SelectSchemaDisplayName, 
	SelectLoadedSchemas, SelectSchemaValues, SelectSchemaValue, SelectSchemaName, UseSelector } from '../data/AppState.js';

// Build a unique ID to refer to this schema value.
const buildSchemaId = (schema, index) => `${schema.name}-${index}`;

export const SchemaControls = () => {
	const element = document.createElement('div');
	element.innerHTML = template;
	element.classList.add('cursor-controls');

	const OnSchemaSelection = (schemaIndex, valueIndex) => {
		ApplyMutation(SetSelectedSchemaValue, { schemaIndex, valueIndex });
	}

	const getSchemaValue = (schemaIndex, valueIndex) => {
		return UseSelector((state) => SelectSchemaValue(state, { schemaIndex, valueIndex }));
	}
	const getSchemaName = (schemaIndex) => {
		return UseSelector((state) => SelectSchemaName(state, { schemaIndex }));
	}

	const buildBrushSelectionButton = (schemaIndex, valueIndex) => {
		const swatchButton = document.createElement('button');
		const schemaName = getSchemaName(schemaIndex);

		swatchButton.classList.add("brush-selection-button");
		swatchButton.dataset.selectionId = buildSchemaId(schemaName, valueIndex);
		const thisSchemaValue = getSchemaValue(schemaIndex, valueIndex);

			
		if (schemaName === 'background_color') {
			swatchButton.style.backgroundColor = '#' + thisSchemaValue.hex;
		} else if (schemaName === 'symbol') {
			swatchButton.textContent = thisSchemaValue.display;
		} else if (schemaName === 'tile_index_background') {
			swatchButton.style.backgroundImage = `url('${thisSchemaValue.imageDataUrl}')`;
		} else {
			console.warn("Unsupported tileset name: " + schemaName);
		}

		swatchButton.addEventListener("click", () => {
			OnSchemaSelection(schemaIndex, valueIndex);
		});

		return swatchButton;
	};

	//make sure to always have an 'empty' default
	//how to handle title sections, made it so i can load a schema and have it replace that section
	const buildSchemaSection = ( schemaIndex, isSelected, selectedIndex) => {
		const schemaName = getSchemaName(schemaIndex);
		const schemaValues = UseSelector((state) => SelectSchemaValues(state, { schemaIndex }));
		//If a schema with this name already exists, we replace it
		const sectionWrapper = document.createElement('div');

		//Render a button for each schema value
		schemaValues.forEach((schemaValue, valueIndex) => {
			const button = buildBrushSelectionButton(schemaIndex, valueIndex);
			sectionWrapper.appendChild(button);

			// If this one should be selected, show it as selected.
			if (isSelected && selectedIndex == valueIndex) {
				button.classList.add('active-color');
			} else {
				button.classList.remove('active-color');
			}
		})
		sectionWrapper.classList.add( schemaName + '-toolbar');
		sectionWrapper.classList.add('schema-toolbar');

		return sectionWrapper;
	}

	const insertSchemaSection = (schemaIndex) => {
		const schemaName = getSchemaName(schemaIndex);
		const schemaDisplayName = UseSelector((state) => SelectSchemaDisplayName(state, { schemaIndex }));

		const schemaTitle = 	
		`
		<span class='toolbar-section-title ${schemaName}-toolbar-section-title'>
			${schemaDisplayName}
		</span>

		`;

		//Add the schema title
		element.insertAdjacentHTML('beforeend', schemaTitle);
		//Add the section
		const schemaSectionElement = buildSchemaSection(schemaIndex);
		element.appendChild(schemaSectionElement);

	}

	const buildAndRenderSectionForSchema = (schemaIndex, isSelected, selectedIndex) => {
		const schemaName = getSchemaName(schemaIndex);
		const schemaSection = buildSchemaSection( schemaIndex, isSelected, selectedIndex);
		const existingSection = element.querySelector('.' + schemaName + '-toolbar');
		if (existingSection === null) {
			insertSchemaSection( schemaIndex);
		} else {
			existingSection.insertAdjacentElement('afterend', schemaSection);
			existingSection.remove();
		}
	}

	const Render = ({ loadedSchemas, selectedSchemaIndex, selectedValueIndex }) => {
		for (var i = 0; i < loadedSchemas.length; i++) {
			const isSelected = (i == selectedSchemaIndex);
			buildAndRenderSectionForSchema(i, isSelected, selectedValueIndex);
		}
	}

	return { element, Render }
} 

const mapStateToProps = () => {
	const loadedSchemas = UseSelector(SelectLoadedSchemas);
	const selectedSchemaValue = UseSelector(SelectCurrentlySelectedSchemaValue);
	return { loadedSchemas, ...selectedSchemaValue };
}
export default () => {
	const { element, Render: baseRender } = SchemaControls();
	const Render = Connect(mapStateToProps)(baseRender);
	return { element, Render };
}

export const style =
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