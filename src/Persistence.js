const Persistence = () => {
	let currentlyLoadedJson = '';
	let onLoadedFileChangedListeners = new Set();

	const addOnLoadedFileChangedListener = (callback) => onLoadedFileChangedListeners.add(callback);

	const onLoadedFileTextChanged = (oldJson, newJson) => {
		if (oldJson === newJson) return;
		onLoadedFileChangedListeners.forEach((listener) => listener(oldJson, newJson));
	}


	const handleFileDrop = (event) => {
		event.preventDefault();
		if (!event.dataTransfer.items) return;

		//Presumably someone could drag multiple files, but we just grab the first one
		const droppedItem = event.dataTransfer.items[0];
		if (droppedItem.kind !== 'file' || !droppedItem.type.match('^application/json')) return;
		droppedItem.getAsFile().text().then(value => {
			const oldJson = currentlyLoadedJson;
			currentlyLoadedJson = value;
			onLoadedFileTextChanged(oldJson, currentlyLoadedJson);
		});

		// Prevent default behavior (Prevent file from being opened)
	}

	const GetCurrentlyLoadedJson = () => currentlyLoadedJson;

	const handleFileDragOver = (event) => {
		  console.log('File(s) in drop zone');

		  // Prevent default behavior (Prevent file from being opened)
		  event.preventDefault();
	}

	const template = 
	`
		<div id="load-from-json-dropzone">
				<p>Drag one or more files to this Drop Zone ...</p>
		</div>
	`;

	const loadFromJsonFieldElement = document.createElement('div')
	loadFromJsonFieldElement.innerHTML = template;
	loadFromJsonFieldElement.querySelector('#load-from-json-dropzone').addEventListener('dragover', handleFileDragOver);
	loadFromJsonFieldElement.querySelector('#load-from-json-dropzone').addEventListener('drop', handleFileDrop);

	return { loadFromJsonFieldElement, addOnLoadedFileChangedListener, GetCurrentlyLoadedJson };
}

export default Persistence;