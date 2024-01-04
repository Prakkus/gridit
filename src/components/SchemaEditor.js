import { ApplyMutation, UseSelector, SelectSchema, Connect, SelectSchemaName, SelectLoadedSchemas } from '../data/AppState.js';
import { InjectStyles, MountElement } from '../DOMUtils.js';
import { buildSchemaSection, buildSchemaId } from './SchemaControls.js';

export const SchemaEditor =  () => {
	const element = document.createElement('div');


    // Colors
    const colorPicker = document.createElement('input');
    colorPicker.type = "color";
    colorPicker.classList.add("schema-color-picker");
    element.insertAdjacentElement("beforeend", colorPicker);

    let selectedValueIndex = 0;
	
	const Render = ({ schemas, schemaIndex, colorsSubmittedHandler }) => {
        console.log("render called!");
        if (schemas.length < 1 || schemaIndex === undefined) return;
        const schema = schemas[schemaIndex];
        const SelectValueIndex = (index) => {
            const oldSelectedValueButton = element.querySelector(`[data-selection-id='${buildSchemaId(schema.name, selectedValueIndex)}']`);
            oldSelectedValueButton?.classList.remove("active-color")
            const newSelectedValueButton = element.querySelector(`[data-selection-id='${buildSchemaId(schema.name, index)}']`)
            selectedValueIndex = index;
            newSelectedValueButton.classList.add('active-color');
        }

        const schemaSection = buildSchemaSection(schema, schemaIndex, true, selectedValueIndex, (schemaIndex, valueIndex) => SelectValueIndex(valueIndex));
        element.insertAdjacentElement("beforeend", schemaSection);
	}

	return { element, Render }
} 

const mapStateToProps = (state, ownProps) => {
	const schemas = UseSelector(SelectLoadedSchemas);
    console.log("mapstate!" + JSON.stringify(ownProps));

	return { schemas: schemas };
}
export default () => {
	const { element, Render: baseRender } = SchemaEditor();
	const Render = Connect(mapStateToProps)(baseRender);
	return { element, Render };
}

export const style =
`
    .schema-color-picker {
        width: 100px;
        height: 40px;
        padding: 2px;
        margin: 12px;
    }
`;

// const template = 
// `
//
// `