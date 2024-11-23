import { config } from "./config.js"

export class Node {
	constructor(val, x, y) {
		this.val = val
		this.x = x
		this.y = y
		this.label = null
		this.color = null
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
	constructor(source, neighbor, cost) {
		this.source = source
		this.neighbor = neighbor
		this.cost = cost
	}
}

export class Graph {
	constructor() {
		this.nodes = []
		this.nodeMap = {}
		this.edges = []
		this.edgeMap = {}
	}
	add({ val, x, y }) {
		const node = new Node(val, x, y)
		this.nodes.push(node)
		this.nodeMap[val] = node
		return this
	}
	getEdge(a, b) {
		return this.edgeMap[a]?.[b]
	}
	isConnected(a, b) {
		return this.getEdge(a, b) != null
	}
	connect(a, b, cost = 1) {
		if (this.isConnected(a, b))
			return this
		const node_a = this.getNode(a)
		const node_b = this.getNode(b)
		if (!config.weighted)
			cost = 1
		const edge = new Edge(node_a, node_b, cost)
		node_a.edges.push(edge);
		(this.edgeMap[a] ?? (this.edgeMap[a] = {}))[b] = edge
		this.edges.push([ node_a, node_b, cost ])
		if (!config.directed)
			this.connect(a, b, cost)
		return this
	}
	getNode(val) {
		return this.nodeMap[val]
	}
}
