import { ApplyMutation ,LoadValuesIntoSchema } from '../data/AppState.js';
import { InjectStyles, MountElement } from '../DOMUtils.js';
import PersistenceView, { style as persistenceViewStyle } from './PersistenceView.js';
import GridConfigView, { style as gridConfigViewStyle } from './GridConfigView.js';
import SchemaControls, { style as schemaControlsStyle } from './SchemaControls.js';
import TilesetView, { style as tilesetViewStyle } from './TilesetView.js';
// import GridControlsModal, { style as modalViewStyle } from './src/components/GridControlsModal.js';
import ModalView, { style as modalViewStyle } from './ModalView.js';

export const GridControlPanel =  () => {
	const element = document.createElement('div');
	InjectStyles(persistenceViewStyle, gridConfigViewStyle, schemaControlsStyle, tilesetViewStyle, modalViewStyle);

	// TilesetView
	const { element: tilesetViewElement, Render: RenderTilesetView } = TilesetView();
	RenderTilesetView({
		slicesExtractedHandler: (slices) => {
			// Prepend an empty image cell to act as the default value.
			ApplyMutation(LoadValuesIntoSchema, { schemaIndex: 2, schemaValues: [{ imageDataUrl: '' }, ...slices] });
			CloseControlsModal();
		} 
	});
	// Controls Modal
	const { element: modalElement, Render: RenderModal, Open: OpenControlsModal, Close: CloseControlsModal } = ModalView();
	// Todo: am I concerned about mounting directly to the body?
	MountElement(document.body, modalElement);
	// Persistence View. 
	const { element: persistenceElement } = PersistenceView( 
		{ 
			onImportTilesetClicked: () => {
				RenderModal({title: "Configure Tilesets", content: tilesetViewElement});
				OpenControlsModal();
			}
		} 
	);
	MountElement(element, persistenceElement);

	// Grid Config View
	const { element: gridConfigElement } = GridConfigView();
	MountElement(element, gridConfigElement);

	// SchemaControls
	const { element: schemaControlsElement } = SchemaControls();
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
