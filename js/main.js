import { buildGraph } from "./build.js";
import { clear, drawGraph, drawList, resize } from "./canvas.js";
import { config } from "./config.js";
import { List } from "./list.js";
import { run } from "./run.js";

const graph = buildGraph()
const list = new List()
let nextHandler = null

window.addEventListener('keydown', e => {
	if (e.code !== 'ArrowRight') return
	const fn = nextHandler
	nextHandler = null
	fn?.()
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

window.addEventListener('resize', resizeCanvas)

resizeCanvas()

const pause = () => new Promise(fn => {
	if (config.animate) {
		setTimeout(fn, config.animate)
	} else {
		nextHandler = fn
	}
})

const it = run(graph, graph.nodes[0], list)

for (;;) {
	await pause()
	const { done } = it.next()
	render()
	if (done) break
}
