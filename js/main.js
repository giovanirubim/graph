import { buildGraph } from "./build.js";
import { config } from "./config.js";
import { main } from "./public.js";
import { run } from "./run.js";

const graph = buildGraph()
const root = graph.nodes[0]

main({ config, graph, root, run })
