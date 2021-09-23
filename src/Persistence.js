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

const Persistence = (gridDataResolver, configDataResolver, schemaDataResolver) => {
	let currentlyLoadedJson = '';
	let currentlyLoadedData;
	let onLoadedFileChangedListeners = new Set();
	let onMergeFileDroppedListeners = new Set();
	let onGridNameChangedListeners = new Set();
	let gridName = 'untitled';

	const setGridName = (name) => {
		gridName = name;
		onGridNameChangedListeners.forEach((listener) => listener(name));
	}

	const addOnLoadedFileChangedListener = (callback) => onLoadedFileChangedListeners.add(callback);
	const addOnMergeFileDroppedListener = (callback) => onMergeFileDroppedListeners.add(callback);
	const addOnGridNameChangedListener = (callback) => onGridNameChangedListeners.add(callback);

	const onLoadedFileTextChanged = (oldJson, newJson) => {
		if (oldJson === newJson) return;
		onLoadedFileChangedListeners.forEach((listener) => listener(oldJson, newJson));
	}

	const loadJson = (jsonText) => {
		const oldData = currentlyLoadedData;
		currentlyLoadedJson = jsonText;
		currentlyLoadedData = JSON.parse(currentlyLoadedJson);
		setGridName(currentlyLoadedData.title);
		onLoadedFileTextChanged(oldData, currentlyLoadedData);
	}

	const handleFileDrop = (event) => {
		event.preventDefault();
		if (!event.dataTransfer.items) return;

		//Presumably someone could drag multiple files, but we just grab the first one
		const droppedItem = event.dataTransfer.items[0];
		if (droppedItem.kind !== 'file' || !droppedItem.type.match('^application/json')) return;
		droppedItem.getAsFile().text().then(value => {
			loadJson(value);
		});
	}

	const handleFileSelect = (event) => {
		let file = event.target.files[0];
		if (!file.type.match('^application/json')) return;
		file.text().then(value => {
			loadJson(value);
		});
	}

	const handleMergeSelect = (event) => {
		let file = event.target.files[0];
		console.log(file.kind, file.type);
		if (!file.type.match('^application/json')) return;
		file.text().then(value => {
			onMergeFileDroppedListeners.forEach((listener) => listener(value));
		});
	}

	const handleMergeDragOver = (event) => {
		event.preventDefault();
		console.log('over merge');
	}

	const handleFileDragOver = (event) => {
		event.preventDefault();
		console.log('over import');
	}

	const handleMergeDrop = (event) => {
		event.preventDefault();
		if (!event.dataTransfer.items) return;

		//Presumably someone could drag multiple files, but we just grab the first one
		const droppedItem = event.dataTransfer.items[0];
		if (droppedItem.kind !== 'file' || !droppedItem.type.match('^application/json')) return;
		droppedItem.getAsFile().text().then(value => {
			onMergeFileDroppedListeners.forEach((listener) => listener(value));
		});
	}

	const getCurrentlyLoadedData = () => currentlyLoadedData;

	const openFileImportWindow = () => {
		openFileSelectionWindow(handleFileSelect);
	}

	const openFileAddWindow = () => {
		openFileSelectionWindow(handleMergeSelect);
	}

	const downloadJsonSave = () => {
		const gridData = gridDataResolver();
		const configData = configDataResolver();
		const schemaData = schemaDataResolver();
		const jsonData = JSON.stringify({ title: gridName, config: configData, schema: schemaData, cellData: gridData }) + '\n';
		const blob = new Blob([jsonData], {type : 'application/json'});
		downloadBlob(blob, gridName);
	}

	return { openFileImportWindow, openFileAddWindow, setGridName, handleFileDragOver, handleMergeDragOver, handleFileDrop, downloadJsonSave, addOnLoadedFileChangedListener, handleMergeDrop, addOnGridNameChangedListener, addOnMergeFileDroppedListener, getCurrentlyLoadedData }
}

export default Persistence;