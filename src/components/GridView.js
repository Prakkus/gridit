import { Connect, UseSelector, UpdateCells, SelectGridSize, SelectSchemaValue, SelectGridDisplayOptions, SelectAllCellData, SelectDefaultCellAttributes, ApplyMutation, SelectCellById, AddBeforeMutationListener, AddAfterMutationListener, ClearAllCellData } from '../data/AppState.js';

// Get the value in a schema at valueIndex, e.g. a color in colors or an image in tiles.
const ResolveCellAttributeValue = (schemaIndex, valueIndex) => UseSelector(state => SelectSchemaValue(state, {schemaIndex, valueIndex}));

// Update a given DOM node to reflect a given cellState.
const UpdateDOMCell = (cellElement, cellAttributes) => {
	cellElement.style.backgroundColor = '#' + ResolveCellAttributeValue(0, cellAttributes.fillColor).hex;
	const symbolNode = cellElement.querySelector('.grid-cell-symbol');
	const symbolData = ResolveCellAttributeValue(1, cellAttributes.symbol);
	const tileData = ResolveCellAttributeValue(2, cellAttributes.backgroundTileIndex);
	symbolNode.innerHTML = symbolData.display;
	symbolNode.style.left = symbolData.xOffset;
	symbolNode.style.bottom = symbolData.yOffset;
	symbolNode.style.fontSize = symbolData.fontSize;
	cellElement.style.backgroundImage = `url(${tileData.imageDataUrl})`;
	cellElement.style.backgroundSize = 'cover';
}

// Fills the given (grid) element with cells
const PopulateDOMGridCells = (mountElement, width, height, defaultCellAttributes) => {
	let nodeMap = new Map();
	for (var y = height - 1; y >= 0; y--) {
		for (var x = 0; x < width; x++) {
			let cellId = x + ',' + y;
			const thisCell = document.createElement('div');
			const symbol = document.createElement('span');
			symbol.classList.add('grid-cell-symbol');
			const coords = document.createElement('span');
			coords.classList.add('grid-coords-display');
			coords.innerHTML = `(${x}, ${y})`;
			thisCell.insertAdjacentElement('beforeend', symbol);
			thisCell.insertAdjacentElement('beforeend', coords);

			const appendedNode = mountElement.appendChild(thisCell);
			appendedNode.classList.add('grid-cell');
			appendedNode.dataset.cellId = cellId;
			appendedNode.ondragstart = () => {return false;};
			nodeMap.set(cellId, appendedNode);
			
			UpdateDOMCell(thisCell, defaultCellAttributes);
		}
	}
	return nodeMap;
}

// Sets the Grid wrapper css to match the grid properties.
const UpdateDOMGrid = (mountElement, width, height, cellSize, cellGap, showCoords) => {
	mountElement.style.width = `${width * (cellSize + cellGap)}px`;
	mountElement.style.height = `${height * (cellSize + cellGap)}px`;
	mountElement.style.display = 'grid';
	mountElement.style.gridTemplate = `repeat(auto-fill, ${cellSize}px) / repeat(auto-fill, ${cellSize}px)`;
	mountElement.style.gridGap = cellGap + "px";
	mountElement.style.padding = `${cellGap + "px"} 0px ${cellGap + "px"} ${cellGap + "px"}`;
	mountElement.style.fontSize = Math.round(.6 * cellSize) + 'px';
	if (showCoords) {
		mountElement.classList.remove('grid-coords-hidden');
	} else {
		mountElement.classList.add('grid-coords-hidden');
	}
}


// Renders cells from Map of cellData.
export const GridView = () => {
	let cellToNodeMap = new Map();
	let dirtyCells = new Set();
	let displayOptions = {
		width: 0,
		height: 0,
		cellSize: 0,
		cellGap: 0,
		showCoords: false
	}


	const RenderDirtyCells = () => {
		const cellData = UseSelector(SelectAllCellData);
		if (dirtyCells.size > 0) {
			console.log("Rendering some dirtycells! ");
			
			dirtyCells.forEach(cellId => {
				const thisCellData = UseSelector(SelectCellById)(cellId);
				console.log(thisCellData);
				RenderCell(cellId, thisCellData.attributes)
			});
			dirtyCells.clear();
		}
	};

	const element = document.createElement('div');

	// Empty the grid of cells and remove our references to them.
	const DeleteGridCells = () => {
		cellToNodeMap.forEach(node => node.remove());
		cellToNodeMap.clear();
	}

	// Populate THIS grid with cells, properly rendering any with pre-existing data.
	const PopulateGridWithCells = (defaultCellAttributes) => {
		DeleteGridCells();
		cellToNodeMap = PopulateDOMGridCells(element, displayOptions.width, displayOptions.height, defaultCellAttributes);
	}

	// Update display options for THIS grid.
	const UpdateGridConfig = (width, height, cellSize, cellGap, showCoords) => {
		displayOptions = { width, height, cellSize, cellGap, showCoords };
		UpdateDOMGrid(element, width, height, cellSize, cellGap, showCoords);
	}

	
	
	const RenderCell = (cellId, attributes) => {
		const cellNode = cellToNodeMap.get(cellId);
		UpdateDOMCell(cellNode, attributes);
	}

	// Render a view from a set of grid display options and optional cellData.
	const Render = ({ width, height, cellSize, cellGap, showCoords, defaultCellAttributes }) => {
		UpdateGridConfig(width, height, cellSize, cellGap, showCoords);
		PopulateGridWithCells(defaultCellAttributes);
	}

	const Tick = () => {
		RenderDirtyCells();
		window.requestAnimationFrame(Tick);
	}

	// When all cells are about to be cleared, grab the 'dirty' cells beforehand so that we can mark them dirty.
	AddBeforeMutationListener((mutation, args) => {
		if (mutation === ClearAllCellData) {
			const cellData =  UseSelector(SelectAllCellData);
			dirtyCells = new Set(cellData.keys());
			console.log(dirtyCells);
			// dirtyCells =.map(cell => cell.cellId);
		} 	
	});

	// When a cell is edited, mark it dirty afterwards.
	AddAfterMutationListener((mutation, args) => {
		if (mutation === UpdateCells) {
			const {cellIds} = args;
			cellIds.forEach(cellId => dirtyCells.add(cellId));
		}
	});

	// Rerender dirty cells every frame.
	window.requestAnimationFrame(Tick);

	return { element, Render };
}

const mapStateToProps = (state) => { 
	const gridSize = UseSelector(SelectGridSize);
	const gridDisplayOptions = UseSelector(SelectGridDisplayOptions);
	const defaultCellAttributes = UseSelector(SelectDefaultCellAttributes);
	return { width: gridSize.x, height: gridSize.y, cellSize: gridDisplayOptions.cellSize, cellGap: gridDisplayOptions.cellGap, showCoords: gridDisplayOptions.showCoords, defaultCellAttributes };
};
 

export default () => {
	const { element, Render: baseRender } = GridView();
	const Render = Connect(mapStateToProps)(baseRender);
	return { element, Render };
}


export const style = 
`
	.grid-coords-hidden .grid-coords-display {
		display: none;
	}
	.grid-cell-symbol {
		color: #fff;
		width: 100%;
		display: block;
		height: 100%;
		text-align: center;
		line-height: 1.35;
		pointer-events: none;
		position: relative;
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
	}

	.grid-cell:hover {
		outline: 1px solid rgba(255, 255, 255, .6);
	}
`;
