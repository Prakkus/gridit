const GridConfig = (rowCount, columnCount, cellSize, cellGap, SetRowCount, SetColumnCount, SetGridCellSizeValue, SetGridColumnGapValue) => {
	const GridConfigElement = document.createElement('div');
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
				<input name="rowCount" type="number" step="1" value=${rowCount} />
			</label>
			<label>
				<span>
					Columns:
				</span>
				<input name="columnCount" type="number" step="1" value=${columnCount} />
			</label>
		</div>
		<div class="cell-config">
			<label>
				<span>		
					Cell Size:
				</span>
				<input name="cellSize" type="number" step="1" value=${cellSize} />
			</label>
			<label>
				<span>
					Cell Gap:
				</span>
				<input name="cellGap" type="number" step="1" value=${cellGap} />
			</label>
		</div>
	</div>
	`;
	GridConfigElement.innerHTML = template;
	GridConfigElement.querySelector('input[name=rowCount]').addEventListener('change', (e) => SetRowCount(e.target.value));
	GridConfigElement.querySelector('input[name=columnCount]').addEventListener('change', (e) => SetColumnCount(e.target.value));
	GridConfigElement.querySelector('input[name=cellSize]').addEventListener('change', (e) => SetGridCellSizeValue(e.target.value));
	GridConfigElement.querySelector('input[name=cellGap]').addEventListener('change', (e) => SetGridColumnGapValue(e.target.value));

	return {defaultStyle, GridConfigElement};
}

export default GridConfig;