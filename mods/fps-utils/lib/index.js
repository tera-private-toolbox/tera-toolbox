'use strict'

// ~~~ * Data * ~~~ \\

const NpcData = require('./data/npcData.json'),
	SkillData = require('./data/skillString.json'),
	{ ImportantAbns, BlockedAbns, ReplaceAbnIds, AbnNoEffectInvisibleNpcSpamId } = require('./data/abnormalities.json'),
	{ UserNpcs, TrapsIds, FireWorks, UserNpcsHzId, SmokeBombId, MoteIds } = require('./data/userSpawns.json'),
	{ InvisibleNpcs, SpamAchIds, PClasses, PRoles, HexColors, Alphabet, StarterWeaponIds, InvalidVoiceId, MountToReplaceId, ImportantActionScripts } = require('./data/miscData.json'),
	{ BnzC, SlvC, GldC, PnkC, HPkC, CPkC, RedC, GrnC, LPrC, PrpC, LBlC, BluC, DBlC, HBlC, GryC, YlwC } = HexColors;

const LastHook = { order: 100010 },
	LastHookfn = { order: 100010, filter: { fake: null, silenced: false, modified: null } };

module.exports = function FpsUtils(mod) {

	// ~~~ * Constants * ~~~ \\

	const Cfg = mod.settings,
		NotCP = typeof mod.compileProto !== 'undefined';

	// ~~~ * Variables * ~~~ \\

	let MyName = '',
		MyGameId = -1n,
		AllowedAchUps = 0,
		LastVrange = 0,
		LastFState = null,
		LastGState = null,
		SwitchCd = false,
		ProjDebug = false,
		AbnDebug = false,
		TmpData = [],
		PMembers = [],
		SUsers = {},
		HUsers = {},
		SNpcs = {},
		HNpcs = {},
		SPets = {},
		HPets = {},
		HSeedBoxes = {};

	// ~~~ * Gui Parser * ~~~ \\

	const Xmap = new WeakMap();

	if (!Xmap.has(mod.dispatch || mod)) {
		Xmap.set(mod.dispatch || mod, {});

		mod.hook('C_CONFIRM_UPDATE_NOTIFICATION', 'raw', LastHook, () => false);

		mod.hook('C_ADMIN', 1, LastHookfn, (event) => {
			if (!event.command.includes(";")) return;
			const commands = event.command.split(";");
			for (const cmd of commands)
				try { mod.command.exec(cmd); } catch (err) { continue; } // In case it errored out; prevent cAdmin from being sent to server.
			return false;
		});
	}

	const gui = {
		parse(Xarray, title, body = '') {
			for (const data of Xarray) {
				if (body.length >= 16E3) {
					body += 'Gui data limit exceeded, some values may be missing.';
					break;
				}
				if (data.command) body += `<a href="admincommand:/@${data.command};">${data.text}</a>`;
				else if (!data.command) body += `${data.text}`;
				else continue;
			}
			mod.toClient('S_ANNOUNCE_UPDATE_NOTIFICATION', 1, { id: 0, title, body });
		}
	};

	// ~~~ * Gui Handler * ~~~ \\

	function GuiHandler(page, arg) {
		switch (page) {
			case "searchnpc": case "npcsearch":
				NpcJsonSearch("search", arg);
				break;
			case "npc":
				NpcJsonSearch("starts", arg);
				break;
			case "npclist":
				TmpData.push(
					{ text: `<font color="${PrpC}" size="+24"><p align="right">MAIN MENU</p></font><br><br>`, command: "fps gui" },
					{ text: `<font color="${YlwC}" size="+20"><p align="right">[Main NPC page]</p></font><br>`, command: "fps gui npcmain" },
					{ text: `<font color="${LBlC}" size="+19">Click a NPC ID to remove it from the blacklist:</font><br>` }
				);
				for (const blNpc of Cfg.NpcsBlacklist) TmpData.push({ text: `<font color="${BnzC}" size="+17">${blNpc.zone}, ${blNpc.templateId}</font><br>`, command: `fps npc hide ${blNpc.zone} ${blNpc.templateId};fps gui npclist` });
				gui.parse(TmpData, `<font color="${LPrC}">[FPS] Options - NPCs </font><font color="${GrnC}">(Blacklist)</font>`);
				break;
			case "npcmain":
				TmpData.push(
					{ text: `<font color="${PrpC}" size="+24"><p align="right">MAIN MENU</p></font><br><br>`, command: "fps gui" },
					{ text: `<font color="${YlwC}" size="+20"><p align="right">[Blacklisted NPCs list]</p></font><br>`, command: "fps gui npclist" },
					{ text: `<font color="${LBlC}" size="+19">Click a letter to view all NPCs starting with that letter:<br><br>` }
				);
				for (const i of Alphabet.split('')) TmpData.push({ text: `<font color="${BluC}" size="+19">${i}</font>`, command: `fps gui npc ${i}` }, { text: "&nbsp;&nbsp;" });
				TmpData.push(
					{ text: `<br><br><font color="${PnkC}" size="+16">(Command </font><font color="${HPkC}" size="+16">"fps gui searchnpc &#60;name&#62;"</font><font color="${PnkC}" size="+16"> to search for a specific NPCs names, Case sensitive)</font>` },
					{ text: `<br><br><font color="${PnkC}" size="+16">(Command </font><font color="${HPkC}" size="+16">"fps gui npc &#60;letters&#62;"</font><font color="${PnkC}" size="+16"> to search for NPCs names that starts with that 'letters', Case sensitive)</font>` },
					{ text: `<br><br><font color="${PnkC}" size="+16">If you want to search for npc with space between it's name, you've to add the whole name inside quotations, e.g. <font color="${HPkC}" size="+16">fps gui npcsearch "Bay Kamara"\`</font></font>` }
				);
				gui.parse(TmpData, `<font color="${LPrC}">[FPS] Options - NPCs </font><font color="${YlwC}">(Main)</font>`);
				break;
			case "show":
				TmpData.push(
					{ text: `<font color="${PrpC}" size="+24"><p align="right">MAIN MENU</p></font><br>`, command: "fps gui" },
					{ text: `<font color="${YlwC}" size="+20"><p align="right">[Refresh]</p></font><br>`, command: "fps gui show" },
					{ text: `<font color="${RedC}" size="+16">Red</font><font color="${LPrC}" size="+16"> = Shown, <font color="${GrnC}" size="+16">Green</font><font color="${LPrC}" size="+16"> = Hidden</font></font><br>` },
					{ text: `<font color="${PnkC}" size="+16">(Command </font><font color="${HPkC}" size="+16">"fps hide &#60;name&#62;"</font><font color="${PnkC}" size="+16"> to hide someone that does not appear here)</font><br><br>` },
					{ text: `<font color="${LBlC}" size="+19">Click on <font color="${RedC}">Red</font> to hide & add to blacklist.<br>Click on <font color="${GrnC}">Green</font> to show & remove from blacklist</font><br>` }
				);
				for (const sUser in SUsers) TmpData.push({ text: `<font color="${Cfg.PlayersBlacklist.indexOf(SUsers[sUser].name.toLowerCase()) !== -1 ? GrnC : RedC}" size="+17">${SUsers[sUser].name}</font><br>`, command: Cfg.PlayersBlacklist.indexOf(SUsers[sUser].name.toLowerCase()) !== -1 ? `fps show ${SUsers[sUser].name};fps gui show` : `fps hide ${SUsers[sUser].name};fps gui show` });
				gui.parse(TmpData, `<font color="${LPrC}">[FPS] Options - Players </font><font color="${RedC}">(In-distance)</font>`);
				break;
			case "hide":
				TmpData.push(
					{ text: `<font color="${PrpC}" size="+24"><p align="right">MAIN MENU</p></font><br><br>`, command: "fps gui" },
					{ text: `<font color="${LBlC}" size="+19">Click to show & remove from blacklist.</font><br>` }
				);
				Cfg.PlayersBlacklist.forEach(el => TmpData.push({ text: `<font color="${BnzC}" size="+17">${el}</font><br>`, command: `fps show ${el};fps gui hide` }));
				gui.parse(TmpData, `<font color="${LPrC}">[FPS] Options - Players </font><font color="${GrnC}">(Hidden)</font>`);
				break;
			case "skills":
				gui.parse([
					{ text: `<font color="${PrpC}" size="+24"><p align="right">MAIN MENU</p></font><br>`, command: "fps gui" },
					{ text: `<font color="${YlwC}" size="+20">Tankers:</font>` }, { text: "&#09;&#09;" },
					{ text: `<font color="${LBlC}" size="+18">&#40;Lancer&#41;</font>`, command: "fps gui class lancer" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${LBlC}" size="+18">&#40;Brawler&#41;</font><br><br>`, command: "fps gui class brawler" },
					{ text: `<font color="${YlwC}" size="+20">Healers:</font>` }, { text: "&#09;&#09;" },
					{ text: `<font color="${LBlC}" size="+18">&#40;Priest&#41;</font>`, command: "fps gui class priest" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${LBlC}" size="+18">&#40;Mystic&#41;</font><br><br>`, command: "fps gui class mystic" },
					{ text: `<font color="${YlwC}" size="+20">Dpsers(melee):</font>` }, { text: "&#09;" },
					{ text: `<font color="${LBlC}" size="+18">&#40;Warrior&#41;</font>`, command: "fps gui class warrior" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${LBlC}" size="+18">&#40;Slayer&#41;</font>`, command: "fps gui class slayer" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${LBlC}" size="+18">&#40;Berserker&#41;</font>`, command: "fps gui class berserker" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${LBlC}" size="+18">&#40;Ninja&#41;</font>`, command: "fps gui class ninja" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${LBlC}" size="+18">&#40;Valkyrie&#41;</font>`, command: "fps gui class valkyrie" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${LBlC}" size="+18">&#40;Reaper&#41;</font><br><br>`, command: "fps gui class reaper" },
					{ text: `<font color="${YlwC}" size="+20">Dpsers(ranged):</font>` }, { text: "&#09;" },
					{ text: `<font color="${LBlC}" size="+18">&#40;Sorcerer&#41;</font>`, command: "fps gui class sorcerer" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${LBlC}" size="+18">&#40;Archer&#41;</font>`, command: "fps gui class archer" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${LBlC}" size="+18">&#40;Gunner&#41;</font>`, command: "fps gui class gunner" }
				], `<font color="${LPrC}">[FPS] Options - Skills </font><font color="${YlwC}">(Choose class)</font>`);
				break;
			case "class":
				gui.parse(SkillJsonSearch(arg), `<font color="${LPrC}">[FPS] Options - Skill list for '${arg}'</font>`);
				break;
			case "role":
				gui.parse([
					{ text: `<font color="${PrpC}" size="+24"><p align="right">MAIN MENU</p></font><br><br>`, command: "fps gui" },
					{ text: `<font color="${YlwC}" size="+20">By Roles:</font>` }, { text: "&#09;" },
					{ text: `<font color="${Cfg.RolesBlacklist.includes('tank') ? GrnC : RedC}" size="+18">[Tankers]</font>`, command: `fps ${Cfg.RolesBlacklist.includes('tank') ? "show" : "hide"} tank;fps gui role` }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${Cfg.RolesBlacklist.includes('healer') ? GrnC : RedC}" size="+18">[Healers]</font>`, command: `fps ${Cfg.RolesBlacklist.includes('healer') ? "show" : "hide"} healer;fps gui role` }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${Cfg.RolesBlacklist.includes('dps') ? GrnC : RedC}" size="+18" >[Dps-All]</font>`, command: `fps ${Cfg.RolesBlacklist.includes('dps') ? "show" : "hide"} dps;fps gui role` }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${Cfg.RolesBlacklist.includes('ranged') ? GrnC : RedC}" size="+18">[Dps-Ranged]</font><br><br><br><br>`, command: `fps ${Cfg.RolesBlacklist.includes('ranged') ? "show" : "hide"} ranged;fps gui role` },
					{ text: `<font color="${DBlC}" size="+22">By Classes</font><br><br>` },
					{ text: `<font color="${YlwC}" size="+20">Tankers:</font>` }, { text: "&#09;&#09;" },
					{ text: `<font color="${Cfg.ClassesBlacklist.includes('lancer') ? GrnC : RedC}" size="+18">[Lancer]</font>`, command: `fps ${Cfg.ClassesBlacklist.includes('lancer') ? "show" : "hide"} lancer;fps gui role` }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${Cfg.ClassesBlacklist.includes('brawler') ? GrnC : RedC}" size="+18">[Brawler]</font><br><br>`, command: `fps ${Cfg.ClassesBlacklist.includes('brawler') ? "show" : "hide"} brawler;fps gui role` },
					{ text: `<font color="${YlwC}" size="+20">Healers:</font>` }, { text: "&#09;&#09;" },
					{ text: `<font color="${Cfg.ClassesBlacklist.includes('priest') ? GrnC : RedC}" size="+18">[Priest]</font>`, command: `fps ${Cfg.ClassesBlacklist.includes('priest') ? "show" : "hide"} priest;fps gui role` }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${Cfg.ClassesBlacklist.includes('mystic') ? GrnC : RedC}" size="+18">[Mystic]</font><br><br>`, command: `fps ${Cfg.ClassesBlacklist.includes('mystic') ? "show" : "hide"} mystic;fps gui role` },
					{ text: `<font color="${YlwC}" size="+20">Dpsers(melee):</font>` }, { text: "&#09;" },
					{ text: `<font color="${Cfg.ClassesBlacklist.includes('warrior') ? GrnC : RedC}" size="+18">[Warrior]</font>`, command: `fps ${Cfg.ClassesBlacklist.includes('warrior') ? "show" : "hide"} warrior;fps gui role` }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${Cfg.ClassesBlacklist.includes('slayer') ? GrnC : RedC}" size="+18">[Slayer]</font>`, command: `fps ${Cfg.ClassesBlacklist.includes('slayer') ? "show" : "hide"} slayer;fps gui role` }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${Cfg.ClassesBlacklist.includes('berserker') ? GrnC : RedC}" size="+18">[Berserker]</font>`, command: `fps ${Cfg.ClassesBlacklist.includes('berserker') ? "show" : "hide"} berserker;fps gui role` }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${Cfg.ClassesBlacklist.includes('ninja') ? GrnC : RedC}" size="+18">[Ninja]</font>`, command: `fps ${Cfg.ClassesBlacklist.includes('ninja') ? "show" : "hide"} ninja;fps gui role` }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${Cfg.ClassesBlacklist.includes('valkyrie') ? GrnC : RedC}" size="+18">[Valkyrie]</font>`, command: `fps ${Cfg.ClassesBlacklist.includes('valkyrie') ? "show" : "hide"} valkyrie;fps gui role` }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${Cfg.ClassesBlacklist.includes('reaper') ? GrnC : RedC}" size="+18">[Reaper]</font><br><br>`, command: `fps ${Cfg.ClassesBlacklist.includes('reaper') ? "show" : "hide"} reaper;fps gui role` },
					{ text: `<font color="${YlwC}" size="+20">Dpsers(ranged):</font>` }, { text: "&#09;" },
					{ text: `<font color="${Cfg.ClassesBlacklist.includes('sorcerer') ? GrnC : RedC}" size="+18">[Sorcerer]</font>`, command: `fps ${Cfg.ClassesBlacklist.includes('sorcerer') ? "show" : "hide"} sorcerer;fps gui role` }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${Cfg.ClassesBlacklist.includes('archer') ? GrnC : RedC}" size="+18">[Archer]</font>`, command: `fps ${Cfg.ClassesBlacklist.includes('archer') ? "show" : "hide"} archer;fps gui role` }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${Cfg.ClassesBlacklist.includes('gunner') ? GrnC : RedC}" size="+18">[Gunner]</font>`, command: `fps ${Cfg.ClassesBlacklist.includes('gunner') ? "show" : "hide"} gunner;fps gui role` }
				], `<font color="${LPrC}">[FPS] Options - Roles/Classes</font>`);
				break;
			case "abn":
				TmpData.push(
					{ text: `<font color="${PrpC}" size="+24"><p align="right">MAIN MENU</p></font><br>`, command: "fps gui" },
					{ text: `<font color="${AbnDebug ? GrnC : RedC}" size="+19"><p align="right">Debug</p></font><br>`, command: "fps abn log;fps gui abn" },
					{ text: `<font color="${LPrC}" size="+19">Blacklist: </font><font color="${PnkC}" size="17+">Click to remove from the blacklist.</font><br>` }
				);
				Cfg.AbnormalitiesBlacklist.forEach(el => TmpData.push({ text: `<font color="${BnzC}" size="+16">${el}<br></font>`, command: `fps abn blacklist remv ${el};fps gui abn` }));
				gui.parse(TmpData, `<font color="${LPrC}">[FPS] Options - Abnormalities</font>`);
				break;
			case "proj":
				TmpData.push(
					{ text: `<font color="${PrpC}" size="+24"><p align="right">MAIN MENU</p></font><br>`, command: "fps gui" },
					{ text: `<font color="${ProjDebug ? GrnC : RedC}" size="+19"><p align="right">Debug</p></font><br>`, command: "fps proj log;fps gui proj" },
					{ text: `<font color="${LPrC}" size="+19">Blacklist: </font><font color="${PnkC}" size="17+">Click to remove from the blacklist.</font><br>` }
				);
				Cfg.ProjectilesBlacklist.forEach(el => TmpData.push({ text: `<font color="${BnzC}" size="+16">${el}<br></font>`, command: `fps proj blacklist remv ${el};fps gui proj` }));
				gui.parse(TmpData, `<font color="${LPrC}">[FPS] Options - Projectiles</font>`);
				break;
			case "help":
				gui.parse([
					{ text: `<font color="${PrpC}" size="+24"><p align="right">MAIN MENU</p></font><br>`, command: "fps gui" },
					{ text: `<font size="20"><font color="${LBlC}">Command</font>            <font color="${SlvC}">Arg(s)</font>                 <font color="${CPkC}">Example</font><br>` },
					{ text: `<font color="${HBlC}">gui ^ g</font>                      <font color="${DBlC}">N/A</font>                    <font color="${HPkC}">!fps gui</font><br>` },
					{ text: `<font color="${HBlC}"> N/A </font>                         <font color="${DBlC}">N/A</font>                    <font color="${HPkC}">!fps-util</font><br>` },
					{ text: `<font color="${HBlC}">0 ^ 1 ^ 2 ^ 3</font>              <font color="${DBlC}">N/A</font>                    <font color="${HPkC}">!0 ^ !1 ^ !2 ^ !3</font><br>` },
					{ text: `<font color="${HBlC}">mode</font>                  <font color="${DBlC}">0 ^ 1 ^ 2 ^ 3</font>            <font color="${HPkC}">!fps mode 2</font><br>` },
					{ text: `<font color="${HBlC}">hide^show</font>    <font color="${DBlC}">Player^Class^Role</font>      <font color="${HPkC}">!fps hide mie</font><br>` },
					{ text: `<font color="${HBlC}">party</font>                         <font color="${DBlC}">N/A</font>                    <font color="${HPkC}">!fps party</font><br>` },
					{ text: `<font color="${HBlC}">raid</font>                           <font color="${DBlC}">N/A</font>                    <font color="${HPkC}">!fps raid</font><br>` },
					{ text: `<font color="${HBlC}">list</font>                            <font color="${DBlC}">N/A</font>                    <font color="${HPkC}">!fps list</font><br>` },
					{ text: `<font color="${HBlC}">sums</font>                 <font color="${DBlC}">other ^ me</font>               <font color="${HPkC}">!fps sums me</font><br>` },
					{ text: `<font color="${HBlC}">skill</font>                       <font color="${DBlC}">blacklist</font>               <font color="${HPkC}">!fps skill blacklist</font><br>` },
					{ text: `<font color="${HBlC}">npc</font>                      <font color="${DBlC}">N/A ^ hide</font>             <font color="${HPkC}">!fps npc</font><br>` },
					{ text: `<font color="${HBlC}">hit</font>                  <font color="${DBlC}">me^other^damage</font>    <font color="${HPkC}">!fps hit me</font><br>` },
					{ text: `<font color="${HBlC}">firework</font>                 <font color="${DBlC}">N/A</font>                     <font color="${HPkC}">!fps firework</font><br>` },
					{ text: `<font color="${HBlC}">abn</font>                   <font color="${DBlC}">all ^ blacklist</font>          <font color="${HPkC}">!fps abn blacklist</font><br>` },
					{ text: `<font color="${HBlC}">proj</font>                   <font color="${DBlC}">all ^ blacklist</font>          <font color="${HPkC}">!fps proj all</font><br>` },
					{ text: `<font color="${HBlC}">guildlogo</font>                <font color="${DBlC}">N/A</font>                    <font color="${HPkC}">!fps guildlogo</font><br>` },
					{ text: `<font color="${HBlC}">style</font>                        <font color="${DBlC}">N/A</font>                    <font color="${HPkC}">!fps style</font><br>` },
					{ text: `<font color="${HBlC}">gui npcsearch</font>      <font color="${DBlC}">"target"</font>                <font color="${HPkC}">!fps gui npcsearch E</font><br>` },
					{ text: `<font color="${HBlC}">npczoom</font>                 <font color="${DBlC}">N/A</font>                    <font color="${HPkC}">!fps npczoom</font><br>` },
					{ text: `<font color="${HBlC}">dropitem</font>                 <font color="${DBlC}">N/A ^ hide</font>        <font color="${HPkC}">!fps dropitem</font><br>` },
					{ text: `<font color="${HBlC}">monsterdeathani</font>   <font color="${DBlC}">N/A</font>                    <font color="${HPkC}">!fps monsterdeathani</font><br>` },
					{ text: `<font color="${HBlC}">screenabns</font>             <font color="${DBlC}">N/A ^  hide</font>       <font color="${HPkC}">!fps screenabns</font><br>` },
					{ text: `<font color="${HBlC}">hpnumbers</font>             <font color="${DBlC}">N/A</font>                    <font color="${HPkC}">!fps hpnumbers</font><br>` },
					{ text: `<font color="${HBlC}">mpnumbers</font>            <font color="${DBlC}">N/A</font>                    <font color="${HPkC}">!fps mpnumbers</font><br>` },
					{ text: `<font color="${HBlC}">pet</font>                          <font color="${DBlC}">N/A</font>                     <font color="${HPkC}">!fps raid</font><br>` },
					{ text: `<font color="${HBlC}">guardian</font>                <font color="${DBlC}">N/A</font>                      <font color="${HPkC}">!fps guardian</font><br>` },
					{ text: `<font color="${HBlC}">muteothers</font>            <font color="${DBlC}">N/A</font>                      <font color="${HPkC}">!fps muteothers</font><br>` },
					{ text: `<font color="${HBlC}">stream</font>                   <font color="${DBlC}">N/A</font>                      <font color="${HPkC}">!fps stream</font></font><br>` },
				], `<font color="${LPrC}">[FPS] HELP</font>`);
				break;
			default:
				gui.parse([
					{ text: `<font color="${PrpC}" size="+15"><p align="right">REFRESH</p></font><br>`, command: "fps gui" },
					{ text: `<font color="${YlwC}" size="+20">Modes:</font>` }, { text: "&#09;&#09;" },
					{ text: `<font color="${Cfg.Mode === 0 ? GrnC : RedC}" size="+18">[Mode 0]</font>`, command: "fps mode 0;fps gui" }, { text: "&nbsp;&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${Cfg.Mode === 1 ? GrnC : RedC}" size="+18">[Mode 1]</font>`, command: "fps mode 1;fps gui" }, { text: "&nbsp;&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${Cfg.Mode === 2 ? GrnC : RedC}" size="+18">[Mode 2]</font>`, command: "fps mode 2;fps gui" }, { text: "&nbsp;&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${Cfg.Mode === 3 ? GrnC : RedC}" size="+18">[Mode 3]</font><br><br>`, command: "fps mode 3;fps gui" },
					{ text: `<font color="${YlwC}" size="+20">Hit:</font>` }, { text: "&#09;&#09;&#09;" },
					{ text: `<font color="${Cfg.Hit_Other ? GrnC : RedC}" size="+18">[Players]</font>`, command: "fps hit other;fps gui" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${Cfg.Hit_Me ? GrnC : RedC}" size="+18">[Own]</font>`, command: "fps hit me;fps gui" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${Cfg.Hit_Damage ? GrnC : RedC}" size="+18">[Dmg/heal numbers]</font>`, command: "fps hit damage;fps gui" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${Cfg.Hit_All ? GrnC : RedC}" size="+18">[ALL]</font><br><br>`, command: "fps hit all;fps gui" },
					{ text: `<font color="${YlwC}" size="+20">Hide:</font>` }, { text: "&#09;&#09;" },
					{ text: `<font color="${LBlC}" size="+18">[Classes/Roles]</font>`, command: "fps gui role" }, { text: "&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${Cfg.ShowStyle ? GrnC : RedC}" size="+18">[Style]</font>`, command: "fps style;fps gui" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${Cfg.Hideguildlogos ? GrnC : RedC}" size="+18">[Guild Logos]</font>`, command: "fps guildlogo;fps gui" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${Cfg.HideFireworks ? GrnC : RedC}" size="+18">[Firework]</font>`, command: "fps fireworks;fps gui" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${Cfg.HideServantBalloons ? GrnC : RedC}" size="+18">[Pets Popup]</font><br><br>`, command: "fps petspopup;fps gui" },
					{ text: `<font color="${YlwC}" size="+20">Self(own):</font>` }, { text: "&#09;" },
					{ text: `<font color="${Cfg.HideHpNumbers ? GrnC : RedC}" size="+18">[HP Nums]</font>`, command: "fps hpnumbers;fps gui" }, { text: "&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${Cfg.HideMpNumbers ? GrnC : RedC}" size="+18">[MP Nums]</font>`, command: "fps mpnumbers;fps gui" }, { text: "&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${Cfg.HideMySummons ? GrnC : RedC}" size="+18">[Own summons]</font>`, command: "fps summons me;fps gui" }, { text: "&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${Cfg.HideMyServants ? GrnC : RedC}" size="+18">[Pets]</font>`, command: "fps pet me;fps gui" }, { text: "&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${Cfg.HideOwnBlacklistedAbns ? GrnC : RedC}" size="+18">[Blur/dizzy]</font><br>`, command: "fps screenabns;fps gui" },
					{ text: `<font color="${YlwC}" size="+20">Players:</font>` }, { text: "&#09;&#09;" },
					{ text: `<font color="${LBlC}" size="+18">[Spawned list]</font>`, command: "fps gui show" }, { text: "&nbsp;&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${LBlC}" size="+18">[Hidden list]</font>`, command: "fps gui hide" }, { text: "&nbsp;&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${Cfg.HideOthersSummons ? GrnC : RedC}" size="+18">[Players summons]</font>`, command: "fps summons;fps gui" }, { text: "&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${Cfg.HideOthersServants ? GrnC : RedC}" size="+18">[Pets]</font><br>`, command: "fps pet;fps gui" },
					{ text: `<font color="${YlwC}" size="+20">NPCs:</font>` }, { text: "&#09;&#09;" },
					{ text: `<font color="${LBlC}" size="+18">[Menu]</font>`, command: "fps gui npcmain" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${Cfg.HideMonsterDeathAnimation ? GrnC : RedC}" size="+18">[Hide Death Ani]</font>`, command: "fps monsterdeathani;fps gui" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${Cfg.ActionScripts ? GrnC : RedC}" size="+18">[Zoom-ins]</font>`, command: "fps npczoom;fps gui" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${Cfg.HideBlacklistedNpcs ? GrnC : RedC}" size="+18">[Hide Blacklisted]</font><br><br>`, command: "fps npc;fps gui" },
					{ text: `<font color="${YlwC}" size="+20">Skills:</font>` }, { text: "&#09;&#09;" },
					{ text: `<font color="${LBlC}" size="+18">[Hide individually]</font>`, command: "fps gui skills" }, { text: "&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${Cfg.HideBlacklistedSkills ? GrnC : RedC}" size="+18">[Hide Blacklisted]</font><br>`, command: "fps skill blacklist;fps gui" },
					{ text: `<font color="${YlwC}" size="+20">Abnormal:</font>` }, { text: "&#09;" },
					{ text: `<font color="${Cfg.HideAllAbnormalities ? GrnC : RedC}" size="+18">[Hide ALL]</font>`, command: "fps abn all;fps gui" }, { text: "&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${Cfg.HideBlacklistedAbnormalities ? GrnC : RedC}" size="+18">[Hide Blacklisted]</font>`, command: "fps abn blacklist;fps gui" }, { text: "&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${LBlC}" size="+18">[Black List]</font><br>`, command: "fps gui abn" },
					{ text: `<font color="${YlwC}" size="+20">Projectile:</font>` }, { text: "&#09;" },
					{ text: `<font color="${Cfg.HideAllProjectiles ? GrnC : RedC}" size="+18">[Hide ALL]</font>`, command: "fps proj all;fps gui" }, { text: "&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${Cfg.HideBlacklistedProjectiles ? GrnC : RedC}" size="+18">[Hide Blacklisted]</font>`, command: "fps proj blacklist;fps gui" }, { text: "&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${LBlC}" size="+18">[Black List]</font><br><br>`, command: "fps gui proj" },
					{ text: `<font color="${YlwC}" size="+20">Misc.</font>` }, { text: "&#09;&#09;" },
					{ text: `<font color="${Cfg.RaidAutoChange ? GrnC : RedC}" size="+18">[Raid auto state]</font>`, command: "fps raid;fps gui" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${Cfg.OnlyParty ? GrnC : RedC}" size="+18">[Only Party]</font>`, command: "fps party;fps gui" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${Cfg.HideBlacklistedDrop ? GrnC : RedC}" size="+18">[Drops BList]</font>`, command: "fps dropitem;fps gui" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${Cfg.PvpTraps ? GrnC : RedC}" size="+17">[Show Traps]</font><br>`, command: "fps pvptraps;fps gui" }, { text: "&#09;&#09;&#09;" },
					{ text: `<font color="${Cfg.GuardianAutoChange ? GrnC : RedC}" size="+17">[Guardian auto state]</font>`, command: "fps guardian;fps gui" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${Cfg.MuteOthersVoice ? GrnC : RedC}" size="+17">[Mute others voice]</font>`, command: "fps muteothers;fps gui" }, { text: "&nbsp;&nbsp;" },
					{ text: `<font color="${Cfg.StreamMode ? GrnC : RedC}" size="+17">[Stream]</font><br><br>`, command: "fps stream;fps gui" },
					{ text: `<font color="${BluC}" size="+22">Quick Links:</font><br>` },
					{ text: `<font color="${YlwC}" size="+20">UI:</font>` }, { text: "&#09;&#09;" },
					{ text: `<font color="${PrpC}" size="+17">[Mail]</font>`, command: "fps quicklink parcel" }, { text: "&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${PrpC}" size="+17">[Broker]</font>`, command: "fps quicklink broker" }, { text: "&nbsp;&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${PrpC}" size="+17">[Talent]</font>`, command: "fps quicklink talents" }, { text: "&nbsp;&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${PrpC}" size="+17">[Dress]</font>`, command: "fps quicklink dressingroom" }, { text: "&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${PrpC}" size="+17">[Hat Style]</font><br>`, command: "fps quicklink hatrestyle" },
					{ text: `<font color="${YlwC}" size="+20">Party:</font>` }, { text: "&#09;" },
					{ text: `<font color="${CPkC}" size="+18">[Reset]</font>`, command: "fps quicklink reset" }, { text: "&nbsp;&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${CPkC}" size="+18">[Leave]</font>`, command: "fps quicklink drop" }, { text: "&nbsp;&nbsp;&nbsp;&nbsp;" },
					{ text: `<font color="${CPkC}" size="+18">[Disband]</font><br>`, command: "fps quicklink disband" },
					{ text: `<font color="${YlwC}" size="+20">System:</font>` }, { text: "&#09;" },
					{ text: `<font color="${CPkC}" size="+18">[Character Selection]</font>`, command: "fps quicklink lobby" }, { text: "&#09;&#09;&#09;&#09;&#09;" },
					{ text: `<font color="${CPkC}" size="+18">[! Instant Exit !]</font><br>`, command: "fps quicklink instantexit" }
				], `<font color="${LPrC}">[FPS] Options</font> | <font color="${RedC}" size="+16">Red</font><font color="${LPrC}" size="+16"> = disabled, <font color="${GrnC}" size="+16">Green</font><font color="${LPrC}" size="+16"> = enabled</font>`);
				break;
		}
		TmpData = [];
	}

	// ~~~ * Gui Functions * ~~~ \\

	function SkillJsonSearch(value) {
		let keys = [],
			skilldata = [],
			skillIds = [];
		skilldata.push(
			{ text: `<font color="${PrpC}" size="+24"><p align="right">MAIN MENU</p></font><br>`, command: "fps gui" },
			{ text: `<font color="${Cfg.HideBlacklistedSkills ? GrnC : RedC}" size="+22"><p align="right">[Blacklisted skills are ${Cfg.HideBlacklistedSkills ? 'Hidden' : 'Shown'}]</p></font><br>`, command: `fps skill blacklist;fps gui class ${value}` },
			{ text: `<font color="${LBlC}" size="+19">Click skill to blacklist it.</font><br>` }
		);
		for (const key in SkillData[value]) keys.push(key);
		skillIds.push(Object.values(SkillData[value]));
		for (let i = 0; i < keys.length; i++)
			skilldata.push({ command: `fps skill class ${value} ${skillIds[0][i]};fps gui class ${value}`, text: `<font color="${Cfg.ClassesData[ClassNameFromID(value)].CD_SkillsBlacklist.includes(skillIds[0][i].toString()) ? GrnC : RedC}" size="+17">[${keys[i]}]</font><br>` });
		return skilldata;
	}

	function NpcJsonSearch(type, arg) {
		TmpData.push({ text: `<font color="${PrpC}" size="+24"><p align="right">MAIN MENU</p></font><br><br>`, command: "fps gui" });
		for (const data of NpcData)
			if (type === 'starts' && data.Nm.startsWith(arg) || type === 'search' && data.Nm.includes(arg))
				TmpData.push({ command: `fps npc hide ${data.Hz} ${data.Ti};fps gui ${type === 'starts' ? 'npc' : 'npcsearch'} ${arg}`, text: `<font color="${Cfg.NpcsBlacklist.some(arrVal => data.Hz === arrVal.zone && data.Ti === arrVal.templateId) ? GrnC : RedC}" size="+17">${data.Nm}</font><br>` });
		gui.parse(TmpData, `<font color="${LPrC}">[FPS] Options - NPCs</font> | <font color="${LBlC}" size="+16">Search results for '${arg}'</font>.`);
		TmpData = [];
	}

	function ClassNameFromID(name) {
		for (const cData of Object.keys(Cfg.ClassesData)) if (Cfg.ClassesData[cData].name === name) return cData;
	}

	// ~~~ * Command Functions * ~~~ \\

	function Msg(msg) {
		if (Cfg.StreamMode) return;
		mod.command.message(`<font color="${LPrC}">${NotCP ? '[FPS] ' : ''}${msg}</font>`);
	}

	function RemoveEntity(arr, elem) {
		if (elem.length)
			for (const [index, value] of arr.entries())
				if (value.toLowerCase() === elem.toLowerCase()) arr.splice(index, 1);
		return arr;
	}

	function ScaleUpEntity(gameId, scale) {
		mod.toClient('S_ABNORMALITY_SCALE_UP', 2, { gameId, scale, duration: 0 });
	}

	function HideSpecificPlayerByName(name) {
		for (const sUser in SUsers) {
			if (SUsers[sUser].name.toString().toLowerCase() === name.toLowerCase()) {
				mod.toClient('S_DESPAWN_USER', 3, { gameId: SUsers[sUser].gameId, type: 1 });
				HUsers[SUsers[sUser].gameId] = SUsers[sUser];
				break;
			}
		}
	}

	function HideSpecificNpcByHzTi(hz, ti) {
		for (const sNpc in SNpcs) {
			if (SNpcs[sNpc].huntingZoneId === hz && SNpcs[sNpc].templateId === ti) {
				mod.toClient('S_DESPAWN_NPC', 3, { gameId: SNpcs[sNpc].gameId, loc: SNpcs[sNpc].loc, type: 1, unk: 0 });
				HNpcs[SNpcs[sNpc].gameId] = SNpcs[sNpc];
				HNpcs[SNpcs[sNpc].gameId].spawnType = 1;
				HNpcs[SNpcs[sNpc].gameId].spawnScript = 0;
				break;
			}
		}
	}

	function HideSpecificNpcByGid(gameId) {
		mod.toClient('S_DESPAWN_NPC', 3, { gameId, loc: SNpcs[gameId].loc, type: 1, unk: 0 });
		HNpcs[gameId] = SNpcs[gameId];
		HNpcs[gameId].spawnType = 1;
		HNpcs[gameId].spawnScript = 0;
	}

	function HideNpcs(type, whose) {
		switch (type) {
			case 'own':
			case 'others':
				for (const sNpc in SNpcs)
					if ((type === 'own' && EqGid(SNpcs[sNpc].owner) || type === 'others' && !EqGid(SNpcs[sNpc].owner)) && UserNpcs.includes(SNpcs[sNpc].templateId) && SNpcs[sNpc].huntingZoneId === UserNpcsHzId) HideSpecificNpcByGid(SNpcs[sNpc].gameId);
				break;
			case 'bl':
				for (const sNpc in SNpcs)
					for (const blNpc of Cfg.NpcsBlacklist)
						if (SNpcs[sNpc].huntingZoneId === Number(blNpc.zone) && SNpcs[sNpc].templateId === Number(blNpc.templateId)) HideSpecificNpcByGid(SNpcs[sNpc].gameId);
				break;
			case 'pet':
				for (const sPet in SPets) {
					if (EqGid(SPets[sPet].ownerId) && whose === 'own') {
						UpdateNpcLoc(SPets[sPet], -100);
						ScaleUpEntity(SPets[sPet].gameId, 0.001);
					}
					if (!EqGid(SPets[sPet].ownerId) && whose === 'others')
						mod.toClient('S_REQUEST_DESPAWN_SERVANT', 1, { gameId: SPets[sPet].gameId, despawnType: 1 });
					HPets[SPets[sPet].gameId] = SPets[sPet];
				}
				break;
			default: break;
		}
	}

	function HideAllPlayers() {
		if (Cfg.OnlyParty) return undefined;
		for (const sUser in SUsers) {
			mod.toClient('S_DESPAWN_USER', 3, { gameId: SUsers[sUser].gameId, type: 1 });
			HUsers[SUsers[sUser].gameId] = SUsers[sUser];
			HUsers[SUsers[sUser].gameId].spawnFx = 1;
		}
	}

	function ShowSpecificPlayerByName(name) {
		for (const hUser in HUsers) {
			if (HUsers[hUser].name.toString().toLowerCase() === name.toLowerCase()) {
				ModifyUserAppearance(HUsers[hUser]);
				mod.toClient('S_SPAWN_USER', 16, HUsers[hUser]);
				delete HUsers[hUser];
				break;
			}
		}
	}

	function ShowSpecificNpcByHzTi(hz, ti) {
		for (const hNpc in HNpcs) {
			if (HNpcs[hNpc].huntingZoneId === hz && HNpcs[hNpc].templateId === ti) {
				mod.toClient('S_SPAWN_NPC', 11, HNpcs[hNpc]);
				delete HNpcs[hNpc];
				break;
			}
		}
	}

	function ShowSpecificNpcByGid(gameId) {
		mod.toClient('S_SPAWN_NPC', 11, HNpcs[gameId]);
		delete HNpcs[gameId];
	}

	function ShowNpcs(type, whose) {
		switch (type) {
			case 'own':
			case 'others':
				for (const hNpc in HNpcs)
					if (type === 'own' && EqGid(HNpcs[hNpc].owner || type === 'others' && !EqGid(HNpcs[hNpc].owner)) && UserNpcs.includes(HNpcs[hNpc].templateId) && HNpcs[hNpc].huntingZoneId === UserNpcsHzId) ShowSpecificNpcByGid(HNpcs[hNpc].gameId);
				break;
			case 'bl':
				for (const hNpc in HNpcs)
					for (const blNpc of Cfg.NpcsBlacklist)
						if (HNpcs[hNpc].huntingZoneId === Number(blNpc.zone) && HNpcs[hNpc].templateId === Number(blNpc.templateId)) ShowSpecificNpcByGid(HNpcs[hNpc].gameId);
				break;
			case 'pet':
				for (const hPet in HPets) {
					if (EqGid(HPets[hPet].ownerId) && whose === 'own') {
						UpdateNpcLoc(HPets[hPet]);
						ScaleUpEntity(HPets[hPet].gameId, 1);
					}
					else if (!EqGid(HPets[hPet].ownerId) && whose === 'others')
						mod.toClient('S_REQUEST_SPAWN_SERVANT', 4, HPets[hPet]);
					delete HPets[hPet];
				}
				break;
			default: break;
		}
	}

	function ShowAllPlayers() {
		for (const hUser in HUsers) {
			ModifyUserAppearance(HUsers[hUser]);
			mod.toClient('S_SPAWN_USER', 16, HUsers[hUser]);
			delete HUsers[hUser];
		}
	}

	// ~~~ * Core Functions * ~~~ \\

	function ModifyUserAppearance(event) {
		let modified = undefined;

		if (Cfg.ShowStyle) {
			event.weapon = StarterWeaponIds[event.templateId % 100 - 1];
			event.body = event.hand = event.feet = event.underwear = event.head = event.face = 0;
			if (event.mount) event.mount = MountToReplaceId;
			event.title = 0;
			event.weaponDye = event.bodyDye = event.handDye = event.feetDye = event.weaponEnchant = 0;
			event.showFace = false;
			event.styleHead = event.styleFace = event.styleBack = event.styleWeapon = event.styleBody = 0;
			event.underwearDye = event.styleBackDye = event.styleHeadDye = event.styleFaceDye = 0;
			event.showStyle = false;
			event.styleFootprint = event.styleHeadScale = event.styleFaceScale = event.styleBackScale = 0;
			event.usedStyleHeadTransform = false;
			event.styleBodyDye = 0;
			event.icons = [];

			modified = true;
		}

		if (Cfg.Hideguildlogos) {
			event.guildLogo = '';
			event.guildLogoId = 0;

			modified = true;
		}

		if (Cfg.MuteOthersVoice) {
			event.appearance.voice = InvalidVoiceId;

			modified = true;
		}

		return modified;
	}

	function ModifyAbnormalities(event, end) {
		if (ImportantAbns.indexOf(event.id) !== -1) return undefined;

		if (ReplaceAbnIds[event.id]) {
			event.id = ReplaceAbnIds[event.id];

			return true;
		}

		if (!end) {
			if (EqGid(event.target)) {
				if (Cfg.HideOwnBlacklistedAbns && Cfg.OwnAbnormalsBlacklist.indexOf(event.id) !== -1) return false;

				return undefined;
			}

			if (HUsers[event.target] || HNpcs[event.target] || event.id === AbnNoEffectInvisibleNpcSpamId) return false;
			if (Cfg.HideBlacklistedAbnormalities && (Cfg.AbnormalitiesBlacklist.indexOf(event.id) !== -1 || BlockedAbns.indexOf(event.id) !== -1)) return false;
			if (Cfg.HideAllAbnormalities && (SUsers[event.target] || Cfg.AbnormalitiesBlacklist.indexOf(event.id) !== -1 || BlockedAbns.indexOf(event.id) !== -1)) return false;
		}
	}

	function ActionHCheck(event, end) {
		let hidden = false;

		if (EqGid(event.gameId) || !SUsers[event.gameId]) return undefined;

		if (Cfg.Mode >= 2 || HUsers[event.gameId] || Cfg.ClassesData[ClassID(event.templateId)].CD_HideBlacklistedSkills) hidden = true;
		if (Cfg.HideBlacklistedSkills && Cfg.ClassesData[ClassID(event.templateId)].CD_SkillsBlacklist.includes(Math.floor(event.skill.id / 1E4).toString())) hidden = true;

		if (hidden) UpdateUserLoc(event);

		if (HNpcs[event.gameId]) {
			HNpcs[event.gameId].loc = event.loc;

			hidden = true;
		}

		return !end && hidden ? false : undefined;
	}

	function ProjectileBCheck(event) {
		let blocked = false;

		if (event.skill.id === SmokeBombId || (Cfg.PvpTraps && TrapsIds.includes(event.skill.id))) return undefined;

		if ((Cfg.HideBlacklistedProjectiles || Cfg.HideAllProjectiles) && Cfg.ProjectilesBlacklist.includes(event.skill.id)) blocked = true;
		if (!EqGid(event.gameId) && SUsers[event.gameId] && (HUsers[event.gameId] || Cfg.Mode >= 2 || Cfg.HideAllProjectiles)) blocked = true;

		return blocked ? false : undefined;
	}

	function ModifySkillResult(event) {
		let modified = undefined;

		if (Cfg.Hit_Me && (EqGid(event.source) || EqGid(event.owner))) {
			event.templateId = 0;
			event.skill.id = 0;
			event.time = event.type = event.noctEffect = 0;
			event.crit = event.stackExplode = event.superArmor = false;
			event.superArmorId = event.hitCylinderId = 0;

			modified = true;
		}

		if (Cfg.Hit_Other && !EqGid(event.target) && !EqGid(event.source) && !EqGid(event.owner) && (SUsers[event.owner] || SUsers[event.source])) {
			event.templateId = 0;
			event.skill.id = 0;
			event.time = event.type = event.noctEffect = 0;
			event.crit = event.stackExplode = event.superArmor = false;
			event.superArmorId = event.hitCylinderId = 0;

			modified = true;
		}

		if (Cfg.Hit_Damage && (EqGid(event.source) || EqGid(event.owner) || EqGid(event.target) || UserNpcs.includes(event.templateId) && event.skill.huntingZoneId === UserNpcsHzId)) {
			event.value = 0n;

			modified = true;
		}

		if (Cfg.Hit_All) {
			event.templateId = 0;
			event.skill.id = 0;
			event.time = event.type = event.noctEffect = 0;
			event.value = 0n;
			event.crit = event.stackExplode = event.superArmor = false;
			event.superArmorId = event.hitCylinderId = 0;

			modified = true;
		}

		return modified;
	}

	const UserBCheck = user => { for (const plBlist of Cfg.PlayersBlacklist) if (plBlist.toLowerCase() === user.toLowerCase()) return true; };

	function NpcBCheck(event) {
		let blocked = false;

		if (Cfg.HideBlacklistedNpcs) {
			for (const blNpc of Cfg.NpcsBlacklist) {
				if (event.huntingZoneId === Number(blNpc.zone) && event.templateId === Number(blNpc.templateId)) {
					HNpcs[event.gameId] = event;
					HNpcs[event.gameId].spawnType = 1;
					HNpcs[event.gameId].spawnScript = 0;
					blocked = true;
					break;
				}
			}
		}

		if (InvisibleNpcs[event.huntingZoneId] && InvisibleNpcs[event.huntingZoneId].includes(event.templateId)) {
			HNpcs[event.gameId] = event;
			blocked = true;
		}

		if (Cfg.HideFireworks && event.huntingZoneId === UserNpcsHzId && FireWorks.includes(event.templateId)) {
			HNpcs[event.gameId] = event;
			blocked = true;
		}

		if (UserNpcs.includes(event.templateId) && event.huntingZoneId === UserNpcsHzId) {
			if (EqGid(event.owner) && Cfg.HideMySummons) {
				HNpcs[event.gameId] = event;
				HNpcs[event.gameId].spawnType = 1;
				HNpcs[event.gameId].spawnScript = 0;
				blocked = true;

			} else if (!EqGid(event.owner) && Cfg.HideOthersSummons) {
				HNpcs[event.gameId] = event;
				HNpcs[event.gameId].spawnType = 1;
				HNpcs[event.gameId].spawnScript = 0;
				blocked = true;
			}
		}

		return blocked ? false : undefined;
	}

	function EqGid(xG) {
		return (xG === MyGameId);
	}

	function ClassID(m) {
		return (m % 100);
	}

	function log(name, type, from, target, id) {
		console.log(`[\x1b[37m${new Date().toJSON().slice(11)}\x1b[39m] \x1b[91m->\x1b[39m \x1b[36m${name}\x1b[39m \x1b[35m${type}\x1b[39m \x1b[97m${from}\x1b[39m \x1b[32m'${target}'\x1b[39m: \x1b[94m\ID\x1b[39m "\x1b[31m${id}\x1b[39m\x1b[49m\x1b[0m"`);
	}

	function UpdateUserLoc(event) {
		mod.toClient('S_USER_LOCATION', 5, { gameId: event.gameId, loc: event.loc, w: event.w, speed: 3E2, dest: event.loc, type: 7 });
	}

	function UpdateNpcLoc(event, zMod = 0) {
		mod.toClient('S_NPC_LOCATION', 3, { gameId: event.gameId, loc: { x: event.loc.x, y: event.loc.y, z: event.loc.z + zMod }, w: event.w, speed: 3E2, dest: { x: event.loc.x, y: event.loc.y, z: event.loc.z + zMod }, type: 7 });
	}

	// ~~~ * Hook Functions * ~~~ \\

	function sLogin(event) {
		LastFState = event.name === MyName ? LastFState : null;
		LastGState = null;
		MyGameId = event.gameId;
		MyName = event.name;
		ProjDebug = false;
		AbnDebug = false;
		if (Cfg.StreamMode) console.log("\x1b[94mINFO\x1b[34m [FPS-UTILS]\x1b[39m - Steam Mode is enabled, No messages will be sent in-game messages until its disabled.");
	}

	function sLoadTopo() {
		SUsers = {};
		SNpcs = {};
		HUsers = {};
		HNpcs = {};
		AllowedAchUps = 2;
		if (ProjDebug) {
			ProjDebug = false;
			Msg(`<font color="${HPkC}">Auto Disabled</font> projectile debug, to reduce the unneeded spam.`);
		}
		if (AbnDebug) {
			AbnDebug = false;
			Msg(`<font color="${HPkC}">Auto Disabled</font> abnormalities debug, to reduce the unneeded spam.`);
		}
	}

	function sLeaveParty() {
		if (Cfg.OnlyParty)
			for (const sUser in SUsers)
				if (PMembers.includes(SUsers[sUser].name)) HideSpecificPlayerByName(SUsers[sUser].name);
		PMembers = [];
		if (Cfg.RaidAutoChange) {
			if (LastFState === null || Cfg.Mode !== 2) {
				LastFState = null;
				return;
			}
			mod.command.exec(`fps mode ${LastFState}`);
			LastFState = null;
		}
	}

	function sMountVehicle(event) {
		if (EqGid(event.gameId)) return;
		SUsers[event.gameId].mount = event.id;
		if (HUsers[event.gameId]) HUsers[event.gameId].mount = event.id;
		if (Cfg.ShowStyle) {
			event.id = MountToReplaceId;
			return true;
		}
	}

	function sUnmountVehicle(event) {
		if (EqGid(event.gameId)) return;
		SUsers[event.gameId].mount = 0;
		if (HUsers[event.gameId]) HUsers[event.gameId].mount = 0;
	}

	function cSetVisibleRange(event) {
		LastVrange = event.range;
	}

	function sStartCooltimeItem(event) {
		if (event.cooldown === 0) return false;
	}

	function sStartActionScript(event) {
		if (ImportantActionScripts.includes(event.script)) return;
		if (Cfg.ActionScripts) return false;
	}

	function sLoadingScreenControlInfo() {
		if (Cfg.Mode >= 2) return false;
	}

	function sUpdateAchievementProgress(event) {
		if (AllowedAchUps) {
			AllowedAchUps--;
			return;
		}
		for (const Achieve of event.achievements) if (SpamAchIds.indexOf(Achieve.id) !== -1 || !Achieve.requirements.length) return false;
	}

	function sItemCustomString(event) {
		if (event.customStrings.length === 0) return false;
	}

	function sSocial(event) {
		if (EqGid(event.target)) return;
		if (HUsers[event.target] || HNpcs[event.target]) return false;
	}

	function sGuildName(event) {
		if (Cfg.Hideguildlogos) {
			event.guildLogo = '';
			return true;
		}
	}

	function sApplyTitle(event) {
		if (EqGid(event.gameId)) return;
		if (Cfg.ShowStyle) return false;
	}

	function sImageData() {
		if (Cfg.Hideguildlogos) return false;
	}

	function sSpawnUser(event) {
		SUsers[event.gameId] = event;
		SUsers[event.gameId].spawnFx = 1;
		if (Cfg.Mode === 3 || UserBCheck(event.name) || Cfg.ClassesData[ClassID(event.templateId)].isHidden || (Cfg.OnlyParty && !PMembers.includes(event.name))) {
			HUsers[event.gameId] = event;
			HUsers[event.gameId].spawnFx = 1;
			return false;
		}
		return ModifyUserAppearance(event);
	}

	function sSpawnUserfn(event) {
		return ModifyUserAppearance(event);
	}

	function sDespawnUser(event) {
		delete HUsers[event.gameId];
		delete SUsers[event.gameId];
	}

	function sUserLocation(event) {
		if (SUsers[event.gameId]) {
			SUsers[event.gameId].loc = event.dest;
			SUsers[event.gameId].w = event.w;
		}
		if (HUsers[event.gameId]) {
			HUsers[event.gameId].loc = event.dest;
			HUsers[event.gameId].w = event.w;
			return false;
		}
	}

	function sUserStatus(event) {
		if (SUsers[event.gameId]) SUsers[event.gameId].status = event.status;
		if (HUsers[event.gameId]) {
			HUsers[event.gameId].status = event.status;
			return false;
		}
	}

	function sDeadLocation(event) {
		if (SUsers[event.gameId]) SUsers[event.gameId].loc = event.loc;
		if (HUsers[event.gameId]) HUsers[event.gameId].loc = event.loc;
	}

	function sUserMovetype(event) {
		if (SUsers[event.gameId]) SUsers[event.gameId].w = event.w;
		if (HUsers[event.gameId]) {
			HUsers[event.gameId].w = event.w;
			return false;
		}
	}

	function sPartyMemberList(event) {
		event.members.map(value => PMembers.push(value.name));
		if (Cfg.OnlyParty)
			for (const sUser in SUsers) {
				if (!PMembers.includes(SUsers[sUser].name)) HideSpecificPlayerByName(SUsers[sUser].name);
				else if (HUsers[SUsers[sUser].gameId]) ShowSpecificPlayerByName(SUsers[sUser].name);
			}
		if (Cfg.RaidAutoChange) {
			if (event.raid) {
				if (Cfg.Mode >= 2 || (LastFState === null && Cfg.Mode === 2)) return;
				LastFState = Cfg.Mode;
				mod.command.exec("fps state 2");
			} else {
				if (LastFState === null || Cfg.Mode !== 2) {
					LastFState = null;
					return;
				}
				mod.command.exec(`fps state ${LastFState}`);
				LastFState = null;
			}
		}
	}

	function sUserAppearanceChange(event) {
		if (EqGid(event.id)) return;
		if (Cfg.ShowStyle) return false;
	}

	function sUserChangeFaceCustom(event) {
		if (EqGid(event.gameId)) return;

		if (Cfg.MuteOthersVoice) {
			event.appearance.voice = InvalidVoiceId;
			return true;
		}
	}

	function sUserExternalChange(event) {
		if (EqGid(event.gameId)) return;
		if (Cfg.ShowStyle) return false;
	}

	function sUnicastTransformData(event) {
		if (EqGid(event.gameId) || !event.gameId) return;
		if (Cfg.ShowStyle) return false;

		let modified = undefined;

		if (Cfg.Hideguildlogos) {
			event.guildLogo = '';

			modified = true;
		}

		if (Cfg.MuteOthersVoice) {
			event.appearance.voice = InvalidVoiceId;

			modified = true;
		}

		return modified;
	}

	function sSpawnNpc(event) {
		SNpcs[event.gameId] = event;
		SNpcs[event.gameId].spawnType = 1;
		SNpcs[event.gameId].spawnScript = 0;
		return NpcBCheck(event);
	}

	function sDespawnNpc(event) {
		delete HNpcs[event.gameId];
		delete SNpcs[event.gameId];
		if (!Cfg.HideMonsterDeathAnimation || event.type !== 5) return;
		event.type = 1;
		return true;
	}

	function sNpcLocation(event) {
		if (SNpcs[event.gameId]) {
			SNpcs[event.gameId].loc = event.dest;
			SNpcs[event.gameId].w = event.w;
		}
		if (SPets[event.gameId]) {
			SPets[event.gameId].loc = event.dest;
			SPets[event.gameId].w = event.w;
		}
		if (HPets[event.gameId]) {
			HPets[event.gameId].loc = event.dest;
			HPets[event.gameId].w = event.w;
			return false;
		}
		if (HNpcs[event.gameId]) {
			HNpcs[event.gameId].loc = event.dest;
			HNpcs[event.gameId].w = event.w;
			return false;
		}
	}

	function sCreatureLife(event) {
		if (SNpcs[event.gameId]) {
			SNpcs[event.gameId].loc = event.loc;
			SNpcs[event.gameId].alive = event.alive;
		}
		if (HNpcs[event.gameId]) {
			SNpcs[event.gameId].loc = event.loc;
			HNpcs[event.gameId].alive = event.alive;
		}
	}

	function sCreatureRotate(event) {
		if (SNpcs[event.gameId]) SNpcs[event.gameId].w = event.w;
		if (HNpcs[event.gameId]) {
			HNpcs[event.gameId].w = event.w;
			return false;
		}
	}

	function sFearMoveStage(event) {
		if ((!EqGid(event.gameId) && Cfg.Mode === 3) || HUsers[event.gameId] || HNpcs[event.gameId]) return false;
	}

	function sFearMoveEnd(event) {
		if ((!EqGid(event.gameId) && Cfg.Mode === 3) || HUsers[event.gameId] || HNpcs[event.gameId]) return false;
	}

	function sRequestSpawnServant(event) {
		SPets[event.gameId] = event;
		if (EqGid(event.ownerId) && Cfg.HideMyServants) {
			HPets[event.gameId] = event;
			process.nextTick(() => {
				UpdateNpcLoc(event, -100);
				ScaleUpEntity(event.gameId, 0.001);
			});
		} else if (!EqGid(event.ownerId) && Cfg.HideOthersServants) {
			HPets[event.gameId] = event;
			return false;
		}
	}

	function sRequestDespawnServant(event) {
		delete HPets[event.gameId];
		delete SPets[event.gameId];
	}

	function sQuestBalloon(event) {
		if (!SPets[event.source]) return;
		if (Cfg.HideServantBalloons) return false;
	}

	function sAbnormalityBegin(event) {
		if (AbnDebug) {
			if (EqGid(event.target)) log('Abnormality', 'Applied', 'on', MyName, event.id);
			if (EqGid(event.source)) log('Abnormality', 'Started', 'from', MyName, event.id);
			if (SUsers[event.target]) log('Abnormality', 'Applied', 'on', SUsers[event.target].name, event.id);
			if (SUsers[event.source]) log('Abnormality', 'Started', 'from', SUsers[event.source].name, event.id);
		}
		return ModifyAbnormalities(event);
	}

	function sAbnormalityRefresh(event) {
		return ModifyAbnormalities(event);
	}

	function sAbnormalityEnd(event) {
		return ModifyAbnormalities(event, true);
	}

	function sActionStage(event) {
		return ActionHCheck(event);
	}

	function sActionEnd(event) {
		return ActionHCheck(event, true);
	}

	function sStartUserProjectile(event) {
		if (ProjDebug) {
			if (EqGid(event.gameId)) log('Projectile', 'Started', 'from', MyName, event.skill.id);
			if (SUsers[event.gameId]) log('Projectile', 'Started', 'from', SUsers[event.gameId].name, event.skill.id);
		}
		return ProjectileBCheck(event);
	}

	function sSpawnProjectile(event) {
		if (event.skill.npc) return;
		if (ProjDebug) {
			if (EqGid(event.gameId)) log('Projectile', 'Spawned', 'from', MyName, event.skill.id);
			if (SUsers[event.gameId]) log('Projectile', 'Spawned', 'from', SUsers[event.gameId].name, event.skill.id);
		}
		return ProjectileBCheck(event);
	}

	function sPlayerChangeMp(event) {
		if (!Cfg.HideMpNumbers || !EqGid(event.target)) return;
		if (event.type !== 0) {
			event.type = 0;
			return true;
		}
	}

	function sCreatureChangeHp(event) {
		if (!Cfg.HideHpNumbers || !EqGid(event.target)) return;
		if (event.type !== 10) {
			event.type = 10;
			return true;
		}
	}

	function sEachSkillResult(event) {
		return ModifySkillResult(event);
	}

	function sItemExplosionResult(event) {
		if (Cfg.Mode >= 2 || (EqGid(event.gameId) && Cfg.Hit_Me) || (!EqGid(event.gameId) && Cfg.Hit_Other) || Cfg.Hit_All || HUsers[event.gameId]) {
			for (const gameId of event.items) {
				if (SUsers[event.gameId] && Cfg.HideBlacklistedDrop && Cfg.DropBlacklist.some(item => MoteIds.indexOf(item) !== -1)) continue;
				mod.toClient('S_DESPAWN_DROPITEM', 4, { gameId });
			}
			return false;
		}
	}

	function sSpawnDropItem(event) {
		if (EqGid(event.source)) return;
		if (Cfg.HideBlacklistedDrop && Cfg.DropBlacklist.indexOf(event.item) !== -1) return false;
		if (Cfg.Mode >= 2) {
			event.explode = 0;
			return true;
		}
	}

	function sFontSwapInfo() {
		if (Cfg.Hit_Damage || Cfg.Hit_All) return false;
	}

	function sSpawnEventSeed(event) {
		if (HUsers[event.owner]) {
			HSeedBoxes[event.gameId] = event;
			return false;
		}
	}

	function sUpdateEventSeedState(event) {
		if (HSeedBoxes[event.gameId]) return false;
	}

	function sResultEventSeed(event) {
		if (HSeedBoxes[event.gameId]) return false;
	}

	function sDespawnEventSeed(event) {
		if (HSeedBoxes[event.gameId]) {
			delete HSeedBoxes[event.gameId];
			return false;
		}
	}

	function sFieldEventOnEnter() {
		if (Cfg.GuardianAutoChange) {
			if ((LastGState !== null && Cfg.Mode === 2) || Cfg.Mode >= 2) return;
			LastGState = Cfg.Mode;
			mod.command.exec("fps state 2");
		}
	}

	function sFieldEventOnLeave() {
		if (Cfg.GuardianAutoChange) {
			if (LastGState === null || Cfg.Mode !== 2) {
				LastGState = null;
				return;
			}
			mod.command.exec(`fps state ${LastGState}`);
			LastGState = null;
		}
	}

	// ~~~ * Packet Hooks * ~~~ \\

	mod.hook('S_LOGIN', 14, sLogin)
	mod.hook('S_LOAD_TOPO', 'raw', sLoadTopo)
	mod.hook('S_LEAVE_PARTY', 'raw', sLeaveParty)
	mod.hook('S_MOUNT_VEHICLE', 2, LastHook, sMountVehicle)
	mod.hook('S_UNMOUNT_VEHICLE', 2, LastHook, sUnmountVehicle)
	mod.hook('C_SET_VISIBLE_RANGE', 1, cSetVisibleRange)
	mod.hook('S_START_COOLTIME_ITEM', 1, LastHook, sStartCooltimeItem)
	mod.hook('S_START_ACTION_SCRIPT', 3, LastHook, sStartActionScript)

	mod.hook('S_LOADING_SCREEN_CONTROL_INFO', 'raw', LastHook, sLoadingScreenControlInfo)
	mod.hook('S_UPDATE_ACHIEVEMENT_PROGRESS', 1, LastHookfn, sUpdateAchievementProgress)
	mod.hook('S_ITEM_CUSTOM_STRING', 2, LastHook, sItemCustomString)

	mod.hook('S_SOCIAL', 1, LastHook, sSocial)
	mod.hook('S_GUILD_NAME', 2, LastHook, sGuildName)
	mod.hook('S_APPLY_TITLE', 3, LastHook, sApplyTitle)
	mod.hook('S_IMAGE_DATA', 'raw', LastHook, sImageData)

	mod.hook('S_SPAWN_USER', 16, LastHook, sSpawnUser)
	mod.hook('S_SPAWN_USER', 16, LastHookfn, sSpawnUserfn)
	mod.hook('S_DESPAWN_USER', 3, sDespawnUser)
	mod.hook('S_USER_LOCATION', 5, LastHook, sUserLocation)
	mod.hook('S_USER_STATUS', 3, LastHook, sUserStatus)
	mod.hook('S_DEAD_LOCATION', 2, sDeadLocation)
	mod.hook('S_USER_MOVETYPE', 1, LastHook, sUserMovetype)
	mod.hook('S_PARTY_MEMBER_LIST', 7, sPartyMemberList)
	mod.hook('S_USER_APPEARANCE_CHANGE', 1, LastHook, sUserAppearanceChange)
	mod.hook('S_USER_CHANGE_FACE_CUSTOM', 2, LastHook, sUserChangeFaceCustom)
	mod.hook('S_USER_EXTERNAL_CHANGE', 7, LastHook, sUserExternalChange)
	mod.hook('S_UNICAST_TRANSFORM_DATA', 6, LastHook, sUnicastTransformData)

	mod.hook('S_SPAWN_NPC', 11, LastHook, sSpawnNpc)
	mod.hook('S_DESPAWN_NPC', 3, LastHook, sDespawnNpc)
	mod.hook('S_NPC_LOCATION', 3, LastHook, sNpcLocation)
	mod.hook('S_CREATURE_LIFE', 3, sCreatureLife)
	mod.hook('S_CREATURE_ROTATE', 2, LastHook, sCreatureRotate)
	mod.hook('S_FEARMOVE_STAGE', 2, LastHook, sFearMoveStage)
	mod.hook('S_FEARMOVE_END', 2, LastHook, sFearMoveEnd)

	mod.hook('S_REQUEST_SPAWN_SERVANT', 4, LastHook, sRequestSpawnServant)
	mod.hook('S_REQUEST_DESPAWN_SERVANT', 1, LastHook, sRequestDespawnServant)
	mod.hook('S_QUEST_BALLOON', 1, LastHook, sQuestBalloon)

	mod.hook('S_ABNORMALITY_BEGIN', 3, LastHookfn, sAbnormalityBegin)
	mod.hook('S_ABNORMALITY_REFRESH', 1, LastHookfn, sAbnormalityRefresh)
	mod.hook('S_ABNORMALITY_END', 1, LastHookfn, sAbnormalityEnd)

	mod.hook('S_ACTION_STAGE', 9, LastHook, sActionStage)
	mod.hook('S_ACTION_END', 5, LastHook, sActionEnd)
	mod.hook('S_SPAWN_PROJECTILE', 5, LastHook, sSpawnProjectile)
	mod.hook('S_START_USER_PROJECTILE', 9, LastHook, sStartUserProjectile)
	mod.hook('S_PLAYER_CHANGE_MP', 1, LastHook, sPlayerChangeMp)
	mod.hook('S_CREATURE_CHANGE_HP', 6, LastHook, sCreatureChangeHp)
	mod.hook('S_ITEM_EXPLOSION_RESULT', 2, LastHook, sItemExplosionResult)
	mod.hook('S_EACH_SKILL_RESULT', 14, LastHook, sEachSkillResult)
	mod.hook('S_SPAWN_DROPITEM', 9, LastHook, sSpawnDropItem)
	mod.hook('S_FONT_SWAP_INFO', 'raw', LastHookfn, sFontSwapInfo)

	mod.hook('S_SPAWN_EVENT_SEED', 2, LastHookfn, sSpawnEventSeed)
	mod.hook('S_UPDATE_EVENT_SEED_STATE', 4, LastHookfn, sUpdateEventSeedState)
	mod.hook('S_RESULT_EVENT_SEED', 2, LastHookfn, sResultEventSeed)
	mod.hook('S_DESPAWN_EVENT_SEED', 1, LastHookfn, sDespawnEventSeed)

	mod.hook('S_FIELD_EVENT_ON_ENTER', 'raw', sFieldEventOnEnter)
	mod.hook('S_FIELD_EVENT_ON_LEAVE', 'raw', sFieldEventOnLeave)

	// ~~~ * Commands * ~~~ \\

	mod.command.add('0', () => mod.command.exec('fps mode 0'));
	mod.command.add('1', () => mod.command.exec('fps mode 1'));
	mod.command.add('2', () => mod.command.exec('fps mode 2'));
	mod.command.add('3', () => mod.command.exec('fps mode 3'));

	mod.command.add(['fps', '!fps', 'fps-utils', '!fps-utils'], (key, arg, arg2, arg3) => {
		key = key ? key.toLowerCase() : key;
		arg = arg ? arg.toLowerCase() : arg;
		arg2 = arg2 ? arg2.toLowerCase() : arg2;
		arg3 = arg3 ? arg3.toLowerCase() : arg3;
		switch (key) {
			case "b": mod.command.exec('fps skills blacklist'); break;
			case "p": mod.command.exec('fps party'); break;
			case "g": case "gui": GuiHandler(arg, arg2); break;
			case "0": mod.command.exec('fps mode 0'); break;
			case "1": mod.command.exec('fps mode 1'); break;
			case "2": mod.command.exec('fps mode 2'); break;
			case "3": mod.command.exec('fps mode 3'); break;
			case "m": case "mod": case "mode": case "state":
				switch (arg) {
					case "0": case "off": case "zero":
						if (Cfg.Mode === 3) ShowAllPlayers();
						Cfg.Mode = 0;
						Cfg.HideAllAbnormalities = false;
						Cfg.HideAllProjectiles = false;
						if (!Cfg.Hit_All) Cfg.Hit_Other = false;
						Msg(`<font color="${RedC}">Mode 0</font>.`);
						break;
					case "1": case "one":
						if (Cfg.Mode === 3) ShowAllPlayers();
						Cfg.Mode = 1;
						Cfg.HideAllAbnormalities = false;
						Cfg.HideAllProjectiles = true;
						if (!Cfg.Hit_All) Cfg.Hit_Other = true;
						Msg(`<font color="${BnzC}">Mode 1</font>.`);
						break;
					case "2": case "two":
						if (Cfg.Mode === 3) ShowAllPlayers();
						Cfg.Mode = 2;
						Cfg.HideAllAbnormalities = true;
						Cfg.HideAllProjectiles = true;
						if (!Cfg.Hit_All) Cfg.Hit_Other = true;
						Msg(`<font color="${SlvC}">Mode 2</font>.`);
						break;
					case "3": case "three":
						HideAllPlayers();
						Cfg.Mode = 3;
						Cfg.HideAllAbnormalities = true;
						Cfg.HideAllProjectiles = true;
						if (!Cfg.Hit_All) Cfg.Hit_Other = true;
						Cfg.OnlyParty = false;
						Msg(`<font color="${GldC}">Mode 3</font>.`);
						break;
					default:
						Msg(`<font color="${GryC}">Invalid" ${arg}"</font>.`);
						Msg(`Modes: "<font color="${PnkC}">[0, 1, 2, 3]</font>.`);
						break;
				}
				break;
			case "hide":
				if (typeof arg === "string" && arg !== null) {
					if (Cfg.PlayersBlacklist.includes(arg)) return Msg(`Player '${arg}' <font color="${RedC}">Already hidden</font>.`);
					else
						if ((PClasses.includes(arg) && !Cfg.ClassesBlacklist.includes(arg)) || (PRoles.includes(arg) && !Cfg.RolesBlacklist.includes(arg))) {
							for (const cData in Cfg.ClassesData) {
								if ((Cfg.ClassesData[cData].name === arg || Cfg.ClassesData[cData].role.includes(arg)) && !Cfg.ClassesData[cData].isHidden) {
									Cfg.ClassesData[cData].isHidden = true;
									if (Cfg.ClassesData[cData].name === arg) Cfg.ClassesBlacklist.push(arg);
									if (Cfg.ClassesData[cData].role.includes(arg)) Cfg.RolesBlacklist.push(arg);
									let classtohide = Cfg.ClassesData[cData].model;
									for (const sUser in SUsers)
										if (ClassID(SUsers[sUser].templateId) === classtohide) HideSpecificPlayerByName(SUsers[sUser].name);
								}
							}
							Msg(`Class/Role ${arg} <font color="${GrnC}">Hidden</font>.`);
							return;
						} else if (Cfg.ClassesBlacklist.includes(arg) || Cfg.RolesBlacklist.includes(arg)) return Msg(`Class/Role '${arg}' <font color="${RedC}">Already hidden</font>.`);
					Msg(`Player '${arg}' <font color="${GrnC}">Hidden</font>.`);
					Cfg.PlayersBlacklist.push(arg);
					HideSpecificPlayerByName(arg);
				} else Msg(`<font color="${GryC}">Invalid ${arg2}</font>.`);
				break;
			case "show":
				if (typeof arg === "string" && arg !== null) {
					if (Cfg.PlayersBlacklist.includes(arg)) {
						ShowSpecificPlayerByName(arg);
						RemoveEntity(Cfg.PlayersBlacklist, arg);
						Msg(`Player '${arg}' <font color="${RedC}">Shown</font>.`);
						return;
					}
					if ((PClasses.includes(arg) && Cfg.ClassesBlacklist.includes(arg)) || (Cfg.RolesBlacklist.includes(arg) && PRoles.includes(arg))) {
						for (const cData in Cfg.ClassesData) {
							if (Cfg.ClassesData[cData].name === arg || Cfg.ClassesData[cData].role.includes(arg)) {
								if (Cfg.ClassesData[cData].name === arg) RemoveEntity(Cfg.ClassesBlacklist, arg);
								if (Cfg.ClassesData[cData].role.includes(arg)) RemoveEntity(Cfg.RolesBlacklist, arg);
								Cfg.ClassesData[cData].isHidden = false;
								let classToShow = Cfg.ClassesData[cData].model;
								for (const hUser in HUsers) if (ClassID(HUsers[hUser].templateId) === classToShow) ShowSpecificPlayerByName(HUsers[hUser].name);
							}
						}
						Msg(`Class '${arg}' <font color="${RedC}">Shown</font>.`);
					} else if (!Cfg.ClassesBlacklist.includes(arg) || !Cfg.RolesBlacklist.includes(arg)) Msg(`Class/Role '${arg}' <font color="${RedC}">Already shown</font>.`);
					else if (!Cfg.PlayersBlacklist.includes(arg)) Msg(`Player '${arg}' <font color="${RedC}">Already shown</font>.`);
					else Msg(`<font color="${GryC}">Invalid ${arg2}</font>.`);
				}
				break;
			case "party":
				if (Cfg.Mode === 3) return Msg(`<font color="${RedC}">You've to disable mode 3 first</font>.`);
				//if(!PMembers.length) return Msg(`<font color="${GryC}">You must be in party in-order to enable this</font>.`);
				Cfg.OnlyParty = !Cfg.OnlyParty;
				if (Cfg.OnlyParty) {
					for (const sUser in SUsers) {
						if (!PMembers.includes(SUsers[sUser].name)) HideSpecificPlayerByName(SUsers[sUser].name);
						else if (HUsers[SUsers[sUser].gameId]) ShowSpecificPlayerByName(SUsers[sUser].name);
					}
				} else ShowAllPlayers();
				Msg(`Everyone but party ${Cfg.OnlyParty ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
				break;
			case "raid":
				Cfg.RaidAutoChange = !Cfg.RaidAutoChange;
				Msg(`Raid auto-state ${Cfg.RaidAutoChange ? `<font color="${GrnC}">Enabled</font>` : `<font color="${RedC}">Disabled</font>`}.`);
				if (!Cfg.GuardianAutoChange) LastFState = null;
				break;
			case "guardian":
				Cfg.GuardianAutoChange = !Cfg.GuardianAutoChange;
				Msg(`Guardian auto-state ${Cfg.GuardianAutoChange ? `<font color="${GrnC}">Enabled</font>` : `<font color="${RedC}">Disabled</font>`}.`);
				if (!Cfg.GuardianAutoChange) LastGState = null;
				break;
			case "pvptraps":
				Cfg.PvpTraps = !Cfg.PvpTraps;
				Msg(`Pvp Traps are ${Cfg.PvpTraps ? `<font color="${GrnC}">Shown<font color="${PnkC}">(not affected by hide all projectiles)</font></font>` : `<font color="${RedC}">Normal<font color="${PnkC}">(affected by hide all projectiles)</font></font>`}.`);
				break;
			case "list":
				Msg(`<font color="${PnkC}">Hidden players: ${Cfg.PlayersBlacklist.length ? Cfg.PlayersBlacklist.join(', ') : 0}</font>.`);
				Msg(`<font color="${PnkC}">Hidden classes: ${Cfg.ClassesBlacklist.length ? Cfg.ClassesBlacklist.join(', ') : 0}</font>.`);
				Msg(`<font color="${PnkC}">Hidden roles: ${Cfg.RolesBlacklist.length ? Cfg.RolesBlacklist.join(', ') : 0}</font>.`);
				break;
			case "summons": case "sums":
				switch (arg) {
					case "me": case "own":
						Cfg.HideMySummons = !Cfg.HideMySummons;
						Cfg.HideMySummons ? HideNpcs('own') : ShowNpcs('own');
						Msg(`Own summoned NPCs are ${Cfg.HideMySummons ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
						break;
					default:
						Cfg.HideOthersSummons = !Cfg.HideOthersSummons;
						Cfg.HideOthersSummons ? HideNpcs('others') : ShowNpcs('others');
						Msg(`Others summoned NPCs are ${Cfg.HideOthersSummons ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
						break;
				}
				break;
			case "skills": case "skill":
				switch (arg) {
					case "blacklist":
						Cfg.HideBlacklistedSkills = !Cfg.HideBlacklistedSkills;
						Msg(`Blacklisted skills ${Cfg.HideBlacklistedSkills ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
						break;
					case "class":
						if (PClasses.includes(arg2)) {
							for (const cData in Cfg.ClassesData) {
								if (Cfg.ClassesData[cData].name === arg2) {
									if (arg3 && !isNaN(arg3) && arg3 < 50) {
										if (Cfg.ClassesData[cData].CD_SkillsBlacklist.includes(arg3)) {
											let index = Cfg.ClassesData[cData].CD_SkillsBlacklist.indexOf(arg3);
											if (index !== -1) {
												Cfg.ClassesData[cData].CD_SkillsBlacklist.splice(index, 1);
												Msg(`Skill ID '${arg3}' <font color="${RedC}">Shown</font> for class '${arg2}'.`);
											}
											return;
										} else {
											Cfg.ClassesData[cData].CD_SkillsBlacklist.push(arg3);
											Msg(`Skill ID '${arg3}' <font color="${GrnC}">Hidden</font> for class '${arg2}'.`);
											return;
										}
									} else {
										Cfg.ClassesData[cData].CD_HideBlacklistedSkills = !Cfg.ClassesData[cData].CD_HideBlacklistedSkills;
										Msg(`Skills for '${arg2}' class ${Cfg.ClassesData[cData].CD_HideBlacklistedSkills ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
										return;
									}
								}
							}
						} else Msg(`<font color="${RedC}">Class ${arg2} not found</font>.`);
						break;
				}
				break;
			case "npcs": case "npc":
				if (arg === 'hide') {
					if (!arg2 || !arg3) {
						Cfg.HideBlacklistedNpcs = !Cfg.HideBlacklistedNpcs;
						Msg(`Blacklisted NPCs ${Cfg.HideBlacklistedNpcs ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
						break;
					}
					const found = Cfg.NpcsBlacklist.some(s => s.zone === arg2 && s.templateId === arg3);
					if (found) {
						if (Cfg.HideBlacklistedNpcs) ShowSpecificNpcByHzTi(Number(arg2), Number(arg3));
						Msg(`NPC HntZone '${arg2}', TmpId '${arg3}' <font color="${RedC}">Removed from the blacklist</font>.`);
						Cfg.NpcsBlacklist = Cfg.NpcsBlacklist.filter(obj => obj.zone !== arg2 || obj.templateId !== arg3);
					} else {
						if (Cfg.HideBlacklistedNpcs) HideSpecificNpcByHzTi(Number(arg2), Number(arg3));
						Msg(`NPC HntZone '${arg2}', TmpId '${arg3}' <font color="${GrnC}">Added to the blacklist</font>.`);
						Cfg.NpcsBlacklist.push({ zone: arg2, templateId: arg3 });
					}
					return;
				} else {
					Cfg.HideBlacklistedNpcs = !Cfg.HideBlacklistedNpcs;
					Cfg.HideBlacklistedNpcs ? HideNpcs('bl') : ShowNpcs('bl');
					Msg(`Blacklisted NPCs ${Cfg.HideBlacklistedNpcs ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
				}
				break;
			case "hit":
				switch (arg) {
					case "me":
						if (Cfg.Hit_All) return Msg(`<font color="${RedC}">You've to disable hit ALL first</font>.`);
						Cfg.Hit_Me = !Cfg.Hit_Me;
						Msg(`Own hits effect ${Cfg.Hit_Me ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
						break;
					case "other":
						if (Cfg.Hit_All) return Msg(`<font color="${RedC}">You've to disable hit ALL first</font>.`);
						Cfg.Hit_Other = !Cfg.Hit_Other;
						Msg(`Players hit effect ${Cfg.Hit_Other ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
						break;
					case "damage":
						if (Cfg.Hit_All) return Msg(`<font color="${RedC}">You've to disable hit ALL first</font>.`);
						Cfg.Hit_Damage = !Cfg.Hit_Damage;
						Msg(`Damage numbers ${Cfg.Hit_Damage ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
						break;
					case "all":
						Cfg.Hit_Me = Cfg.Hit_Other = Cfg.Hit_Damage = false;
						Cfg.Hit_All = !Cfg.Hit_All;
						Msg(`Hit all ${Cfg.Hit_All ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
						break;
					default:
						Msg(`<font color="${GryC}">Invalid &#40;hit&#41; '${arg}'</font>.`);
						break;
				}
				break;
			case "fireworks": case "firework":
				Cfg.HideFireworks = !Cfg.HideFireworks;
				Msg(`Fireworks ${Cfg.HideFireworks ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
				break;
			case "abn": case "effects": case "abnormal": case "abnormalities":
				switch (arg) {
					case "all":
						Cfg.HideAllAbnormalities = !Cfg.HideAllAbnormalities;
						Msg(`All Abnormalities ${Cfg.HideAllAbnormalities ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
						break;
					case "blacklist":
						if (!arg2 || !arg3) {
							Cfg.HideBlacklistedAbnormalities = !Cfg.HideBlacklistedAbnormalities;
							Msg(`Blacklisted Abnormalities ${Cfg.HideBlacklistedAbnormalities ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
							break;
						} else if (arg2 && arg3) {
							arg3 = Number(arg3);
							if (!Cfg.AbnormalitiesBlacklist.includes(arg3)) {
								if (arg2 === 'add') {
									Cfg.AbnormalitiesBlacklist.push(arg3);
									Msg(`Blacklisted Abnormalities <font color="${GrnC}">added '${arg3}'</font>.`);
									return;
								} else if (arg2 === 'remv') return Msg(`Blacklisted Abnormalities <font color="${RedC}">can't remove '${arg3}' as it's not there</font>.`);

							} else if (Cfg.AbnormalitiesBlacklist.includes(arg3)) {
								if (arg2 === 'add') return Msg(`Blacklisted Abnormalities <font color="${RedC}">can't add '${arg3}' as it's already there</font>.`);
								else if (arg2 === 'remv') {
									let index = Cfg.AbnormalitiesBlacklist.indexOf(arg3);
									if (index !== -1) {
										Cfg.AbnormalitiesBlacklist.splice(index, 1);
										Msg(`Blacklisted Abnormalities <font color="${RedC}">removed '${arg3}'</font>.`);
										return;
									}
								}
							} else return Msg(`<font color="${GryC}">Invalid &#40;abnormalities Blacklist&#41; '${arg}'</font>.`);
						}
						break;
					case "log":
					case "debug":
						AbnDebug = !AbnDebug;
						if (AbnDebug) Msg(`Abnormalities debug <font color="${GrnC}">started</font>, check your proxy console for details.`)
						else Msg(`Abnormalities debug <font color="${RedC}">stopped</font>.`);
						break;
					default:
						Msg(`<font color="${GryC}">Invalid &#40;abnormalities&#41; '${arg}'</font>.`);
						break;
				}
				break;
			case "guildlogo":
				if (SwitchCd) return Msg(`<font color="${PnkC}">Try again in 3 seconds</font>.`);
				Cfg.Hideguildlogos = !Cfg.Hideguildlogos;
				mod.toServer('C_SET_VISIBLE_RANGE', 1, { range: 0 });
				mod.setTimeout(() => mod.toServer('C_SET_VISIBLE_RANGE', 1, { range: LastVrange }), 15E2);
				SwitchCd = true;
				mod.setTimeout(() => SwitchCd = false, 28E2);
				Msg(`Guild Logos ${Cfg.Hideguildlogos ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
				break;
			case "costume": case "style":
				if (SwitchCd) return Msg(`<font color="${PnkC}">Try again in 3 seconds</font>.`);
				Cfg.ShowStyle = !Cfg.ShowStyle;
				mod.toServer('C_SET_VISIBLE_RANGE', 1, { range: 0 });
				mod.setTimeout(() => mod.toServer('C_SET_VISIBLE_RANGE', 1, { range: LastVrange }), 15E2);
				SwitchCd = true;
				mod.setTimeout(() => SwitchCd = false, 28E2);
				Msg(`Style of NPCs & others ${Cfg.ShowStyle ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
				break;
			case "proj": case "projectile":
				switch (arg) {
					case "all":
						Cfg.HideAllProjectiles = !Cfg.HideAllProjectiles;
						Msg(`Projectiles ${Cfg.HideAllProjectiles ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
						break;
					case "blacklist":
						if (!arg2 || !arg3) {
							Cfg.HideBlacklistedProjectiles = !Cfg.HideBlacklistedProjectiles;
							Msg(`Blacklisted projectile ${Cfg.HideBlacklistedProjectiles ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
							break;
						} else if (arg2 && arg3) {
							arg3 = Number(arg3);
							if (!Cfg.ProjectilesBlacklist.includes(arg3)) {
								if (arg2 === 'add') {
									Cfg.ProjectilesBlacklist.push(arg3);
									Msg(`Blacklisted projectile <font color="${GrnC}">added '${arg3}'</font>.`);
									return;
								} else if (arg2 === 'remv') return Msg(`Blacklisted projectile <font color="${RedC}">can't remove '${arg3}' as it's not there</font>.`);
							} else if (Cfg.ProjectilesBlacklist.includes(arg3)) {
								if (arg2 === 'add') return Msg(`Blacklisted projectile <font color="${RedC}">can't add '${arg3}' as it's already there</font>.`);
								else if (arg2 === 'remv') {
									let index = Cfg.ProjectilesBlacklist.indexOf(arg3);
									if (index !== -1) {
										Cfg.ProjectilesBlacklist.splice(index, 1);
										Msg(`Blacklisted projectile <font color="${RedC}">removed '${arg3}'</font>.`);
										return;
									}
								}
							} else return Msg(`<font color="${GryC}">Invalid &#40;projectile Blacklist&#41; '${arg}'</font>.`);
						}
						break;
					case "log": case "debug":
						ProjDebug = !ProjDebug;
						if (ProjDebug) Msg(`Projectile debug <font color="${GrnC}">started</font>, check your proxy console for details.`);
						else Msg(`Projectile debug <font color="${RedC}">stopped</font>.`);
						break;
					default:
						Msg(`<font color="${GryC}">Invalid &#40;projectile&#41; '${arg}'</font>.`);
						break;
				}
				break;
			case "quicklink":
				switch (arg) {
					case "mail": case "parcel":
						mod.toServer('C_REQUEST_CONTRACT', 1, { type: 8 });
						break;
					case "talent": case "talents":
						mod.toServer('C_REQUEST_CONTRACT', 1, { type: 78 });
						break;
					case "broker":
						mod.toClient('S_NPC_MENU_SELECT', 1, { type: 28 });
						break;
					case "dress": case "dressingroom":
						mod.toServer('C_REQUEST_CONTRACT', 1, { type: 77 });
						break;
					case "hat": case "hatrestyle":
						mod.toServer('C_REQUEST_CONTRACT', 1, { type: 91 });
						break;
					case "lobby":
						mod.toServer('C_RETURN_TO_LOBBY', 1);
						break;
					case "exit": case "instantexit":
						mod.toClient('S_EXIT', 3, { category: 0, code: 0 });
						break;
					case "drop":
						mod.toServer('C_LEAVE_PARTY', 1);
						break;
					case "disband":
						mod.toServer('C_DISMISS_PARTY', 1);
						break;
					case "reset":
						mod.toServer('C_RESET_ALL_DUNGEON', 1);
						break;
					default:
						Msg(`<font color="${GryC}">Invalid &#40;quicklink&#41; '${arg}'</font>.`);
						break;
				}
				break;
			case "npczoom":
				Cfg.ActionScripts = !Cfg.ActionScripts;
				Msg(`Npc zoom-ins ${Cfg.ActionScripts ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
				break;
			case "dropitem": case "drops":
				if (arg === 'hide') {
					if (!arg2) {
						Cfg.HideBlacklistedDrop = !Cfg.HideBlacklistedDrop;
						Msg(`Blacklisted Drops ${Cfg.HideBlacklistedDrop ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
						break;
					}
					arg2 = Number(arg2);
					const found1 = Cfg.DropBlacklist.some(s => s === arg2);
					if (found1) {
						Msg(`Drops id '${arg2}' <font color="${RedC}">Removed from the blacklist</font>.`);
						Cfg.DropBlacklist = Cfg.DropBlacklist.filter(obj => obj !== Number(arg2));
					} else {
						Msg(`Drops id '${arg2}' <font color="${GrnC}">Added to the blacklist</font>.`);
						Cfg.DropBlacklist.push(arg2);
					}
					return;
				} else Cfg.HideBlacklistedDrop = !Cfg.HideBlacklistedDrop;
				Msg(`Blacklisted Drops ${Cfg.HideBlacklistedDrop ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
				break;
			case "monsterdeathani": case "monstersdeathani":
				Cfg.HideMonsterDeathAnimation = !Cfg.HideMonsterDeathAnimation;
				Msg(`Monsters Death Animation is ${Cfg.HideMonsterDeathAnimation ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
				break;
			case "screenabns": case "blur":
				if (arg === 'hide') {
					if (!arg2) {
						Cfg.HideOwnBlacklistedAbns = !Cfg.HideOwnBlacklistedAbns;
						Msg(`Blacklisted ScreenAbns ${Cfg.OwnAbnormalsBlacklist ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
						break;
					}
					arg2 = Number(arg2);
					const found2 = Cfg.OwnAbnormalsBlacklist.some(m => m === arg2);
					if (found2) {
						Msg(`Abnormal id '${arg2}' <font color="${RedC}">Removed from the blacklist</font>.`);
						Cfg.OwnAbnormalsBlacklist = Cfg.OwnAbnormalsBlacklist.filter(obj => obj !== Number(arg2));
					} else {
						Msg(`Abnormal id '${arg2}' <font color="${GrnC}">Added to the blacklist</font>.`);
						Cfg.OwnAbnormalsBlacklist.push(arg2);
					}
					return;
				} else Cfg.HideOwnBlacklistedAbns = !Cfg.HideOwnBlacklistedAbns;
				Msg(`Blacklisted ScreenAbns ${Cfg.HideOwnBlacklistedAbns ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
				break;
			case "pet": case "pets": case "servant": case "servants":
				switch (arg) {
					case "me":
						Cfg.HideMyServants = !Cfg.HideMyServants;
						Cfg.HideMyServants ? HideNpcs('pet', 'own') : ShowNpcs('pet', 'own');
						Msg(`Own Servants are ${Cfg.HideMyServants ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
						break;
					default:
						Cfg.HideOthersServants = !Cfg.HideOthersServants;
						Cfg.HideOthersServants ? HideNpcs('pet', 'others') : ShowNpcs('pet', 'others');
						Msg(`Others summoned Servants are ${Cfg.HideOthersServants ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
						break;
				}
				break;
			case "hpnumbers":
				Cfg.HideHpNumbers = !Cfg.HideHpNumbers;
				Msg(`Own Hp numbers ${Cfg.HideHpNumbers ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
				break;
			case "mpnumbers":
				Cfg.HideMpNumbers = !Cfg.HideMpNumbers;
				Msg(`Own Mp numbers ${Cfg.HideMpNumbers ? `<font color="${GrnC}">Hidden</font>` : `<font color="${RedC}">Shown</font>`}.`);
				break;
			case "muteothers":
				Cfg.MuteOthersVoice = !Cfg.MuteOthersVoice;
				Msg(`Mute others voice is ${Cfg.MuteOthersVoice ? `<font color="${GrnC}">Enabled</font>` : `<font color="${RedC}">Disabled</font>`}.`);
				break;
			case "petspopup":
				Cfg.HideServantBalloons = !Cfg.HideServantBalloons;
				Msg(`Hide Pets Popup chat balloons is ${Cfg.HideServantBalloons ? `<font color="${GrnC}">Enabled</font>` : `<font color="${RedC}">Disabled</font>`}.`);
				break;
			case "stream":
				Cfg.StreamMode = !Cfg.StreamMode;
				Msg(`Stream mode is ${Cfg.StreamMode ? `<font color="${GrnC}">Enabled</font>` : `<font color="${RedC}">Disabled</font>`}.`);
				if (Cfg.StreamMode) console.log("\x1b[94mINFO\x1b[34m [FPS-UTILS]\x1b[39m - Steam Mode has been enabled, No messages will be sent in-game messages until its disabled.");
				else console.log("\x1b[94mINFO\x1b[34m [FPS-UTILS]\x1b[39m - Steam Mode has been disabled.");
				break;
			case "help": case "h":
				mod.command.exec("fps gui help");
				break;
			default:
				//Msg(`<font color="${RedC}">Unknown command, check command list</font>.`);
				//mod.command.exec("fps gui help");
				mod.command.exec("fps gui");
				break;
		}
		if (!NotCP && typeof Cfg.ClassesData["12"] === 'undefined') mod.saveSettings();
	})
}