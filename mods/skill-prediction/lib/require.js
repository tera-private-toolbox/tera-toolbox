const dispatchMap = new WeakMap()

module.exports = function RequireMod(dispatch, path) {
	const Mod = require(path)

	let modMap = dispatchMap.get(dispatch)
	if(!modMap) dispatchMap.set(dispatch, modMap = new Map())

	let instance = modMap.get(Mod)
	if(!instance) modMap.set(Mod, instance = new Mod(dispatch))

	return instance
}