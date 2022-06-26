'use strict'

const subMod = require('./require')

class SPCooldowns {
	constructor(mod) {
		this.loaded = false
		this.mod = mod
		this.timeouts = new Map()
		this.startTimes = new Map()
		this.hooks = []
		this.affectedByCampfire = false

		this.load()
	}

	load() {
		if(this.loaded) return

		const ping = subMod(this.mod, './ping'),
			hook = (...args) => { this.hooks.push(this.mod.hook(...args)) },
			handle = event => {
				if(event.usedStacks == 5) { //5 stacks hardcoded, only works for archer stacking skills (idk if other classes use this)
					event.cooldown = Math.max(0, event.cooldown - ping.min)
					event.nextStackCooldown = Math.max(0, event.nextStackCooldown - ping.min)
					this.set(event.skill.id, event.nextStackCooldown)
					return true
				}
				if(event.cooldown > 0 && event.usedStacks == 0) {
					event.cooldown = Math.max(0, event.cooldown - ping.min)
					this.set(event.skill.id, event.cooldown)
					return true
				}

				this.end(event.skill.id)
			},
			handleCampfire = event => {
				if (event.affectedByCampfire != this.affectedByCampfire){
					this.affectedByCampfire = event.affectedByCampfire
					this.timeouts.forEach((timeout, id)=>{
						let currentTime = (new Date()).getTime(),
							timeRemaining = this.startTimes.get(id).duration - (currentTime - this.startTimes.get(id).startTime),
							duration = this.affectedByCampfire?(timeRemaining/2):(timeRemaining*2)
						clearTimeout(timeout)
						timeout = setTimeout(()=>{this.end(id)}, duration)
						this.startTimes.set(id, {startTime: currentTime, duration})
					})
				}
			}

		hook('S_START_COOLTIME_SKILL', 3, handle)
		hook('S_DECREASE_COOLTIME_SKILL', 3, handle)
		hook('S_LOAD_TOPO', 'raw', () => { this.reset() })
		hook('S_PLAYER_STAT_UPDATE', 14, handleCampfire)

		this.loaded = true
	}

	check(id) { return this.timeouts.has(id) }

	set(id, time) {
		this.end(id)

		if(time > 0) {
			this.timeouts.set(id, setTimeout(() => { this.end(id) }, this.affectedByCampfire?(time/2):time))
			this.startTimes.set(id, {startTime: (new Date).getTime(), duration: this.affectedByCampfire?(time/2):time})
		}
	}

	end(id) {
		clearTimeout(this.timeouts.get(id))
		this.timeouts.delete(id)
	}

	reset() {
		for(let id of this.timeouts.keys()) this.end(id)
	}

	unload() {
		if(!this.loaded) return

		reset()

		for(let hook of this.hooks) this.mod.unhook(hook)

		this.hooks = []
		this.loaded = false
	}
}

module.exports = SPCooldowns