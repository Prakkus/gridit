import GridSchemaView from './GridSchemaView.js';

const BuildBackgroundImageSchemaValueButton = (schemaValueID, onValueClicked) => {
    const buttonElement = document.createElement('button');
    buttonElement.classList.add("brush-selection-button");
    buttonElement.dataset.selectionId = schemaValueID;
    buttonElement.addEventListener('click', onValueClicked);
    return buttonElement;
}

const RenderBackgroundImageSchemaValueButton = (buttonElement, schemaValue) => {
    buttonElement.style.backgroundImage = `url('${schemaValue.imageDataUrl}')`;
}

export const GridBackgroundImageSchemaView =  (schemaIndex, setSelectedSchemaValue) => {
    const { element } = GridSchemaView(schemaIndex, setSelectedSchemaValue, BuildBackgroundImageSchemaValueButton, RenderBackgroundImageSchemaValueButton);

	return { element }
} 

export default GridBackgroundImageSchemaView;

export const style = 
`
`;