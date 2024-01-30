import GridSchemaView from './GridSchemaView.js';

const buildBackgroundImageSchemaValueButton = (schemaValueID, onValueClicked) => {
    const buttonElement = document.createElement('button');
    buttonElement.classList.add("brush-selection-button");
    buttonElement.dataset.selectionId = schemaValueID;
    buttonElement.addEventListener('click', onValueClicked);
    return buttonElement;
}

const renderBackgroundImageSchemaValueButton = (buttonElement, schemaValue) => {
    buttonElement.style.backgroundImage = `url('${schemaValue.imageDataUrl}')`;
}

export const GridBackgroundImageSchemaView =  (schemaIndex, setSelectedSchemaValue) => {
    const { element } = GridSchemaView(schemaIndex, setSelectedSchemaValue, buildBackgroundImageSchemaValueButton, renderBackgroundImageSchemaValueButton);

	return { element }
} 

export default GridBackgroundImageSchemaView;

export const style = 
`
    .schema-color-picker {
        width: 100px;
        height: 40px;
        padding: 2px;
        margin: 12px;
    }
`;