const serializeCells = (cellData) => {
	return Array.from(cellData.values());
}

//ES6 map's aren't serialized by default, so we have to do that manually.
//Plus it's just nice to be able to customize how we serialize our grid values.
// const gridJsonReplacer = (key, value) => {
//   if(value instanceof Map) {
//     return {
//       dataType: 'Map',
//       value: value.entries().map(([key, value]) => value), // or with spread: value: [...value]
//     };
//   } else {
//     return value;
//   }
// }

// const gridJsonReviver = (key, value) => {
// 	if(typeof value === 'object' && value !== null) {
//     	if (value.dataType === 'Map') {
//       		return new Map(value.value);
//     	}
//   	}
//   	return value;
// }

const GridData = () => {
}
		
export default GridData;