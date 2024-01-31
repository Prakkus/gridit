import { UseSelector, SelectGridSize, SelectGridDisplayOptions, AddAfterMutationListener } from "../../data/AppState.js";
import { UpdateGridConfig } from '../../Actions.js';
import { UpdateGridDisplayOptions, UpdateGridSize } from "../../Mutations.js";

export const GridConfigView = (state) => {
	const element = document.createElement('div');
	element.innerHTML = template;

	AddAfterMutationListener((mutation, args) => {
		if (mutation === UpdateGridSize || mutation === UpdateGridConfig || mutation === UpdateGridDisplayOptions) {
			Render();
		}
	});

	const OnSubmit = ({rowCount, columnCount, cellSize, cellGap, backgroundColor, showCoords}) => {
		UpdateGridConfig(columnCount, rowCount, cellSize, cellGap, backgroundColor, showCoords);
	}

	// Submit if they press ENTER with this element focused.
	element.addEventListener("keydown", (e) => {
		if (e.keyCode == 13) {
			Submit();
		}
	});

	const rowCountInput = element.querySelector('input[name=rowCount]');
	const columnCountInput = element.querySelector('input[name=columnCount]');
	const cellSizeInput = element.querySelector('input[name=cellSize]');
	const cellGapInput = element.querySelector('input[name=cellGap]');
	const backgroundColorInput = element.querySelector('input[name=backgroundColor]');
	const showCoordsInput = element.querySelector('input[name=showCoords]');

	
	const Submit = () => {
		const formData = {
			rowCount: parseInt(rowCountInput.value),
			columnCount: parseInt(columnCountInput.value),
			cellSize: parseInt(cellSizeInput.value),
			cellGap: parseInt(cellGapInput.value),
			backgroundColor: backgroundColorInput.value,
			showCoords: showCoordsInput.checked
		}
		OnSubmit(formData);
	}

	rowCountInput.addEventListener('blur', Submit);
	columnCountInput.addEventListener('blur', Submit);
	cellSizeInput.addEventListener('blur', Submit);
	cellGapInput.addEventListener('blur', Submit);
	backgroundColorInput.addEventListener('change', Submit);
	showCoordsInput.addEventListener('change', Submit);

	const Render = () => {
		const gridSize = UseSelector(SelectGridSize);
		const gridDisplayOptions = UseSelector(SelectGridDisplayOptions);

		rowCountInput.value = gridSize.y;
		columnCountInput.value =  gridSize.x;
		cellSizeInput.value = gridDisplayOptions.cellSize;
		cellGapInput.value = gridDisplayOptions.cellGap;
		backgroundColorInput.value = gridDisplayOptions.backgroundColor;
		showCoordsInput.checked = gridDisplayOptions.showCoords;
	}


	return { element };
}

export default GridConfigView;

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
	<div class="cell-config">
		<label>
			<span>
				Base Color:
			</span>
			<input name="backgroundColor" type="color" />
		</label>	
		<label>
			<span>
				Coords:
			</span>
			<input name="showCoords" type="checkbox" />
		</label>
	</div>
</div>
`;
