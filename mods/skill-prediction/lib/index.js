'use strict'

const PRELOAD = ['./core', './commands'],
	OBSOLETE_MODS = []

for(let name of ['cooldowns', 'lockons', 'lockons-light', 'fastfire', 'fast-fire', 'fast-block'])
	OBSOLETE_MODS.push(name, name + '-master', name + '.js')

const path = require('path'),
	fs = require('fs')

for(let name of fs.readdirSync(path.join(__dirname, '../..')))
	if(OBSOLETE_MODS.includes(name.toLowerCase())) {
		console.error(`ERROR: Skill Prediction is not compatible with the obsolete mod "${name}", please remove it and try again.`)
		return
	}

const subMod = require('./require')
for(let name of PRELOAD) require(name)

module.exports = function SkillPrediction(mod) {

	for(let name of PRELOAD) subMod(mod, name)
}