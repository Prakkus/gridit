export const MountElement = (parent, elementToMount) => parent.insertAdjacentElement('beforeend', elementToMount);	
		
export const InjectStyles = (...styleText) => {
    styleText.forEach(style => {
        const element = document.createElement('style');
        element.insertAdjacentHTML('beforeend', style);
        document.head.insertAdjacentElement('beforeend', element);				
    });

}