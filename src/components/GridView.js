// const hexColorFromName = (colorName) => defaultProfile.availableColors[colorName];
// const symbolFromName = (symbolName) => defaultProfile.availableSymbols[symbolName];
// const tileFromIndex = (index) => defaultProfile.tileset[index];
import { initialCellState } from '../data/store.js';

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

const renderGridFromCells = (mountElement, cellData) => {
	let nodeMap = new Map();
	let sorted = [...cellData]; //sort(cell => cell.Id);
	console.log(sorted);
	sorted.forEach(([cellId, cellState]) => {
		const thisCell = document.createElement('div');
		const symbol = document.createElement('span');
		symbol.classList.add('grid-cell-symbol');
		const coords = document.createElement('span');
		coords.classList.add('grid-coords-display');
		coords.innerHTML = `(${cellState.x}, ${cellState.y})`;
		thisCell.insertAdjacentElement('beforeend', symbol);
		thisCell.insertAdjacentElement('beforeend', coords);

		const appendedNode = mountElement.appendChild(thisCell);
		appendedNode.classList.add('grid-cell');
		appendedNode.dataset.cellId = cellId;
		appendedNode.ondragstart = () => {return false;};
		nodeMap.set(cellId, appendedNode);				
	});

	return nodeMap;
}

//Update a given cell's DOM node to reflect a given cellState
const renderCell = (mountElement, cellState, resolveCellValue) => {
	mountElement.style.backgroundColor = '#' + resolveCellValue(0, cellState.attributes.fillColor).hex;
	const symbolNode = mountElement.querySelector('.grid-cell-symbol');
	const coordinatesDisplayNode = mountElement.querySelector('.grid-coords-display');
	const symbolData = resolveCellValue(1, cellState.attributes.symbol);
	const tileData = resolveCellValue(2, cellState.attributes.backgroundTileIndex);
	symbolNode.innerHTML = symbolData.display;
	symbolNode.style.left = symbolData.xOffset;
	symbolNode.style.bottom = symbolData.yOffset;
	symbolNode.style.fontSize = symbolData.fontSize;
	mountElement.style.backgroundImage = `url(${tileData.imageDataUrl})`;
	mountElement.style.backgroundSize = 'cover';
}

const renderGrid = (mountElement, width, height, cellData, resolveCellValue) => {
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
			// nodeMap.set(cellId, appendedNode);
			const cellRenderData = cellData.has(cellId) ? cellData.get(cellId) : initialCellState;
			renderCell(appendedNode, cellRenderData, resolveCellValue);

		}
	}
	return nodeMap;
}

const mountGridToElement = (mountElement, rowCount, columnCount, cellSize, cellGap) => {
	mountElement.style.width = `${columnCount * (cellSize + cellGap)}px`;
	mountElement.style.height = `${rowCount * (cellSize + cellGap)}px`;
	mountElement.style.display = 'grid';
	mountElement.style.gridTemplate = `repeat(auto-fill, ${cellSize}px) / repeat(auto-fill, ${cellSize}px)`;
	mountElement.style.gridGap = cellGap + "px";
	mountElement.style.padding = `${cellGap + "px"} 0px ${cellGap + "px"} ${cellGap + "px"}`;
	mountElement.style.fontSize = Math.round(.6 * cellSize) + 'px';
}


//Renders cells from Map of cellData
const GridView = (rowCount, columnCount, cellSize, cellGap, resolveCellValue) => {
	let cellToNodeMap = new Map();
	const element = document.createElement('div');

	mountGridToElement(element, rowCount, columnCount, cellSize, cellGap);

	//Initialize a view from a set of cells
	const initFromCellData = (cellData) => {
		// cellToNodeMap = renderGridFromCells(element, cellData.all);
		cellToNodeMap = renderGrid(element, cellData.all);
		cellData.all.forEach((cellState) => renderCell(cellState));
	}

	const init = (cellData) => {
		// cellToNodeMap = renderGridFromCells(element, cellData.all);
		cellToNodeMap = renderGrid(element, columnCount, rowCount, cellData.all, resolveCellValue);
		console.log(cellToNodeMap);
	}

	return {element, defaultStyle, renderCell, init, initFromCellData };
}

export default GridView;