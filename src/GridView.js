import defaultProfile from './default-profile.js';

const hexColorFromName = (colorName) => defaultProfile.availableColors[colorName];
const symbolFromName = (symbolName) => defaultProfile.availableSymbols[symbolName];

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
`;

const renderGridFromCells = (mountElement, cellData) => {
	let nodeMap = new Map();
	cellData.forEach((cellState, cellId) => {
		const thisCell = document.createElement('div');
		const symbol = document.createElement('span');
		symbol.classList.add('grid-cell-symbol');
		thisCell.insertAdjacentElement('beforeend', symbol);

		const appendedNode = mountElement.appendChild(thisCell);
		appendedNode.classList.add('grid-cell');
		appendedNode.dataset.cellId = cellId;
		appendedNode.ondragstart = () => {return false;};
		nodeMap.set(cellId, appendedNode);				
	});

	return nodeMap;
}

const mountGridToElement = (mountElement, rowCount, columnCount, cellSize, cellGap) => {
	while (mountElement.firstChild) {
	    mountElement.removeChild(mountElement.firstChild);
	}

	mountElement.style.width = `${columnCount * (cellSize + cellGap)}px`;
	mountElement.style.height = `${rowCount * (cellSize + cellGap)}px`;
	mountElement.style.gridTemplate = `repeat(auto-fill, ${cellSize}px) / repeat(auto-fill, ${cellSize}px)`;
	mountElement.style.gridGap = cellGap + "px";
	mountElement.style.padding = `${cellGap + "px"} 0px ${cellGap + "px"} ${cellGap + "px"}`;
	mountElement.style.fontSize = Math.round(.6 * cellSize) + 'px';
}


//Renders cells from Map of cellData
const GridView = (gridMountElement, rowCount, columnCount, cellSize, cellGap) => {
	let cellToNodeMap = new Map();
	mountGridToElement(gridMountElement, rowCount, columnCount, cellSize, cellGap);

	//Update a given cell's DOM node to reflect a given cellState
	const renderCell = (cellState) => {
		const cellNode = cellToNodeMap.get(cellState.cellId);

		cellNode.style.backgroundColor = '#' + hexColorFromName(cellState.attributes.fillColor);
		const symbolNode = cellNode.querySelector('.grid-cell-symbol');
		const symbolData = symbolFromName(cellState.attributes.symbol);
		symbolNode.innerHTML = symbolData.display;
		symbolNode.style.left = symbolData.xOffset;
		symbolNode.style.bottom = symbolData.yOffset;
	}

	//Initialize a view from a set of cells
	const initFromCellData = (cellData) => {
		cellToNodeMap = renderGridFromCells(gridMountElement, cellData);
		cellData.forEach((cellState) => renderCell(cellState));
	}

	return { defaultStyle, renderCell, initFromCellData };
}

export default GridView;