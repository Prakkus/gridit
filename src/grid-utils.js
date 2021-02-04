const isTargetACell = (event) => 'cellId' in event.target.dataset;

//We only want to update the color if they are holding left click and dragging over a cell
const isValidNodeColorDragEvent = (event) => event.button == 0 && isTargetACell(event);

export { isValidNodeColorDragEvent };
