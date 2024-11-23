import { colors } from "./colors.js"
import { config } from "./config.js"
import { Node } from "./graph.js"

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const nodeRadius = 20
const fontSize = 15
const pathGap = 10
const costGap = 12
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

	const gap = node.label != null ? projectSize(nodeRadius*0.6) : 0

	ctx.font = projectSize(fontSize) + 'px monospace'
	ctx.textAlign = 'center'
	ctx.textBaseline = 'middle'
	ctx.fillStyle = colors.line
	ctx.fillText(node.val, x, y - gap*0.3)

	if (node.label != null) {
		ctx.font = projectSize(fontSize*0.8) + 'px monospace'
		ctx.strokeStyle = node.color
		ctx.fillText(normalize(node.label), x, y + gap*0.7)
	}
}

function drawEdge([ a, b, cost ]) {
	if (!config.directed && a.val < b.val) {
		return
	}

	const [ ax, ay ] = projectNode(a)
	const [ bx, by ] = projectNode(b)
	const dx = bx - ax
	const dy = by - ay
	const len = Math.sqrt(dx**2 + dy**2)
	const nx = dx/len
	const ny = dy/len
	const offset = config.directed ? projectSize(pathGap*0.5) : 0
	const rad = projectSize(nodeRadius)
	const sx = ax + nx*rad + offset*ny
	const sy = ay + ny*rad - offset*nx
	const ex = bx - nx*rad + offset*ny
	const ey = by - ny*rad - offset*nx
	const tipSize = projectSize(7)
	const cx = ex - nx*tipSize
	const cy = ey - ny*tipSize
	const gap = projectSize(costGap)
	const mid = Math.sqrt((sx - ex)**2 + (sy - ey)**2)*0.4
	const tx = sx + nx*mid + ny*gap
	const ty = sy + ny*mid - nx*gap

	ctx.lineWidth = projectSize(lineWidth)
	ctx.strokeStyle = colors.line
	ctx.fillStyle = colors.line

	if (config.directed) {
		ctx.beginPath()
		ctx.moveTo(sx, sy)
		ctx.bezierCurveTo(sx, sy, tx, ty, cx, cy)
		ctx.stroke()

		ctx.beginPath()
		ctx.moveTo(ex, ey)
		ctx.lineTo(cx - ny*tipSize*0.5, cy + nx*tipSize*0.5)
		ctx.lineTo(cx + ny*tipSize*0.5, cy - nx*tipSize*0.5)
		ctx.fill()
	} else {
		ctx.beginPath()
		ctx.moveTo(ax, ay)
		ctx.lineTo(bx, by)
		ctx.stroke()
	}

	if (config.weighted) {
		ctx.textAlign = 'center'
		ctx.textBaseline = 'middle'
		ctx.font = projectSize(fontSize) + 'px monospace'
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

export function drawGraph({ edgeMap, nodes }) {
	for (const a in edgeMap) {
		const node = nodes.find(node => node.val == a)
		const map = edgeMap[a]
		for (const b in map) {
			const edge = map[b]
			drawEdge([ node, edge.neighbor, edge.cost ])
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
	const text = (
		'[ ' +
		list.values().map(normalize).join(', ') +
		' ]'
	).replace('  ', ' ')
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
	console.log(`.add({ val: <value>, x: ${Math.round(x)}, y: ${Math.round(y)} })`)
})

export function resize(width, height) {
	canvas.width = width
	canvas.height = height
	updateScale()
}

updateScale()
