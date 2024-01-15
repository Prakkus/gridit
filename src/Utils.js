export const EventBus = () => {
    let callbacks = [];

    const Trigger = (...args) => {
        for (var i = 0; i < callbacks.length; i++) {
            callbacks[i](...args);
        }
    }

    const AddListener = (callback) => {
        callbacks.push(callback);
    }

    return {Trigger, AddListener};   
}
