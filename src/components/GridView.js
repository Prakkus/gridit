// const hexColorFromName = (colorName) => defaultProfile.availableColors[colorName];
// const symbolFromName = (symbolName) => defaultProfile.availableSymbols[symbolName];
// const tileFromIndex = (index) => defaultProfile.tileset[index];
import { SelectSchemaValue } from '../data/store.js';

export const style = 
`
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

// Update a given DOM node to reflect a given cellState.
const UpdateDOMCell = (cellElement, cellAttributes, resolveCellValue) => {
	cellElement.style.backgroundColor = '#' + resolveCellValue(0, cellAttributes.fillColor).hex;
	const symbolNode = cellElement.querySelector('.grid-cell-symbol');
	const symbolData = resolveCellValue(1, cellAttributes.symbol);
	const tileData = resolveCellValue(2, cellAttributes.backgroundTileIndex);
	symbolNode.innerHTML = symbolData.display;
	symbolNode.style.left = symbolData.xOffset;
	symbolNode.style.bottom = symbolData.yOffset;
	symbolNode.style.fontSize = symbolData.fontSize;
	cellElement.style.backgroundImage = `url(${tileData.imageDataUrl})`;
	cellElement.style.backgroundSize = 'cover';
}

// const GetDefaultCellState = (cellId, defaultAttributes) => {
// 	return {
// 		cellId, 
// 		x, 
// 		y,
// 		attributes: defaultAttributes
// 	};
// }

// Fills the given (grid) element with cells, each with optional data.
const PopulateDOMGridCells = (mountElement, width, height, cellData, resolveCellValue, defaultCellAttributes) => {
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

			const attributes = cellData.has(cellId) ? cellData.get(cellId).attributes : defaultCellAttributes;
			UpdateDOMCell(appendedNode, attributes, resolveCellValue);
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
const GridView = (UseSelector) => {
	let cellToNodeMap = new Map();
	let displayOptions = {
		width: 0,
		height: 0,
		cellSize: 0,
		cellGap: 0,
		showCoords: false
	}

	const element = document.createElement('div');

	// Empty the grid of cells and remove our references to them.
	const DeleteGridCells = () => {
		cellToNodeMap.forEach(node => node.remove());
		cellToNodeMap.clear();
	}

	// Get the value in a schema at valueIndex, e.g. a color in colors or an image in tiles.
	const ResolveCellValue = (schemaIndex, valueIndex) => UseSelector(state => SelectSchemaValue(state, {schemaIndex, valueIndex}));

	// Populate THIS grid with cells, properly rendering any with pre-existing data.
	const PopulateGridWithCells = (cellData,  defaultCellAttributes) => {
		DeleteGridCells();
		cellToNodeMap = PopulateDOMGridCells(element, displayOptions.width, displayOptions.height, cellData, ResolveCellValue, defaultCellAttributes);
	}

	// Update display options for THIS grid.
	const UpdateGridConfig = (width, height, cellSize, cellGap, showCoords) => {
		displayOptions = { width, height, cellSize, cellGap, showCoords };
		UpdateDOMGrid(element, width, height, cellSize, cellGap, showCoords);
	}

	const RenderCell = (cellId, attributes) => {
		const cellNode = cellToNodeMap.get(cellId);
		UpdateDOMCell(cellNode, attributes, ResolveCellValue);
	}

	// Render a view from a set of grid display options and optional cellData.
	const RenderGridAndCells = (width, height, cellSize, cellGap, showCoords, cellData, defaultCellAttributes) => {
		UpdateGridConfig(width, height, cellSize, cellGap, showCoords);
		PopulateGridWithCells(cellData, defaultCellAttributes);
	}

	return {element, RenderCell, RenderGridAndCells };
}

export default GridView;