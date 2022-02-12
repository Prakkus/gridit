import { ApplyMutation ,LoadValuesIntoSchema } from '../data/AppState.js';
import { InjectStyles, MountElement } from '../DOMUtils.js';
import PersistenceView, { style as persistenceViewStyle } from './PersistenceView.js';
import GridConfigView, { style as gridConfigViewStyle } from './GridConfigView.js';
import SchemaControls, { style as schemaControlsStyle } from './SchemaControls.js';
import TilesetView, { style as tilesetViewStyle } from './TilesetView.js';
import ColorSchemaEditor, {style as configureColorsStyle } from './ColorSchemaEditor.js';
// import GridControlsModal, { style as modalViewStyle } from './src/components/GridControlsModal.js';
import ModalView, { style as modalViewStyle } from './ModalView.js';

export const GridControlPanel =  () => {
	const element = document.createElement('div');
	InjectStyles(persistenceViewStyle, gridConfigViewStyle, schemaControlsStyle, tilesetViewStyle, configureColorsStyle, modalViewStyle);

	// TilesetView
	const { element: tilesetViewElement, Render: RenderTilesetView } = TilesetView();
	RenderTilesetView({
		slicesExtractedHandler: (slices) => {
			// Prepend an empty image cell to act as the default value.
			ApplyMutation(LoadValuesIntoSchema, { schemaIndex: 2, schemaValues: [{ imageDataUrl: '' }, ...slices] });
			CloseTiliesetModal();
		} 
	});
	// Tileset Modal
	const { element: tilsetModalElement, Render: RenderTilesetModal, Open: OpenTilesetModal, Close: CloseTiliesetModal } = ModalView();
	MountElement(document.body, tilsetModalElement);

	// Configure Colors View
	const { element: configureColorsElement, Render: RenderConfigureColors } = ColorSchemaEditor();
	RenderConfigureColors({
		colorsSubmittedHandler: (colors) => {
			// Prepend an empty image cell to act as the default value.
			// ApplyMutation(LoadValuesIntoSchema, { schemaIndex: 0, schemaValues: [{ imageDataUrl: '' }, ...slices] });
			// CloseTiliesetModal();
		} 
	});
	// Colors Modal
	const { element: colorsModalElement, Render: RenderColorsModal, Open: OpenColorsModal, Close: CloseColorsModal } = ModalView();
	MountElement(document.body, colorsModalElement);

	// Persistence View. 
	const { element: persistenceElement } = PersistenceView( 
		{ 
			onImportTilesetClicked: () => {
				RenderTilesetModal({title: "Configure Tilesets", content: tilesetViewElement});
				OpenTilesetModal();
			},
			onConfigureColorsClicked: () => {
				RenderColorsModal({title: "Configure Colors", content: configureColorsElement});
				OpenColorsModal();
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
