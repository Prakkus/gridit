const PersistenceView = ({ openFileImportWindow, openFileAddWindow, setGridName, handleFileDragOver, handleFileDrop, downloadJsonSave, addOnGridNameChangedListener, handleMergeDrop, handleMergeDragOver, handleClearClicked, handleReloadClicked }) => {
	let gridNameInput;
	// addOnGridNameChangedListener((name) => gridNameInput.value = name);

	const defaultStyle = 
	`
		.title {
			padding-bottom: 16px;
			display: flex;
		}
		.title input {
			flex-grow: 1;
		}
		.toolbar {
			padding-bottom: 16px;
			display: flex;
			width: 100%;
		}

		.persistence-panel button {
			padding: 4px;
			margin-right: 8px
		}
		.toolbar span.material-icons {
			margin-top: 2px;
		}

		#download-as-json {
			margin-left: 16px;
		}

	`
	const template = 
	`
	<div class="persistence-panel">
		<div class="title">
			<input type="text" name="grid_name" placeholder="Name your grid..." />
			<button title="Save as JSON file" id="download-as-json">
				<span class="material-icons">file_download</span>
	    	</button>
		</div>
		<div class="toolbar">
	    	<button title="Reload all cells from the current file" id="reload-file">
				<span class="material-icons">restore</span>
	    	</button>
			<button title="Load a grid from a JSON file" id="import-from-json">
				<span class="material-icons">upload_file</span>
	    	</button>
	    	<button title="Merge cells from a JSON file" id="add-from-json">
				<span class="material-icons">note_add</span>
	    	</button>
	    	<button title="Clear all cells and history" id="clear-all">
				<span class="material-icons">delete</span>
	    	</button>
    	</div>
	</div>
	`;

	const element = document.createElement('div')
	element.innerHTML = template;

	element.querySelector("#import-from-json").addEventListener('click', (e) => openFileImportWindow(e));
	// gridNameInput = element.querySelector("input[name=grid_name]");
	// gridNameInput.addEventListener('change', (e) => { console.log('changeListener'); setGridName(e.target.value); });

	// element.querySelector("#import-from-json").addEventListener('dragover', handleFileDragOver);
	// element.querySelector("#import-from-json").addEventListener('drop', handleFileDrop);
	// element.querySelector('#download-as-json').addEventListener('click', (e) => downloadJsonSave());

	// element.querySelector("#add-from-json").addEventListener('dragover', handleMergeDragOver);
	// element.querySelector("#add-from-json").addEventListener('drop', handleMergeDrop);
	// element.querySelector("#add-from-json").addEventListener('click', (e) => openFileAddWindow());

	// element.querySelector("#clear-all").addEventListener('click', handleClearClicked);
	// element.querySelector("#reload-file").addEventListener('click', handleReloadClicked);

	return {defaultStyle, element};
}

export default PersistenceView;