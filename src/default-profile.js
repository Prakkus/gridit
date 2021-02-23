const defaultProfile = {
	title: "Example Grid",
	config :
		{ 
			rowCount: 8, 
			columnCount: 8,
			cellSize: 54,
			cellGap: 2
		},
	schema: [
		//Colors
		{
			name: 'background_color',
			displayName: 'Fill Colors: ',
			cellAttribute: 'fillColor',
			values : [
				{
					name: 'red',
					hex: 'BE123C'
				},
						{
					name: 'green',
					hex: '047857'
				},
						{
					name: 'yellow',
					hex: 'FDE68A'
				},
						{
					name: 'blue',
					hex: '0369A1'
				},
						{
					name: 'purple',
					hex: 'A21CAF'
				}
			]
		},

		//Symbols
		{
			name: 'symbol',
			displayName: 'Symbols: ',
			cellAttribute: 'symbol',
			values : [
				{
					name: 'frog',
					display: '🐸',
					xOffset: 0,
					yOffset: '-20%',
					fontSize: '60%' 
				},
				{
					name: 'deciduousTree',
					display: '🌳',
					xOffset: 0,
					yOffset: '-20%',
					fontSize: '60%' 
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
			displayName: 'Tiles: ',
			cellAttribute: 'backgroundTileIndex',
			values : [
				{
					imageDataUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAABj0lEQVR4nO3bIU4EQRRF0VkagmTWhMOxHjR+tgUeMS2g8qv7HnH9q+Son9Tt6/31W91u0wMEgAAQAAJAAAgAAaB/6/Pt5WkAXDwA4gEQD4B4AMQDIB4A8fIAHh/3p03vmw6ADTYCAAAAAAAAAAAAAAAAAACcCMDRoWH6gVfvr8ABOHkAxAMgHgDxAIgHQDwA4o0DWP0Ah5y1ARAPgHgAxAMgHgDxAIgHQLw8gPohCwAAAAAAAAAAAAAAAAAAAAAA1AmAeADEAyAeAPEAiAdAPADiLQew+pAjAASAABAAAkAACADtA0B7B0A8AOIBEA+AeADEAyAeAPHyAHwM2WAEAAAAAAAAAAAAAAAAAAAAAAAIAAEgAASAABAAAkAA/Gr6kHP2jy8AADA/AgAAAAAAAAAAAAAAAADYCcDZH7h7R4BXAwcAAAAAAAAAAAAAAAAAAAAAAAEgAASAABAAAkAACABdLwDiARAPgHgAxAMgHgDxAIgHwEGrDzHTAQDA/IidAyAeAPEAiAdAPADiXR3ADyZ3hBKgbhxYAAAAAElFTkSuQmCC'
				}
			]
		}
	]
};

const getSchemaValueId = (schema, index) => `${schema.name}-${index}`;
const getDefaultAttributes = () => {
	const types = {};
	defaultProfile.schema.forEach((schema) => {
		types[schema.cellAttribute] = 0;
	});

	return types;
}

export default defaultProfile;
export { getSchemaValueId, getDefaultAttributes };