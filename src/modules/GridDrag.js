const isTargetACell = (event) => 'cellId' in event.target.dataset;

// We only want to update the cell if they are holding left click and dragging over a cell
const isValidNodeDragEvent = (event) => event.button == 0 && isTargetACell(event);

const GridDrag = (UpdateCell) => {
    let leftMouseDragging = false;
    let shiftHeld = false;
    //List of nodes moused over during a drag interaction (down->up). This way we don't infinitely toggle them.
    let draggedNodes = new Set();

    const handleLeftMouseDragStart = (event) => {
        if (event.buttons !== 1) return;
        leftMouseDragging = true;
        shiftHeld = event.shiftKey;
        draggedNodes.clear();
        //If we started dragging over a node, we want to capture and update that node immediately, as well as starting an 'update batch'.
        //If they then release their mouse without moving, this is our 'click' behavior.
        if (isValidNodeDragEvent(event)) {
            const cellId = event.target.dataset.cellId;
            draggedNodes.add(cellId);
            UpdateCell(cellId);
        }
    }
    const handleLeftMouseDragEnd = (event) => {
        leftMouseDragging = false;
        shiftHeld = false;
    }

    const handleLeftMouseDrag = (event) => {
        if (!leftMouseDragging) return;
        if (!isValidNodeDragEvent(event)) return; 

        //At this point, they are either dragging over a valid node in an existing batch (they started dragging on a node),
        //or just hit the first valid node in their drag event (they started dragging outside a node).
        const cellId = event.target.dataset.cellId;
        const [cellX, cellY] = cellId.split(',');

        // If we already handled this node in the DragStart or otherwise, we can just do nothing
        if (draggedNodes.has(cellId)) return;
        
        // Holding shift while dragging constrains to whatever axis the user is dragging along,
        // determined by the most recent 2 nodes they hit.
        let constrainXValue = -1;
        let constrainYValue = -1;
        if (event.shiftKey && draggedNodes.size >= 2) {
            // Grab the 2 most recent nodes
            const [node1, node2] = Array.from(draggedNodes).slice(-2);
            const [node1X, node1Y] = node1.split(',');
            const [node2X, node2Y] = node2.split(',');

            // If the 2 most recent nodes are along the same axis, constrain to that axis.
            if (node1X === node2X) constrainXValue = node1X;
            if (node1Y === node2Y) constrainYValue = node1Y;
        }

        if (constrainXValue !== -1 && cellX != constrainXValue) return;
        if (constrainYValue !== -1 && cellY != constrainYValue) return;

        // Update the node and record it as handled in this drag event.
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

