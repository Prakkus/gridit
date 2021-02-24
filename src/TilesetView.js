//margin is expected to be around the border of the entire tileset, as well as each image
const getImageSlices = (image, numRowsToCut, numColsToCut, margin) => {
	console.log('get slices', numRowsToCut, numColsToCut);
	let imageSlices = [];
	let widthOfOnePiece = Math.round((image.naturalWidth - (2 * margin))  / numColsToCut);
    let heightOfOnePiece = Math.round((image.naturalHeight - (2 * margin)) / numRowsToCut);
    let canvas = document.createElement('canvas');
    canvas.width = widthOfOnePiece - (2 * margin);
    canvas.height = heightOfOnePiece - (2 * margin);
    let context = canvas.getContext('2d');
    //This is what a completely 'blank' image for this tileset looks like. We use it to compare slices and remove them if they are also blank.
    let emptyImage = canvas.toDataURL();

	for(let x = 0; x < numColsToCut; x++) {
    	for(let y = 0; y < numRowsToCut; y++) {
    		context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(image, x * widthOfOnePiece + (margin * 2), y * heightOfOnePiece + (margin * 2), canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
            let imageData = canvas.toDataURL();
            //Only keep this slice if it isn't an empty image
            if (imageData !== emptyImage) {
            	imageSlices.push(canvas.toDataURL());            	
            } 
        }
    }

    return imageSlices;
}

const TilesetView = (loadSchemaValues) => {
	// let currentImage;
	//Make a FileReader which we will reuse for the lifetime of this component
	const fileReader = new FileReader();
	let extractedSlices = [];

	const defaultStyle = 
	`
		.tileset-view-wrapper {
			margin-bottom: 16px;
		}

		#tileset-preview {
			max-width: 360px;
		}
		#tileset-sliced-preview img {
			max-width: 32px;
			padding: 5px;
		}

		#tileset-form {
			display: flex;
		}

		#tileset-preview {
			display: block;
			margin: auto;
			margin-top: 16px;
		}

		#tileset-preview[src] {
			border: 1px solid var(--light);
		}

		#tileset-form .left-panel {
			padding-right: 24px;
		}


		.toolbar-fields {
			display: flex;
			margin-bottom: 16px;
		}
		.toolbar-fields label {
			margin-right: 16px;
		}

		.toolbar-fields input {
			width: 32px;
			margin-left: 6px;
			text-align: center;
		}

		.toolbar-fields input:last-child {
			margin-right: 0;
		}

		#tileset-sliced-preview {
			margin-top: 16px;
			padding: 8px;
			border: 1px solid var(--light);
			overflow-y: scroll;
			max-width: 353px;
			max-height: 336px;
		}

		.active-preview #preview-empty-message {
			display: none;
		}

		.left-panel input {
			display: block;
			margin-top: 16px;
		}


	`

	const template = 
	`
	<div class="tileset-view-wrapper">
		<form id="tileset-form">
			<div class="left-panel">
				<label>
					Upload an image:
					<input name="tileset_input" type="file" accept="image/*" />
					<img id="tileset-preview" />
				</label>
			</div>
			<div class="right-panel">
				<div class="panel-toolbar">
					<div class="toolbar-fields">
						<label>
							Rows:
							<input name="tileset_rows" type="number" step="1" min="0" max="50" required />
						</label>
						<label>
							Columns:
							<input name="tileset_columns" type="number" step="1" min="0" max="50" required />
						</label>
						<label>
							Margin:
							<input name="tileset_margin" type="number" step="1" value="0" />
						</label>
					</div>
				<button id="slice-button">Slice</button>
				<span id="tile-count">

				</span>
				</div>
				<div id="tileset-sliced-preview">
					<span id="preview-empty-message">
						Set the parameters for your tileset and click 'Slice'.
					</span>
				</div>
				<button id="load-tileset">Load</load>
			</div>
		</form>
	</div>
	`;

	const element = document.createElement('div')
	element.innerHTML = template;
	const form = element.querySelector('#tileset-form');
	const tilesetSlicedPreview = element.querySelector('#tileset-sliced-preview');
	const tileCount = element.querySelector('#tile-count');

	const tilesetPreview = element.querySelector('#tileset-preview');
	const setTilesetImage = (image) => {
		tilesetPreview.src = image;
		// currentImage = image;
	}

	//Whenever it loads a file, we want to set that as our current tileset image and isplay the preview
	fileReader.addEventListener('load', (e) => {
		setTilesetImage(e.target.result);
	});
	
	const onImageSelected = (e) => {
		let file = e.target.files[0];
	    fileReader.readAsDataURL(file);
	}

	const previewSlices = (slices) => {
		for (var i = 0; i < slices.length; i++) {
			if (tilesetSlicedPreview.childNodes[i]) {
				tilesetSlicedPreview.childNodes[i].src = slices[i];
			} else {
				let image = document.createElement('img');
				image.src = slices[i];
				tilesetSlicedPreview.insertAdjacentElement('beforeend', image);
			}
		}
		tilesetSlicedPreview.classList.add('active-preview');
		tileCount.innerHTML = slices.length + ' tiles';
	}

	const sliceCurrentImage = () => {
		const slices = getImageSlices(tilesetPreview, form.tileset_rows.value, form.tileset_columns.value, form.tileset_margin.value);
		extractedSlices = slices.map((slice) => { return { imageDataUrl: slice }; });
		previewSlices(slices);
	}

	const loadCurrentTileset = () => {
		loadSchemaValues(2, extractedSlices);
	}

	element.querySelector('[name=tileset_input]').addEventListener('change', onImageSelected);
	element.querySelector('#load-tileset').addEventListener('click', loadCurrentTileset);
	form.addEventListener('submit', (e) => {e.preventDefault(); sliceCurrentImage()});

	return {defaultStyle, element};
}

export default TilesetView;