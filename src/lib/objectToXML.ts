export const objectToXML = (data: { [key: string]: string | number }) => {
	return Object.entries(data)
		.map(([key, val]) => `<${key}>${val}</${key}>`)
		.join('\n');
};
