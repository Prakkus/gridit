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
					fontSize: '100%' 
				},
				{
					name: 'frank',
					display: 'Frank',
					xOffset: 0,
					yOffset: 0,
					fontSize: '100%' 
				},
				{
					name: 'testo',
					display: 'just some testo stuff in here',
					xOffset: 0,
					yOffset: '-20%',
					fontSize: '50%' 
				},
				{
					name: 'penguin',
					display: '🐧',
					xOffset: 0,
					yOffset: '-20%',
					fontSize: '60%' 
				},
				{
					name: 'sunWithFace',
					display: '🌞',
					xOffset: 0,
					yOffset: '-20%',
					fontSize: '60%' 
				},
				{
					name: 'tulip',
					display: '🌷',
					xOffset: 0,
					yOffset: '-20%',
					fontSize: '60%' 
				},
				{
					name: 'north',
					display: '🡱',
					xOffset: 0,
					yOffset: 0,
					fontSize: '100%' 
				},
				{
					name: 'northEast',
					display: '🡵',
					xOffset: "2.5%",
					yOffset: "-10%",
					fontSize: '100%' 
				},
				{
					name: 'east',
					display: '🡲',
					xOffset: '5%',
					yOffset: '-10%',
					fontSize: '100%' 
				},
				{
					name: 'southEast',
					display: '🡶',
					xOffset: "2.5%",
					yOffset: "-12.5%",
					fontSize: '100%' 
				},
				{
					name: 'south',
					display: '🡳',
					xOffset: '2.5%',
					yOffset: '-15%',
					fontSize: '100%' 
				},
				{
					name: 'southWest',
					display: '🡷',
					xOffset: "2.5%",
					yOffset: "-12.5%",
					fontSize: '100%' 
				},
				{
					name: 'west',
					display: '🡰',
					xOffset: '-5%',
					yOffset: '-10%',
					fontSize: '100%' 
				},
				{
					name: 'northWest',
					display: '🡴',
					xOffset: "2.5%",
					yOffset: "-10%",
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

// const getSchemaValueId = (schema, index) => `${schema.name}-${index}`;
// const getDefaultAttributes = () => {
// 	const types = {};
// 	defaultProfile.schema.forEach((schema) => {
// 		types[schema.cellAttribute] = 0;
// 	});

// 	return types;
// }

export default defaultProfile;
// export { getSchemaValueId, getDefaultAttributes };