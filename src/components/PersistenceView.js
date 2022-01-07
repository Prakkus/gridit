import { SelectSaveData } from "../data/store.js";

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
		.persistence-panel {
			height: 110px;
			display: flex;
			align-items: center;
		}
		.persistence-panel-main {
			flex-grow: 1;
		}

		.persistence-drop-preview {
			font-style: italic;
			height: 100%;
			display: flex;
			flex-grow: 1;
			align-items: center;
			justify-content: center;
			outline: 2px dashed rgba(255, 255, 255, 0.87);
		}
		/* 
		Disable pointer events in the preview so that child elements don't trigger extra dragleave events.
		*/
		.persistence-drop-preview * {
			pointer-events: none;
		}
		.persistence-drop-preview.hidden, .persistence-panel-main.hidden {
			display: none;
		}
		

	`
	const template = 
	`
	<div class="persistence-panel">
		<div class="persistence-drop-preview hidden">
			<p>Drop JSON file here to load...</p>
		</div>
		<div class="persistence-panel-main">
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
	</div>
	`;
	const downloadBlob = (blob, fileName) => {
		const blobUrl = URL.createObjectURL(blob);
	
		const anchor = document.createElement('a');
		anchor.href = blobUrl;
		anchor.target = "_blank";
		anchor.download = `grid-${fileName}.json`;
	
		// Auto click on a element, trigger the file download
		anchor.click();
	
		// This is required
		URL.revokeObjectURL(blobUrl);
	}
	const openFileSelectionWindow = (onSelect) => {
		let input = document.createElement('input');
		input.type = 'file';
		input.accept = 'application/json'
	
		input.onchange = onSelect;
	
		input.click();
	}
	
const PersistenceView = ({ UseSelector, onFileSelected, onSubmit, onClearClicked, onReloadClicked, onSaveClicked }) => {
	let gridNameInput;
	const element = document.createElement('div');
	element.innerHTML = template;
	element.classList.add('persistence-view-wrapper');
	
	const dropPreview = element.querySelector('.persistence-drop-preview');
	const mainPanel = element.querySelector('.persistence-panel-main');
	const ShowDropPreview = () => {
		mainPanel.classList.add('hidden');
		dropPreview.classList.remove('hidden');
	}
	const HideDropPreview = () => {
		mainPanel.classList.remove('hidden');
		dropPreview.classList.add('hidden');	
	}

	element.querySelector("#import-from-json").addEventListener('click', (e) => openFileSelectionWindow(handleFileSelect));
	gridNameInput = element.querySelector("input[name=grid_name]");
	gridNameInput.addEventListener('blur', (e) => {
		Submit();
	});
	gridNameInput.addEventListener('keydown', (e) => {
		if (e.keyCode == 13) {
			Submit();
		}
	});

	const handleFileSelect = (event) => {
		let file = event.target.files[0];
		if (!file.type.match('^application/json')) return;
		onFileSelected(file);
	}
	
	const handleFileDragEnter = (event) => {
		event.preventDefault();
		ShowDropPreview();
	}
	const handleFileDragLeave = (event) => {
		event.preventDefault();
		HideDropPreview();
	}
	const handleFileDrop = (event) => {
		event.preventDefault();
		HideDropPreview();
		if (!event.dataTransfer.items) return;

		//Presumably someone could drag multiple files, but we just grab the first one
		const droppedItem = event.dataTransfer.items[0];
		if (droppedItem.kind !== 'file' || !droppedItem.type.match('^application/json')) return;
		onFileSelected(droppedItem.getAsFile());
	}


	const Submit = () => {
		const data = {
			gridName: gridNameInput.value
		}
		onSubmit(data);
	}

	const DownloadJsonSave = () =>
	{
		const saveData = UseSelector(SelectSaveData);
		const json = JSON.stringify(saveData) + '\n';
		const blob = new Blob([json], {type : 'application/json'});
		downloadBlob(blob, saveData.title);
		return json;
	}
	element.addEventListener('dragenter', handleFileDragEnter);
	element.addEventListener('dragleave', handleFileDragLeave);
	
	// In order for 'drop' to trigger on an event, you must cancel the dragenter and dragover events.
	element.addEventListener('dragover', (e) => e.preventDefault());
	element.addEventListener('drop', handleFileDrop);
	element.querySelector('#download-as-json').addEventListener('click', (e) => { const saveJson = DownloadJsonSave(); onSaveClicked(saveJson); });
	element.querySelector("#clear-all").addEventListener('click', (e) => onClearClicked());
	element.querySelector("#reload-file").addEventListener('click', (e) => onReloadClicked());


	const Render = ({ gridName }) => {
		gridNameInput.value = gridName;
	}

	return {element, defaultStyle, Render};
}

export default PersistenceView;