'use strict'

const {SkillID} = require('tera-data-parser').types

class SPDebug {
	constructor(mod) {
		this.mod = mod
		this.hooks = []

		this.reload()
	}

	reload() {
		this.unload()

		// Skills
		if(this.mod.settings.debug.skills) {
			for(let options of [
				['S_CREST_APPLY', 2, _ => [_.id, _.enable ? 'on' : 'off']],
				['S_CREST_MESSAGE', 2, _ => [_.unk, _.type, skillId(_.skill)]],

				['S_CANNOT_START_SKILL', 4, _ => skillId(_.skill.id)]
			])
				this.hookFirst(...options)

			for(let options of [
				['C_START_SKILL', 7, _ => [Number(_.unk), Number(_.moving), Number(_.continue), gameId(_.target)]],
				['C_PRESS_SKILL', 5, _ => _.press],
				['C_START_TARGETED_SKILL', 7, _ => `[${_.targets.map(t => `${gameId(t.gameId)} ${t.hitCylinderId}`).join(',')}]`],
				['C_START_COMBO_INSTANT_SKILL', 6, _ => `[${_.targets.map(t => `${t.arrowId} ${gameId(t.gameId)} ${t.hitCylinderId}`).join(',')}]`],
				['C_START_INSTANCE_SKILL', 8, _ => [_.unk, `[${_.targets.map(t => `${t.arrowId} ${gameId(t.gameId)} ${t.hitCylinderId}`).join(',')}]`]],
				['C_START_INSTANCE_SKILL_EX', 5, _ => [_.unk, gameId(_.projectile)]],
				['C_NOTIMELINE_SKILL', 3],

				['S_GRANT_SKILL', 3],
				['C_CANCEL_SKILL', 3, _ => _.type]
			])
				this.hookMod(options[0], options[1], (_, name) => [skillId(_.skill), ...(() => {
					const strs = (options[2] || (() => []))(_, name)
					return Array.isArray(strs) ? strs : [strs]
				})(), ...(() => {
					const strs = []

					if(this.mod.settings.debug.loc) {
						if(['C_START_SKILL', 'C_PRESS_SKILL', 'C_START_TARGETED_SKILL', 'C_START_COMBO_INSTANT_SKILL',
							'C_START_INSTANCE_SKILL', 'C_START_INSTANCE_SKILL_EX'].includes(name))
							strs.push(pos(_.loc))

						if(['C_START_SKILL', 'C_START_TARGETED_SKILL', 'C_START_INSTANCE_SKILL_EX'].includes(name))
							strs.push(`> ${pos(_.dest)}`)

						if(['C_START_COMBO_INSTANT_SKILL', 'C_START_INSTANCE_SKILL'].includes(name))
							strs.push(`> [${_.endpoints.map(p => pos(p.loc)).join(', ')}]`)
					}

					return strs
				})()])
		}

		// Location
		if(this.mod.settings.debug.loc)
			for(let pkt of ['C_NOTIFY_LOCATION_IN_ACTION', 'C_NOTIFY_LOCATION_IN_DASH'])
				this.hookMod(pkt, 4, _ => [skillId(_.skill), _.stage, pos(_.loc), dir(_.w)])
	}

	unload() {
		if(this.hooks.length) {
			for(let h of this.hooks) this.mod.unhook(h)

			this.hooks = []
		}
	}

	hookFirst(name, ver, cb) {
		this.hook(name, ver, {order: -999}, event => {
			const out = cb(event, name)

			debug(`${event.$incoming ? '<-' : '->'} ${name} ${Array.isArray(out) ? out.join(' ') : out}`)
		})
	}

	hookMod(name, ver, cb) {
		this.hook(name, ver, {order: 999, filter: {fake: null, silenced: null}}, event => {
			if(event.$fake && event.$silenced) return

			const out = cb(event, name),
				typeChar = event.$silenced ? 'X' : (event.$fake ? '*' : (event.$modified ? '~' : '-'))

			debug(`${event.$incoming ? '<' + typeChar : typeChar + '>'} ${name} ${Array.isArray(out) ? out.join(' ') : out}`)
		})
	}

	hook(...args) { return this.hooks.push(this.mod.hook(...args)) }

	toggle() {
		//if(this.mod.settings.debug.skills) debug(`SP debug enabled. Race=${player.race} Class=${player.job}`)
	}
}

// Utilities
function debug() {
	console.log(`[${(Date.now() % 10000).toString().padStart(4, '0')}]`, ...arguments)
}

function pos(p) { return `(${p.roundN().toString()})` }
function dir(w) { return (Math.round(w / Math.PI * 100) / 100) + '/t' }

function decimal(n, p) {
	p = 10 ** p
	return Math.round(n * p)  / p
}

function gameId(id) {
	if(id === 0n) return '@'

	return '@' + id.toString(16).toUpperCase().padStart(16, '0')
}

function skillId(skill) {
	if(!(skill instanceof SkillID)) skill = new SkillID(skill)

	let str = skill.reserved ? `[X${skill.reserved.toString(16)}]` : ''

	switch(skill.type) {
		case 1: str += 'A'; break
		case 2: str += 'R'; break
		default: str += `[T${skill.type}]`; break
	}

	if(skill.npc) {
		if(skill.type === 1) return `${str}${skill.huntingZoneId}:${skill.id}`
		return str + skill.id
	}

	const id = skill.id.toString()

	switch(skill.type) {
		case 1: return str + [id.slice(0, -4), id.slice(-4, -2), id.slice(-2)].join('-')
		case 2: return str + [id.slice(0, -2), id.slice(-2)].join('-')
		default: return str + id
	}
}

// Export
module.exports = SPDebug