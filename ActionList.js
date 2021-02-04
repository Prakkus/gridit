//todo: can i just compose this outside of here out of a color control, actions, etc?
const ActionList = (actions) => {
	const listWrapper = document.createElement('div');
	listWrapper.classList.add('action-list');

	actions.map(
		({ title, classNames, action }) => {
			const button = document.createElement('button');
			button.classList.add(classNames);
			button.addEventListener('click', action);
			button.textContent = title;
			listWrapper.insertAdjacentElement('beforeend', button);
		});

	
	return listWrapper;
} 



export default ActionList;

//import { BuildActionList } from './action-list';