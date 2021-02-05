const camelCaseToDash = (str) => {
  return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();
}

const objectToStyleString = (obj) => {
	let string = '';
	Object.entries(obj).forEach(([key, value]) => {
		string += `${camelCaseToDash(key)}: ${value}; `;
	});
	return string;
}

const downloadBlob = (blob) => {
	const blobUrl = URL.createObjectURL(blob);

	const anchor = document.createElement('a');
	anchor.href = blobUrl;
	anchor.target = "_blank";
	anchor.download = `grid-${Date.now()}.json`;

	// Auto click on a element, trigger the file download
	anchor.click();

	// This is required
	URL.revokeObjectURL(blobUrl);
}

const Persistence = (dataResolver) => {

	const svgStyle = {
		fill: "#333",
	}
	const svgButtonStyle = {
		width: "36px",
		height: "36px",
		borderRadius: '4px'
	}

	let currentlyLoadedJson = '';
	let onLoadedFileChangedListeners = new Set();

	const addOnLoadedFileChangedListener = (callback) => onLoadedFileChangedListeners.add(callback);

	const onLoadedFileTextChanged = (oldJson, newJson) => {
		if (oldJson === newJson) return;
		onLoadedFileChangedListeners.forEach((listener) => listener(oldJson, newJson));
	}

	const loadJson = (jsonText) => {
		const oldJson = currentlyLoadedJson;
		currentlyLoadedJson = jsonText;
		onLoadedFileTextChanged(oldJson, currentlyLoadedJson);
	}

	const handleFileDrop = (event) => {
		event.preventDefault();
		if (!event.dataTransfer.items) return;

		//Presumably someone could drag multiple files, but we just grab the first one
		const droppedItem = event.dataTransfer.items[0];
		if (droppedItem.kind !== 'file' || !droppedItem.type.match('^application/json')) return;
		droppedItem.getAsFile().text().then(value => {
			loadJson(value)
		});
	}

	const handleFileSelect = (event) => {
		let file = event.target.files[0];
		console.log(file.kind, file.type);
		if (!file.type.match('^application/json')) return;
		file.text().then(value => {
			loadJson(value)
		});
	}

	const GetCurrentlyLoadedJson = () => currentlyLoadedJson;

	const handleFileDragOver = (event) => {
		event.preventDefault();
	}

	const openFileSelectionWindow = () => {
		let input = document.createElement('input');
		input.type = 'file';
		input.accept = 'application/json'

		input.onchange = handleFileSelect;

		input.click();
	}

	const downloadJsonSave = () => {
		const jsonData = dataResolver();
		const blob = new Blob([jsonData], {type : 'application/json'});
		downloadBlob(blob);
	}

	const template = 
	`
	<div>
		<button title="Load from JSON file" id="import-from-json" style="${objectToStyleString(svgButtonStyle)}">
    		<img id="import-json-input" "${objectToStyleString(svgStyle)}" class="svg-icon" src="./src/icons/upload.svg" />
    	</button>
		<button title="Save as JSON file" id="download-as-json" style="${objectToStyleString(svgButtonStyle)}">
    		<img class="svg-icon" src="./src/icons/download.svg" />
    	</button>
	</div>
	`;

	const loadFromJsonFieldElement = document.createElement('div')
	loadFromJsonFieldElement.innerHTML = template;
	loadFromJsonFieldElement.querySelector("#import-from-json").addEventListener('click', (e) => openFileSelectionWindow());
	loadFromJsonFieldElement.querySelector("#import-from-json").addEventListener('dragover', handleFileDragOver);
	loadFromJsonFieldElement.querySelector("#import-from-json").addEventListener('drop', handleFileDrop);
	loadFromJsonFieldElement.querySelector('#download-as-json').addEventListener('click', (e) => downloadJsonSave());

	return { loadFromJsonFieldElement, addOnLoadedFileChangedListener, GetCurrentlyLoadedJson };
}

export default Persistence;