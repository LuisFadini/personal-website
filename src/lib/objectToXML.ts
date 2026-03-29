type XMLPrimitive = string | number | boolean | null | undefined;

type XMLNode =
	| XMLPrimitive
	| {
			children?: XMLPrimitive;
			[key: string]: XMLPrimitive;
	  };

export const objectToXML = (data: Record<string, XMLNode>) => {
	return Object.entries(data)
		.map(([key, val]) => {
			if (val == null || typeof val !== 'object') {
				return `<${key}>${val}</${key}>`;
			}

			const { children, ...attrs } = val;

			const attrStr = Object.keys(attrs).length
				? ' ' +
					Object.entries(attrs)
						.map(([k, v]) => `${k}="${v}"`)
						.join(' ')
				: '';

			return children === undefined
				? `<${key}${attrStr} />`
				: `<${key}${attrStr}>${children}</${key}>`;
		})
		.join('\n');
};
