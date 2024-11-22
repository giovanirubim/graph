import { heappop, heappush } from "./min-heap.js"

export class List {
	constructor() {
		this.arr = []
	}
	get size() {
		return this.arr.length
	}
	push(item) {
		this.arr.push(item)
		return this
	}
	pop() {
		return this.arr.pop()
	}
	popleft() {
		return this.arr.splice(0, 1)[0]
	}
	heappush(item) {
		heappush(this.arr, item)
		return this
	}
	heappop() {
		return heappop(this.arr)
	}
	values() {
		return [ ...this.arr ]
	}
}
