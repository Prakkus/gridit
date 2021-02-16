const ModalView = ({ title, content }) => {
	const defaultStyle = 
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

		.modal-panel > h1 {
			font-size: 18px;
			padding-top: 4px;
			font-weight: normal;
		}

		.modal-panel > section {
			margin-top: 12px;
		}

	`
	if (content instanceof HTMLElement === false) {
		const string = content;
		content = document.createElement('div');
		content.innerHTML = string;
	}
	const template = 
	`
	<div class="modal-wrapper">
		<div class="modal-panel">
			<button class="close">&times;</button>
			<h1>${title} </h1>
			<section id="content-slot">
			</section>
		</div>
	</div>
	`;

	const element = document.createElement('div')
	element.innerHTML = template;
	element.querySelector('#content-slot').insertAdjacentElement('beforeend', content);

	return {defaultStyle, element};
}

export default ModalView;