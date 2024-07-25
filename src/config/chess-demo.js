const defaultProfile = {
	title: "",
	config:
	{
		columnCount: 8,
		rowCount: 8,
		cellSize: 100,
		cellGap: 2,
		backgroundColor: '#18181B',
		showCoords: true
	},
	schema: [
		//Colors
		{
			name: 'background_color',
			type: 'color',
			displayName: 'Fill Colors: ',
			values: [
				{
					name: 'defaultColor',
					hex: '71717A'
				},
				{
					name: 'darkGrey',
					hex: '444444'
				},
				{
					name: 'highlightColor',
					hex: '468E46'
				}
			]
		},

		// Text Content schemas
		{
			name: 'pieces',
			type: 'text',
			displayName: 'White Pieces: ',
			values: [
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
					name: 'queen',
					display: '♕',
					xOffset: '12.5%',
					yOffset: '-5%',
					color: 'fff',
					lineHeight: 'normal',
					fontSize: '240%'
				},
				{
					name: 'king',
					display: '♔',
					xOffset: '12.5%',
					yOffset: '-5%',
					color: 'fff',
					lineHeight: 'normal',
					fontSize: '240%'
				},
				{
					name: 'knight',
					display: '♘',
					xOffset: '12.5%',
					yOffset: '-5%',
					color: 'fff',
					lineHeight: 'normal',
					fontSize: '240%'
				},
				{
					name: 'pawn',
					display: '♙',
					xOffset: '12.5%',
					yOffset: '-5%',
					color: 'fff',
					lineHeight: 'normal',
					fontSize: '240%'
				},
				{
					name: 'bishop',
					display: '♗',
					xOffset: '12.5%',
					yOffset: '-5%',
					color: 'fff',
					lineHeight: 'normal',
					fontSize: '240%'
				},
				{
					name: 'rook',
					display: '♖',
					xOffset: '12.5%',
					yOffset: '-5%',
					color: 'fff',
					lineHeight: 'normal',
					fontSize: '240%'
				},
				{
					name: 'queen-black',
					display: '♕',
					xOffset: '12.5%',
					yOffset: '-5%',
					color: '38C8BA',
					lineHeight: 'normal',
					fontSize: '240%'
				},
				{
					name: 'king-black',
					display: '♔',
					xOffset: '12.5%',
					yOffset: '-5%',
					color: '38C8BA',
					lineHeight: 'normal',
					fontSize: '240%'
				},
				{
					name: 'knight-black',
					display: '♘',
					xOffset: '12.5%',
					yOffset: '-5%',
					color: '38C8BA',
					lineHeight: 'normal',
					fontSize: '240%'
				},
				{
					name: 'pawn-black',
					display: '♙',
					xOffset: '12.5%',
					yOffset: '-5%',
					color: '38C8BA',
					lineHeight: 'normal',
					fontSize: '240%'
				},
				{
					name: 'bishop-black',
					display: '♗',
					xOffset: '12.5%',
					yOffset: '-5%',
					color: '38C8BA',
					lineHeight: 'normal',
					fontSize: '240%'
				},
				{
					name: 'rook-black',
					display: '♖',
					xOffset: '12.5%',
					yOffset: '-5%',
					color: '38C8BA',
					lineHeight: 'normal',
					fontSize: '240%'
				}
			]
		},

		//Tiles
		{
			name: 'background_image',
			type: 'background',
			displayName: 'Tiles: ',
			values: [
				{
					imageDataUrl: ''
				}
			]
		}
	],
	cellData: []
};


export default defaultProfile;
