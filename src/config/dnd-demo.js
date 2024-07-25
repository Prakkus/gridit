const defaultProfile = {
	title: "",
	config:
	{
		columnCount: 12,
		rowCount: 10,
		cellSize: 90,
		cellGap: 1,
		backgroundColor: '#18181B',
		showCoords: false
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
					hex: '27AE60'
				}
			]
		},

		// Text Content schemas
		{
			"name": "players",
			"type": "text",
			"displayName": "Players: ",
			"values":
				[
					{
						"name": "default",
						"display": "",
						"xOffset": 0,
						"yOffset": 0,
						"color": "fff",
						"lineHeight": "normal",
						"fontSize": "100%"
					},
					{
						"name": "fairy",
						"display": "🧚",
						"xOffset": "0%",
						"yOffset": "-5%",
						"color": "fff",
						"lineHeight": "normal",
						"fontSize": "200%"
					},
					{
						"name": "wizard",
						"display": "🧙",
						"xOffset": "0%",
						"yOffset": "-5%",
						"color": "fff",
						"lineHeight": "normal",
						"fontSize": "200%"
					},
					{
						"name": "genie",
						"display": "🧞",
						"xOffset": "0%",
						"yOffset": "-5%",
						"color": "fff",
						"lineHeight": "normal",
						"fontSize": "200%"
					},
					{
						"name": "zombie",
						"display": "🧟",
						"xOffset": "0%",
						"yOffset": "-5%",
						"color": "fff",
						"lineHeight": "normal",
						"fontSize": "200%"
					},
					{
						"name": "hero",
						"display": "🦸",
						"xOffset": "0%",
						"yOffset": "-5%",
						"color": "fff",
						"lineHeight": "normal",
						"fontSize": "200%"
					}
				]
		},
		{
			"name": "mobs",
			"type": "text",
			"displayName": "Mobs: ",
			"values":
				[
					{
						"name": "default",
						"display": "",
						"xOffset": 0,
						"yOffset": 0,
						"color": "fff",
						"lineHeight": "normal",
						"fontSize": "100%"
					},
					{
						"name": "tengu",
						"display": "👺",
						"xOffset": "0%",
						"yOffset": "-5%",
						"color": "fff",
						"lineHeight": "normal",
						"fontSize": "200%"
					},
					{
						"name": "deer",
						"display": "🦌",
						"xOffset": "0%",
						"yOffset": "-5%",
						"color": "fff",
						"lineHeight": "normal",
						"fontSize": "200%"
					},
					{
						"name": "rat",
						"display": "🐀",
						"xOffset": "0%",
						"yOffset": "-5%",
						"color": "fff",
						"lineHeight": "normal",
						"fontSize": "200%"
					},
					{
						"name": "scorpion",
						"display": "🦂",
						"xOffset": "0%",
						"yOffset": "-5%",
						"color": "fff",
						"lineHeight": "normal",
						"fontSize": "200%"
					},
					{
						"name": "dragon",
						"display": "🐉",
						"xOffset": "0%",
						"yOffset": "-5%",
						"color": "fff",
						"lineHeight": "normal",
						"fontSize": "200%"
					},
					{
						"name": "wind-face",
						"display": "🌬️",
						"xOffset": "0%",
						"yOffset": "-5%",
						"color": "fff",
						"lineHeight": "normal",
						"fontSize": "200%"
					},
					{
						"name": "jack-o-lantern",
						"display": "🎃",
						"xOffset": "0%",
						"yOffset": "-5%",
						"color": "fff",
						"lineHeight": "normal",
						"fontSize": "200%"
					},
					{
						"name": "pancakes",
						"display": "🥞",
						"xOffset": "0%",
						"yOffset": "-5%",
						"color": "fff",
						"lineHeight": "normal",
						"fontSize": "200%"
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
