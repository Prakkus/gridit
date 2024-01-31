import { UseSelector, SelectGridSize, SelectGridDisplayOptions, SelectAllCellData, SelectCellById, AddBeforeMutationListener, AddAfterMutationListener, SelectSchemasOfType } from '../data/AppState.js';
import { LoadCellData, UpdateGridSize, UpdateGridDisplayOptions, UpdateCells, ClearAllCellData as ClearAllCellDataMutation, AppendSchema } from '../Mutations.js';

// Update a given DOM node to reflect a given cellState.
// cellAttributes is an object of schema_name: schema_index KVPs.
const UpdateDOMCell = (cellElement, cellAttributes) => {
	// Background Color.
	// We assume there's one color schema and one background schema until I can think of a reason to have multiple of them.
	const colorSchema = UseSelector(state => SelectSchemasOfType(state, {schemaType: "color"}))[0];
	const colorHex = colorSchema.values[cellAttributes.background_color].hex;
	cellElement.style.backgroundColor = '#' + colorHex;

	// Background Image.
	const backgroundSchema = UseSelector(state => SelectSchemasOfType(state, {schemaType: "background"}))[0];
	const backgroundImage = backgroundSchema.values[cellAttributes.background_image];
	cellElement.style.backgroundImage = `url(${backgroundImage.imageDataUrl})`;

	// Text.
	// Text schemas are the only ones where there may be multiple different ones applied to a cell.
	const textSchemas = UseSelector(state => SelectSchemasOfType(state, {schemaType: "text"}));
	textSchemas.forEach(schema => {
		const textNode = cellElement.querySelector('.grid-cell-text-' + schema.name);
		const schemaValueforThisCell = schema.values[cellAttributes[schema.name]];
		textNode.innerHTML = schemaValueforThisCell.display;
		textNode.style.left = schemaValueforThisCell.xOffset;
		textNode.style.top = schemaValueforThisCell.yOffset;
		textNode.style.fontSize = schemaValueforThisCell.fontSize;
		textNode.style.color = '#' + schemaValueforThisCell.color;
		textNode.style.lineHeight = schemaValueforThisCell.lineHeight;
	});
}

// Renders cells from Map of cellData.
export const GridView = (state) => {
	const element = document.createElement('div');
	let cellToNodeMap = new Map();
	let dirtyCells = new Set();

	// When loading or resetting a full grid, we want to re-render all possible cells, 
	// so this makes that simple. 
	const MarkAllCellsDirty = () => {
		const gridSize = UseSelector(SelectGridSize);
		for (var y = gridSize.y - 1; y >= 0; y--) {
			for (var x = 0; x < gridSize.x; x++) {
				let cellId = x + ',' + y;
				dirtyCells.add(cellId);
			}
		}
	}

	// Rerender the grid when the grid options change.
	AddAfterMutationListener((mutation, args) => {
		// When the size changes, we have to render everything.
		if (mutation === UpdateGridSize) {
			RenderGrid();
			RenderCells();
		}
		// We also have to render the cells if a new text schema is added 
		// so that they create a node for that content.
		if (mutation === AppendSchema) {
			const { schema } = args;
			if (schema.type === 'text') {
				RenderCells();
			}
		}

		// If just the display options are changing, we can just update the grid css.
		if (mutation === UpdateGridDisplayOptions) {
			RenderGrid();
		}
	});

	// Renders up to Count dirty cells from their cellData in the State. 
	// That way large grids can be updated without any hanging.
	const RenderDirtyCells = (count = Infinity) => {
		if (dirtyCells.size < 1) return;
		const toRender = dirtyCells.size > count ? [...dirtyCells].slice(0, count) : [...dirtyCells];
		toRender.forEach(cellId => {
			const thisCellData = UseSelector(SelectCellById)(cellId);
			RenderCell(cellId, thisCellData.attributes)
			dirtyCells.delete(cellId);
		});
	};

	
	const RenderCell = (cellId, attributes) => {
		const cellNode = cellToNodeMap.get(cellId);
		if (!cellNode) return;
		UpdateDOMCell(cellNode, attributes);
	}

	// Updates the grid itself, which uses css to handle most of the grid logic.
	const RenderGrid = () => {
		const { x: width, y: height } = UseSelector(SelectGridSize);
		const { cellSize, cellGap, backgroundColor, showCoords } = UseSelector(SelectGridDisplayOptions);
		
		// Update the grid CSS
		// Todo: it'd be better to not have to write to the body tag here.
		document.body.style.backgroundColor = backgroundColor;
		element.style.width = `${width * (cellSize + cellGap)}px`;
		element.style.height = `${height * (cellSize + cellGap)}px`;
		element.style.display = 'grid';
		element.style.gridTemplate = `repeat(auto-fill, ${cellSize}px) / repeat(auto-fill, ${cellSize}px)`;
		element.style.gap = cellGap + "px";
		element.style.padding = `${cellGap + "px"} 400px ${cellGap + "px"} ${cellGap + "px"}`;
		if (showCoords) {
			element.classList.remove('grid-coords-hidden');
		} else {
			element.classList.add('grid-coords-hidden');
		}
	}
	

	// Builds each cell, ensuring that all the necessary cells exist.
	// Not responsible for actually keeping them synced with their cellData.
	const RenderCells = () => {
		const { x: width, y: height } = UseSelector(SelectGridSize);
		// In addition to grid size, we need to know how many text schemas there are so that
		// we can add an element for each one into the cells.
		const textSchemas = UseSelector(state => SelectSchemasOfType(state, { schemaType: 'text' }));

		// We'll build our grid and store it in a fragment, then append the fragment
		// to the DOM all at once to minimize reflows.
		let fragment = new DocumentFragment();
		cellToNodeMap.clear();
		
		// Build a DOM cell element for every cell in the grid.
		for (var y = height - 1; y >= 0; y--) {
			for (var x = 0; x < width; x++) {
				let cellId = x + ',' + y;
				const thisCell = document.createElement('div');
				
				// Create a text node for each text schema.
				for (let index = 0; index < textSchemas.length; index++) {
					const schemaName = textSchemas[index].name;
					const textNode = document.createElement('span');
					textNode.classList.add('grid-cell-text-node');
					textNode.classList.add('grid-cell-text-' + schemaName);
					thisCell.insertAdjacentElement('beforeend', textNode);
				}


				const coords = document.createElement('span');
				coords.classList.add('grid-coords-display');
				coords.innerHTML = `(${x}, ${y})`;
				thisCell.insertAdjacentElement('beforeend', coords);
				thisCell.classList.add('grid-cell');
				thisCell.dataset.cellId = cellId;
				thisCell.ondragstart = () => {return false;};
				// Append it to our fragment and track the node in our map so we can get it again later.
				const appendedNode = fragment.appendChild(thisCell);
				cellToNodeMap.set(cellId, appendedNode);
				// Since this cell is newly created, we also want to flag it as dirty.
				dirtyCells.add(cellId);
			}
		}

		// Note: Technically we might be able to preserve all of the cells, only add necessary new nodes, and rerender accordingly.
		// Due to how the css grid/node ordering works though, this ends up being a little tricky in practice and might still be slower
		// than swapping the whole thing out at once, so I haven't bothered.
		element.innerHTML = "";
		element.appendChild(fragment);
	}

	// Each tick, render up to maxCellsToRenderPerTick dirty cells. 
	// Limit can be tweaked to set a max number of updates per 'frame'.
	const Tick = () => {
		const maxCellsToRenderPerTick = 150;
		RenderDirtyCells(maxCellsToRenderPerTick);
		window.requestAnimationFrame(Tick);
	}

	// When all cells are about to be cleared, grab the 'dirty' cells beforehand so that we can mark them dirty.
	AddBeforeMutationListener((mutation, args) => {
		if (mutation === ClearAllCellDataMutation) {
			const cellData = UseSelector(SelectAllCellData);
			dirtyCells = new Set(cellData.keys());
		} 	
	});

	// When a cell is individually edited, mark it dirty afterwards.
	AddAfterMutationListener((mutation, args) => {
		if (mutation === UpdateCells) {
			const {cellIds} = args;
			cellIds.forEach(cellId => dirtyCells.add(cellId));
		}

		// After loading a fresh grid or reverting to a past grid, all cells are potentially dirty.
		// Todo: I can probably figure out which ones actually are dirty in some cleverer way eventually.
		if (mutation === LoadCellData) {
			MarkAllCellsDirty();
		}
	});

	// Rerender dirty cells every frame.
	window.requestAnimationFrame(Tick);

	return { element };
}

export default GridView;


export const style = 
`
	#grid-mount-point {
		font-size: 30px;
	}
	.grid-coords-hidden .grid-coords-display {
		display: none;
	}
	.grid-cell-text-node {
		color: #fff;
		width: 100%;
		height: 100%;
		display: block;
		position: absolute;
		pointer-events: none;
	}

	.grid-coords-display {
		color: var(--text-default);
		font-size: 10px;
		position: absolute;
		right: 0px;
		bottom: 0px;
		line-height: 1;
		padding: 4px;
		background-color: var(--darker);
		pointer-events: none;
	}

	.grid-cell {
		position: relative;
		transition:  all .125s ease;
		user-select: none;
		display: flex;
		justify-content: space-around;
		align-items: center;
		overflow: hidden;
		background-size: cover;
	}

	.grid-cell:hover {
		outline: 1px solid rgba(255, 255, 255, .6);
	}
`;
