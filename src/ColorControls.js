const ColorControls = (availableColors) => {
	let selectedFillColor = 'default';

	const colorSwatchNodes = new Map(); //Map of colorName->colorSwatchNode so that we can update their active state easily 

	const ColorControlsElement = document.createElement('div');
	ColorControlsElement.classList.add("color-controls");

	Object.entries(availableColors).map(([name, color]) => {
		let swatchButton = document.createElement('button');
		swatchButton.classList.add("color-swatch");
		swatchButton.classList.add(name);
		swatchButton.style.backgroundColor = '#' + color;
		if (name == 'default') {
			swatchButton.classList.add('active-color');
		}
		swatchButton.addEventListener('click', () => {
			setSelectedFillColor(name);
		})
		ColorControlsElement.appendChild(swatchButton);
		colorSwatchNodes.set(name, swatchButton);
	});

	const setSelectedFillColor = (colorName) => {
		if (!Object.keys(availableColors).includes(colorName)) return;
		//Remove the 'active' class from the old color and add it to the new color
		colorSwatchNodes.get(selectedFillColor).classList.remove('active-color');
		colorSwatchNodes.get(colorName).classList.add('active-color');

		selectedFillColor = colorName;
	}

	const getSelectedFillColor = () => selectedFillColor;
	
	return {ColorControlsElement, getSelectedFillColor, getSelectedFillColor };
} 


export default ColorControls;