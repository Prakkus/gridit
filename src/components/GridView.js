import { UseSelector, UpdateCells, SelectGridSize, SelectSchemaValue, SelectGridDisplayOptions, SelectAllCellData, SelectDefaultCellAttributes,  SelectCellById, AddBeforeMutationListener, AddAfterMutationListener, ClearAllCellData } from '../data/AppState.js';
import { UpdateGridConfig } from '../Actions.js';
import { SetJsonData, UpdateGridSize, UpdateGridDisplayOptions,  } from '../Mutations.js';
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
		if (mutation === UpdateGridSize || mutation === UpdateGridConfig || mutation === UpdateGridDisplayOptions || mutation === SetJsonData) {
			Render(mapStateToProps(state));
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
	

	// Render a view from a set of grid display options and optional cellData.
	// This ensures that all the necessary cells exist, but is not responsible for actually 
	// keeping them synced with their cellData.
	const Render = ({ width, height, cellSize, cellGap, showCoords }) => {
		// Update the grid CSS
		element.style.width = `${width * (cellSize + cellGap)}px`;
		element.style.height = `${height * (cellSize + cellGap)}px`;
		element.style.display = 'grid';
		element.style.gridTemplate = `repeat(auto-fill, ${cellSize}px) / repeat(auto-fill, ${cellSize}px)`;
		element.style.gap = cellGap + "px";
		element.style.padding = `${cellGap + "px"} 0px ${cellGap + "px"} ${cellGap + "px"}`;
		element.style.fontSize = Math.round(.6 * cellSize) + 'px';
		if (showCoords) {
			element.classList.remove('grid-coords-hidden');
		} else {
			element.classList.add('grid-coords-hidden');
		}
		
		//Ensure a DOM element exists for every cell in the grid.
		for (var y = height - 1; y >= 0; y--) {
			for (var x = 0; x < width; x++) {
				let cellId = x + ',' + y;
				// If we don't already have a cell element for this node id, create one.
				if (!cellToNodeMap.has(cellId)) {
					const thisCell = document.createElement('div');
					const symbol = document.createElement('span');
					symbol.classList.add('grid-cell-symbol');
					const coords = document.createElement('span');
					coords.classList.add('grid-coords-display');
					coords.innerHTML = `(${x}, ${y})`;
					thisCell.insertAdjacentElement('beforeend', symbol);
					thisCell.insertAdjacentElement('beforeend', coords);
		
					const appendedNode = element.appendChild(thisCell);
					appendedNode.classList.add('grid-cell');
					appendedNode.dataset.cellId = cellId;
					appendedNode.ondragstart = () => {return false;};
					cellToNodeMap.set(cellId, appendedNode);
					// Since this cell is newly created, we also want to flag it as dirty.
					dirtyCells.add(cellId);
				}
			}
		}
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
		if (mutation === ClearAllCellData) {
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
		if (mutation === SetJsonData) {
			MarkAllCellsDirty();
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
 

export default (state) => {
	const { element, Render: baseRender } = GridView();
	const Render = () => baseRender(mapStateToProps(state));
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
