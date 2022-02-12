import { ApplyMutation, UseSelector, SelectSchema, Connect } from '../data/AppState.js';
import { InjectStyles, MountElement } from '../DOMUtils.js';
import { buildSchemaSection } from './SchemaControls.js';

export const ColorSchemaEditor =  () => {
	const element = document.createElement('div');
    const colorPicker = document.createElement('input');
    colorPicker.type = "color";
    colorPicker.classList.add("schema-color-picker");
    element.insertAdjacentElement("beforeend", colorPicker);

    let selectedValueIndex = 0;

    const SelectValueIndex = (index) => {
        selectedValueIndex = index;
    }

	
	const Render = ({ currentSchema, colorsSubmittedHandler }) => {
        const schemaSection = buildSchemaSection(0, true, selectedValueIndex, (schemaIndex, valueIndex) => SelectValueIndex(valueIndex));
        element.insertAdjacentElement("beforeend", schemaSection);
	}

	return { element, Render }
} 

const mapStateToProps = (state) => {
	const colorSchema = UseSelector((state) => SelectSchema(state, { schemaIndex: 0}));

	return { currentSchema: colorSchema };
}
export default () => {
	const { element, Render: baseRender } = ColorSchemaEditor();
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