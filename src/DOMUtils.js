export const MountElement = (parent, elementToMount) => parent.insertAdjacentElement('beforeend', elementToMount);
// Todo: this should be exported as a self contained module instead of randomly captured here.
const injectedStyles = new Set();
		
export const InjectStyles = (...styleText) => {
    styleText.forEach(style => {
        // Use a Set's uniqueness to ensure styles are only loaded once.
        const oldSize = injectedStyles.size;
        injectedStyles.add(style);
        if (oldSize === injectedStyles.size) {
            console.warn("Prevented styles from being injected twice. Check your style injections!");
            console.warn(style);
            return;
        }
        const element = document.createElement('style');
        element.insertAdjacentHTML('beforeend', style);
        document.head.insertAdjacentElement('beforeend', element);				
    });

}