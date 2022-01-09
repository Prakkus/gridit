import { InjectStyles, MountElement } from '../DOMUtils.js';
import PersistenceView, { style as persistenceViewStyle } from './PersistenceView.js';
import GridConfigView, { style as gridConfigViewStyle } from './GridConfigView.js';
import SchemaControls, { style as schemaControlsStyle } from './SchemaControls.js';

export const GridControlPanel =  () => {
	const element = document.createElement('div');
	InjectStyles(persistenceViewStyle, gridConfigViewStyle, schemaControlsStyle);

	// Persistence View. 
	const { element: persistenceElement, Render: RenderPersistenceView} = PersistenceView( 
		{ 
			onImportTilesetClicked: () => OpenTilesetModal()
		} 
	);
	MountElement(element, persistenceElement);

	// Grid Config View
	const { element: gridConfigElement, Render: RenderGridConfig} = GridConfigView();
	MountElement(element, gridConfigElement);

	// SchemaControls
	const { element: schemaControlsElement, Render: RenderSchemaControls } = SchemaControls();
	MountElement(element, schemaControlsElement);
	
	const Render = () => {

	}

	return { element, Render }
} 


export default GridControlPanel;

export const style =
`
	.control-panel {
		z-index: 1;
	}
	.control-panel {
		color: var(--text-default);
		position: fixed;
		right: 0px;
		background: var(--darker);
		padding: 12px;
		width: 371px;
		display: flex;
		flex-direction: column;
		max-height: 100vh;
		overflow-y: auto;
		box-sizing: border-box; /* specfically so that the scroll bar doesn't mess with the inner width */
	}

	.control-panel > * {
		margin-bottom: 12px;
	}
`;
