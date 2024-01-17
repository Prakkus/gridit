import { ApplyMutation,SelectCurrentlySelectedSchemaValue, UseSelector } from '../data/AppState.js';
import { InjectStyles, MountElement } from '../DOMUtils.js';
import PersistenceView, { style as persistenceViewStyle } from './PersistenceView.js';
import GridConfigView, { style as gridConfigViewStyle } from './GridConfigView.js';
import SchemaControls, { style as schemaControlsStyle } from '../components/SchemaControls.js';
import TilesetEditor, { style as tilesetViewStyle } from '../components/TilesetEditor.js';
import ColorSchemaEditor, {style as configureColorsStyle } from '../components/SchemaEditor.js';
// import GridControlsModal, { style as modalViewStyle } from './src/components/GridControlsModal.js';
import Modal, { style as modalViewStyle } from '../components/Modal.js';
import { SetValuesForSchema } from '../Actions.js';

export const GridControlPanelView = (state) => {
	const element = document.createElement('div');
	InjectStyles(persistenceViewStyle, gridConfigViewStyle, schemaControlsStyle, tilesetViewStyle, configureColorsStyle, modalViewStyle);

	// Todo: These 'render's are called here in the parent constructor, which effectively means they are only called once.
	// Can I have these props still be dependencies without calling Render here manually, so that it's only ever called in one place?
	// What about for components that aren't connected?

	// TilesetView
	// const { element: tilesetViewElement, Render: RenderTilesetView } = TilesetEditor();
	// RenderTilesetView({
	// 	slicesExtractedHandler: (slices) => {
	// 		// Prepend an empty image cell to act as the default value.
	// 		SetValuesForSchema(2, [{ imageDataUrl: '' }, ...slices]);
	// 		CloseTiliesetModal();
	// 	} 
	// });
	// Tileset Modal
	// const { element: tilsetModalElement, Render: RenderTilesetModal, Open: OpenTilesetModal, Close: CloseTiliesetModal } = Modal();
	// MountElement(document.body, tilsetModalElement);

	// Configure Colors View
	// const { element: configureColorsElement, Render: RenderConfigureColors } = ColorSchemaEditor();
	// RenderConfigureColors({
	// 	colorsSubmittedHandler: (colors) => {
	// 		// Prepend an empty image cell to act as the default value.
	// 		// ApplyMutation(LoadValuesIntoSchema, { schemaIndex: 0, schemaValues: [{ imageDataUrl: '' }, ...slices] });
	// 		// CloseTiliesetModal();
	// 	},
	// 	schemaIndex: 0
	// });
	// Colors Modal
	// const { element: colorsModalElement, Render: RenderColorsModal, Open: OpenColorsModal, Close: CloseColorsModal } = Modal();
	// MountElement(document.body, colorsModalElement);

	// Persistence View. 
	const { element: persistenceElement } = PersistenceView( 
		{ 
			onImportTilesetClicked: () => {
				// RenderTilesetModal({title: "Configure Tilesets", content: tilesetViewElement});
				// OpenTilesetModal();
			},
			onConfigureColorsClicked: () => {
			// 	RenderColorsModal({title: "Configure Colors", content: configureColorsElement});
			// 	OpenColorsModal();
			}
		} 
	);
	MountElement(element, persistenceElement);

	// Grid Config View
	const { element: gridConfigElement } = GridConfigView(state);
	MountElement(element, gridConfigElement);

	// SchemaControls
	const { element: schemaControlsElement } = SchemaControls(state);
	MountElement(element, schemaControlsElement);
	
	const Render = () => {
	}

	return { element }
} 


export default GridControlPanelView;

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
