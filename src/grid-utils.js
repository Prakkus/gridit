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

const isTargetACell = (event) => 'cellId' in event.target.dataset;

//We only want to update the color if they are holding left click and dragging over a cell
const isValidNodeColorDragEvent = (event) => event.button == 0 && isTargetACell(event);

export { isValidNodeColorDragEvent, downloadBlob };
