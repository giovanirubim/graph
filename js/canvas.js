import { colors } from "./colors.js"
import { config } from "./config.js"
import { Node } from "./graph.js"

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const nodeRadius = 20
const fontSize = 15
const pathGap = 7
const costGap = 8
const curveGap = 15
const lineWidth = 1.5
let scale = 1

function updateScale() {
	const { width, height } = canvas
	scale = Math.min(width, height) / 600
}

function projectNode({ x, y }) {
	const { width, height } = canvas
	return [
		width*0.5 + x*scale,
		height*0.5 - y*scale,
	]
}

function projectSize(size) {
	return size*scale
}

function drawNode(node) {
	const [ x, y ] = projectNode(node)
	ctx.lineWidth = projectSize(lineWidth)
	ctx.fillStyle = node.color
	ctx.strokeStyle = colors.line

	const rad = projectSize(nodeRadius)

	ctx.beginPath()
	ctx.arc(x, y, rad, 0, Math.PI*2)
	ctx.fill()
	ctx.stroke()

	const gap = node.label != null ? projectSize(nodeRadius*0.65) : 0

	ctx.font = projectSize(fontSize) + 'px monospace'
	ctx.textAlign = 'center'
	ctx.textBaseline = 'middle'
	ctx.fillStyle = colors.line
	ctx.fillText(node.val, x, y - gap*0.3)

	if (node.label != null) {
		const ty = y + gap*0.7
		const text = normalize(node.label)

		ctx.font = projectSize(fontSize*0.8) + 'px monospace'
		const metrics = ctx.measureText(text)
		const lw = projectSize(8)
		const width = metrics.width - lw*0.5
		const h1 = metrics.actualBoundingBoxAscent - lw*0.25
		const h2 = metrics.actualBoundingBoxDescent - lw*0.25
		const height = h1 + h2
		
		ctx.strokeStyle = colors.blank
		ctx.fillStyle = colors.blank
		ctx.beginPath()
		ctx.rect(x - width/2, ty - h1, width, height)
		ctx.lineJoin = 'round'
		ctx.lineWidth = lw
		ctx.stroke()
		ctx.fill()

		ctx.fillStyle = colors.line
		ctx.fillText(text, x, ty)
	}
}

function drawEdge({ source: a, neighbor: b, cost }, graph) {
	const { directed, weighted } = config
	const [ ax, ay ] = projectNode(a)
	const [ bx, by ] = projectNode(b)

	const dx = bx - ax
	const dy = by - ay
	const len = Math.sqrt(dx**2 + dy**2)
	const nx = dx/len
	const ny = dy/len

	const rad = projectSize(nodeRadius)
	const gap = projectSize(costGap)
	let sx = ax + nx*rad
	let sy = ay + ny*rad
	let ex = bx - nx*rad
	let ey = by - ny*rad
	let px = ax + dx*0.4
	let py = ay + dy*0.4
	
	const curved = directed && graph.isConnected(b.val, a.val)
	
	if (curved) {
		const gap = projectSize(pathGap)*0.5
		const offset = projectSize(curveGap)*0.5
		sx += ny*gap
		sy -= nx*gap
		ex += ny*gap
		ey -= nx*gap
		px += ny*(gap + offset)
		py -= nx*(gap + offset)
	}

	let tx = px + ny*gap
	let ty = py - nx*gap

	ctx.lineWidth = projectSize(lineWidth)
	ctx.fillStyle = colors.line
	ctx.strokeStyle = colors.line
	ctx.beginPath()
	ctx.moveTo(sx, sy)
	if (curved) {
		ctx.bezierCurveTo(sx, sy, px, py, ex, ey)
	} else {
		ctx.lineTo(ex, ey)
	}
	ctx.stroke()

	if (directed) {
		const c1 = projectSize(4.5)
		const c2 = projectSize(9.0)
		let vx = nx, vy = ny
		if (curved) {
			const dx = ex - px
			const dy = ey - py
			const len = Math.sqrt(dx**2 + dy**2)
			vx = dx/len
			vy = dy/len
		}
		ctx.beginPath()
		ctx.moveTo(ex, ey)
		ctx.lineTo(ex - vx*c2 + vy*c1, ey - vy*c2 - vx*c1)
		ctx.lineTo(ex - vx*c2 - vy*c1, ey - vy*c2 + vx*c1)
		ctx.fill()
	}

	if (weighted) {
		ctx.font = projectSize(fontSize) + 'px monospace'
		ctx.textAlign = 'center'
		ctx.textBaseline = 'middle'
		ctx.fillText(cost, tx, ty)
	}
}

export function clear() {
	if (config.transparent_background) {
		ctx.clearRect(0, 0, canvas.width, canvas.height)
	} else {
		ctx.fillStyle = colors.background
		ctx.fillRect(0, 0, canvas.width, canvas.height)
	}
}

export function drawGraph(graph) {
	const { edgeMap, nodes } = graph
	for (const a in edgeMap) {
		const map = edgeMap[a]
		for (const b in map) {
			const edge = map[b]
			drawEdge(edge, graph)
		}
	}
	for (const node of nodes) {
		drawNode(node)
	}
}

function normalize(value) {
	if (value instanceof Array) {
		return `(${value.map(normalize).join(', ')})`
	}
	if (value instanceof Node) {
		return value.val
	}
	if (value === Infinity) {
		return '\u221e'
	}
	return value
}

export function drawList(list) {
	const text = `list: [${list.values().map(normalize).join(', ')}]`
	ctx.fillStyle = colors.line
	ctx.textBaseline = 'top'
	ctx.textAlign = 'left'
	ctx.font = projectSize(fontSize) + 'px monospace'
	const margin = projectSize(10)
	ctx.fillText(text, margin, margin)
}

canvas.addEventListener('dblclick', e => {
	const x = (e.offsetX - canvas.width/2)/scale
	const y = (canvas.height/2 - e.offsetY)/scale
	console.log(`.add({ val: '', x: ${Math.round(x)}, y: ${Math.round(y)} })`)
})

export function resize(width, height) {
	canvas.width = width
	canvas.height = height
	updateScale()
}

updateScale()
