/*	Notes:
	* '*' can be used in place of the skill or sub-skill to set default values

	Races:
	0 = Male Human
	1 = Female Human
	2 = Male High Elf
	3 = Female High Elf
	4 = Male Aman
	5 = Female Aman
	6 = Male Castanic
	7 = Female Castanic
	8 = Popori
	9 = Elin
	10 = Baraka
*/

module.exports = {
	'*': { // All-class
		9010100: true, // Racial teleport
		9020100: { ignoreAttackSpeed: true }, // Racial buff 1
		9030100: { ignoreAttackSpeed: true }, // Racial buff 2
		9100100: { ignoreAttackSpeed: true } // Apex Urgency
	},
	0: { // Warrior
		'*': { consumeAbnormal: 104110 },
		1: { // Combo Attack
			'*': { noInterrupt: [1] },
			0: true,
			1: true,
			2: true,
			3: true
		},
		2: { // Evasive Roll
			0: {
				forceClip: true,
				stamina: 500,
				instantStamina: true,
				noInterrupt: [2, 10],
			}
		},
		3: { // Torrent of Blows
			0: true
		},
		4: { // Rain of Blows
			0: {
				noInterrupt: [1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 16, 17, 19, 22, 23, 28, 29, 30, 31, 34, 35, 36, 37, 38, 39, 41, 42],
				categoryChains: { 550: 30 }
			},
			30: true
		},
		5: { // Battle Cry
			0: true
		},
		8: { // Assault Stance
			0: { stamina: 1000 },
			50: true
		},
		9: { // Defensive Stance
			0: { stamina: 1000 },
			50: true
		},
		10: { // Death From Above
			0: { noInterrupt: [2, 10] }
		},
		11: { // Poison Blade
			0: true
		},
		12: { // Leaping Strike
			0: true
		},
		13: { // Retaliate
			0: false
		},
		16: { // Charging Slash
			0: {
				ignoreAttackSpeed: true,
				length: 1100,
				distance: 467.88,
				noRetry: true
			},
			1: { noInterrupt: [2, 10, '16-1', 32, 40, 41] }
		},
		17: { // Vortex Slash
			0: true,
			1: true,
			2: true
		},
		18: { // Combative Strike
			0: true,
			1: true,
			2: true
		},
		19: { // Rising Fury
			'*': { noInterrupt: [19] },
			0: true,
			1: true
		},
		20: { // Deadly Gamble
			0: {
				ignoreAttackSpeed: true,
				cooldownEnd: 300
			}
		},
		21: { // Cascade of Stuns
			0: true
		},
		22: { // Backstab
			0: {
				distance: 0,
				onlyTarget: true
			}
		},
		23: { // Spinning Counter
			0: { requiredBuff: 100700 }
		},
		24: { // Smoke Aggressor
			0: { ignoreAttackSpeed: true }
		},
		25: { // Command: Attack
			0: {
				ignoreAttackSpeed: true,
				requiredBuff: 102600
			}
		},
		26: { // Command: Follow
			0: {
				ignoreAttackSpeed: true,
				requiredBuff: 102600
			}
		},
		28: { // Traverse Cut
			'*': {
				noInterrupt: [1, 2, 3, 4, 8, 9, 10, 13, 16, 17, 19, 21, 22, 28, 29, 30, 31, 32, 34, 35, 36, 37, 38, 39, 41, 42],
				hasChains: true
			},
			0: {
				categoryChains: {
					1011: 30,
					1012: 30,
					1018: 30,
					1040: 30
				}
			},
			30: true
		},
		29: { // Blade Draw
			'*': { hasChains: true }, // ??????!?!?!
			0: {
				noInterrupt: [1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, '16-0', 18, '19-0', 21, 22, 23, 29, 30, 31, 34, 35, 36, 37, 38, 41, 42],
				interruptibleWithAbnormal: { 102010: 3 },
				categoryChains: {
					1032: 30,
					550: 30
				}
			},
			30: true
		},
		30: { // Scythe
			'*': { hasChains: true },
			0: {
				noInterrupt: [1, 3, 5, 8, 9, 10, 13, 16, 17, 18, 19, 21, 22, 23, 28, 30, 31, 34, 35, 38, 39, 41, 42],
				categoryChains: {
					1002: 30,
					1004: 30,
					1011: 30,
					1012: 30,
					1029: 30,
					1040: 30
				}
			},
			30: true
		},
		31: { // Reaping Slash
			'*': {
				noInterrupt: [1, 2, 3, 5, 8, 9, 10, 11, 12, 13, 16, 17, 19, 21, 22, 23, 28, 29, 30, 33, 34, 35, 37, 38, 39, 41, 42],
				hasChains: true
			},
			0: { categoryChains: { 550: 30 } },
			30: true
		},
		32: { // Cross Parry
			0: {
				ignoreAttackSpeed: true,
				requiredBuff: [100200, 100201],
				stamina: 50
			}
		},
		34: { // Binding Sword
			0: { noInterrupt: [1, 2, 3, 4, 5, 10, 11, 12, 13, 16, 17, 18, 19, 20, 21, 22, 23, 28, 29, 30, 31, 33, 34, 35, 36, 37, 38, 39, 41, 42] }
		},
		35: { // Infuriate
			0: { requiredBuff: [100200, 100201] }
		},
		36: { // Rain of Blows (Deadly Gamble)
			'*': { hasChains: true },
			0: { categoryChains: { 550: 30 } },
			30: true
		},
		37: { // Blade Draw (Deadly Gamble)
			'*': { hasChains: true },
			0: {
				categoryChains: {
					1032: 30,
					550: 30
				}
			},
			30: true
		},
		38: { // Scythe (Deadly Gamble)
			'*': { hasChains: true },
			0: {
				categoryChains: {
					1002: 30,
					1004: 30,
					1011: 30,
					1012: 30,
					1029: 30,
					1040: 30
				}
			},
			30: true
		},
		39: { // Traverse Cut (Defensive Stance)
			'*': { hasChains: true },
			0: {
				categoryChains: {
					1011: 30,
					1012: 30,
					1018: 30,
					1040: 30
				}
			},
			30: true
		},
		40: { // Blade Waltz
			'*': {
				noInterrupt: ['41-0', '41-30', 42],
				hasChains: true,
				longRetry: true
			},
			10: {
				triggerAbnormal: { 104101: 800 },
				categoryChains: { 560: 11 },
				noRetry: true
			},
			11: { triggerAbnormal: { 104101: 800 } },
			12: true,
			20: {
				triggerAbnormal: { 104101: 800 },
				categoryChains: { 560: 21 },
				noRetry: true
			},
			21: { triggerAbnormal: { 104101: 800 } },
			22: true
		},
		41: { // Aerial Scythe
			'*': {
				noInterrupt: ['41-31', 42],
				hasChains: true,
				noRetry: true
			},
			0: {
				triggerAbnormal: { 105100: 1800 },
				categoryChains: { 560: 30 }
			},
			30: { triggerAbnormal: { 105100: 1800 } },
			31: { consumeAbnormal: 105100 }
		},
		42: { // Blade Frenzy
			'*': {
				hasChains: true,
				noInterrupt: [1, 3, 4, 5, 8, 9, 10, 11, 12, 13, 16, 17, 18, 19, 21, 22, 23, 28, 29, 31, 32, 33, 34, 35, 36, 37, 39, '41-0', '41-30', 42]
			},
			0: {
				categoryChains: {
					1002: 30,
					1030: 30,
					2041: 30
				}
			},
			30: true
		}
	},
	1: { // Lancer
		1: { // Combo Attack
			'*': { noInterrupt: [1] },
			0: true,
			1: true,
			2: true
		},
		2: { // Stand Fast
			'*': {

				ignoreAttackSpeed: true,
				stamina: 50,
				noRetry: true,
				level: { 1: { stamina: 40 } }
			},
			0: true,
			30: true,
			40: { level: { 1: { stamina: 37 } } }
		},
		3: { // Onslaught
			'*': { noInterrupt: [3, 4, 8, 9, 10, 11, 12, 13, 15, 21, 23, 24, 25, 26, 27, 28, 29] },
			0: {
				chains: {
					1: 30,
					5: 30,
					18: 30
				}
			},
			30: true
		},
		4: { // Challenging Shout
			'*': { noInterrupt: [4, 9, 12, 23, 24, 26] },
			0: {
				chains: {
					1: 30,
					3: 30,
					5: 30,
					8: 30,
					10: 30,
					13: 30,
					15: 30,
					18: 30,
					21: 30,
					25: 30,
					28: 30
				}
			},
			30: true
		},
		5: { // Shield Bash
			1: true,
			2: { chains: { 10: 30 } },
			30: true
		},
		7: { // Guardian Shout
			0: true
		},
		8: { // Shield Counter
			0: { onlyDefenceSuccess: true }
		},
		9: { // Leash
			0: true
		},
		10: { // Debilitate
			'*': {
				triggerAbnormal: { 201830: 2000 },
				consumeAbnormalEnd: 201830,
				noInterrupt: [3, 4, 5, 8, 9, 10, 11, 12, 13, 15, 21, 23, 24, 25, 26, 27, 28, 29]
			},
			0: {
				chains: {
					1: 30,
					18: 30
				}
			},
			30: true
		},
		11: { // Retaliate
			0: false
		},
		12: { // Infuriate
			0: true
		},
		13: { // Spring Attack
			'*': {
				triggerAbnormal: { 201831: 2000 },
				consumeAbnormalEnd: 201831
			},
			0: {
				noInterrupt: ['1-0', '1-1', 3, 4, 9, 11, 12, 13, 15, 23, 24, 25, 26, 27, 28, 29],
				chains: {
					1: 30,
					5: 30,
					8: 30,
					10: 30,
					18: 30,
					21: 30
				}
			},
			30: true
		},
		15: { // Charging Lunge
			0: {
				ignoreAttackSpeed: true,
				length: 1125,
				distance: 474.5,
			},
			1: { noInterrupt: [2, '15-1', 25, 28] }
		},
		16: { // Second Wind
			0: { ignoreAttackSpeed: true }
		},
		17: { // Adrenaline Rush
			0: { ignoreAttackSpeed: true }
		},
		18: { // Shield Barrage
			'*': {
				triggerAbnormal: { 201831: 2000 },
				consumeAbnormalEnd: 201831,
				noInterrupt: [18]
			},
			0: true,
			1: true
		},
		19: { // Pledge of Protection
			0: { ignoreAttackSpeed: true }
		},
		21: { // Lockdown Blow
			1: true,
			2: {
				chains: {
					10: 30,
					13: 30,
					18: 30
				}
			},
			30: true
		},
		22: { // Iron Will
			0: { ignoreAttackSpeed: true }
		},
		23: { // Master's Leash
			0: { requiredBuff: 201000 }
		},
		24: { // Chained Leash
			'*': { consumeAbnormal: 201803 },
			1: true,
			2: true
		},
		25: { // Wallop
			0: {
				noInterrupt: [1, 3, 4, 5, 9, 11, 12, 23, 24, 25, 26, 27, 28, 29],
				chains: {
					8: 30,
					10: 30,
					13: 30,
					15: 30,
					18: 30,
					21: 30
				}
			},
			30: true
		},
		26: { // Backstep
			0: {
				moveDir: 1,
				forceClip: true,
				stamina: 800,
				instantStamina: true,
				noInterrupt: [26]
			}
		},
		27: { // Rallying Cry
			0: true
		},
		28: { // Super Leap
			0: {
				noInterrupt: [1, 3, 4, 5, 8, 9, 10, 12, 13, 18, 21, 23, 24, 26, 28, 29],
				forceClip: true,
				chains: {
					15: 1,
					25: 1
				}
			},
			1: true
		},
		29: { // Guardian's Barrier
			0: {
				ignoreAttackSpeed: true,
				noRetry: true
			}
		},
		30: { // Divine Protection
			0: true
		}
	},
	2: { // Slayer
		1: { // Combo Attack
			'*': { noInterrupt: [1] },
			0: true,
			1: true,
			2: true,
			3: true
		},
		2: { // Knockdown Strike
			'*': { consumeAbnormal: 23220 },
			1: true,
			2: {
				noInterrupt: [1, 2, 3, 4, 6, 8, 9, 10, 12, 13, 15, 16, 17, 18, 21, 22, 23, 24, 25, 26, '28-1', '28-2', '28-3', 30, 31],
				chains: { 14: 30, 27: 30 }
			},
			30: true
		},
		3: { // Whirlwind
			0: true,
			1: true,
			2: {
				interruptAllWithAbnormal: { 301604: 3 },
				noInterrupt: [1, 2, 3, 4, 6, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25, 26, 27, 28, 30, 31],
				abnormals: { 301604: { chain: 30 } },
				chains: { 27: 30 },

			},
			30: { requiredBuff: 301604 }
		},
		4: { // Evasive Roll
			'*': {
				noInterrupt: [4],
				forceClip: true,
				hasChains: true
			},
			0: { abnormalChains: { 301200: 30 } },
			30: true
		},
		5: { // Dash
			0: { ignoreAttackSpeed: true }
		},
		6: { // Backstab
			0: {
				distance: 0,
				onlyTarget: true
			}
		},
		8: { // Overhand Strike
			0: {
				length: 3375.7,
				interruptAllWithAbnormal: { 301604: null },
				noInterrupt: ['1-0', '1-1', '1-2', 4, 6, 8, 10, '14-0', '14-1', 17, 18, 21, 23, 25, 26, '28-1', '28-2', '28-3', 30, 31],
				abnormals: { 301604: { chain: 30 } },
				chains: {
					1: 30,
					2: 30,
					3: 30,
					9: 30,
					12: 30,
					13: 30,
					14: 30,
					15: 30,
					16: 30,
					24: 30,
					27: 30
				}
			},
			30: true
		},
		9: { // Leaping Strike
			0: true
		},
		10: { // Retaliate
			0: false
		},
		12: { // Heart Thrust
			'*': { consumeAbnormalEnd: [23060, 23061] },
			0: true,
			1: true,
			2: {
				interruptAllWithAbnormal: { 301604: 12 },
				noInterrupt: [1, 2, 3, 4, 6, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25, 26, 27, 28, 30, 31],
				abnormals: { 301604: { chain: 30 } },
				chains: { 27: 30 },
			},
			30: { requiredBuff: 301604 }
		},
		13: { // Stunning Backhand
			0: true
		},
		14: { // Distant Blade
			'*': {
				triggerAbnormal: { 23220: 2000 },
				consumeAbnormalEnd: 23220
			},
			0: true,
			1: true,
			2: true
		},
		15: { // Startling Kick
			0: {
				moveDir: 1,
				forceClip: true
			}
		},
		16: { // Fury Strike
			0: true
		},
		17: { // Headlong Rush
			0: {
				ignoreAttackSpeed: true,
				length: 1000,
				distance: 413
			}
		},
		18: { // Overpower
			'*': { noInterrupt: [1, 2, 3, 4, 6, 8, 9, 12, 13, 14, 15, 16, 17, 18, 21, 23, 24, 25, 26, 27, 28, 30, 31] },
			0: true,
			50: true
		},
		/*
		19: { // Tenacity
			0: { ignoreAttackSpeed: true }
		},
		*/
		20: { // In Cold Blood
			0: {
				ignoreAttackSpeed: true,
				triggerAbnormal: { 23220: 2000 },
				consumeAbnormalEnd: 23220
			}
		},
		21: { // Exhausting Blow
			0: true
		},
		23: { // Measured Slice
			0: {
				length: 3691.25,
				interruptAllWithAbnormal: { 301604: 23 },
				noInterrupt: [1, 2, 3, 4, 6, 9, 10, 12, 13, 14, 15, 16, 17, 18, 21, 22, 23, '28-1', '28-2', '28-3', 30, 31],
				abnormals: { 301604: { chain: 30 } },
				chains: {
					8: 30,
					24: 30,
					25: 30,
					26: 30,
					27: 30
				}
			},
			30: true
		},
		24: { // Eviscerate
			0: {
				length: 1941,
				distance: 50,
				interruptAllWithAbnormal: { 301604: 24 },
				noInterrupt: ['1-0', '1-1', '1-2', 4, 6, 10, 14, 16, 17, 18, 21, 22, 23, 24, 26, '28-1', '28-2', '28-3', 30, 31],
				abnormals: { 301604: { chain: 30 } },
				chains: {
					1: 30,
					2: 30,
					3: 30,
					8: 30,
					9: 30,
					12: 30,
					13: 30,
					15: 30,
					25: 30,
					27: 30
				}
			},
			30: true
		},
		26: { // Punishing Blow
			0: {
				length: [1094, 2166, 115],
				distance: [40.51, 122.33, 11.21],
				interruptAllWithAbnormal: { 301604: 26 },
				noInterrupt: [1, 2, 3, 4, 6, 9, 10, 12, 13, 14, 15, 16, 17, 18, 21, 22, 26, '28-1', '28-2', '28-3', 31],
				abnormals: { 301604: { chain: 30 } },
				chains: {
					8: 30,
					23: 30,
					24: 30,
					25: 30,
					27: 30,
					'30-11': 30,
					'30-12': 30,
					'30-20': 30,
					'30-21': 30,
					'30-30': 30,
					'30-31': 30,
					'30-39': 30
				}
			},
			30: true
		},
		27: { // Savage Strike
			'*': {
				noInterrupt: ['27-30', '27-41', '27-51'],
				hasChains: true,
				noRetry: true
			},
			0: {
				triggerAbnormal: {
					301600: 4000,
					301603: 5000,
					301604: 2027 // 2000 + 27
				},
				abnormals: { 301603: { chain: 30 } },
				chains: {
					1: 31,
					2: 31,
					3: 31,
					4: 31,
					5: 31,
					6: 31,
					8: 31,
					9: 31,
					10: 31,
					12: 31,
					13: 31,
					14: 31,
					15: 31,
					16: 31,
					17: 31,
					18: 31,
					19: 31,
					20: 31,
					21: 31,
					22: 31,
					23: 31,
					24: 31,
					25: 31,
					26: 31,
					'28-1': 31,
					'28-2': 31,
					'28-3': 31
				}
			},
			30: {
				length: 627.5,
				distance: 275.6,
				consumeAbnormal: [301600, 301603],
				triggerAbnormal: { 301601: 4000 }
			},
			31: {
				length: [1000, 0],
				distance: [274.8, 0],
				triggerAbnormal: { 301603: 5000 }
			},
			40: {
				abnormals: { 301603: { chain: 41 } },
				length: [1000, 0],
				distance: [274.6, 1],
				chains: {
					1: 42,
					2: 42,
					3: 42,
					4: 42,
					5: 42,
					6: 42,
					8: 42,
					9: 42,
					10: 42,
					12: 42,
					13: 42,
					14: 42,
					15: 42,
					16: 42,
					17: 42,
					18: 42,
					19: 42,
					20: 42,
					21: 42,
					22: 42,
					23: 42,
					24: 42,
					25: 42,
					26: 42,
					'28-1': 42,
					'28-2': 42,
					'28-3': 42
				}
			},
			41: {
				length: 627.5,
				distance: 275.6,
				triggerAbnormal: {
					301601: 4000,
					301604: 2027 // 2000 + 27 
				},
				consumeAbnormal: [300500, 300501, 300502, 300503, 301600, 301603]
			},
			42: {
				abnormals: { 301603: { chain: 41 } },
				length: [1000, 0],
				distance: [274.8, 0]
			},
			50: {
				abnormals: { 301603: { chain: 51 } },
				length: [1000, 0],
				distance: [274.6, 1],
				chains: {
					1: 52,
					2: 52,
					3: 52,
					4: 52,
					5: 52,
					6: 52,
					8: 52,
					9: 52,
					10: 52,
					12: 52,
					13: 52,
					14: 52,
					15: 52,
					16: 52,
					17: 52,
					18: 52,
					19: 52,
					20: 52,
					21: 52,
					22: 52,
					23: 52,
					24: 52,
					25: 52,
					26: 52,
					'28-1': 52,
					'28-2': 52,
					'28-3': 52
				}
			},
			51: {
				length: 627.5,
				distance: 275.6,
				triggerAbnormal: {
					301601: 4000,
					301604: 2027 // 2000 + 27 
				},
				consumeAbnormal: [300500, 300501, 300502, 300503, 301600, 301603]
			},
			52: {
				abnormals: { 301603: { chain: 51 } },
				length: [1000, 0],
				distance: [274.8, 0]
			},
		},
		28: { // Unsheathe
			'*': { noRetry: true },
			0: {
				chargeLevels: [1, 2, 3],
				noInterrupt: [28]
			},
			1: true,
			2: true,
			3: true
		},
		/*
		30: { // Rotation Combo
			10: {
				type: 'charging',
				timeRate: 1,
				length: 1000,
				perfectCharge: 12,
				chargeLevels: [11, 11],
				noInterrupt: 30
			},
			11: {
				length: [875, 2232.5],
				distance: [50, 10],
				triggerAbnormal: {
					302207: 3000,
					302200: 4000
				},
				consumeAbnormal: 302208,
				consumeAbnormalEnd: 302207
			},
			12: {
				length: [700, 1766],
				distance: [50, 10],
				triggerAbnormal: { 
					302207: 3000,
					302200: 4000
				},
				consumeAbnormal: 302208,
				consumeAbnormalEnd: 302207
			},
			20: {
				length: [2100, 1766],
				distance: [165, 19.84],
				9: {
					0: { length: [2100, 1900] },
					5: { length: [2100, 1900] }
				},
				triggerAbnormal: { 
					302207: 3000,
					302200: 4000,
					302201: 4000
				},
				consumeAbnormal: 302200,
				consumeAbnormalEnd: [302207, 302208],
				interruptAllWithAbnormal: { 301604: 30 },
				noInterrupt: [1, 2, 3, 4, 6, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25, 27, '28-1', '28-2', '28-3', '30-20', '30-21', 31],
				abnormals: { 301604: { chain: '31-21' } },
				chains: {
					26: '30-21',
					30: '30-21'
				}
			},
			21: {
				length: [1000, 1328.6],
				distance: [140, 19.84],
				9: { 
					0: { length: [1000, 1357.14] },
					5: { length: [1000, 1357.14] }
				},
				triggerAbnormal: {
					302207: 3000,
					302208: 3000,
					302201: 4000
				},
				consumeAbnormal: 302200,
				consumeAbnormalEnd: [302207, 302208]
			},
			30: {
				length: [2200, 766],
				distance: [195, 27.73],
				triggerAbnormal: {
					302207: 3000,
					302208: 3000,
					302202: 4000
				},
				consumeAbnormal: 302201,
				consumeAbnormalEnd: [302202, 302204, 302207, 302208],
				interruptAllWithAbnormal: { 301604: 30 },
				noInterrupt: [1, 2, 3, 4, 6, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25, 27, '28-1', '28-2', '28-3', '30-30', '30-31', 31],
				abnormals: { 301604: { chain: '31-31' } },
				chains: {
					26: '30-31',
					30: '30-31'
				}
			},
			31: {
				length: [1692.3, 566.2],
				distance: [195, 27.73],
				triggerAbnormal: {
					302207: 3000,
					302208: 3000,
					302202: 4000
				},
				consumeAbnormal: 302201,
				consumeAbnormalEnd: [302202, 302204, 302207, 302208]
			},
			39: { // ?
				length: 2966,
				distance: [195, 27.73],
				triggerAbnormal: {
					302207: 3000,
					302208: 3000,
					302202: 4000
				},
				consumeAbnormal: 302201,
				consumeAbnormalEnd: [302202, 302204, 302207, 302208]
			}
		},
		31: { // Jump Smash
			0: {
				type: 'charging',
				timeRate: 1,
				length: [1000, 0],
				perfectCharge: 31,
				chargeLevels: [30, 30, 30],
				triggerAbnormal: {
					302207: 3000,
					302208: 3000
				},
				noInterrupt: 31
			},
			30: { // diff?
				length: [701.3, 2105.26, 1610.5],
				distance: [36.67, 48.57, 0],
				triggerAbnormal: { 302207: 3000 },
				consumeAbnormal: 302208
			},
			31: {
				length: [561.05, 1684.2, 1268.4],
				distance: [36.67, 48.57, 0],
				triggerAbnormal: { 
					302207: 3000,
					302211: 3000
				},
				consumeAbnormal: 302208,
				consumeAbnormalEnd: 302211
			}
		}
		*/
	},
	3: { // Berserker
		1: { // Combo Attack
			'*': { noInterrupt: [1], noRetry: true },
			0: true,
			1: true,
			2: true,
			3: true
		},
		2: { // Axe Block
			0: { ignoreAttackSpeed: true },
			30: { consumeAbnormal: 401701 },
			31: { ignoreAttackSpeed: true }
		},
		3: { // Thunder Strike
			0: {
				noInterrupt: [2],
				overcharge: 450
			},
			10: { noRetry: true },
			11: { noRetry: true },
			12: { noRetry: true },
			13: { noRetry: true }
		},
		4: { // Flatten
			0: {
				noInterrupt: [1, 2, '3-10', '3-11', '3-12', '3-13', 4, '8-30', '10-10', '10-11', '10-12', 11, '10-13', 13, '15-10', '15-11', '15-12', '15-13', '15-14', 18, 24, 26, 28, 29, 30, '32-0'],
				chains: {
					6: 30,
					25: 30,
					31: 30,
					32: 31,
					34: 30,
					35: 30,
					36: 30,
					37: 30
				}
			},
			1: {
				chains: {
					6: 31,
					25: 31,
					31: 31,
					32: 31
				}
			},
			30: true,
			31: true
		},
		5: { // Dash
			0: { ignoreAttackSpeed: true }
		},
		6: { // Sweeping Strike
			'*': { noRetry: true },
			0: true,
			30: true
		},
		8: { // Fiery Rage
			1: { ignoreAttackSpeed: true },
			30: true
		},
		10: { // Cyclone
			0: {
				overcharge: 365,
				noChargeAbnormalityId: 401701,
				noRetry: true
			},
			10: { noRetry: true },
			11: { noRetry: true },
			12: { noRetry: true },
			13: true
		},
		11: { // Leaping Strike
			0: true
		},
		13: { // Retaliate
			0: false
		},
		15: { // Vampiric Blow
			0: {
				noInterrupt: [2],
				releaseChain: {
					overcharge: true,
					chain: 14
				}
			},
			10: { noRetry: true },
			11: { noRetry: true },
			12: { noRetry: true },
			13: { noRetry: true },
			14: true
		},
		16: { // Fearsome Shout / Titanic Shout
			0: { ignoreAttackSpeed: true },
			10: { ignoreAttackSpeed: true },
			20: { cooldownEnd: 300 }
		},
		18: { // Lethal Strike
			0: {
				noInterrupt: [1, 2, 4, 6, 13, 18, 24, 25, 26, 27, 28, 29, 30, 31, 32, 34, 35, 36, 37],
				chains: {
					// Correct
					/*
					3: 30,
					10: 30,
					11: 30,
					15: 30
					*/

					// Workaround: C_CANCEL_SKILL is not emulated properly for charging skills (TODO)
					'3-10': 30,
					'3-11': 30,
					'3-12': 30,
					'3-13': 30,
					'10-10': 30,
					'10-11': 30,
					'10-12': 30,
					'10-13': 30,
					11: 30,
					'15-10': 30,
					'15-11': 30,
					'15-12': 30,
					'15-13': 30,
					'15-14': 30
				}
			},
			30: true
		},
		19: { // Triumphant Shout
			0: { ignoreAttackSpeed: true }
		},
		20: { // Inescapable Doom
			0: { ignoreAttackSpeed: true }
		},
		21: { // Bloodlust
			0: { ignoreAttackSpeed: true }
		},
		24: { // Evasive Smash
			0: true,
			5: true,
			10: true,
			11: true,
			12: true,
			13: true
		},
		25: { // Raze
			0: { // TODO: ADD Axe block cancel
				noInterrupt: [2, 4, 6, 8 - 30, 11, 13, 24, 25, 26, 27, 28, 29, '32-0', 34, 35, 36, 37],
				interruptibleWithAbnormal: { 401404: 2 },
				chains: {
					1: 30,
					'3-10': 30,
					'3-11': 30,
					'3-12': 30,
					'3-13': 30,
					'10-10': 30,
					'10-11': 30,
					'10-12': 30,
					'10-13': 30,
					'15-10': 30,
					'15-11': 30,
					'15-12': 30,
					'15-13': 30,
					'15-14': 30,
					18: 30,
					30: 31,
					31: 30,
					32: 31
				}
			},
			1: {
				chains: {
					1: 31,
					'3-10': 30,
					'3-11': 30,
					'3-12': 30,
					'3-13': 30,
					'10-10': 30,
					'10-11': 30,
					'10-12': 30,
					'10-13': 30,
					'15-10': 30,
					'15-11': 30,
					'15-12': 30,
					'15-13': 30,
					'15-14': 30,
					18: 30,
					30: 31,
					32: 31
				}
			},
			30: true,
			31: true
		},
		26: { // Tackle
			0: true
		},
		27: { // Unbreakable
			'*': { noInterrupt: [1, 2, '3-10', '3-11', '3-12', '3-13', 4, 6, '8-30', '10-10', '10-11', '10-12', '10-13', 11, 13, '15-10', '15-11', '15-12', '15-13', '15-14', 18, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33] },
			0: {
				interruptibleWithAbnormal: { 401705: 33 },
				chains: {
					34: 30,
					35: 30,
					36: 30,
					37: 30
				}
			},
			30: true
		},
		28: { // Intimiation
			0: true,
			50: true
		},
		29: { // Evasive Roll
			0: {
				noInterrupt: [29],
				forceClip: true
			}
		},
		30: { // Axe Counter
			'*': {
				noInterrupt: [1, '3-10', '3-11', '3-12', '3-13', 4, 6, '8-30', '10-10', '10-11', '10-12', '10-13', 11, 12, 13, '15-10', '15-11', '15-12', '15-13', '15-14', 18, 24, 25, 26, 27, 28, 29, 30, 31, 32, 34, 35, 36, 37],
				requiredBuff: 401402
			},
			0: true,
			30: true
		},
		31: { // Overwhelm
			0: {
				ignoreAttackSpeed: true,
				length: 1115,
				distance: 467.88
			},
			1: { noInterrupt: [2, 4, 10, 25, '31-1'] }
		},
		32: { // Punishing Strike
			'*': { noInterrupt: [32] },
			0: { requiredBuff: 401400 },
			1: true
		},
		33: { // Unleash
			0: true
		},
		34: { // Unleash: Dexter
			'*': {
				requiredBuff: 401705,
				noRetry: true
			},
			0: {
				noInterrupt: [27, 34, 36],
				chains: {
					33: 30,
					35: 30,
					37: 30
				}
			},
			30: true,
			31: true
		},
		35: { // Unleash: Sinister
			'*': {
				requiredBuff: 401705,
				noRetry: true
			},
			0: {
				noInterrupt: [27, 35, 36, 37],
				chains: {
					33: 1,
					34: 30
				}
			},
			1: true,
			30: true,
			31: true
		},
		36: { // Unleash: Rampage
			'*': {
				requiredBuff: 401705,
				noRetry: true
			},
			0: {
				noInterrupt: [27, 37],
				chains: {
					34: 30,
					35: 30,
					36: 30
				}
			},
			30: true,
			31: true
		},
		37: { // Unleash: Beast Fury
			'*': {
				noInterrupt: [16, 37],
				requiredBuff: 401705
			},
			0: {
				chains: {
					27: 30,
					33: 30,
					34: 30,
					35: 30,
					36: 30
				}
			},
			30: true
		}
	},
	4: { // Sorcerer
		1: { // Fireball
			0: true
		},
		2: { // Frost Sphere
			0: true
		},
		3: { // Lightning Trap
			0: true,
		},
		4: { // Arcane Pulse
			0: true,
			10: { noRetry: true },
			11: { noRetry: true },
			12: { noRetry: true }
		},
		5: { // Mana Infusion
			0: true
		},
		6: { // Meteor Strike
			0: true // wrong warp barrier chain due to outdated parse ig
		},
		7: { // Backstep
			0: {
				moveDir: 1,
				forceClip: true,
				noInterrupt: [7]
			}
		},
		8: { // Flame Pillar
			0: true
		},
		10: { // Mana Barrier
			0: true
		},
		11: { // Lightning Strike
			0: { checkReset: true }
		},
		12: { // Void Pulse
			0: true
		},
		13: { // Mindblast
			0: true
		},
		14: { // Retaliate
			0: false
		},
		16: { // Painblast
			0: true
		},
		17: { // Painful Trap
			0: true
		},
		18: { // Glacial Retreat
			0: {
				moveDir: 1,
				forceClip: true
			}
		},
		19: { // Mana Siphon
			0: true,
			10: { noRetry: true },
			11: { noRetry: true },
			12: { noRetry: true }
		},
		20: { // Flaming Barrage
			'*': { noRetry: true },
			0: {
				type: 'lockon',
				ignoreAttackSpeed: true
			},
			10: { type: 'lockonCast' }
		},
		21: { // Nerve Exhaustion
			'*': { noRetry: true },
			0: {
				type: 'lockon',
				ignoreAttackSpeed: true
			},
			10: {
				type: 'lockonCast',
				ignoreAttackSpeed: true
			}
		},
		22: { // Burning Breath
			'*': { noRetry: true },
			0: {
				type: 'lockon',
				ignoreAttackSpeed: true
			},
			10: {
				type: 'lockonCast',
				ignoreAttackSpeed: true
			}
		},
		23: { // Mana Volley
			'*': { noRetry: true },
			0: {
				type: 'lockon',
				ignoreAttackSpeed: true
			},
			10: {
				type: 'lockonCast',
				ignoreAttackSpeed: true
			}
		},
		25: { // Time Gyre
			'*': { noRetry: true },
			0: {
				type: 'lockon',
				ignoreAttackSpeed: true
			},
			10: {
				type: 'lockonCast',
				ignoreAttackSpeed: true
			}
		},
		26: { // Teleport Jaunt
			0: {
				cooldownEnd: 300,
				noRetry: true
			}
		},
		27: { // Hailstorm
			0: true
		},
		30: { // Nova
			0: true
		},
		31: { // Warp Barrier
			10: true,
			20: true
		},
		32: { // Meteor Shower (Mana Boost)
			'*': { noRetry: true },
			0: true,
			50: true
		},
		33: { // Arcane Pulse (Mana Boost)
			'*': { noRetry: true },
			10: true,
			11: true,
			12: true,
			50: true
		},
		34: { // Mana Boost
			0: true
		},
		36: { // Fusion
			'*': { noInterrupt: [1, 2, 3, '4-10', '4-11', '4-12', 5, 6, 7, 8, 10, 11, 12, 13, 14, 16, 17, 18, '19-10', '19-11', '19-12', '20-10', '21-10', '22-10', '23-10', '25-10', 26, 27, 28, 30, 31, 32, '33-10', '33-11', '33-12', '33-50', '33-51', '33-52', 34, 36, 39] },
			0: true,
			//20: true, // TODO: Needs S_SKILL_CATEGORY implementation (always disabled - non-critical)
			30: true
		},
		39: { // Implosion
			0: {
				requiredBuff: 502052,
				distance: [0, 0, -219.55]
			}
		}
	},
	5: { // Archer
		1: { // Arrow
			0: { noInterrupt: [1] }
		},
		2: { // Arrow Volley
			'*': { noRetry: true },
			0: {
				type: 'lockon',
				ignoreAttackSpeed: true
			},
			10: { type: 'lockonCast' }
		},
		3: { // Radiant Arrow
			'*': { moveDir: 1 },
			0: true, //change
			1: { abnormRedirect: 21 },
			10: { noRetry: true },
			11: { noRetry: true },
			12: { noRetry: true },
			13: { noRetry: true },
			21: { //IA Charge
				noRetry: true,
				abnormals: { 603701: { chargeSpeed: 2.1 } }
			},

			30: { noRetry: true }, //IA Release0
			31: { noRetry: true }, //IA Release1
			32: { noRetry: true }, //IA Release2
			33: { noRetry: true } //IA Release3
		},
		4: { // Penetrating Arrow
			'*': { moveDir: 1 },
			0: true, //change
			1: { abnormRedirect: 21 },
			10: { noRetry: true },
			11: { noRetry: true },
			12: { noRetry: true },
			13: { noRetry: true },
			21: { //IA Charge
				noRetry: true,
				abnormals: { 603701: { chargeSpeed: 2.1 } }
			},

			30: { noRetry: true }, //IA Release0
			31: { noRetry: true }, //IA Release1
			32: { noRetry: true }, //IA Release2
			33: { noRetry: true } //IA Release3
		},
		5: { // Rain of Arrows
			'*': { length: 3153.84 }, 
			0: true,
			10: true,
			50: true
		},
		6: { // Backstep
			0: {
				moveDir: 1,
				forceClip: true,
				stamina: 180,
				instantStamina: true,
				noInterrupt: [6],
				noRetry: true
			}
		},
		7: { // Feign Death
			0: {
				ignoreAttackSpeed: true,
				moveDir: 1
			}
		},
		8: { // Rapid Fire
			'*': {
				noRetry: true,
				abnormals: { 602221: { speed: 1.1 } },
				triggerAbnormal: { 600200: 7000 },
			},
			0: { length: [200, 190] },
			2: { length: [160, 160, 280] }
		},
		9: { // Slow Trap
			0: true
		},
		10: { // Stunning Trap
			0: true
		},
		12: { // Velik's Mark
			0: true
		},
		14: { // Retaliate
			0: false
		},
		15: { // Incendiary Trap
			0: true
		},
		16: { // Breakaway Bolt
			0: {
				moveDir: 1,
				forceClip: true
			}
		},
		17: { // Web Arrow
			0: true
		},
		18: { // Close Quarters
			'*': { noInterrupt: [18] },
			0: true,
			1: true
		},
		19: { // Poison Arrow
			0: true
		},
		20: { // Restraining Arrow
			0: true
		},
		22: { // Sequential Fire
			0: {
				noInterrupt: [22],
				requiredBuff: [ 601900, 600200 ],
				consumeAbnormal: [ 601900, 600200 ],
				noRetry: false // this is set false to prevent tb -> sf(hold) skill queue from ghosting. But will spam cannot start skill
			}
		},
		25: { // Incendiary Trap Arrow
			0: true,
			1: true
		},
		29: { // Thunderbolt
			'*': {
				abnormals: { 602221: { speed: 1.3 } },
				triggerAbnormal: { 601900: 8000 },
				distance: -100,
				moveDir: 1
			},
			0: true,
			1: true,
			2: true
		},
		31: { // Tenacity
			0: { ignoreAttackSpeed: true }
		},
		32: { // Find Weakness
			0: true
		},
		33: { // Chase
			0: {
				ignoreAttackSpeed: true,
				length: 1000,
				distance: 413
			}
		},
		34: { // Wind Walk
			'*': {
				length: 666,
				distance: 181.2,
				stamina: 150,
				instantStamina: true,
				noRetry: true
			},
			1: {
				inPlace: {
					animSeq: [{
						duration: 766,
						xyRate: 1,
						zRate: 1,
						distance: 0
					}],
					distance: 0
				}
			},
			2: {
				inPlace: {
					animSeq: [{
						duration: 766,
						xyRate: 1,
						zRate: 1,
						distance: 0
					}],
					distance: 0
				}
			},
			3: {
				inPlace: {
					animSeq: [{
						duration: 766,
						xyRate: 1,
						zRate: 1,
						distance: 0
					}],
					distance: 0
				}
			},
			10: true,
			20: { moveDir: -0.5 },
			30: { moveDir: -0.25 },
			40: { moveDir: -0.75, distance: 176.47 },
			50: { moveDir: 0.5 },
			60: { moveDir: 0.25, distance: 187 },
			70: { moveDir: 0.75, distance: 187 },
			80: { moveDir: 1, distance: 120 },
			12: true,
			22: { moveDir: -0.5 },
			32: { moveDir: -0.25 },
			42: { moveDir: -0.75, distance: 176.47 },
			52: { moveDir: 0.5 },
			62: { moveDir: 0.25, distance: 187 },
			72: { moveDir: 0.75, distance: 187 },
			82: { moveDir: 1, distance: 120 }
		},
		35: { // Windsong
			0: true,
			30: true,
			40: true,
		},
		36: { // Gust Arrow
			0: { chargeLevels: [null, 360213] },
			13: { noRetry: true }
		},
		37: { // Illusion Arrow
			0: { 
				length: 1500,
				distance: -8
			}
		},
		38: { // Illusion Explosion
			0: {
				length: [4259, 1141],
				distance: [75, -75]
			}
		}
	},
	6: { // Priest
		'*': { consumeAbnormal: 806104 },
		1: { // Divine Radiance
			'*': { noInterrupt: [1] },
			0: true,
			1: true,
			2: true,
			3: true
		},
		2: { // Regeneration Circle
			0: true
		},
		3: { // Healing Circle
			0: {
				noInterrupt: [2, 3, 5, 10, 12, 11, 14, 16, 18, 25, 27, 28, '30-10', '33-10', 34, '35-10', '37-10', '41-10', 42],
				chains: {
					'19-30': 30,
					26: 30,
					38: 30
				}
			},
			30: true
		},
		5: { // Blessing of Shakan, Seren, Balder, Zenobia and Arachne
			0: true
		},
		6: { // Arise
			0: true
		},
		8: { // Mana Infusion
			0: true
		},
		10: { // Purifying Circle
			0: true
		},
		11: { // Metamorphic Blast
			'*': { triggerAbnormal: { 806104: 1480 } },
			0: true,
			1: true,
			2: true,
			80: false
		},
		12: { // Resurrect
			0: true
		},
		14: { // Summon: Group
			0: true
		},
		16: { // Shocking Implosion
			'*': {
				triggerAbnormal: { 806104: 1480 },
				noInterrupt: [2, 3, 5, 10, 12, 14, 16, 18, '19-10', 25, 26, 28, 29, '30-10', '33-10', 34, '35-10', '37-10', 38, 40, '41-10', 42]
			},
			0: {
				chains: {
					11: 30,
					27: 30
				}
			},
			10: {
				chains: {
					11: 11,
					27: 11
				}
			},
			11: true,
			20: {
				chains: {
					11: 21,
					27: 21
				}
			},
			21: true,
			30: true
		},
		18: { // Heal Thyself
			0: true
		},
		19: { // Focus Heal
			'*': { noRetry: true },
			0: {
				type: 'lockon',
				ignoreAttackSpeed: true
			},
			10: {
				type: 'lockonCast',
				level: {
					29: {
						ignoreAttackSpeed: true,
						cooldownEnd: 100 // Workaround: Fixes ghosting while on CD - TODO: Enable global cooldown checks
					},
					30: {
						ignoreAttackSpeed: true,
						cooldownEnd: 100 // Workaround: Fixes ghosting while on CD - TODO: Enable global cooldown checks
					}
				}
			}
		},
		22: { // Kaia's Shield
			0: true
		},
		25: { // Retaliate
			0: false
		},
		26: { // Fiery Escape
			0: {
				noInterrupt: [26, '28-10', '28-11', '28-12', '28-13', 34, 38],
				moveDir: 1,
				forceClip: true
			}
		},
		27: { // Final Reprisal
			'*': { noInterrupt: [2, 3, 5, 10, 12, 14, 18, '19-10', 25, 26, 27, 28, '30-10', '33-10', 34, '35-10', '37-10', 38, '41-10', 42] },
			0: {
				abnormals: { 806104: { chain: 30 } },
				chains: {
					11: 30,
					16: 30,
					29: 30,
					40: 30
				}
			},
			10: {
				abnormals: { 806104: { chain: 11 } },
				chains: {
					11: 11,
					16: 11,
					29: 11,
					40: 11
				}
			},
			11: true,
			20: {
				abnormals: { 806104: { chain: 21 } },
				chains: {
					11: 21,
					16: 21,
					29: 21,
					40: 21
				}
			},
			21: true,
			30: true
		},
		28: { // Mana Charge / Divine Charge
			0: true,
			10: { noRetry: true },
			11: { noRetry: true },
			12: { noRetry: true },
			13: { noRetry: true }
		},
		29: { // Triple Nemesis
			'*': { triggerAbnormal: { 806104: 1480 } },
			0: true,
			1: true,
			2: true
		},
		30: { // Plague of Exhaustion
			'*': {
				ignoreAttackSpeed: true,
				noRetry: true
			},
			0: { type: 'lockon' },
			10: { type: 'lockonCast' }
		},
		31: { // Guardian Sanctuary
			0: { ignoreAttackSpeed: true }
		},
		32: { // Divine Prayer
			0: { ignoreAttackSpeed: true }
		},
		33: { // Ishara's Lulliby
			'*': {
				ignoreAttackSpeed: true,
				noRetry: true
			},
			0: { type: 'lockon' },
			10: { type: 'lockonCast' }
		},
		34: { // Restorative Burst
			0: true
		},
		35: { // Energy Stars
			'*': {
				ignoreAttackSpeed: true,
				noRetry: true
			},
			0: { type: 'lockon' },
			10: { type: 'lockonCast' }
		},
		37: { // Healing Immersion
			'*': {
				ignoreAttackSpeed: true,
				noRetry: true
			},
			0: {
				type: 'lockon',
				noInterrupt: [37],
				partyOnly: true
			},
			10: {
				type: 'lockonCast',
				noInterrupt: ['37-10']
			}
		},
		38: { // Backstep
			0: {
				moveDir: 1,
				noInterrupt: [26, 38],
				forceClip: true
			}
		},
		39: { // Grace of Resurrection
			0: true
		},
		40: { // Zenobia's Vortex
			'*': { triggerAbnormal: { 806140: 1480 } },
			0: true,
			10: true,
			20: true
		},
		41: { // Divine Intervention / Mass Divine Intervention
			'*': { noRetry: true },
			0: {
				type: 'lockon',
				ignoreAttackSpeed: true,
				partyOnly: true
			},
			10: { type: 'lockonCast' }
		},
		/*42: { // Holy Burst
			20: true,
			30: true
		},*/
		43: { // Edict of Judgement
			0: true,
			50: true
		}
	},
	7: { // Mystic
		1: { // Sharan Bolt
			0: true,
			1: true,
			2: true,
			3: true
		},
		2: { // Corruption Ring
			0: { cancelChain: 11 },
			11: true,
			12: true
		},
		5: { // Titanic Favor
			'*': { noRetry: true },
			0: {
				type: 'lockon',
				ignoreAttackSpeed: true
			},
			10: {
				type: 'lockonCast',
				level: {
					29: { // Velocity
						ignoreAttackSpeed: true,
						cooldownEnd: 100 // Workaround: Fixes ghosting while on CD - TODO: Enable global cooldown checks
					},
					30: { // Downfall
						ignoreAttackSpeed: true,
						cooldownEnd: 100 // Workaround: Fixes ghosting while on CD - TODO: Enable global cooldown checks
					}
				}
			}
		},
		6: { // Shara's Lash
			0: true
		},
		7: { // Mana Infusion
			0: true
		},
		8: { // Metamorphic Blast
			0: {
				noInterrupt: [1, 2, 4, '5-10', 6, '9-10', 10, 13, 14, 15, 16, 17, 21, '18-10', '22-10', 37, '41-10', 43, 48],
				checkReset: true,
				chains: {
					8: 30,
					23: 30
				}
			},
			30: true
		},
		9: { // Arun's Cleansing
			'*': { noRetry: true },
			0: {
				type: 'lockon',
				ignoreAttackSpeed: true
			},
			10: { type: 'lockonCast' }
		},
		10: { // Resurrect
			0: true
		},
		11: { // Summon: Group
			0: true
		},
		12: { // Vow of Rebirth
			'*': { noRetry: true },
			0: {
				type: 'lockon',
				ignoreAttackSpeed: true,
				partyOnly: true
			},
			10: { type: 'lockonCast' }
		},
		13: { // Aura of the Merciless
			0: true,
			50: true
		},
		14: { // Aura of the Swift
			0: true,
			50: true
		},
		15: { // Aura of the Unyielding
			0: true,
			50: true
		},
		16: { // Aura of the Tenacious
			0: true,
			50: true
		},
		17: { // Teleport Jaunt
			0: {
				noInterrupt: [17],
				cooldownEnd: 300,
				noRetry: true
			}
		},
		18: { // Arun's Vitae
			0: {
				chargeLevels: [10, 10],
				noInterrupt: [18],
				noRetry: true
			},
			10: {
				noRetry: true,
				noInterrupt: ['18-10']
			}
		},
		21: { // Retaliate
			0: false
		},
		22: { // Arun's Tears
			0: {
				chargeLevels: [10, 10],
				noRetry: true
			},
			10: { noRetry: true }
		},
		23: { // Metamorphic Smite
			0: {
				noInterrupt: [1, 2, 4, '5-10', 6, '9-10', 10, 13, 14, 15, 16, 17, '18-10', 21, '22-10', 23, 37, '41-10', 43, 48],
				chains: { 8: 30 }
			},
			30: true
		},
		24: { // Volley of Curses
			'*': {
				ignoreAttackSpeed: true,
				noRetry: true
			},
			0: { type: 'lockon' },
			10: { type: 'lockonCast' }
		},
		25: { // Thrall of Protection
			'*': {
				ignoreAttackSpeed: true,
				cooldownEnd: 300
			},
			0: true,
			10: true,
			30: true
		},
		27: { // Thrall of Life
			'*': {
				ignoreAttackSpeed: true,
				cooldownEnd: 300
			},
			0: true,
			10: true,
			30: true
		},
		28: { // Sonorous Dreams
			'*': {
				ignoreAttackSpeed: true,
				noRetry: true
			},
			0: { type: 'lockon' },
			10: { type: 'lockonCast' }
		},
		29: { // Regression
			0: { ignoreAttackSpeed: true }
		},
		30: { // Curse of Exhaustion
			'*': {
				ignoreAttackSpeed: true,
				noRetry: true
			},
			0: { type: 'lockon' },
			10: { type: 'lockonCast' }
		},
		31: { // Curse of Confusion
			'*': {
				ignoreAttackSpeed: true,
				noRetry: true
			},
			0: { type: 'lockon' },
			10: { type: 'lockonCast' }
		},
		32: { // Mire
			'*': {
				ignoreAttackSpeed: true,
				noRetry: true
			},
			0: { type: 'lockon' },
			10: { type: 'lockonCast' }
		},
		33: { // Thrall of Vengeance
			'*': {
				ignoreAttackSpeed: true,
				cooldownEnd: 300
			},
			0: true,
			10: true,
			30: true
		},
		34: { // Thrall of Wrath
			'*': {
				ignoreAttackSpeed: true,
				cooldownEnd: 300
			},
			0: true,
			10: true,
			30: true
		},
		35: { // Command: Attack
			0: { ignoreAttackSpeed: true }
		},
		36: { // Command: Follow
			0: { ignoreAttackSpeed: true }
		},
		37: { // Warding Totem
			0: true
		},
		41: { // Contagion
			'*': { noRetry: true },
			0: {
				type: 'lockon',
				ignoreAttackSpeed: true
			},
			10: { type: 'lockonCast' }
		},
		42: { // Boomerang Pulse
			0: {
				noInterrupt: [42],
				cooldownEnd: 300
			}
		},
		43: { // Unsummon Thrall
			0: true
		},
		44: { // Mass Teleport
			0: {
				noInterrupt: [17],
				cooldownEnd: 300,
				noRetry: true
			}
		},
		45: { // Thrall Augmentation
			0: true,
			50: true
		},
		47: { // Arunic Release
			0: true
		},
		48: { // Thrall Lord
			0: { ignoreAttackSpeed: true }
		}
	},
	8: { // Reaper
		'*': { consumeAbnormal: [10151020, 10151021, 10151022, 10151023, 10151040, 10151041, 10151042] },
		1: { // Spiral Barrage
			'*': {
				noInterrupt: [3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 18, 19, 20, 21, 23, 40],
				inPlace: {
					animSeq: [{
						duration: 766,
						xyRate: 1,
						zRate: 1,
						distance: 0
					},
					{
						duration: 346,
						xyRate: 1,
						zRate: 1,
						distance: 0
					}],
					distance: 0
				},
				noRetry: true
			},
			0: {
				triggerAbnormal: { 10151020: 2000 },
				categoryChains: { 90001: 1 }
			},
			1: { triggerAbnormal: { 10151020: 2000 } },
			2: {
				inPlace: {
					animSeq: [{
						duration: 950,
						xyRate: 1,
						zRate: 1,
						distance: 0
					},
					{
						duration: 346,
						xyRate: 1,
						zRate: 1,
						distance: 0
					}],
					distance: 0
				},
				triggerAbnormal: { 10151021: 2000 }
			},
			3: {
				inPlace: {
					animSeq: [{
						duration: 616,
						xyRate: 1,
						zRate: 1,
						distance: 0
					},
					{
						duration: 346,
						xyRate: 1,
						zRate: 1,
						distance: 0
					}],
					distance: 0
				},
				triggerAbnormal: { 10151022: 1800 }
			},
			4: {
				inPlace: {
					animSeq: [{
						duration: 1150,
						xyRate: 1,
						zRate: 1,
						distance: 0
					},
					{
						duration: 346,
						xyRate: 1,
						zRate: 1,
						distance: 0
					}],
					distance: 0
				},
				triggerAbnormal: { 10151023: 2000 }
			},
			5: {
				inPlace: {
					animSeq: [{
						duration: 2016,
						xyRate: 1,
						zRate: 1,
						distance: 0
					}],
					distance: 0
				}
			}
		},
		3: { // Double Shear
			'*': {
				noInterrupt: ['1-0', '1-2', 3, 4, 12, 13, 14, 15, 18, 19, 20, 21, 23, 40],
				inPlace: {
					animSeq: [{
						duration: 2140,
						xyRate: 1,
						zRate: 1,
						distance: 0
					}],
					distance: 0
				}
			},
			0: {
				chains: {
					1: 30,
					5: 30,
					6: 30,
					8: 30,
					9: 30,
					10: 30,
					11: 30
				}
			},
			30: true,
			40: {
				chains: {
					1: 41,
					5: 41,
					6: 41,
					8: 41,
					9: 41,
					10: 41,
					11: 41
				}
			},
			41: true
		},
		4: { // Sundering Strike
			'*': {
				noInterrupt: [1, 4, 8, 9, 10, 11, '12-0', '12-1', 20],
				noRetry: true
			},
			0: {
				chains: {
					1: 30,
					3: 30,
					4: 30,
					5: 30,
					6: 30,
					8: 30,
					9: 30,
					10: 30,
					11: 30,
					12: 30
				},
				inPlace: {
					animSeq: [
						[],
						[{
							duration: 1757,
							xyRate: 1,
							zRate: 1,
							distance: 0
						}],
						[]
					],
					distance: [0, 0, 0]
				}
			},
			30: {
				connectSkillArrow: true,
				inPlace: {
					animSeq: [
						[{
							duration: 1757,
							xyRate: 1,
							zRate: 1,
							distance: 0
						}],
						[]
					],
					distance: [0, 0]
				},
				noRetry: true
			},
			31: {
				inPlace: {
					animSeq: [
						[{
							duration: 1757,
							xyRate: 1,
							zRate: 1,
							distance: 0
						}],
						[]
					],
					distance: [0, 0]
				}
			},
			40: {
				chains: {
					1: 60,
					3: 60,
					4: 60,
					5: 60,
					6: 60,
					8: 60,
					9: 60,
					10: 60,
					11: 60,
					12: 60
				},
				inPlace: {
					animSeq: [
						[],
						[{
							duration: 1757,
							xyRate: 1,
							zRate: 1,
							distance: 0
						}],
						[]
					],
					distance: [0, 0, 0]
				}
			},
			60: {
				connectSkillArrow: true,
				inPlace: {
					animSeq: [
						[{
							duration: 1757,
							xyRate: 1,
							zRate: 1,
							distance: 0
						}],
						[]
					],
					distance: [0, 0]
				},
				noRetry: true
			},
			61: {
				inPlace: {
					animSeq: [
						[{
							duration: 1757,
							xyRate: 1,
							zRate: 1,
							distance: 0
						}],
						[]
					],
					distance: [0, 0]
				}
			}
		},
		5: { // Grim Strike
			'*': {
				inPlace: {
					animSeq: [
						[{
							duration: 2416,
							xyRate: 1,
							zRate: 1,
							distance: 0
						}],
						[{
							duration: 1065,
							xyRate: 1,
							zRate: 1,
							distance: 0
						}]
					],
					distance: [0, 0]
				}
			},
			0: {
				noInterrupt: ['1-0', '1-2', 4, 12, 13, 14, 15, 18, 20, 23, 40],
				chains: {
					1: 30,
					3: 30,
					5: 30,
					6: 30,
					8: 30,
					9: 30,
					10: 30,
					11: 30,
					19: 30,
					21: 30
				}
			},
			30: true,
			31: {
				chains: {
					1: 32,
					3: 32,
					5: 32,
					6: 32,
					8: 32,
					9: 32,
					10: 32,
					11: 32,
					19: 32,
					21: 32
				}
			},
			32: true
		},
		6: { // Death Spiral
			'*': { noRetry: true },
			0: {
				noInterrupt: ['6-31', 19, 21, 23],
				chains: {
					1: 30,
					3: 30,
					4: 30,
					5: 30,
					8: 30,
					9: 30,
					10: 30,
					11: 30,
					12: 30,
					13: 30,
					14: 30
				}
			},
			30: true,
			31: true,
			40: {
				chains: {
					1: 41,
					3: 41,
					4: 41,
					5: 41,
					6: 41,
					8: 41,
					9: 41,
					10: 41,
					11: 41,
					12: 41,
					13: 41,
					14: 41
				}
			},
			41: true,
			42: true
		},
		8: { // Whipsaw
			'*': { noInterrupt: [4, 5, 6, 8, 9, 11, 12, 13, 14, 15, 18, 19, 20, 21, 23, 40] },
			0: {
				chains: {
					1: 30,
					3: 30,
					10: 30
				}
			},
			30: true,
			40: {
				chains: {
					1: 41,
					3: 41,
					10: 41
				}
			},
			41: true
		},
		9: { // Smite
			'*': {
				distance: 168,
				inPlace: {
					animSeq: [{
						duration: 1832,
						xyRate: 1,
						zRate: 1,
						distance: 0
					}],
					distance: 0
				},
				noInterrupt: [1, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 18, 19, 20, 21, 23, 40]
			},
			0: true,
			30: true
		},
		10: { // Pendulum Strike
			'*': {
				noInterrupt: [10, 19, 21, 23],
				moveDir: 1
			},
			0: {
				chains: {
					1: 30,
					3: 30,
					4: 30,
					5: 30,
					6: 30,
					8: 30,
					9: 30,
					11: 30,
					12: 30,
					13: 30,
					14: 30,
					40: 30
				}
			},
			30: true,
			40: {
				chains: {
					1: 41,
					3: 41,
					4: 41,
					5: 41,
					6: 41,
					8: 41,
					9: 41,
					10: 41,
					11: 41,
					12: 41,
					13: 41,
					14: 41,
					40: 41
				}
			},
			41: true
		},
		11: { // Shadow Lash
			'*': {
				noInterrupt: [1, 3, 4, 5, 6, 8, 9, 10, '11-3', 12, 13, 14, 15, 18, 19, 20, 21, 23, 40],
				noRetry: true
			},
			0: { triggerAbnormal: { 10151040: 2000 } },
			1: { triggerAbnormal: { 10151041: 2000 } },
			2: { triggerAbnormal: { 10151042: 2000 } },
			3: true
		},
		12: { // Shadow Burst
			0: {
				noInterrupt: [1, 3, '4-0', '4-30', '4-40', '4-60', 5, 6, 8, 9, 10, 11, 20],
				chains: { 12: 1 }
			},
			1: true,
			31: true
		},
		14: { // Retaliate
			0: false
		},
		15: { // Retribution
			30: { ignoreAttackSpeed: true },
			81: true
		},
		16: { // Shadow Reaping
			0: {
				ignoreAttackSpeed: true,
				noInterrupt: [16],
			}
		},
		19: { // Dark Harvest
			'*': {
				triggerAbnormal: {
					10151250: 3000,
					10151230: 10000
				},
				requiredBuff: 10151220,
				consumeAbnormalEnd: 10151230,
				inPlace: {
					animSeq: [{
						duration: 2122,
						xyRate: 1,
						zRate: 1,
						distance: 0
					}],
					distance: 0
				}
			},
			0: {
				noInterrupt: [1, 3, 6, 8, 9, 10, 11, 12, 13, 14, 19, 21, 23, 40],
				chains: {
					4: 30,
					5: 30
				}
			},
			30: true
		},
		/* Does not work correctly
		20: { // Cable Step
			0: {
				type: 'dynamicDistance'
			}
		},
		*/
		21: { // Recall Scythes
			'*': { requiredBuff: 10151221 },
			0: {
				noInterrupt: [1, 3, 6, 8, 9, 10, 11, 12, 13, 14, 15, 19, 20, 21, 23, 40],
				chains: {
					4: 30,
					5: 30
				}
			},
			30: true
		},
		23: { // Binding Scythes
			31: { ignoreAttackSpeed: true },
			33: { onlyTarget: true }
		},
		40: { // Shadow Step
			'*': {
				forceClip: true,
				abnormalChains: { 10151000: 30 }
			},
			0: true,
			30: true
		}
	},
	9: { // Gunner
		'*': { consumeAbnormal: [10152010, 10152011] },
		1: { // Blast
			'*': {
				ignoreAttackSpeed: true,
				noInterrupt: [1, 20],
				projectiles: [20],
				triggerAbnormal: { 10152011: 3100 },
				hasChains: true
			},
			1: true,
			2: { noRetry: true },
			20: {
				type: 'userProjectile',
				flyingSpeed: 800,
				flyingDistance: 500,
				explodeOnHit: true
			}
		},
		2: { // Bombardment
			'*': { noRetry: true },
			0: {
				type: 'lockon',
				ignoreAttackSpeed: true
			},
			1: { type: 'lockonCast' }
		},
		3: { // Scattershot
			'*': {
				moveDir: 1,
				noInterrupt: [3, 20],
				glyphs: {
					30007: {
						animSeq: [
							{
								duration: 394,
								xyRate: 1,
								zRate: 1,
								distance: 0
							},
							{
								duration: 111,
								xyRate: 1,
								zRate: 1,
								distance: 0
							},
							{
								duration: 1333,
								xyRate: 1.8,
								zRate: 1,
								distance: 64.8
							}
						],
						distance: 0.6
					}
				},
				hasChains: true
			},
			1: {
				categoryChains: {
					91002: 30,
					91003: 30,
					91004: 30,
					91005: 30,
					'91007,10001': 30,
					91009: 30,
					91010: 30,
					91011: 30,
					91013: 30,
					91015: 30,
					91018: 30,
					91019: 30,
					91040: 30,
					91041: 30,
					91043: 30,
					91047: 30
				}
			},
			2: {
				categoryChains: {
					91002: 30,
					91003: 30,
					91004: 30,
					91005: 30,
					'91007,10001': 30,
					91009: 30,
					91010: 30,
					91011: 30,
					91013: 30,
					91015: 30,
					91018: 30,
					91019: 30,
					91040: 30,
					91041: 30,
					91043: 30,
					91047: 30
				}
			},
			30: true
		},
		4: { // Point Blank
			'*': {
				noInterrupt: ['4-3', '4-4'],
				hasChains: true
			},
			1: {
				noInterrupt: [4, 20],
				categoryChains: {
					91002: 30,
					91003: 30,
					91004: 30,
					91005: 30,
					'91007,10001': 30,
					91009: 30,
					91010: 30,
					91011: 30,
					91013: 30,
					91015: 30,
					91018: 30,
					91019: 30,
					91040: 30,
					91041: 30,
					91043: 30,
					91047: 30
				},
				noRetry: true
			},
			2: {
				noInterrupt: [4, 20],
				categoryChains: {
					91002: 30,
					91003: 30,
					91004: 30,
					91005: 30,
					'91007,10001': 30,
					91009: 30,
					91010: 30,
					91011: 30,
					91013: 30,
					91015: 30,
					91018: 30,
					91019: 30,
					91040: 30,
					91041: 30,
					91043: 30,
					91047: 30
				},
				noRetry: true
			},
			3: {
				moveDir: 1,
				categoryChains: { 91004: 4 }
			},
			4: { moveDir: 1 },
			30: { noRetry: true }
		},
		5: { // Burst Fire / Targeted Burst Fire
			'*': {
				noRetry: true,
				noInterrupt: ['9-0', '9-10', '9-20']
			},
			0: {
				noInterrupt: [5]
			},
			1: {
				//ignoreAttackSpeed: true,
				stamina: 75,
				instantStamina: true,
				level: [
					{ stamina: 50 },
					{ stamina: 55 },
					{ stamina: 60 },
					{ stamina: 65 }
				]
			},
			10: { noRetry: true },
			11: {
				//ignoreAttackSpeed: true,
				stamina: 75,
				instantStamina: true
			},
			20: { noRetry: true },
			21: {
				//ignoreAttackSpeed: true,
				stamina: 90,
				instantStamina: true
			}
		},
		6: { // Time Bomb
			'*': {
				ignoreAttackSpeed: true,
				projectiles: [6, 20],
				triggerAbnormal: {
					10152010: 3100,
					10152084: 4100
				}
			},
			1: true,
			2: true,
			20: {
				type: 'userProjectile',
				flyingSpeed: 800
			}
		},
		7: { // Arcane Barrage
			1: {
				ignoreAttackSpeed: true,
				noInterrupt: [7, 20],
				triggerAbnormal: { 10152010: 3100 },
				noRetry: true
			},
			2: {
				ignoreAttackSpeed: true,
				noInterrupt: [7],
				triggerAbnormal: { 10152010: 3100 },
				noRetry: true
			},
			3: { noInterrupt: ['7-3'] }
		},
		9: { // Mana Missiles
			'*': { moveDir: 1 },
			0: {
				noInterrupt: [20],
				level: {
					9: {
						releaseChain: {
							connectSkills: [400102, 400132],
							chain: 12,
							grant: true
						}
					}
				}
			},
			10: {
				projectiles: [21, 22],
				noRetry: true
			},
			11: {
				projectiles: [21, 22, 23, 24, 25],
				noRetry: true
			},
			12: {
				projectiles: [31, 32, 33, 34, 35],
				noRetry: true
			},
			21: {
				type: 'userProjectile',
				flyingSpeed: 600,
				flyingDistance: 750
			},
			22: {
				type: 'userProjectile',
				flyingSpeed: 500,
				flyingDistance: 750
			},
			23: {
				type: 'userProjectile',
				flyingSpeed: 400,
				flyingDistance: 750
			},
			24: {
				type: 'userProjectile',
				flyingSpeed: 350,
				flyingDistance: 750
			},
			25: {
				type: 'userProjectile',
				flyingSpeed: 300,
				flyingDistance: 750
			},
			31: {
				type: 'userProjectile',
				flyingSpeed: 600,
				flyingDistance: 750
			},
			32: {
				type: 'userProjectile',
				flyingSpeed: 500,
				flyingDistance: 750
			},
			33: {
				type: 'userProjectile',
				flyingSpeed: 400,
				flyingDistance: 750
			},
			34: {
				type: 'userProjectile',
				flyingSpeed: 350,
				flyingDistance: 750
			},
			35: {
				type: 'userProjectile',
				flyingSpeed: 300,
				flyingDistance: 750
			}
		},
		10: { // Arc Bomb
			'*': { noRetry: true },
			1: {
				projectiles: [20],
				categoryChains: {
					91002: 30,
					91003: 30,
					91004: 30,
					91005: 30,
					'91007,10001': 30,
					91009: 30,
					91010: 30,
					91011: 30,
					91013: 30,
					91015: 30,
					91018: 30,
					91019: 30,
					91040: 30,
					91041: 30,
					91043: 30,
					91047: 30
				}
			},
			2: {
				projectiles: [20],
				categoryChains: {
					91002: 30,
					91003: 30,
					91004: 30,
					91005: 30,
					'91007,10001': 30,
					91009: 30,
					91010: 30,
					91011: 30,
					91013: 30,
					91015: 30,
					91018: 30,
					91019: 30,
					91040: 30,
					91041: 30,
					91043: 30,
					91047: 30
				}
			},
			20: {
				type: 'userProjectile',
				delay: 450,
				flyingSpeed: 700,
				flyingDistance: 350,
				level: [
					{ flyingSpeed: 800 },
					{ flyingSpeed: 800 },
					{ flyingSpeed: 800 },
					{ flyingSpeed: 800 },
					{ flyingSpeed: 800 },
					{ flyingSpeed: 800 },
					{ flyingSpeed: 800 },
					{ flyingSpeed: 800 }
				]
			},
			// TODO: Chain projectiles
			/*21: {
				type: 'userProjectile',
				flyingSpeed: 300,
				flyingDistance: 100
			},
			22: {
				type: 'userProjectile',
				flyingSpeed: 300,
				flyingDistance: 75
			},
			23: {
				type: 'userProjectile',
				flyingSpeed: 300,
				flyingDistance: 50
			},
			24: {
				type: 'projectile',
				length: 1000
			},*/
			30: {
				connectSkillArrow: true,
				projectiles: [20],
				noRetry: true
			}
		},
		11: { // Rocket Jump
			'*': {
				noInterrupt: [15],
				hasChains: true
			},
			1: {
				categoryChains: {
					91002: 30,
					91003: 30,
					91004: 30,
					91005: 30,
					'91007,10001': 30,
					91009: 30,
					91010: 30,
					91011: 30,
					91013: 30,
					91015: 30,
					91018: 30,
					91019: 30,
					91040: 31,
					91041: 30,
					91043: 30,
					91047: 30
				}
			},
			2: {
				categoryChains: {
					91002: 30,
					91003: 30,
					91004: 30,
					91005: 30,
					'91007,10001': 30,
					91009: 30,
					91010: 30,
					91011: 30,
					91013: 30,
					91015: 30,
					91018: 30,
					91019: 30,
					91040: 31,
					91041: 30,
					91043: 30,
					91047: 30
				}
			},
			30: true,
			31: true
		},
		13: { // Balder's Vengeance
			'*': {
				noInterrupt: [13],
				moveDir: 1,
				noRetry: true
			},
			1: {
				categoryChains: {
					91002: 30,
					91003: 30,
					91004: 30,
					91005: 30,
					'91007,10001': 30,
					91009: 30,
					91010: 30,
					91011: 30,
					91013: 30,
					91015: 30,
					91018: 30,
					91019: 30,
					91040: 30,
					91041: 30,
					91043: 30,
					91047: 30
				}
			},
			2: {
				categoryChains: {
					91002: 30,
					91003: 30,
					91004: 30,
					91005: 30,
					'91007,10001': 30,
					91009: 30,
					91010: 30,
					91011: 30,
					91013: 30,
					91015: 30,
					91018: 30,
					91019: 30,
					91040: 30,
					91041: 30,
					91043: 30,
					91047: 30
				}
			},
			30: {
				connectSkillArrow: true,
				noRetry: true
			}
		},
		15: { // Replenishment
			'*': {
				ignoreAttackSpeed: true,
				noInterrupt: [15]
			},
			1: {
				categoryChains: {
					91002: 30,
					91003: 30,
					91004: 30,
					91005: 30,
					'91007,10001': 30,
					91009: 30,
					91010: 30,
					91011: 30,
					91013: 30,
					91015: 30,
					91018: 30,
					91019: 30,
					91040: 30,
					91041: 30,
					91043: 30,
					91047: 30
				}
			},
			2: {
				categoryChains: {
					91002: 30,
					91003: 30,
					91004: 30,
					91005: 30,
					'91007,10001': 30,
					91009: 30,
					91010: 30,
					91011: 30,
					91013: 30,
					91015: 30,
					91018: 30,
					91019: 30,
					91040: 30,
					91041: 30,
					91043: 30,
					91047: 30
				}
			},
			30: true
		},
		18: { // HB
			'*': { ignoreAttackSpeed: true },
			1: true,
			2: true
		},
		19: { // ST
			'*': { noRetry: true },
			1: {
				projectiles: [20],
				categoryChains: {
					91002: 30,
					91003: 30,
					91004: 30,
					91005: 30,
					'91007,10001': 30,
					91009: 30,
					91010: 30,
					91011: 30,
					91013: 30,
					91015: 30,
					91018: 30,
					91019: 30,
					91040: 30,
					91041: 30,
					91043: 30,
					91047: 30
				}
			},
			2: {
				projectiles: [20],
				categoryChains: {
					91002: 30,
					91003: 30,
					91004: 30,
					91005: 30,
					'91007,10001': 30,
					91009: 30,
					91010: 30,
					91011: 30,
					91013: 30,
					91015: 30,
					91018: 30,
					91019: 30,
					91040: 30,
					91041: 30,
					91043: 30,
					91047: 30
				}
			},
			20: {
				type: 'userProjectile',
				delay: 350,
				flyingSpeed: 700,
				flyingDistance: 450
			},
			// TODO: Chain projectiles
			/*21: {
				type: 'projectile',
				length: 5000
			},*/
			30: {
				connectSkillArrow: true,
				projectiles: [20],
				noRetry: true
			}
		},
		20: { // Retaliate
			0: false
		},
		40: { // Rolling Reload / Dashing Reload
			'*': {
				ignoreAttackSpeed: true,
				triggerAbnormal: {
					10152010: 3100,
					10152012: 3100,
					10152354: 4000
				},
				forceClip: true
			},
			1: { abnormalChains: { 10152354: 31 } },
			2: { abnormalChains: { 10152354: 32 } },
			31: {
				consumeAbnormal: 10152354,
				triggerAbnormal: {
					10152010: 3100,
					10152012: 3100
				}
			},
			32: {
				consumeAbnormal: 10152354,
				triggerAbnormal: {
					10152010: 3100,
					10152012: 3100
				}
			}
		},
		41: { // Modular Weapon System
			'*': {
				ignoreAttackSpeed: true,
				hasChains: true,
				noInterrupt: [20, 41]
			},
			1: {
				categoryChains: {
					91002: 30,
					91003: 30,
					91004: 30,
					91005: 30,
					'91007,10001': 30,
					91009: 30,
					91010: 30,
					91011: 30,
					91013: 30,
					91015: 30,
					91018: 30,
					91019: 30,
					91040: 30,
					91041: 30,
					91043: 30,
					91047: 30
				}
			},
			2: {
				categoryChains: {
					91002: 30,
					91003: 30,
					91004: 30,
					91005: 30,
					'91007,10001': 30,
					91009: 30,
					91010: 30,
					91011: 30,
					91013: 30,
					91015: 30,
					91018: 30,
					91019: 30,
					91040: 30,
					91041: 30,
					91043: 30,
					91047: 30
				}
			},
			30: true
		},
		42: { // Detonate (Modular Weapon System)
			1: {
				ignoreAttackSpeed: true,
				triggerAbnormal: { 10152011: 3100 },
				noInterrupt: [5, 20, 40, 42]
			}
		},
		43: { // Remote Trigger
			'*': {
				moveDir: 1,
				hasChains: true,
				noRetry: true
			},
			1: {
				categoryChains: {
					91002: 30,
					91003: 30,
					91004: 30,
					91005: 30,
					'91007,10001': 30,
					91009: 30,
					91010: 30,
					91011: 30,
					91013: 30,
					91015: 30,
					91018: 30,
					91019: 30,
					91040: 30,
					91041: 30,
					91043: 30,
					91047: 30
				}
			},
			3: {
				categoryChains: {
					91002: 50,
					91003: 50,
					91004: 50,
					91005: 50,
					'91007,10001': 50,
					91009: 50,
					91010: 50,
					91011: 50,
					91013: 50,
					91015: 50,
					91018: 50,
					91019: 50,
					91040: 50,
					91041: 50,
					91043: 50,
					91047: 50
				}
			},
			30: {
				connectSkillArrow: true,
				noRetry: true
			},
			31: true,
			50: {
				connectSkillArrow: true,
				noRetry: true
			},
			51: true,
		},
		44: { // Balder's Vengeance (Modular Weapon System)
			'*': {
				noInterrupt: [20, 44],
				moveDir: 1,
				noRetry: true
			},
			1: {
				categoryChains: {
					91002: 30,
					91003: 30,
					91004: 30,
					91005: 30,
					'91007,10001': 30,
					91009: 30,
					91010: 30,
					91011: 30,
					91013: 30,
					91015: 30,
					91018: 30,
					91019: 30,
					91040: 30,
					91041: 30,
					91043: 30,
					91047: 30
				}
			},
			30: {
				connectSkillArrow: true,
				noRetry: true
			}
		},
		47: { // Obliteration
			'*': {
				requiredBuff: 10152340,
				moveDir: 1,
				hasChains: true,
				noInterrupt: [20, 47]
			},
			1: {
				categoryChains: {
					91002: 30,
					91003: 30,
					91004: 30,
					91005: 30,
					'91007,10001': 30,
					91009: 30,
					91010: 30,
					91011: 30,
					91013: 30,
					91015: 30,
					91018: 30,
					91019: 30,
					91040: 30,
					91041: 30,
					91043: 30,
					91047: 30
				}
			},
			2: {
				categoryChains: {
					91002: 30,
					91003: 30,
					91004: 30,
					91005: 30,
					'91007,10001': 30,
					91009: 30,
					91010: 30,
					91011: 30,
					91013: 30,
					91015: 30,
					91018: 30,
					91019: 30,
					91040: 30,
					91041: 30,
					91043: 30,
					91047: 30
				}
			},
			30: true
		}
	},
	10: { // Brawler
		1: { // Punch
			'*': {
				noInterrupt: ['1-3'],
				triggerAbnormal: { 10153060: 3000 },
				consumeAbnormalEnd: 10153060,
				hasChains: true,
				noRetry: true
			},
			0: {
				categoryChains: {
					'92001,10000': 1,
					'92001,10001': 2,
					'92001,10002': 3,
					'92001,10010': 32,
					92002: 30,
					92003: 30,
					92004: 30,
					92005: 30,
					92006: 30,
					92007: 30,
					92008: 30,
					92009: 30,
					92010: 30,
					92013: 30,
					92014: 30,
					92015: 30,
					92016: 30,
					92017: 30,
					92018: 30,
					92019: 30,
					92020: 30,
					92021: 30,
					92022: 30,
					92024: 30,
					92026: 30,
					92040: 30
				},
				level: {
					10: { ignoreAttackSpeed: true }
				}
			},
			1: true,
			2: true,
			3: true,
			30: {
				level: {
					10: { ignoreAttackSpeed: true }
				}
			},
			31: true,
			32: true
		},
		2: { // Counter
			'*': {
				hasChains: true,
				noRetry: true
			},
			1: {
				triggerAbnormal: { 10153001: 0x7fffffff },
				consumeAbnormalEnd: 10153001
			},
			2: {
				triggerAbnormal: { 10153002: 0x7fffffff },
				consumeAbnormalEnd: 10153002
			},
			3: {
				triggerAbnormal: { 10153003: 0x7fffffff },
				consumeAbnormalEnd: 10153003
			},
			4: {
				triggerAbnormal: { 10153004: 0x7fffffff },
				consumeAbnormalEnd: 10153004
			},
			10: {
				ignoreAttackSpeed: true,
				triggerAbnormal: { 10153006: 0x7fffffff },
				consumeAbnormalEnd: 10153006
			},
			11: {
				ignoreAttackSpeed: true,
				triggerAbnormal: { 10153005: 0x7fffffff },
				consumeAbnormalEnd: 10153005
			},
			12: {
				categoryChains: {
					'92001,10000': 1,
					'92001,10001': 2,
					'92001,10002': 3,
					'92001,10003': 4,
					'92001,10010': 1
				}
			}
		},
		3: { // Divine Wrath
			/*
			'*': {
				ignoreAttackSpeed: true,
				noRetry: true
			},
			0: true,
			1: {
				type: 'lockonCast',
				forceClip: true,
				setEndpointStage: 1
			}
			*/
		},
		4: { // Ground Pound
			'*': {
				hasChains: true,
				noInterrupt: [4]
			},
			0: { categoryChains: { 800: 30 } },
			30: true
		},
		5: { // Bullrush
			0: {
				ignoreAttackSpeed: true,
				noRetry: true
			}
		},
		6: { // Haymaker
			'*': {
				hasChains: true,
				checkBaseCd: true
			},
			1: { categoryChains: { 800: 30 } },
			2: { categoryChains: { 800: 30 } },
			30: true,
			31: true,
			41: { categoryChains: { 800: 46 } },
			42: { categoryChains: { 800: 46 } },
			46: true,
			47: true,
			51: { categoryChains: { 800: 56 } },
			52: { categoryChains: { 800: 56 } },
			56: true,
			57: true,
			61: { categoryChains: { 800: 66 } },
			62: { categoryChains: { 800: 66 } },
			66: true,
			67: true
		},
		7: { // Roundhouse Kick
			'*': {
				noInterrupt: [7],
				hasChains: true
			},
			0: { categoryChains: { 800: 30 } },
			30: true
		},
		8: { // Piledriver
			'*': { hasChains: true },
			1: { categoryChains: { 800: 30 } },
			2: { categoryChains: { 800: 30 } },
			30: true,
			31: true
		},
		9: { // Jackhammer
			'*': {
				noInterrupt: [9],
				ignoreAttackSpeed: true,
				hasChains: true
			},
			1: { categoryChains: { 800: 30 } },
			2: { categoryChains: { 800: 30 } },
			30: true,
			31: true
		},
		10: { // Counterpunch
			'*': {
				requiredBuff: 10153000,
				hasChains: true,
				noInterrupt: [10]
			},
			0: { categoryChains: { 800: 30 } },
			30: true
		},
		12: { // Retaliate
			0: false
		},
		13: { // Provoke
			'*': {
				ignoreAttackSpeed: true,
				noInterrupt: [13, 40]
			},
			1: true,
			2: true
		},
		14: { // Infuriate
			'*': { hasChains: true },
			1: { categoryChains: { 800: 30 } },
			2: { categoryChains: { 800: 30 } },
			30: true
		},
		15: { // High Kick
			'*': {
				requiredBuff: 10153503,
				hasChains: true,
				noInterrupt: [15]
			},
			0: { categoryChains: { 800: 30 } },
			30: true
		},
		16: { // Flip Kick
			'*': { hasChains: true },
			1: { categoryChains: { 800: 30 } },
			2: { categoryChains: { 800: 30 } },
			30: true
		},
		18: { // Growing Fury
			'*': {
				requiredBuff: 10153050,
				hasChains: true,
				noInterrupt: [18]
			},
			1: { categoryChains: { 800: 30 } },
			2: { categoryChains: { 800: 30 } },
			30: true
		},
		19: { // Invigorating Rage
			'*': {
				ignoreAttackSpeed: true,
				stamina: 1500,
				instantStamina: true
			},
			1: true,
			2: true
		},
		21: { // Mounting Rage
			'*': { ignoreAttackSpeed: true },
			1: true,
			2: true
		},
		22: { // Flying Kick
			'*': {
				noInterrupt: [22],
				hasChains: true
			},
			0: { categoryChains: { 800: 30 } },
			30: true
		},
		24: { // One-Inch Punch
			'*': {
				hasChains: true,
				noInterrupt: [24]
			},
			1: { categoryChains: { 800: 30 } },
			2: { categoryChains: { 800: 30 } },
			30: true,
			31: true
		},
		26: { // Rhythmic Blows
			'*': {
				hasChains: true,
				noRetry: true,
				noInterrupt: [26]
			},
			0: { categoryChains: { 800: 2 } },
			1: true,
			2: true,
			3: true,
			4: true,
			5: true,
			6: true,
			7: true
		},
		40: { // Quick Dash
			'*': {
				ignoreAttackSpeed: true,
				forceClip: true,
				abnormalChains: { 10153150: 30 },
				noRetry: true
			},
			0: true,
			30: true,
			31: true
		}
	},
	11: { // Ninja
		'*': { consumeAbnormal: [10154000, 10154001, 10154002, 10154003, 10154004, 10154005, 10154006] },
		1: { // Combo Attack
			'*': {
				ignoreAttackSpeed: true,
				triggerAbnormal: { 10154000: 1650 },
				hasChains: true,
				noRetry: true
			},
			0: { categoryChains: { 900: 30 } },
			1: { triggerAbnormal: { 10154001: 1500 } },
			2: { triggerAbnormal: { 10154002: 1400 } },
			3: { triggerAbnormal: { 10154003: 1400 } },
			4: { triggerAbnormal: { 10154004: 1400 } },
			5: { triggerAbnormal: { 10154005: 1600 } },
			6: { triggerAbnormal: { 10154006: 100 } },
			30: true,
			40: { categoryChains: { 900: 70 } },
			41: { triggerAbnormal: { 10154001: 1500 } },
			42: { triggerAbnormal: { 10154002: 1400 } },
			43: { triggerAbnormal: { 10154003: 1400 } },
			44: { triggerAbnormal: { 10154004: 1400 } },
			45: { triggerAbnormal: { 10154005: 1600 } },
			46: { triggerAbnormal: { 10154006: 100 } },
			70: true
		},
		2: { // Shadow Jump
			'*': {
				ignoreAttackSpeed: true,
				forceClip: true,
				abnormalChains: { 10154010: 30 }
			},
			0: true,
			30: true
		},
		3: { // Leaves on the Wind
			'*': {
				hasChains: true,
				noInterrupt: [3]
			},
			0: {
				categoryChains: {
					911: 40,
					'9999,900': 30
				}
			},
			30: {
				connectSkillArrow: true,
				noRetry: true
			},
			40: true
		},
		4: { // Jagged Path
			1: {
				ignoreAttackSpeed: true,
				length: 665,
				distance: 469
			},
			2: { ignoreAttackSpeed: true },
			10: true,
			11: true
		},
		5: { // Impact Bomb
			'*': {
				moveDir: 1,
				noInterrupt: [5],
				forceClip: true,
				noRetry: true
			},
			0: { categoryChains: { 900: 30 } },
			30: {
				connectSkillArrow: true,
				noRetry: true
			}
		},
		6: { // One Thousand Cuts
			'*': {
				hasChains: true
			},
			0: { categoryChains: { 900: 30 } },
			1: {
				ignoreAttackSpeed: true,
				length: 300,
				distance: 246
			},
			10: true,
			30: true
		},
		7: { // Decoy Jutsu
			0: {
				onlyTarget: true,
				noInterrupt: [7]
			}
		},
		8: { // Fire Avalanche
			'*': {
				hasChains: true,
				noRetry: true
			},
			0: { categoryChains: { 900: 30 } },
			1: true,
			2: true,
			30: true,
			31: { categoryChains: { 900: 30 } },
			51: { categoryChains: { 900: 52 } },
			52: true
		},
		9: { // Smoke Bomb
			'*': { cooldownEnd: 300 },
			0: { categoryChains: { 900: 30 } },
			30: {
				connectSkillArrow: true,
				noRetry: true
			}
		},
		10: { // Retaliate
			0: false
		},
		11: { // Focus
			'*': { noInterrupt: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23] },
			0: true,
			50: true
		},
		12: { // Skyfall
			'*': {
				hasChains: true,
				noInterrupt: [12]
			},
			1: { categoryChains: { 900: 30 } },
			2: { categoryChains: { 900: 30 } },
			30: true
		},
		13: { // Circle of Steel
			'*': {
				hasChains: true,
				noInterrupt: [13]
			},
			1: { categoryChains: { 900: 30 } },
			2: { categoryChains: { 900: 30 } },
			30: true
		},
		14: { // Double Cut
			'*': {
				hasChains: true,
				noInterrupt: [14]
			},
			1: { categoryChains: { 900: 30 } },
			2: { categoryChains: { 900: 30 } },
			30: true
		},
		15: { // Burning Heart
			'*': {
				stamina: 100,
				noInterrupt: [17, 5],
				instantStamina: true
			},
			1: true,
			2: true,
			3: true,
			4: true,
			5: true,
			6: true,
			7: true,
			8: true,
			9: true,
			10: true,
			31: { categoryChains: { 900: 32 } },
			32: true
		},
		16: { // Death Blossom
			'*': {
				ignoreAttackSpeed: true,
				hasChains: true,
				noInterrupt: [16]
			},
			0: { categoryChains: { 900: 30 } },
			30: true
		},
		17: { // Attunement
			'*': {
				hasChains: true,
				noInterrupt: [17]
			},
			0: { categoryChains: { 900: 30 } },
			30: true
		},
		18: { // Bladestorm
			'*': {
				hasChains: true,
				noInterrupt: [18]
			},
			0: { categoryChains: { 900: 30 } },
			30: true
		},
		19: { // Chakra Thrust
			'*': {
				hasChains: true,
				noInterrupt: [19]
			},
			0: { categoryChains: { 900: 30 } },
			30: true
		},
		20: { // Clone Jutsu
			0: { ignoreAttackSpeed: true }
		},
		21: { // Boomerang Shuriken
			'*': {
				hasChains: true,
				noRetry: true
			},
			0: { categoryChains: { 93003: 15 } },
			11: { categoryChains: { 93003: 17 } },
			12: { categoryChains: { 93003: 16 } },
			13: { categoryChains: { 93003: 18 } },
			15: {
				connectSkillArrow: true,
				noRetry: true
			},
			16: {
				connectSkillArrow: true,
				noRetry: true
			},
			17: {
				connectSkillArrow: true,
				noRetry: true
			},
			18: {
				connectSkillArrow: true,
				noRetry: true
			},
			50: true,
			51: true
		},
		22: { // Quick Attack
			10: {
				noInterrupt: [22],
				categoryChains: {
					93019: 30,
					'9999,900': 20
				}
			},
			20: true,
			30: true,
			40: {
				categoryChains: {
					93019: 60,
					'9999,900': 50
				}
			},
			50: {
				connectSkillArrow: true,
				noRetry: true
			},
			60: {
				connectSkillArrow: true,
				noRetry: true
			}
		},
		23: { // Inner Harmony
			'*': { hasChains: true },
			0: { categoryChains: { 900: 30 } },
			30: true
		}
	},
	12: { // Valkyrie
		1: { // Slash
			'*': {
				noInterrupt: ['1-3', 9, 11, 19],
				hasChains: true,
				noRetry: true
			},
			0: {
				triggerAbnormal: { 10155006: 4000 },
				consumeAbnormalEnd: 10155006,
				categoryChains: { 750: 30 }
			},
			1: {
				triggerAbnormal: { 10155007: 4000 },
				consumeAbnormalEnd: 10155007
			},
			2: {
				triggerAbnormal: { 10155008: 4000 },
				consumeAbnormalEnd: 10155008
			},
			3: true,
			30: {
				triggerAbnormal: { 10155006: 4000 },
				consumeAbnormalEnd: 10155006
			}
		},
		2: { // Overhead Slash
			'*': {
				hasChains: true,
				noInterrupt: [2]
			},
			0: { categoryChains: { 750: 30 } },
			30: true
		},
		3: { // Glaive Strike
			'*': {
				requiredBuff: 10155113,
				hasChains: true,
				noInterrupt: [3]
			},
			0: { categoryChains: { 750: 30 } },
			30: true
		},
		4: { // Charge
			'*': { noInterrupt: [1, 2, '4-10', '4-11', 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23, 24, 25] },
			0: {
				ignoreAttackSpeed: true,
				length: 550,
				distance: 436,
				noInterrupt: [4]
			},
			10: true,
			11: true
		},
		5: { // Maelstrom
			'*': {
				hasChains: true,
				noInterrupt: [5]
			},
			0: { categoryChains: { 750: 30 } },
			30: true
		},
		6: { // Leaping Strike
			'*': {
				hasChains: true,
				noInterrupt: [6]
			},
			0: { categoryChains: { 750: 30 } },
			30: true
		},
		7: { // Spinning Death
			'*': {
				noInterrupt: ['7-2'],
				hasChains: true,
				noRetry: true
			},
			0: {
				triggerAbnormal: { 10155070: 5000 },
				categoryChains: { 750: 30 }
			},
			1: {
				consumeAbnormal: 10155070,
				triggerAbnormal: { 10155071: 5000 }
			},
			2: {
				consumeAbnormal: 10155071,
				triggerAbnormal: { 10155072: 1 }
			},
			30: { triggerAbnormal: { 10155070: 5000 } }
		},
		8: { // Titansbane
			'*': {
				hasChains: true,
				noInterrupt: ['8-1']
			},
			0: {
				ignoreAttackSpeed: true,
				categoryChains: {
					'13008,10000': 1,
					750: 30
				}
			},
			1: true,
			30: { ignoreAttackSpeed: true }
		},
		9: { // Ground Bash
			'*': {
				requiredBuff: 10155112,
				hasChains: true,
				noInterrupt: [9]
			},
			0: { categoryChains: { 750: 30 } },
			30: true
		},
		10: { // Dream Slash
			'*': {
				noInterrupt: ['4-0', 10],
				hasChains: true,
				noRetry: true
			},
			0: { categoryChains: { 750: 30 } },
			30: {
				connectSkillArrow: true,
				noRetry: true
			}
		},
		11: { // Shining Crescent
			'*': { hasChains: true },
			0: {
				noInterrupt: [11],
				categoryChains: { 750: 30 }
			},
			1: { categoryChains: { 750: 31 } },
			30: true,
			31: true,
			80: false
		},
		12: { // Ragnarok
			'*': {
				hasChains: true,
				noInterrupt: [12]
			},
			0: { categoryChains: { 750: 30 } },
			30: true
		},
		13: { // Bloodflower
			'*': {
				hasChains: true,
				noInterrupt: [13]
			},
			0: { categoryChains: { 750: 30 } },
			30: true
		},
		14: { // Evasion
			'*': {
				ignoreAttackSpeed: true,
				forceClip: true
			},
			0: true,
			1: true
		},
		15: { // Windslash
			'*': {
				hasChains: true,
				noInterrupt: [15]
			},
			0: { categoryChains: { 750: 30 } },
			30: true
		},
		16: { // Runeburst
			'*': {
				ignoreAttackSpeed: true,
				hasChains: true,
				noInterrupt: [16]
			},
			0: { categoryChains: { 750: 30 } },
			30: true
		},
		17: { // Balder's Tears
			0: { ignoreAttackSpeed: true }
		},
		18: { // Retaliate
			0: false
		},
		19: { // Reclamation
			'*': {
				hasChains: true,
				noInterrupt: [19]
			},
			0: { categoryChains: { 750: 30 } },
			30: true
		},
		20: { // Backstab
			0: {
				distance: 0,
				onlyTarget: true
			}
		},
		21: { // Dark Herald
			0: {
				requiredBuff: 10155201,
				ignoreAttackSpeed: true
			}
		},
		23: { // Gungir's Bite
			'*': {
				hasChains: true,
				noRetry: true,
				noInterrupt: [23]
			},
			0: {
				triggerAbnormal: { 10155531: 1000 },
				categoryChains: { 750: 1 }
			},
			1: { triggerAbnormal: { 10155531: 1000 } },
			2: true
		},
		24: { // Twilight Waltz
			'*': {
				hasChains: true,
				noRetry: true,
				noInterrupt: [25, '11-0', '11-30']
			},
			0: {
				triggerAbnormal: { 10155543: 1000 },
				categoryChains: { 750: 1 }
			},
			1: { triggerAbnormal: { 10155543: 1000 } },
			2: { triggerAbnormal: { 10155543: 1000 } },
			3: true,
			4: true
		},
		25: { // Godsfall
			'*': {
				hasChains: true,
				noRetry: true
			},
			0: {
				triggerAbnormal: { 10155511: 2000 },
				categoryChains: {
					772: 31,
					'9999,750': 1
				}
			},
			1: { triggerAbnormal: { 10155511: 2000 } },
			2: {
				distance: [-313.28, 463.28],
				categoryChains: {
					772: 32,
					'9999,750': 3
				}
			},
			3: { distance: [-313.28, 463.28] },
			31: { triggerAbnormal: { 10155511: 2000 } },
			32: { distance: [-313.28, 463.28] }
		}
	}
}
