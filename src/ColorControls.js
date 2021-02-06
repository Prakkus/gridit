const ColorControls = (availableColors, availableSymbols) => {
	let selectedProperty = 'fillColor';
	let selectedWriteValue = 'default';

	const colorSwatchNodes = new Map(); //Map of colorName->colorSwatchNode so that we can update their active state easily 

	const ColorControlsElement = document.createElement('div');
	ColorControlsElement.classList.add("color-controls");

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
		ColorControlsElement.appendChild(swatchButton);
		colorSwatchNodes.set(name, swatchButton);
	});

	//symbols
	Object.entries(availableSymbols).map(([name, symbol]) => {
		let swatchButton = document.createElement('button');
		swatchButton.classList.add("color-swatch");
		swatchButton.innerHTML = symbol.display;
		swatchButton.addEventListener('click', () => {
			setSelectedWriteValue('symbol', name);
		})
		ColorControlsElement.appendChild(swatchButton);
		colorSwatchNodes.set(name, swatchButton);
	});

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
	
	return { ColorControlsElement, getSelectedWriteProperty, getSelectedWriteValue };
} 


export default ColorControls;