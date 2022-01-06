// const hexColorFromName = (colorName) => defaultProfile.availableColors[colorName];
// const symbolFromName = (symbolName) => defaultProfile.availableSymbols[symbolName];
// const tileFromIndex = (index) => defaultProfile.tileset[index];
// import { initialCellState } from '../data/store.js';

const defaultStyle = 
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
		}

		.grid-cell:hover {
			outline: 1px solid rgba(255, 255, 255, .6);
		}
`;

// Update a given DOM node to reflect a given cellState.
const renderCell = (cellElement, cellState, resolveCellValue) => {
	console.log(cellState);
	cellElement.style.backgroundColor = '#' + resolveCellValue(0, cellState.attributes.fillColor).hex;
	const symbolNode = cellElement.querySelector('.grid-cell-symbol');
	const coordinatesDisplayNode = cellElement.querySelector('.grid-coords-display');
	const symbolData = resolveCellValue(1, cellState.attributes.symbol);
	const tileData = resolveCellValue(2, cellState.attributes.backgroundTileIndex);
	symbolNode.innerHTML = symbolData.display;
	symbolNode.style.left = symbolData.xOffset;
	symbolNode.style.bottom = symbolData.yOffset;
	symbolNode.style.fontSize = symbolData.fontSize;
	cellElement.style.backgroundImage = `url(${tileData.imageDataUrl})`;
	cellElement.style.backgroundSize = 'cover';
}

// Fills the given (grid) element with cells, each with optional data.
const populateGridCells = (mountElement, width, height, cellData, resolveCellValue, defaultCellAttributes) => {
	console.log(resolveCellValue);
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
			const defaultCellState = {
				cellId, 
				x, 
				y,
				attributes: defaultCellAttributes
			};
			const cellRenderData = cellData.has(cellId) ? cellData.get(cellId) : defaultCellState;
			renderCell(appendedNode, cellRenderData, resolveCellValue);
		}
	}
	return nodeMap;
}

// Sets the Grid wrapper css to match the grid properties.
const updateGridStyle = (mountElement, width, height, cellSize, cellGap, showCoords) => {
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
const GridView = (resolveCellValue) => {
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

	// Populate THIS grid with cells, properly rendering any with pre-existing data.
	const PopulateGridWithCells = (cellData, resolveCellValue, defaultCellAttributes) => {
		DeleteGridCells();
		console.log(resolveCellValue);
		cellToNodeMap = populateGridCells(element, displayOptions.width, displayOptions.height, cellData, resolveCellValue, defaultCellAttributes);
	}

	// Update display options for THIS grid.
	const UpdateGridConfig = (width, height, cellSize, cellGap, showCoords) => {
		displayOptions = { width, height, cellSize, cellGap, showCoords };
		updateGridStyle(element, width, height, cellSize, cellGap, showCoords);
	}

	// const Init = (width, height, cellSize, cellGap) => {
	// 	UpdateGridConfig(width, height, cellSize, cellGap);
	// 	PopulateGridWithCells(new Map(), resolveCellValue);
	// }

	// Render a view from a set of grid display options and optional cellData.
	const RenderGridAndCells = (width, height, cellSize, cellGap, showCoords, cellData, defaultCellAttributes) => {
		UpdateGridConfig(width, height, cellSize, cellGap, showCoords);
		PopulateGridWithCells(cellData, resolveCellValue, defaultCellAttributes);
	}

	return {element, defaultStyle, renderCell, RenderGridAndCells };
}

export default GridView;