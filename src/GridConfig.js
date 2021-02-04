const GridConfig = (rowCount, columnCount, cellSize, cellGap, SetRowCount, SetColumnCount, SetGridCellSizeValue, SetGridColumnGapValue) => {
	const wrapper = document.createElement('div');
	const template =
	`
	<label>
		Rows:
		<input name="rowCount" type="number" step="1" value=${rowCount} />
	</label>
	<label>
		Columns:
		<input name="columnCount" type="number" step="1" value=${columnCount} />
	</label>
	<label>
		Cell Size:
		<input name="cellSize" type="number" step="1" value=${cellSize} />
	</label>
	<label>
		Cell Gap:
		<input name="cellGap" type="number" step="1" value=${cellGap} />
	</label>
	`;
	wrapper.innerHTML = template;
	wrapper.querySelector('input[name=rowCount]').addEventListener('change', (e) => SetRowCount(e.target.value));
	wrapper.querySelector('input[name=columnCount]').addEventListener('change', (e) => SetColumnCount(e.target.value));
	wrapper.querySelector('input[name=cellSize]').addEventListener('change', (e) => SetGridCellSizeValue(e.target.value));
	wrapper.querySelector('input[name=cellGap]').addEventListener('change', (e) => SetGridColumnGapValue(e.target.value));

	return wrapper;
}

export default GridConfig;