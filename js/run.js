import { colors } from "./colors.js";

export function* run(graph, root, list) {
	for (const node of graph.nodes) {
		node.cost = Infinity
	}

	list.heappush([ 0, root ])
	root.cost = 0
	root.color = colors.orange

	while (list.size > 0) {
		const [ _, node ] = list.heappop()
		node.color = colors.blue
		yield

		for (const { neighbor, cost } of node.edges) {
			if (neighbor.color === colors.blue) {
				continue
			}
			const new_cost = node.cost + cost
			if (new_cost < neighbor.cost) {
				neighbor.color = colors.orange
				neighbor.cost = new_cost
				list.heappush([ new_cost, neighbor ])
				yield
			}
		}
	}
}
