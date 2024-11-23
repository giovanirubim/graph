import { colors } from "./colors.js";

export function* run(graph, list) {
	const root = graph.getNode('O') ?? graph.nodes[0]

	list.heappush([ 0, root ])
	root.color = colors.orange
	yield

	while (list.size > 0) {
		const [ path_cost, node ] = list.heappop()
		
		if (node.color === colors.blue) {
			yield
			continue
		} else {
			node.color = colors.blue
			node.cost = path_cost
			yield
		}

		for (const { neighbor, cost } of node.edges) {
			const new_cost = path_cost + cost
			if (neighbor.color !== colors.blue) {
				neighbor.color = colors.orange
			}
			list.heappush([ new_cost, neighbor ])
			yield
		}
	}
}
