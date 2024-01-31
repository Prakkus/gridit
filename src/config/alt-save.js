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

		// Text Content schemas
		{
			name: 'characters',
			type: 'text',
			displayName: 'Characters: ',
			values : [
				{
					name: 'default',
					display: '',
					xOffset: 0,
					yOffset: 0,
					color: 'fff',
					lineHeight: 'normal',
					fontSize: '100%' 
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
				}
			]
		},

		{
			name: 'directions',
			type: 'text',
			displayName: 'Directions: ',
			values : [
				{
					name: 'default',
					display: '',
					xOffset: 0,
					yOffset: 0,
					color: 'fff',
					lineHeight: 'normal',
					fontSize: '100%' 
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
		{
			name: 'names',
			type: 'text',
			displayName: 'Names: ',
			values : [
				{
					name: 'default',
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
					name: 'joe',
					display: 'joe',
					xOffset: '24%',
					yOffset: 0,
					color: '7fffd4',
					lineHeight: '300%',
					fontSize: '100%' 
				},
				{
					name: 'sally',
					display: 'sally',
					xOffset: '14%',
					yOffset: 0,
					color: '7fffd4',
					lineHeight: '300%',
					fontSize: '100%' 
				},

			]
		},
		//Tiles
		{
			name: 'background_image',
			type: 'background',
			displayName: 'Tiles: ',
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
