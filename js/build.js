import { Graph } from "./graph.js";

function graph1() {
	return new Graph()
		.add({ val: 'A', x: -200, y: -15 })
		.add({ val: 'B', x: -94, y: 120 })
		.add({ val: 'C', x: 115, y: 128 })
		.add({ val: 'D', x: -73, y: -128 })
		.add({ val: 'E', x: 132, y: -94 })
		.connect('A', 'B', 4)
		.connect('A', 'D', 2)
		.connect('B', 'C', 2)
		.connect('B', 'D', 3)
		.connect('B', 'E', 3)
		.connect('D', 'B', 1)
		.connect('D', 'C', 4)
		.connect('D', 'E', 5)
		.connect('E', 'C', 1)
}

function graph2() {
	return new Graph()
		.add({ val: 'O', x: -221, y: 54 })
		.add({ val: 'A', x: -101, y: 168 })
		.add({ val: 'B', x: -87, y: 5 })
		.add({ val: 'C', x: -180, y: -102 })
		.add({ val: 'D', x: 77, y: 34 })
		.add({ val: 'E', x: 51, y: -113 })
		.add({ val: 'F', x: 119, y: 181 })
		.add({ val: 'T', x: 222, y: 17 })
		.connect('O', 'B', 5)
		.connect('A', 'B', 2)
		.connect('A', 'D', 7)
		.connect('A', 'F', 12)
		.connect('B', 'D', 4)
		.connect('B', 'E', 3)
		.connect('C', 'B', 1)
		.connect('C', 'E', 4)
		.connect('D', 'T', 5)
		.connect('E', 'B', 3)
		.connect('E', 'D', 4)
		.connect('E', 'T', 7)
		.connect('F', 'T', 3)
		.connect('O', 'A', 2)
		.connect('O', 'C', 4)
		.connect('O', 'C', 4)
}

function graph3() {
	const graph = new Graph()
		.add({ val: 'A', x: 0, y: 0, })
		.add({ val: 'B', x: 90, y: 0, })
		.add({ val: 'C', x: 41, y: 79, })
		.add({ val: 'D', x: -68, y: 60, })
		.add({ val: 'E', x: -100, y: -37, })
		.add({ val: 'F', x: 5, y: -96, })
		.add({ val: 'G', x: 122, y: -79, })
		.add({ val: 'H', x: 130, y: 65, })
		.add({ val: 'I', x: -30, y: 134, })
		.add({ val: 'J', x: -156, y: 25, })
		.add({ val: 'K', x: -74, y: -130, })
		.add({ val: 'L', x: 68, y: -172, })
		.add({ val: 'M', x: 192, y: -128, })
		.add({ val: 'N', x: 194, y: -19, })
		.add({ val: 'O', x: 136, y: 150, })
		.add({ val: 'P', x: 49, y: 175, })
		.add({ val: 'Q', x: -148, y: 139, })
		.add({ val: 'R', x: -224, y: 72, })
		.add({ val: 'S', x: -204, y: -91, })
		.add({ val: 'T', x: 240, y: 64, })
		.add({ val: 'U', x: -254, y: -18, })
		.connect('A', 'C')
		.connect('A', 'D')
		.connect('A', 'E')
		.connect('A', 'F')
		.connect('B', 'G')
		.connect('B', 'H')
		.connect('C', 'B')
		.connect('C', 'I')
		.connect('D', 'J')
		.connect('E', 'J')
		.connect('E', 'K')
		.connect('F', 'G')
		.connect('F', 'K')
		.connect('F', 'L')
		.connect('G', 'M')
		.connect('G', 'N')
		.connect('H', 'N')
		.connect('H', 'O')
		.connect('I', 'P')
		.connect('I', 'Q')
		.connect('J', 'Q')
		.connect('J', 'R')
		.connect('J', 'S')
		.connect('J', 'U')
		.connect('K', 'S')
		.connect('N', 'T')
		.connect('O', 'P')

	return graph
}

export function buildGraph() {
	return graph3()
}
