
const Persistence = (gridDataResolver, configDataResolver, schemaDataResolver) => {

	const onLoadedFileTextChanged = (oldJson, newJson) => {
		if (oldJson === newJson) return;
		onLoadedFileChangedListeners.forEach((listener) => listener(oldJson, newJson));
	}

	// const loadJson = (jsonText) => {
	// 	const oldData = currentlyLoadedData;
	// 	currentlyLoadedJson = jsonText;
	// 	currentlyLoadedData = JSON.parse(currentlyLoadedJson);
	// 	setGridName(currentlyLoadedData.title);
	// 	onLoadedFileTextChanged(oldData, currentlyLoadedData);
	// }

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

	return { openFileImportWindow, openFileAddWindow, handleFileDragOver, handleMergeDragOver, handleFileDrop, downloadJsonSave, handleMergeDrop }
}

export default Persistence;