'use strict'

const subMod = require('./require'),
	abnormals = require('../config/abnormalities')

class SPAbnormals {
	constructor(mod) {
		this.mod = mod

		this.player = subMod(mod, './player')
		this.ping = subMod(mod, './ping')

		this.myAbnormals = {}

		this.listWithShit = {
			"10152030": true,
			"10152031": true,
			"30171005": true,
			"30180202": true,
			"30180240": true,
			"30180302": true,
			"30190116": true,
			"30190211": true,
			"30190239": true,
			"30190309": true,
			"32010110": true,
			"457010": true,
			"460002": true,
			"460025": true,
			"620000": true,
			"620001": true,
			"623005": true,
			"626004": true,
			"70408": true,
			"7201005": true,
			"757010": true,
			"760002": true,
			"760025": true,
			"781076": true,
			"78200116": true,
			"78200211": true,
			"78200239": true,
			"78200309": true,
			"78300202": true,
			"78300240": true,
			"78300302": true,
			"7941013": true,
			"801900": true,
			"801920": true,
			"860002": true,
			"860025": true,
			"88605": true,
			"90340704": true,
			"905620": true,
			"905628": true,
			"905922": true,
			"9201005": true,
			"93910011": true,
			"93920014": true,
			"950317": true,
			"980207": true,
			"981076": true,
			"98200116": true,
			"98200211": true,
			"98200239": true,
			"98200309": true,
			"98300202": true,
			"98300240": true,
			"98300302": true,
			"9941013": true
		}

		mod.hook('S_RETURN_TO_LOBBY', 1, () => { this.removeAll() })

		mod.hook('S_CREATURE_LIFE', 3, event => {
			if (event.gameId === this.player.gameId && !event.alive) this.removeAll()
		})

		let abnormalityUpdate = (type, event) => {
			if (event.target === this.player.gameId) {
				if (mod.settings.debug.abnormals) debug(abnormals[event.id] == true ? '<X' : '<-', type, event.id, event.duration, event.stacks)

				let info = abnormals[event.id]
				if (info) {
					if (info == true) return false

					if (info.overrides && this.exists(info.overrides)) this.remove(info.overrides)
				}

				if (event.duration <= 0x7fffffffn && !this.listWithShit[event.id]) event.duration = BigInt(Math.round(Math.max(Number(event.duration) - this.ping.min, 0)))

				if (type === 'S_ABNORMALITY_BEGIN' === this.exists(event.id)) { // Transform packet type so it will always be valid
					this.add(event.id, event.duration, event.stacks)
					return false
				}

				this._add(event.id, event.duration)
				return true
			}
		}

		mod.hook('S_ABNORMALITY_BEGIN', mod.majorPatchVersion <= 106 ? 4 : 5, abnormalityUpdate.bind(null, 'S_ABNORMALITY_BEGIN'))
		mod.hook('S_ABNORMALITY_REFRESH', 2, abnormalityUpdate.bind(null, 'S_ABNORMALITY_REFRESH'))

		mod.hook('S_ABNORMALITY_END', 1, event => {
			if (event.target === this.player.gameId) {
				if (mod.settings.debug.abnormals) debug(abnormals[event.id] == true ? '<X' : '<-', 'S_ABNORMALITY_END', event.id)

				if (abnormals[event.id] == true) return false

				if (!this.myAbnormals[event.id]) return false

				this._remove(event.id)
			}
		})
	}

	exists(id) {
		return !!this.myAbnormals[id]
	}

	inMap(map) {
		for (let id in this.myAbnormals)
			if (map[id]) return true
		return false
	}

	add(id, duration, stacks) {
		let type = this.myAbnormals[id] ? 'S_ABNORMALITY_REFRESH' : 'S_ABNORMALITY_BEGIN',
			version = this.myAbnormals[id] ? 2 : this.mod.majorPatchVersion <= 106 ? 4: 5

		if (this.mod.settings.debug.abnormals) debug('<*', type, id, duration, stacks)

		this.mod.toClient(type, version, {
			target: this.player.gameId,
			source: this.player.gameId,
			id,
			duration: BigInt(duration),
			unk: 0,
			stacks,
			unk2: 0
		})

		this._add(id, duration)
	}

	remove(id) {
		if (!this.exists(id)) return

		if (this.mod.settings.debug.abnormals) debug('<* S_ABNORMALITY_END', id)

		this.mod.toClient('S_ABNORMALITY_END', 1, {
			target: this.player.gameId,
			id
		})

		this._remove(id)
	}

	removeAll() {
		for (let id in this.myAbnormals) this.remove(id)
	}

	_add(id, duration) {
		this.mod.clearTimeout(this.myAbnormals[id])
		this.myAbnormals[id] = duration >= 0x7fffffffn ? true : this.mod.setTimeout(() => { this.remove(id) }, Number(duration))
	}

	_remove(id) {
		this.mod.clearTimeout(this.myAbnormals[id])
		delete this.myAbnormals[id]
	}
}

function debug() {
	console.log(`[${(Date.now() % 10000).toString().padStart(4, '0')}]`, ...arguments)
}

module.exports = SPAbnormals