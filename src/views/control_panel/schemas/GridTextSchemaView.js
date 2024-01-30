import { UseSelector, AddAfterMutationListener, SelectGridDisplayOptions } from '../../../data/AppState.js';
import {  UpdateGridDisplayOptions } from '../../../Mutations.js';
import GridSchemaView from './GridSchemaView.js';

export const buildTextSchemaValueButton  = (schemaValueID, onValueClicked) =>{
    const buttonElement = document.createElement('button');
    buttonElement.classList.add("brush-selection-button");
    buttonElement.dataset.selectionId = schemaValueID;
    buttonElement.addEventListener('click', onValueClicked);

    // Create a child element which will later hold the content.
    const buttonContent = document.createElement('span');
    buttonContent.classList.add('content-preview');
    buttonElement.insertAdjacentElement('beforeend', buttonContent);

    return buttonElement;
}

export const renderTextContentSchemaButton = (buttonElement, schemaValue) => {
    const buttonContent = buttonElement.querySelector('.content-preview');
    buttonContent.style.backgroundColor = '#' + schemaValue.hex;
    buttonContent.textContent = schemaValue.display;

    // Size the preview of this piece of content relative to the actual difference
    // in size between the cells and the preview swatch.
    const { cellSize } = UseSelector(SelectGridDisplayOptions);
    const symbolScale = schemaValue.fontSize.split('%')[0] / 100;
    const contentSizeFactor = 50 / cellSize * symbolScale;
    buttonContent.style.fontSize = `${contentSizeFactor * 100}%`; 
}


export const GridTextSchemaView =  (schemaIndex, setSelectedSchemaValue) => {
    const { element, Render } = GridSchemaView(schemaIndex, setSelectedSchemaValue, buildTextSchemaValueButton, renderTextContentSchemaButton);

    // In addition to rendering when schemas normally need to update, text schemas need
    // to render when the display options change so that they can update the scale of their content.
    AddAfterMutationListener((mutation, args) => {
        if (mutation === UpdateGridDisplayOptions) {
            Render();
        }
    });

	return { element }
} 

export default GridTextSchemaView;

export const style = 
`
    .content-preview {
        display: block;
        width: 100%;
        height: 100%;
    }
`;
