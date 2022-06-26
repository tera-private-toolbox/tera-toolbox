'use strict'

const subMod = require('./require')

module.exports = function SPCommands(mod) {
	const ping = subMod(mod, './ping'),
		debug = subMod(mod, './debug')

	mod.command.add('sp', {
		$default() { message(`Unknown command "${this}".`) },
		$none: printHelp,
		help: printHelp,
		ping: printPing,
		debug(type = '') {
			switch(type.toLowerCase()) {
				case 'loc': case 'location':
					message(`Location debug ${(mod.settings.debug.loc = !mod.settings.debug.loc) ? 'enabled' : 'disabled'}.`)
					debug.reload()
					break
				case 'abnormal': case 'abnormals': case 'abnormality': case 'abnormalities':
					message(`Abnormality debug ${(mod.settings.debug.abnormals = !mod.settings.debug.abnormals) ? 'enabled' : 'disabled'}.`)
					debug.reload()
					break
				default:
					message(`Skill debug ${(mod.settings.debug.skills = !mod.settings.debug.skills) ? 'enabled' : 'disabled'}.`)
					debug.reload()
					break
			}
		},
		info: printRTFM,
		strictdef: printRTFM,
		mount: printRTFM,
		off: printRTFM,
		on: printRTFM,
		config: printRTFM,
		debugloc: printRTFM,
		debugabnorm: printRTFM
	})

	function printHelp() {
		message(`Commands:
<FONT COLOR="#FFFFFF">ping</FONT> = Display ping statistics.
<FONT COLOR="#FFFFFF">debug [skill|loc|abnormal]</FONT> = Toggle debug modes.`)
	}

	function printPing() {
		mod.command.message(`Ping: ${ping.history.length ? `Avg=${Math.round(ping.avg)} Min=${ping.min} Max=${ping.max} Spread=${ping.max - ping.min} Samples=${ping.history.length}` : '???'}`)
	}

	function message(msg) { mod.command.message(`${msg}`) }

	function printRTFM(msg) {
		message(`SaltyMonkey's public Skill-Prediction fork has been discontinued.
You are now using Pinkie Pie's SP which doesn't support the command you tried.
For feedback please contact Pinkie Pie on Discord.`)
	}
}