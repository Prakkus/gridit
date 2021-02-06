const defaultStyle =
`
	.cursor-controls .toolbar-section-title {
		display: flex;
		margin-top: 24px;
		margin-bottom: 8px;
		display: block;
	}

	.color-swatch:nth-child(6n) {
		margin-right: 0;
	}

	.color-swatch {
		width: 48px;
		height: 48px;
		margin-right: 6px;
		margin-bottom: 6px;
		outline: 1px solid rgba(255,255,255, .5);
		font-size: 24px;
	}
	.color-swatch:hover, .active-color {
		outline: 2px solid rgba(255,255,255, .7);
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
	let selectedWriteValue = 'defaultColor';

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
		if (name == 'defaultColor') {
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
		swatchButton.classList.add(name);
		swatchButton.innerHTML = symbol.display;
		swatchButton.addEventListener('click', () => {
			setSelectedWriteValue('symbol', name);
		})
		SymbolsElement.appendChild(swatchButton);
		colorSwatchNodes.set(name, swatchButton);
	});

	const setSelectedWriteValue = (propertyName, value) => {
		// if (!Object.keys(availableColors).includes(colorName)) return;
		// Remove the 'active' class from the old color and add it to the new color
		colorSwatchNodes.get(selectedWriteValue).classList.remove('active-color');
		colorSwatchNodes.get(value).classList.add('active-color');

		selectedProperty = propertyName;
		selectedWriteValue = value;
	}

	const getSelectedWriteProperty = () => selectedProperty;

	const getSelectedWriteValue = () => selectedWriteValue;
	
	return { defaultStyle, ColorControlsElement, getSelectedWriteProperty, getSelectedWriteValue };
} 


export default ColorControls;