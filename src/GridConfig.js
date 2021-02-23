	const defaultStyle = 
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
					Rows:
				</span>
				<input name="rowCount" type="number" step="1" />
			</label>
			<label>
				<span>
					Columns:
				</span>
				<input name="columnCount" type="number" step="1" />
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
	</div>
	`;
const GridConfig = (updateGridConfig) => {
	const GridConfigElement = document.createElement('div');
	GridConfigElement.innerHTML = template;


	const rowCountInput = GridConfigElement.querySelector('input[name=rowCount]');
	rowCountInput.addEventListener('change', (e) => updateGridConfig({rowCount: e.target.value}));

	const columnCountInput = GridConfigElement.querySelector('input[name=columnCount]');
	columnCountInput.addEventListener('change', (e) => updateGridConfig({columnCount: e.target.value}));

	const cellSizeInput = GridConfigElement.querySelector('input[name=cellSize]');
	cellSizeInput.addEventListener('change', (e) => updateGridConfig({cellSize: e.target.value}));

	const cellGapInput = GridConfigElement.querySelector('input[name=cellGap]');
	cellGapInput.addEventListener('change', (e) => updateGridConfig({cellGap: e.target.value}));


	const render = ({rowCount, columnCount, cellSize, cellGap }) => {
		rowCountInput.value = rowCount;
		columnCountInput.value = columnCount;
		cellSizeInput.value = cellSize;
		cellGapInput.value = cellGap;
	}


	return {defaultStyle, GridConfigElement, render};
}

export default GridConfig;