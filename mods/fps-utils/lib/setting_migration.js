'use strict'

const DefaultSettings = {
	_version: 19,
	Mode: 0,
	StreamMode: false,
	OnlyParty: false,
	RaidAutoChange: false,
	GuardianAutoChange: false,
	ShowStyle: false,
	ActionScripts: false,
	PvpTraps: false,
	Hit_Me: false,
	Hit_Other: false,
	Hit_Damage: false,
	Hit_All: false,
	HideFireworks: true,
	HideServantBalloons: false,
	Hideguildlogos: false,
	HideMonsterDeathAnimation: false,
	HideHpNumbers: false,
	HideMpNumbers: false,
	HideMySummons: false,
	HideOthersSummons: false,
	HideMyServants: false,
	HideOthersServants: false,
	MuteOthersVoice: false,
	HideAllAbnormalities: false,
	HideAllProjectiles: false,
	HideOwnBlacklistedAbns: false,
	HideBlacklistedAbnormalities: false,
	HideBlacklistedProjectiles: false,
	HideBlacklistedNpcs: false,
	HideBlacklistedSkills: false,
	HideBlacklistedDrop: false,
	OwnAbnormalsBlacklist: [4850, 48732, 48733, 48734, 48735, 48736, 48737, 48738, 48739, 70251, 70252, 70253, 70254, 70255, 70256, 776021, 905434, 47660800, 47660900, 47661000, 47662300, 99006000, 99007200, 999001011],
	AbnormalitiesBlacklist: [],
	ProjectilesBlacklist: [270120, 270220, 270320, 270420, 270520, 270620, 270720, 270820, 270920, 271020],
	PlayersBlacklist: [],
	ClassesBlacklist: [],
	RolesBlacklist: [],
	NpcsBlacklist: [],
	DropBlacklist: [8000, 8001, 8002, 8005, 8008, 8009, 8010, 8011, 8012, 8013, 8014, 8015, 8016, 8017, 8018, 8019, 8020, 8021, 8022, 8023],
	ClassesData: {
		1: { name: "warrior", model: 1, CD_SkillsBlacklist: [], CD_HideBlacklistedSkills: false, role: ["dps"], isHidden: false },
		2: { name: "lancer", model: 2, CD_SkillsBlacklist: [], CD_HideBlacklistedSkills: false, role: ["tank"], isHidden: false },
		3: { name: "slayer", model: 3, CD_SkillsBlacklist: [], CD_HideBlacklistedSkills: false, role: ["dps"], isHidden: false },
		4: { name: "berserker", model: 4, CD_SkillsBlacklist: [], CD_HideBlacklistedSkills: false, role: ["dps"], isHidden: false },
		5: { name: "sorcerer", model: 5, CD_SkillsBlacklist: [], CD_HideBlacklistedSkills: false, role: ["dps", "ranged"], isHidden: false },
		6: { name: "archer", model: 6, CD_SkillsBlacklist: [], CD_HideBlacklistedSkills: false, role: ["dps", "ranged"], isHidden: false },
		7: { name: "priest", model: 7, CD_SkillsBlacklist: [], CD_HideBlacklistedSkills: false, role: ["healer"], isHidden: false },
		8: { name: "mystic", model: 8, CD_SkillsBlacklist: [], CD_HideBlacklistedSkills: false, role: ["healer"], isHidden: false },
		9: { name: "reaper", model: 9, CD_SkillsBlacklist: [], CD_HideBlacklistedSkills: false, role: ["dps"], isHidden: false },
		10: { name: "gunner", model: 10, CD_SkillsBlacklist: [], CD_HideBlacklistedSkills: false, role: ["dps", "ranged"], isHidden: false },
		11: { name: "brawler", model: 11, CD_SkillsBlacklist: [], CD_HideBlacklistedSkills: false, role: ["tank"], isHidden: false },
		12: { name: "ninja", model: 12, CD_SkillsBlacklist: [], CD_HideBlacklistedSkills: false, role: ["dps"], isHidden: false },
		13: { name: "valkyrie", model: 13, CD_SkillsBlacklist: [], CD_HideBlacklistedSkills: false, role: ["dps"], isHidden: false }
	}
};

function MigrateSettings(from_ver, to_ver, settings) {
	if (from_ver === undefined) return Object.assign(Object.assign({}, DefaultSettings), settings);
	else if (from_ver === null) return DefaultSettings;
	else {
		if (from_ver + 1 < to_ver) {
			settings = MigrateSettings(from_ver, from_ver + 1, settings);
			return MigrateSettings(from_ver + 1, to_ver, settings);
		}

		switch (to_ver) {
			case 3:
				settings._version = 3;
				settings.HideBlacklistedAbnormalities = DefaultSettings.HideBlacklistedAbnormalities;
				settings.HideBlacklistedProjectiles = DefaultSettings.HideBlacklistedProjectiles;
				break;
			case 4:
				settings._version = 4;
				delete settings.NoZoomingToNpc;
				settings.ActionScripts = DefaultSettings.ActionScripts;
				settings.HideMonsterDeathAnimation = DefaultSettings.HideMonsterDeathAnimation;
				break;
			case 5:
				settings._version = 5;
				settings.HideOwnBlacklistedAbns = DefaultSettings.HideOwnBlacklistedAbns;
				settings.OwnAbnormalsBlacklist = DefaultSettings.OwnAbnormalsBlacklist;
				break;
			case 6:
				settings._version = 6;
				settings.OwnAbnormalsBlacklist = DefaultSettings.OwnAbnormalsBlacklist;
				settings.AbnormalitiesBlacklist = DefaultSettings.AbnormalitiesBlacklist;
				break;
			case 7:
				settings._version = 7;
				settings.AbnormalitiesBlacklist = DefaultSettings.AbnormalitiesBlacklist;
				settings.Fishing = DefaultSettings.Fishing;
				break;
			case 8:
				settings._version = 8;
				delete settings.ProjDebug;
				delete settings.AbnDebug;
				settings.PvpTraps = DefaultSettings.PvpTraps;
				break;
			case 9:
				settings._version = 9;
				settings.Hit_All = DefaultSettings.Hit_All;
				break;
			case 10:
				settings._version = 10;
				settings.HideHpMpNumbers = DefaultSettings.HideHpMpNumbers;
				break;
			case 11:
				settings._version = 11;
				delete settings.Fishing;
				settings.HideHpNumbers = DefaultSettings.HideHpNumbers;
				settings.HideMpNumbers = settings.HideHpMpNumbers;
				delete settings.HideHpMpNumbers;
				break;
			case 12:
				settings._version = 12;
				settings.AbnormalitiesBlacklist = DefaultSettings.AbnormalitiesBlacklist;
				break;
			case 13:
				settings._version = 13;
				settings.AbnormalitiesBlacklist = DefaultSettings.AbnormalitiesBlacklist;
				break;
			case 14:
				settings._version = 14;
				settings.AbnormalitiesBlacklist = [];
				break;
			case 15:
				settings._version = 15;
				settings.HideMyServants = DefaultSettings.HideMyServants;
				settings.HideOthersServants = DefaultSettings.HideOthersServants;
				break;
			case 16:
				settings._version = 16;
				delete settings.ClassesNames;
				delete settings.RolesNames;
				break;
			case 17:
				settings._version = 17;
				settings.StreamMode = DefaultSettings.StreamMode;
				settings.GuardianAutoChange = DefaultSettings.GuardianAutoChange;
				break;
			case 18:
				settings._version = 18;
				settings.MuteOthersVoice = DefaultSettings.MuteOthersVoice;
				break;
			case 19:
				settings._version = 19;
				settings.HideServantBalloons = DefaultSettings.HideServantBalloons;
				break;
			default:
				console.log(`\x1b[94mINFO\x1b[34m [FPS-UTILS]\x1b[39m - Your \x1b[31 ["config.json" (caali's Toolbox) OR "settings/fps-utils.json" (pinkie's Proxy)]\x1b[39m seems to be outdated.\x1b[32m Re-created new one.\x1b[39m\x1b[0m`);
				Object.keys(settings).forEach(key => delete settings[key]);
				settings = JSON.parse(JSON.stringify(DefaultSettings));
				break;
		}
		return settings;
	}
}

module.exports = MigrateSettings;