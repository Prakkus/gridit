import defaultProfile from './default-profile.js';

const hexColorFromName = (colorName) => defaultProfile.availableColors[colorName];

const renderGridFromCells = (mountElement, cellData) => {
	let nodeMap = new Map();
	cellData.forEach((cellState, cellId) => {
		const thisCell = document.createElement("div");

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
}


//Renders cells from Map of cellData
const GridView = (gridMountElement, rowCount, columnCount, cellSize, cellGap) => {
	let cellToNodeMap = new Map();
	mountGridToElement(gridMountElement, rowCount, columnCount, cellSize, cellGap);

	//Update a given cell's DOM node to reflect a given cellState
	const renderCell = (cellState) => {
		const cellNode = cellToNodeMap.get(cellState.cellId);
		cellNode.style.backgroundColor = '#' + hexColorFromName(cellState.fillColor);
	}

	//Initialize a view from a set of cells
	const initFromCellData = (cellData) => {
		cellToNodeMap = renderGridFromCells(gridMountElement, cellData);
		cellData.forEach((cellState) => renderCell(cellState));
	}

	return { renderCell, initFromCellData };
}

export default GridView;