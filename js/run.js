import { colors } from "./colors.js";
import { List } from "./list.js";

export function* run(graph, result) {

	const list = new List()
	for (const node of graph.nodes) {
		node.label = 0
	}
	for (const [ source, target, cost ] of graph.edges) {
		target.label += 1
	}
	for (const node of graph.nodes) {
		if (node.label === 0) {
			node.color = colors.orange
			list.push(node)
		}
	}

	yield

	while (list.size > 0) {
		const node = list.popleft()
		node.color = colors.blue
		result.push(node)
		yield

		for (const { neighbor } of node.edges) {
			neighbor.label -= 1
			if (neighbor.label === 0) {
				list.push(neighbor)
				neighbor.color = colors.orange
				yield
			}
		}
	}
}
