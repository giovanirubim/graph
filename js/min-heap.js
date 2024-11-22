function compare(a, b) {
	if (a instanceof Array) {
		const n = a.length
		for (let i=0; i<n; ++i) {
			const diff = compare(a[i], b[i])
			if (diff !== 0) return diff
		}
		return 0
	}
	if (a < b) return -1
	if (a > b) return +1
	return 0
}

export function heappush(heap, item) {
	let i = heap.length
	while (i > 0) {
		const p = (i - 1) >> 1
		if (compare(item, heap[p]) >= 0) break
		heap[i] = heap[p]
		i = p
	}
	heap[i] = item
}

export function heappop(heap) {
	const res = heap[0]
	const n = heap.length - 1
	if (n > 0) {
		const last = heap[n]
		let i = 0
		for (;;) {
			let a = (i << 1) | 1, b = a + 1
			if (a >= n) break
			if (b < n && compare(heap[a], heap[b]) > 0) a = b
			if (compare(heap[a], last) >= 0) break
			heap[i] = heap[a]
			i = a
		}
		heap[i] = last
	}
	heap.length = n
	return res
}
