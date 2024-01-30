import { SetSelectedSchemaValue } from '../../Actions.js';
import { InjectStyles } from '../../DOMUtils.js';
import { SetValuesForSchema } from '../../Mutations.js';
import GridBackgroundImageSchemaView, { style as gridBackgroundImageSchemaStyle } from './schemas/GridBackgroundImageSchemaView.js';
import GridColorSchemaView, { style as gridColorSchemaStyle } from './schemas/GridColorSchemaView.js';
import GridTextSchemaView, { style as gridTextSchemaStyle } from './schemas/GridTextSchemaView.js';
import { SelectLoadedSchemas, UseSelector, AddAfterMutationListener } from '../../data/AppState.js';
import { style as defaultSchemaStyles } from './schemas/GridSchemaView.js';

export const GridSchemasView = (state) => {
	const element = document.createElement('div');
	element.innerHTML = template;
	const renderedSections = {};

	InjectStyles(defaultSchemaStyles, gridColorSchemaStyle, gridTextSchemaStyle, gridBackgroundImageSchemaStyle);

	AddAfterMutationListener((mutation, args) => {
		if (mutation === SetValuesForSchema) {
			Render();
		}
	});


	const Render = () => {
		const loadedSchemas = UseSelector(SelectLoadedSchemas);

		for (let index = 0; index < loadedSchemas.length; index++) {
			const schema = loadedSchemas[index];
			let sectionElement;
			if (schema.name in renderedSections) {
				sectionElement = renderedSections[schema.name];
			} else {
				if (schema.type == 'color') {
					sectionElement = GridColorSchemaView(index, SetSelectedSchemaValue).element;					
				} else if (schema.type === 'text') {
					sectionElement = GridTextSchemaView(index, SetSelectedSchemaValue).element;					
				} else if (schema.type === 'background') {
					sectionElement = GridBackgroundImageSchemaView(index, SetSelectedSchemaValue).element;					
				}
				renderedSections[schema.name] = sectionElement;
				element.insertAdjacentElement("beforeend", sectionElement);
			}
		}
	}

	return { element }
} 

export default GridSchemasView;

export const style =
`
	.toolbar-section-title {
		display: flex;
		margin-top: 24px;
		margin-bottom: 8px;
		font-size: 18px;
		font-weight: normal;
	}

	.brush-selections-container {
		display: flex;
		flex-wrap: wrap;
	}

	.brush-selection-button:nth-child(6n) {
		margin-right: 0;
	}

	.brush-selection-button {
		width: 50px;
		height: 50px;
		padding: 0;
		margin-right: 6px;
		margin-bottom: 6px;
		outline: 1px solid rgba(255,255,255, .5);
		background-size: cover;
		overflow: hidden;
		text-align: initial;
		font-size: 30px;
	}
	.color-swatch:hover, .active-color {
		outline: 2px solid rgba(255,255,255, .7);
	}

	.schema-toolbar {
		font-size: 30px;
	}
`;
const template = 
`

`;