import { ApplyMutation, UseSelector, SelectSchema, SelectSchemaName, SelectLoadedSchemas, SelectCurrentlySelectedSchemaValue, SelectSchemaValue, AddAfterMutationListener, AddBeforeMutationListener, SelectGridDisplayOptions } from '../data/AppState.js';
import { InjectStyles, MountElement } from '../DOMUtils.js';
import { buildSchemaSection } from '../views/GridSchemasView.js';
import { buildSchemaValueId } from '../Utils.js';
import { SetSelectedSchemaValue, SetValuesForSchema, UpdateGridDisplayOptions } from '../Mutations.js';

export const GridTextSchema =  (schemaIndex, onValueClicked) => {
	const element = document.createElement('div');
    element.innerHTML = template;
    const schemaName = UseSelector((state => SelectSchemaName(state, { schemaIndex })));
    const titleElement = element.querySelector('.toolbar-section-title');
    element.classList.add('schema-toolbar');
    const valuesContainer = document.createElement("div");
    valuesContainer.classList.add('brush-selections-container');
    const renderedOptions = {};

    AddBeforeMutationListener((mutation, args) => {
        // Update the selection when the selected schema changes.
        if (mutation === SetSelectedSchemaValue) {
            const { selectedSchemaIndex, selectedValueIndex } = UseSelector(SelectCurrentlySelectedSchemaValue);
            const { schemaIndex : newSelectedSchemaIndex, valueIndex: newSelectedValueIndex } = args;

            // If the PREVIOUSLY selected schema was this one, hide the selection indicator for the value.
            if (selectedSchemaIndex === schemaIndex) {
                HideSelectionIndicator(selectedValueIndex);
            }
            // If the NEWLY selected schema is this one, show the selection indicator for the value.
            if (newSelectedSchemaIndex === schemaIndex) {
                ShowSelectionIndicatorForValue(newSelectedValueIndex);
            }
        }
    });

    AddAfterMutationListener((mutation, args) => {
        // When the schema at this index changes, re-render.
        if (mutation === SetValuesForSchema && args.schemaIndex == schemaIndex || mutation === UpdateGridDisplayOptions) {
            console.log('rendering thing');
            Render();
        }
    });

    const ShowSelectionIndicatorForValue = (valueIndex) => {
        console.log(schemaName, valueIndex);
        valuesContainer.querySelector(`[data-selection-id="${buildSchemaValueId(schemaName, valueIndex)}"]`).classList.add('active-color');
    }

    const HideSelectionIndicator = (valueIndex) => {
        valuesContainer.querySelector(`[data-selection-id="${buildSchemaValueId(schemaName, valueIndex)}"]`).classList.remove('active-color');
    }
	
	const Render = () => {
        // Resolve the data for this schema.
        const thisSchema = UseSelector(state => SelectSchema(state, {schemaIndex}))
        const schemaValues = thisSchema.values;

        // Render the title.
        element.classList.add( thisSchema.name + '-toolbar');
        titleElement.textContent = thisSchema.displayName;

        if (schemaValues.length < 1 || schemaIndex === undefined) return;

        for (let index = 0; index < schemaValues.length; index++) {
            const schemaValueID = buildSchemaValueId(thisSchema.name, index);
            // Ensure a button exists for each value in this schema.
            let buttonElement;
            if (schemaValueID in renderedOptions) {
                buttonElement = renderedOptions[schemaValueID];
            } else {
                buttonElement = document.createElement('button');
                buttonElement.classList.add("brush-selection-button");
                buttonElement.dataset.selectionId = schemaValueID;
                buttonElement.addEventListener('click', (e) => onValueClicked(schemaIndex, index));
                renderedOptions[schemaValueID] = buttonElement;
                // Create a child element which will later hold the content.
                const buttonContent = document.createElement('span');
                buttonContent.classList.add('content-preview');
                buttonElement.insertAdjacentElement('beforeend', buttonContent);
                valuesContainer.insertAdjacentElement("beforeend", buttonElement)
            }

            // Render each button's content.
            const thisSchemaValue = schemaValues[index];
            const buttonContent = buttonElement.querySelector('.content-preview');
            buttonContent.style.backgroundColor = '#' + schemaValues[index].hex;
            buttonContent.textContent = thisSchemaValue.display;
	
			// Size the preview of this piece of content relative to the actual difference
			// in size between the cells and the preview swatch.
			const { cellSize } = UseSelector(SelectGridDisplayOptions);
			const symbolScale = thisSchemaValue.fontSize.split('%')[0] / 100;
			const contentSizeFactor = 50 / cellSize * symbolScale;
			buttonContent.style.fontSize = `${contentSizeFactor * 100}%`; 
        }        
	}
    
    element.insertAdjacentElement("beforeend", valuesContainer);

	return { element }
} 

export default GridTextSchema;

export const style =
`
    .content-preview {
        display: block;
        width: 100%;
        height: 100%;
    }
`;

const template = 
`
<h4 class='toolbar-section-title'>

</h4>
`