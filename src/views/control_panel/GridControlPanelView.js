import { InjectStyles, MountElement } from '../../DOMUtils.js';
import PersistenceView, { style as persistenceViewStyle } from './PersistenceView.js';
import GridConfigView, { style as gridConfigViewStyle } from './GridConfigView.js';
import GridSchemasView, { style as schemaControlsStyle } from './GridSchemasView.js';
import TilesetEditor, { style as tilesetViewStyle } from '../../components/TilesetEditor.js';
import Modal, { style as modalViewStyle } from '../../components/Modal.js';
import { SetValuesForSchema } from '../../Actions.js';
import { SelectLoadedSchemas, UseSelector } from '../../data/AppState.js';

export const GridControlPanelView = (state) => {
	const element = document.createElement('div');
	InjectStyles(persistenceViewStyle, gridConfigViewStyle, schemaControlsStyle, tilesetViewStyle, modalViewStyle);

	// TilesetView
	const { element: tilesetViewElement, Render: RenderTilesetView } = TilesetEditor();
	RenderTilesetView({
		slicesExtractedHandler: (slices) => {
			// Assume there is only one background schema and find its index.
			const backgroundSchemaIndex = UseSelector(SelectLoadedSchemas).findIndex(schema => schema.type === 'background');
			// We also prepend an empty image cell to act as the default value.
			SetValuesForSchema(backgroundSchemaIndex, [{ imageDataUrl: '' }, ...slices]);
			CloseTiliesetModal();
		} 
	});
	// Tileset Modal
	const { element: tilesetModalElement, Render: RenderTilesetModal, Open: OpenTilesetModal, Close: CloseTiliesetModal } = Modal();
	MountElement(document.body, tilesetModalElement);

	// Persistence View. 
	const { element: persistenceElement } = PersistenceView( 
		{ 
			onImportTilesetClicked: () => {
				RenderTilesetModal({title: "Configure Tilesets", content: tilesetViewElement});
				OpenTilesetModal();
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

	// Grid Schemas
	const { element: schemasViewElement } = GridSchemasView(state);
	MountElement(element, schemasViewElement);
	
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
