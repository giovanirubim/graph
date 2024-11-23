export const config = {
	directed: true,
	weighted: true,
	dark_theme: true,
	transparent_background: false,
	animate: 0, // set to zero to advance step by step with the arrow right key
}

export function setConfig(props) {
	for (const key in props) {
		config[key] = props[key]
	}
}
