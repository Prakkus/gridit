export const style = 
	`
		.grid-config > div {
			margin-bottom: 12px;
		}
		.size-config, .cell-config {
			display: flex;
			justify-content: space-between;
		}
		.grid-config label {
			width: 50%;
			display: flex;
			justify-content: space-between;
			align-content: center;
		}
		.grid-config label:first-child {
			margin-right: 16px;
		}

		.grid-config span {
			display: flex;
			align-items: center;
			flex-grow: 1;
		}
		.grid-config input {
			flex-shrink: 0;
			max-width: 64px;
			text-align: center;
		}
	`;

	const template =
	`
	<div class="grid-config">
		<div class="size-config">
			<label>
				<span>
					Columns:
				</span>
				<input name="columnCount" type="number" step="1" />
			</label>
			<label>
				<span>
					Rows:
				</span>
				<input name="rowCount" type="number" step="1" />
			</label>
		</div>
		<div class="cell-config">
			<label>
				<span>		
					Cell Size:
				</span>
				<input name="cellSize" type="number" step="1" />
			</label>
			<label>
				<span>
					Cell Gap:
				</span>
				<input name="cellGap" type="number" step="1" />
			</label>
		</div>
					<label>
				<span>
					Show Coords:
				</span>
				<input name="showCoords" type="checkbox" />
			</label>
	</div>
	`;
const GridConfigView = (OnSubmit) => {
	const element = document.createElement('div');
	element.innerHTML = template;


	const Submit = () => {
		const data = {
			rowCount: parseInt(rowCountInput.value),
			columnCount: parseInt(columnCountInput.value),
			cellSize: parseInt(cellSizeInput.value),
			cellGap: parseInt(cellGapInput.value),
			showCoords: showCoordsInput.checked
		}
		OnSubmit(data);
	}

	// Submit if they press ENTER with this element focused.
	element.addEventListener("keydown", (e) => {
		if (e.keyCode == 13) {
			Submit();
		}
	});

	const rowCountInput = element.querySelector('input[name=rowCount]');
	rowCountInput.addEventListener('blur', Submit);

	const columnCountInput = element.querySelector('input[name=columnCount]');
	columnCountInput.addEventListener('blur', Submit);

	const cellSizeInput = element.querySelector('input[name=cellSize]');
	cellSizeInput.addEventListener('blur', Submit);

	const cellGapInput = element.querySelector('input[name=cellGap]');
	cellGapInput.addEventListener('blur', Submit);

	const showCoordsInput = element.querySelector('input[name=showCoords]');
	showCoordsInput.addEventListener('change', Submit);

	const Render = ({rowCount, columnCount, cellSize, cellGap, showCoords }) => {
		rowCountInput.value = rowCount;
		columnCountInput.value = columnCount;
		cellSizeInput.value = cellSize;
		cellGapInput.value = cellGap;
		showCoordsInput.checked = showCoords;
	}


	return {element, Render};
}

export default GridConfigView;