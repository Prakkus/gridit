let currentUpdatePosition = -1;

let undoStack = [];
const undoBufferSize = 64;
const ClearHistory = () => {
    undoStack = [];
    currentUpdatePosition = -1;
}
const IncrementUpdateBatch = () => {
    console.log('increment batch');
    currentUpdatePosition = Math.min(currentUpdatePosition + 1, undoBufferSize - 1);
    if (currentUpdatePosition == undoStack.length) {
        //index is currently at 'head' so we push new history items on 
        undoStack.push(new Set());
        undoStack = undoStack.slice(-undoBufferSize);
    } else {
        //otherwise we are replaying over history, so we just need to clear the history for this and future index
        undoStack[currentUpdatePosition].clear();
        undoStack = undoStack.slice(0, currentUpdatePosition + 1);
    }
    console.log("new pos: " + currentUpdatePosition);
}

const RecordAction = (execute, undo) => {
    undoStack[currentUpdatePosition].add({execute, undo});	
}

const Undo = () => {
    console.log(currentUpdatePosition);
    if (currentUpdatePosition < 0) return;
    const eventActions = undoStack[currentUpdatePosition];
    eventActions.forEach(({undo}) => undo());
    currentUpdatePosition = currentUpdatePosition - 1;
}

const Redo = () => {
    if (currentUpdatePosition >= undoStack.length - 1) return;
    currentUpdatePosition = currentUpdatePosition + 1;

    const eventActions = undoStack[currentUpdatePosition];
    eventActions.forEach(({execute}) => execute());
}

export { ClearHistory, IncrementUpdateBatch, RecordAction, Undo, Redo }