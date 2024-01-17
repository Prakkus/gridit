import { SetSelectedSchemaValue } from '../Actions.js';
import { SelectCurrentlySelectedSchemaValue, SelectLoadedSchemas, SelectSchema, UseSelector, AddAfterMutationListener } from '../data/AppState.js';
import { SetSelectedSchemaValue as SetSelectedSchemaValueMutation, AppendSchema, DeleteAllSchema, SetValuesForSchema } from '../Mutations.js';

	
// const getSchemaValue = (schemaIndex, valueIndex) => {
// 	return UseSelector((state) => SelectSchemaValue(state, { schemaIndex, valueIndex }));
// }
// const getSchemaName = (schemaIndex) => {
// 	return UseSelector((state) => SelectSchemaName(state, { schemaIndex }));
// }
	
	//make sure to always have an 'empty' default
	//how to handle title sections, made it so i can load a schema and have it replace that section
// export const buildSchemaSection = ( schemaIndex, isSelected, selectedIndex, onValueClicked) => {
// 	const schemaName = getSchemaName(schemaIndex);
// 	const schemaValues = UseSelector((state) => SelectSchemaValues(state, { schemaIndex }));
// 	//If a schema with this name already exists, we replace it
// 	const sectionWrapper = document.createElement('div');

// 	//Render a button for each schema value
// 	schemaValues.forEach((schemaValue, valueIndex) => {
// 		const button = buildBrushSelectionButton(schemaIndex, valueIndex, onValueClicked);
// 		sectionWrapper.appendChild(button);

// 		// If this one should be selected, show it as selected.
// 		if (isSelected && selectedIndex == valueIndex) {
// 			button.classList.add('active-color');
// 		} else {
// 			button.classList.remove('active-color');
// 		}
// 	})
// 	sectionWrapper.classList.add( schemaName + '-toolbar');
// 	sectionWrapper.classList.add('schema-toolbar');

// 	return sectionWrapper;
// }

export const buildSchemaSection = ( schema, schemaIndex, isSelected, selectedIndex, onValueClicked) => {
	const schemaName = schema.name;
	const schemaValues = schema.values;
	//If a schema with this name already exists, we replace it
	const sectionWrapper = document.createElement('div');

	//Render a button for each schema value
	schemaValues.forEach((schemaValue, valueIndex) => {
		const button = buildBrushSelectionButton(schema.name, schemaValue, () => onValueClicked(schemaIndex, valueIndex));
		button.dataset.selectionId = buildSchemaId(schemaName, valueIndex);
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



const buildBrushSelectionButton = (schemaName, thisSchemaValue, onClick) => {
	const swatchButton = document.createElement('button');
	swatchButton.classList.add("brush-selection-button");

		
	if (schemaName === 'background_color') {
		swatchButton.style.backgroundColor = '#' + thisSchemaValue.hex;
	} else if (schemaName === 'symbol') {
		swatchButton.textContent = thisSchemaValue.display;
	} else if (schemaName === 'tile_index_background') {
		swatchButton.style.backgroundImage = `url('${thisSchemaValue.imageDataUrl}')`;
	} else {
		console.warn("Unsupported tileset name: " + schemaName);
	}

	swatchButton.addEventListener("click", (e) => onClick());

	return swatchButton;
};

// const buildBrushSelectionButton = (schemaIndex, valueIndex, onClick) => {
// 	const swatchButton = document.createElement('button');
// 	const schemaName = getSchemaName(schemaIndex);

// 	swatchButton.classList.add("brush-selection-button");
// 	swatchButton.dataset.selectionId = buildSchemaId(schemaName, valueIndex);
// 	const thisSchemaValue = getSchemaValue(schemaIndex, valueIndex);

		
// 	if (schemaName === 'background_color') {
// 		swatchButton.style.backgroundColor = '#' + thisSchemaValue.hex;
// 	} else if (schemaName === 'symbol') {
// 		swatchButton.textContent = thisSchemaValue.display;
// 	} else if (schemaName === 'tile_index_background') {
// 		swatchButton.style.backgroundImage = `url('${thisSchemaValue.imageDataUrl}')`;
// 	} else {
// 		console.warn("Unsupported tileset name: " + schemaName);
// 	}

// 	swatchButton.addEventListener("click", (e) => onClick(schemaIndex, valueIndex));

// 	return swatchButton;
// };

// Build a unique ID to refer to this schema value.
export const buildSchemaId = (schemaName, valueIndex) => `${schemaName}-${valueIndex}`;

export const SchemaControls = (state) => {
	const element = document.createElement('div');
	element.innerHTML = template;
	element.classList.add('cursor-controls');

	// A set of all the mutations after which this component should re-sync data to the DOM.
	const renderAfter = new Set([AppendSchema, SetValuesForSchema, DeleteAllSchema, SetSelectedSchemaValueMutation]);

	AddAfterMutationListener((mutation, _) => {
		if (renderAfter.has(mutation)) {
			Render(mapStateToProps(state));
		}
	})

	const insertSchemaSection = (schemaName, schemaDisplayName, schemaSectionElement) => {
		const schemaTitle = 	
		`
		<span class='toolbar-section-title ${schemaName}-toolbar-section-title'>
			${schemaDisplayName}
		</span>

		`;

		//Add the schema title
		element.insertAdjacentHTML('beforeend', schemaTitle);
		//Add the section
		element.appendChild(schemaSectionElement);

	}

	const buildAndRenderSectionForSchema = (schemaIndex, isSelected, selectedIndex) => {
		const schema = UseSelector(state => SelectSchema(state, { schemaIndex }));
		const schemaSection = buildSchemaSection( schema, schemaIndex, isSelected, selectedIndex, SetSelectedSchemaValue);
		const existingSection = element.querySelector('.' + schema.name + '-toolbar');
		if (existingSection === null) {
			insertSchemaSection(schema.name, schema.displayName, schemaSection);
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

export default SchemaControls;

const mapStateToProps = () => {
	const loadedSchemas = UseSelector(SelectLoadedSchemas);
	const selectedSchemaValue = UseSelector(SelectCurrentlySelectedSchemaValue);
	return { loadedSchemas: [...loadedSchemas], ...selectedSchemaValue };
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