import GridSchemaView, {style as gridSchemaStyle } from './GridSchemaView.js';

const buildColorSchemaValueButton = (schemaValueID, onValueClicked) => {
    const buttonElement = document.createElement('button');
    buttonElement.classList.add("brush-selection-button");
    buttonElement.dataset.selectionId = schemaValueID;
    buttonElement.addEventListener('click', onValueClicked);
    return buttonElement;
}

const renderColorSchemaValueButton = (buttonElement, schemaValue) => {
    buttonElement.style.backgroundColor = '#' + schemaValue.hex;
}

export const GridColorSchemaView =  (schemaIndex, setSelectedSchemaValue) => {
    const { element } = GridSchemaView(schemaIndex, setSelectedSchemaValue, buildColorSchemaValueButton, renderColorSchemaValueButton);

	return { element }
} 

export default GridColorSchemaView;

export const style = gridSchemaStyle +
`
    .schema-color-picker {
        width: 100px;
        height: 40px;
        padding: 2px;
        margin: 12px;
    }
`;