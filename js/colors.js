import { config } from "./config.js"

const light = {
	background: '#fff',
	blank: '#eee',
	line: '#222',
	blue: '#0bf',
	orange: '#f85',
	green: '#0f7',
}

const dark = {
	background: '#222',
	blank: '#444',
	line: '#fff',
	blue: '#07f',
	orange: '#c52',
	green: '#095',
}

export const colors = config.dark_theme ? dark : light

export function reloadColors() {
	const actual = config.dark_theme ? dark : light
	for (const key in actual) {
		colors[key] = actual[key]
	}
}
