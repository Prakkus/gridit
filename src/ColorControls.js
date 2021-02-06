const defaultStyle =
`
	.cursor-controls .toolbar-section-title {
		display: flex;
		margin-top: 24px;
		margin-bottom: 8px;
		display: block;
	}

	.color-swatch:nth-child(6) {
		margin-right: 0;
	}

	.color-swatch {
		width: 50px;
		height: 50px;
		margin-right: 4px;
		margin-bottom: 4px;
		display: inline-block;
		border: 1px solid #ccc;
		cursor: pointer;
	}
	.color-swatch:hover, .active-color {
		border-color: #666;
	}
`;
const template = 
`
	<span class="toolbar-section-title">Fill Colors</span>
	<div class="color-toolbar">

	</div>
	<span class="toolbar-section-title">Symbols</span>
	<div class="symbol-toolbar">

	</div>
`;
const ColorControls = (availableColors, availableSymbols) => {
	let selectedProperty = 'fillColor';
	let selectedWriteValue = 'default';

	const colorSwatchNodes = new Map(); //Map of colorName->colorSwatchNode so that we can update their active state easily 

	const ColorControlsElement = document.createElement('div');
	ColorControlsElement.innerHTML = template;
	ColorControlsElement.classList.add('cursor-controls');

	const ColorsToolbar = ColorControlsElement.querySelector('.color-toolbar');

	//colors
	Object.entries(availableColors).map(([name, color]) => {
		let swatchButton = document.createElement('button');
		swatchButton.classList.add("color-swatch");
		swatchButton.classList.add(name);
		swatchButton.style.backgroundColor = '#' + color;
		if (name == 'default') {
			swatchButton.classList.add('active-color');
		}
		swatchButton.addEventListener('click', () => {
			setSelectedWriteValue('fillColor', name);
		})
		ColorsToolbar.appendChild(swatchButton);
		colorSwatchNodes.set(name, swatchButton);
	});

	const SymbolsElement = ColorControlsElement.querySelector('.symbol-toolbar');

	//symbols
	Object.entries(availableSymbols).map(([name, symbol]) => {
		let swatchButton = document.createElement('button');
		swatchButton.classList.add("color-swatch");
		swatchButton.innerHTML = symbol.display;
		swatchButton.addEventListener('click', () => {
			setSelectedWriteValue('symbol', name);
		})
		SymbolsElement.appendChild(swatchButton);
		colorSwatchNodes.set(name, swatchButton);
	});

	// ColorControlsElement.insertAdjacentElement('beforeend', ColorsToolbar);
	// ColorControlsElement.insertAdjacentElement('beforeend', SymbolsElement);

	const setSelectedWriteValue = (propertyName, value) => {
		// if (!Object.keys(availableColors).includes(colorName)) return;
		//Remove the 'active' class from the old color and add it to the new color
		// colorSwatchNodes.get(selectedWriteValue).classList.remove('active-color');
		// colorSwatchNodes.get(colorName).classList.add('active-color');

		selectedProperty = propertyName;
		selectedWriteValue = value;
	}

	const getSelectedWriteProperty = () => selectedProperty;

	const getSelectedWriteValue = () => selectedWriteValue;
	
	return { defaultStyle, ColorControlsElement, getSelectedWriteProperty, getSelectedWriteValue };
} 


export default ColorControls;