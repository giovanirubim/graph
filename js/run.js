import { colors } from "./colors.js";

export function* run(graph, root, list) {
	list.heappush([ 0, root, '*' ])
	root.color = colors.orange
	yield

	while (list.size > 0) {
		const [ path_cost, node, prev ] = list.heappop()
		
		if (node.color === colors.blue) {
			yield
			continue
		} else {
			node.color = colors.blue
			node.cost = [ path_cost, prev ]
			yield
		}

		for (const { neighbor, cost } of node.edges) {
			const new_cost = path_cost + cost
			neighbor.color = colors.orange
			list.heappush([ new_cost, neighbor, node ])
			yield
		}
	}
}
