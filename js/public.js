import { clear, drawGraph, drawList, resize } from "./canvas.js";
import { reloadColors } from "./colors.js";
import { config, setConfig } from "./config.js";
import { List } from "./list.js";

const list = new List()
let graph = null
let root = null
let run = () => {}
let nextHandler = null

window.addEventListener('keydown', e => {
	if (e.code !== 'ArrowRight') return
	const fn = nextHandler
	nextHandler = null
	fn?.()
})

window.addEventListener('resize', () => {
	resizeCanvas()
})

function render() {
	clear()
	drawGraph(graph)
	drawList(list)
}

function resizeCanvas() {
	resize(window.innerWidth - 20, window.innerHeight - 20)
	render()
}

const pause = () => new Promise(fn => {
	if (config.animate) {
		setTimeout(fn, config.animate)
	} else {
		nextHandler = fn
	}
})

async function start() {
	resizeCanvas()
	const it = run(graph, list)
	for (;;) {
		await pause()
		const { done } = it.next()
		render()
		if (done) break
	}
}

export function main({ config, buildGraph, run: runFn }) {
	setConfig(config)
	reloadColors()
	graph = buildGraph()
	run = runFn
	start()
}
