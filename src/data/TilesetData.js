const TilesetData = (tileset) => {
	let loadedTiles = tileset;

	const getTileByIndex = (index) => {
		return loadedTiles[index];
	}

	const addTile = (tileData) => {
		loadedTiles.push(tileData);
	}

	return { getTileByIndex, addTile };
}
		
export default GridData;