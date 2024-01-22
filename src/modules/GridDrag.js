const isTargetACell = (event) => 'cellId' in event.target.dataset;

// We only want to update the color if they are holding left click and dragging over a cell
const isValidNodeColorDragEvent = (event) => event.button == 0 && isTargetACell(event);

const GridDrag = (UpdateCell) => {
    let leftMouseDragging = false;
    //List of nodes moused over during a drag interaction (down->up). This way we don't infinitely toggle them.
    let draggedNodes = new Set();

    const handleLeftMouseDragStart = (event) => {
        if (event.buttons !== 1) return;
        leftMouseDragging = true;
        draggedNodes.clear();
        //If we started dragging over a node, we want to capture and update that node immediately, as well as starting an 'update batch'.
        //If they then release their mouse without moving, this is our 'click' behavior.
        if (isValidNodeColorDragEvent(event)) {
            const cellId = event.target.dataset.cellId;
            draggedNodes.add(cellId);
            UpdateCell(cellId);
        }
    }
    const handleLeftMouseDragEnd = (event) => {
        leftMouseDragging = false;
    }

    const handleLeftMouseDrag = (event) => {
        if (!leftMouseDragging) return;
        if (!isValidNodeColorDragEvent(event)) return; 

        //At this point, they are either dragging over a valid node in an existing batch (they started dragging on a node),
        //or just hit the first valid node in their drag event (they started dragging outside a node).
        const cellId = event.target.dataset.cellId;

        //If we already handled this node in the DragStart or otherwise, we can just do nothing
        if (draggedNodes.has(cellId)) return;

        //Update the node and record it as handled in this drag event.
        UpdateCell(cellId);
        draggedNodes.add(cellId);
    }

    const BindDragEvents = (element) => {
        element.addEventListener('mousedown', handleLeftMouseDragStart);
        element.addEventListener('mousemove', handleLeftMouseDrag);
        element.addEventListener('mouseup', handleLeftMouseDragEnd);
        const Unbind = () => {
            element.removeEventListener('mousedown', handleLeftMouseDragStart);
            element.removeEventListener('mousemove', handleLeftMouseDrag)
            element.removeEventListener('mouseup', handleLeftMouseDragEnd);
        }
        return Unbind;
    }
    const UnbindDragEvents = () => {

    }

    return { BindDragEvents, UnbindDragEvents }
}

export default GridDrag;

