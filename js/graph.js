import { colors } from "./colors.js"
import { config } from "./config.js"

export class Node {
	constructor(val, x, y) {
		this.val = val
		this.x = x
		this.y = y
		this.label = null
		this.color = colors.blank
		this.edges = []
	}
	get cost() {
		return this.label
	}
	set cost(value) {
		this.label = value
	}
}

class Edge {
	constructor(neighbor, cost) {
		this.neighbor = neighbor
		this.cost = cost
	}
}

export class Graph {
	constructor() {
		this.nodes = []
		this.edges = []
	}
	add({ val, x, y }) {
		this.nodes.push(new Node(val, x, y))
		return this
	}
	isConnected(node_a, node_b) {
		const edge = this.edges.find((edge) => {
			const [ a, b ] = edge
			return a === node_a && b === node_b
		})
		return edge != null
	}
	connect({ a, b, cost = 1 }) {
		const node_a = this.get(a)
		const node_b = this.get(b)
		if (this.isConnected(node_a, node_b)) {
			return this
		}
		if (!config.weighted) {
			cost = 1
		}
		node_a.edges.push(new Edge(node_b, cost))
		this.edges.push([ node_a, node_b, cost ])
		if (!config.directed) {
			this.connect({ a: b, b: a, cost })
		}
		return this
	}
	connectBoth({ a, b, cost }) {
		this.connect({ a, b, cost })
		this.connect({ a: b, b: a, cost })
		return this
	}
	get(val) {
		return this.nodes.find(node => node.val === val)
	}
}