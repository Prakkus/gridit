export const Modal = (shownByDefault = false) => {
	const element = document.createElement('div')
	element.innerHTML = template;

	const titleElement = element.querySelector('.modal-title');
	const wrapperElement = element.querySelector('.modal-wrapper');
	const contentElement = element.querySelector(".content-slot");
	const closeButton = element.querySelector('.close');
	const Open = () => {
		wrapperElement.classList.remove('closed');
	}
	const Close = () => {
		wrapperElement.classList.add('closed');
	}

	closeButton.addEventListener('click', Close);
	wrapperElement.addEventListener('click', (e) => {
		if (!e.target.classList.contains('modal-wrapper')) return;
		Close();
	});

	document.addEventListener('keyup', (e) => {
			if (e.keyCode !== 27) return; //esc
			Close();
	});

	if (!shownByDefault) Close();


	const Render = ({ title, content }) => {
		// If the content they passed in is a string instead of an HTML element,
		// Make a new element and 
		if (content instanceof HTMLElement === false) {
			const string = content;
			content = document.createElement('div');
			content.innerHTML = string;
		}
		titleElement.innerHTML = title;
		// Clear whatever is there and render the new content.
		contentElement.innerHTML = '';
		contentElement.insertAdjacentElement('beforeend', content);
	}

	return { element, Render, Open, Close };
}

export default Modal;

export const style = 
	`
		.modal-wrapper {
			position: fixed;
			top: 0;
			width: 100vw;
			height: 100vh;
			background: rgba(0,0,0, .5);
			display: flex;
			justify-content: space-around;
			align-items: center;
			color: var(--text-default);
			transition: opacity .15s ease-in-out;
			z-index: 100;
		}

		.modal-panel {
			position: relative;
			min-width: 300px;
			min-height: 200px;
			background: var(--darker);
			padding: 16px;
		}

		.close {
			position: absolute;
			font-size: 30px;
			top: 2px;
			right: 2px;
			width: 32px;
			height: 32px;
			line-height: 0;
			border: none;
			background: none
		}

		.close:hover {
			background-color: rgb(190, 18, 60);
		}

		.modal-panel > h1 {
			font-size: 18px;
			padding-top: 4px;
			font-weight: normal;
		}

		.modal-panel > section {
			margin-top: 12px;
		}

		.closed {
			opacity: 0;
			pointer-events: none;
		}
	`

const template = 
`
<div class="modal-wrapper">
	<div class="modal-panel">
		<button class="close">&times;</button>
		<h1 class="modal-title"></h1>
		<section class="content-slot">
		</section>
	</div>
</div>
`;