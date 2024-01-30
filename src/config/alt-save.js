const defaultProfile = {
	title: "",
	config :
		{ 
			columnCount: 8,
			rowCount: 5, 
			cellSize: 100,
			cellGap: 2,
			showCoords: true
		},
	schema: [
		//Colors
		{
			name: 'background_color',
			type: 'color',
			displayName: 'Fill Colors: ',
			cellAttribute: 'fillColor',
			values : [
				{
					name: 'defaultColor',
					hex: '71717A'
				},
				{
					name: 'brown',
					hex: '6F4E37'
				}
			]
		},

		//Symbols
		{
			name: 'symbol',
			type: 'text',
			displayName: 'Symbols: ',
			cellAttribute: 'symbol',
			values : [
				{
					name: 'defaultSymbol',
					display: '',
					xOffset: 0,
					yOffset: 0,
					color: 'fff',
					lineHeight: 'normal',
					fontSize: '100%' 
				},
				{
					name: 'frank',
					display: 'Frank',
					xOffset: '12%',
					yOffset: 0,
					color: '7fffd4',
					lineHeight: '300%',
					fontSize: '100%' 
				},
				{
					name: 'testo',
					display: 'just some testo stuff in here',
					xOffset: 0,
					yOffset: '20%',
					color: 'fff',
					lineHeight: '90%',
					fontSize: '50%' 
				},
				{
					name: 'penguin',
					display: '🐧',
					xOffset: '20%',
					yOffset: '14%',
					color: 'fff',
					lineHeight: 'normal',
					fontSize: '160%' 
				},
				{
					name: 'sunWithFace',
					display: '🌞',
					xOffset: '55%',
					yOffset: '0',
					color: 'fff',
					lineHeight: 'normal',
					fontSize: '90%' 
				},
				{
					name: 'tulip',
					display: '🌷',
					xOffset: '30%',
					yOffset: '45%',
					color: 'fff',
					lineHeight: 'normal',
					fontSize: '120%' 
				},
				{
					name: 'north',
					display: '🡱',
					xOffset: '36%',
					yOffset: '28%',
					color: 'fff',
					lineHeight: 'normal',
					fontSize: '100%' 
				},
				{
					name: 'northEast',
					display: '🡵',
					xOffset: '36%',
					yOffset: '28%',
					color: 'fff',
					lineHeight: 'normal',
					fontSize: '100%' 
				},
				{
					name: 'east',
					display: '🡲',
					xOffset: '36%',
					yOffset: '28%',
					color: 'fff',
					lineHeight: 'normal',
					fontSize: '100%' 
				},
				{
					name: 'southEast',
					display: '🡶',
					xOffset: '36%',
					yOffset: '28%',
					color: 'fff',
					lineHeight: 'normal',
					fontSize: '100%' 
				},
				{
					name: 'south',
					display: '🡳',
					xOffset: '36%',
					yOffset: '28%',
					color: 'fff',
					lineHeight: 'normal',
					fontSize: '100%' 
				},
				{
					name: 'southWest',
					display: '🡷',
					xOffset: '36%',
					yOffset: '28%',
					color: 'fff',
					lineHeight: 'normal',
					fontSize: '100%' 
				},
				{
					name: 'west',
					display: '🡰',
					xOffset: '36%',
					yOffset: '28%',
					color: 'fff',
					lineHeight: 'normal',
					fontSize: '100%' 
				},
				{
					name: 'northWest',
					display: '🡴',
					xOffset: '36%',
					yOffset: '28%',
					color: 'fff',
					lineHeight: 'normal',
					fontSize: '100%'
				}
			]
		},

		//Tiles
		{
			name: 'tile_index_background',
			type: 'background',
			displayName: 'Tiles: ',
			cellAttribute: 'backgroundTileIndex',
			values : [
				{
					imageDataUrl: ''
				}
			]
		}
	],
	cellData: []
};


export default defaultProfile;
