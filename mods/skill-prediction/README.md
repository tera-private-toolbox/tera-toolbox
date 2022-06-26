## Skill Prediction
Simulates skills client-side, eliminating ping-based delays and animation lock.

**Note**: Skill Prediction does **not** reduce your actual ping to the server. If you wish to have lower ping in general, consider renting an optimized gaming VPN such as [Mudfish](https://mudfish.net/), [Pingzapper](https://pingzapper.com/) or [WTFast](https://www.wtfast.com/) or different ones.

### Troubleshooting
#### Delayed skills:
* Disable **[Windows Defender](https://www.windowscentral.com/how-permanently-disable-windows-defender-windows-10)** and **[Windows 10 Game Mode](https://www.windowscentral.com/how-enable-disable-game-mode-windows-10-creators-update)**.
* Bank or delete any **Noctenium Infusion** in your inventory (even if you aren't using it).

#### Ghosting / Disconnects over unstable WiFi:
* Edit `tera-proxy/settings/skill-prediction.json` and change the following settings:
```
"skills": {
	"retryCount": 1,
	"retryMs": 60,
},
"ping": {
	"interval": 3300,
}
```

## Developers
### config/skills.js
This file contains skill data specific to skill-prediction. The basic structure is as follows:
* `classId` -> `skillGroup` -> `skillSub` -> `skillData` **OR**
* `classId` -> `skillGroup` -> `'*'` -> `skillData` **OR**
* `classId` -> `'*'` -> `skillData` **OR**
* `'*'` -> `skillId` -> `skillData`

`skillGroup` and `skillSub` are derived from the skill ID, which tends to follow a pattern for player skills:
* **XXYYZZ** where **X** = `skillGroup`, **Y** = `skillLevel`, **Z** = `skillSub`

`skillData` is an object containing one or more of the following properties, or a truthy value such as `true` to inherit defaults:
* **type**: SP-specific skill type, one of the following:
* * `'hold'`: Temporarily-held skills (Corruption Ring).
* * `'holdInfinite'`: Infinitely-held skills (Stand Fast, Axe Block, etc.).
* * `'dash'`: Fixed-speed dash using S_INSTANT_DASH.
* * `'teleport'`: Fixed-distance teleport using S_INSTANT_MOVE.
* * `'lockon'`
* * `'lockonCast'`
* * `'userProjectile'`: Client-sided projectile (not a skill).
* **fixedSpeed** (boolean): Ignore attack speed.
* **length**: The skill animation length before taking into account speed multipliers.
* **distance**: The distance the skill moves the player in the direction it's facing.
* **moveDir**: Distance rotation in half-turns (default 0).
* **noInterrupt** (array): A list of skills that cannot be interrupted by this skill. Each entry can be either `skillGroup` or `'skillGroup-skillSub'`.
* **projectiles**: An array of `skillSub` projectiles. Requires DEBUG_PROJECTILES to be enabled.
* **triggerAbnormal** (object): Abnormalities this skill triggers on use. Keys are abnormality IDs, values are durations.
* **consumeAbnormal**: An array of abnormalities consumed before this skill begins.
* **consumeAbnormalEnd**: An array of abnormalities consumed after this skill ends.
* **movement**: An array of segment objects containing the following parameters (from S_ACTION_STAGE):
* * **duration**: Segment duration.
* * **speed**: Horitonztal distance multiplier.
* * **unk**: Vertical distance multiplier.
* * **distance**: Distance moved for this segment.
* **glyphs** (object): Keys are glyph IDs, values contain one or more properties:
* * **movement**: Overrides **movement**.
* * **distance**: Multiplies **distance**.
* **abnormals** (object): Keys are abnormality IDs, values contain one or more properties:
* * **disableSkill**: Disables skill usage.
* * **speed**: Multiplies **speed**.
* * **chargeSpeed**: Bonus charging speed (additive).
* **chains** (object) *deprecated*: Keys are `skillGroup` or `'skillGroup-skillSub'`, values override `skillSub`.
* **userChain**: Forced initial chain for simulating serverside anti-cheat. Possible values are `skillSub` (<100), `skillId` (>=100) or `null`.
* **abnormalChains** (object): Keys are `abnormalId`. Possible values are `skillSub` (<100), `skillId` (>=100) or `null`.
* **categoryChains** (object): Keys are a comma-separate list of category IDs which must match. Possible values are `skillSub` (<100), `skillId` (>=100) or `null`.
* **inPlace** (object): Used while casting a skill without pressing movement keys.
* * **movement**: Overrides **movement**.
* * **distance**: Overrides **distance**.
* **stamina**: How much Stamina (Resolve, Willpower, Chi, Ragnarok) is required to use this skill.
* **instantStamina** (boolean): Simulate stamina usage without waiting for server response.
* **requiredBuff**: Abnormality ID (or an array of possible IDs) required to use this skill.
* **forceClip** (boolean): Rubberbands the player to the server location in S_ACTION_STAGE.movement (if set) when the skill ends. Used to prevent iframes from clipping through gates, etc.
* **interruptibleWithAbnormal** (object): Keys are abnormality IDs, values are a `skillGroup` that can be interrupted with this skill.
* **chainOnRelease**: `skillSub` animation to play if the button is released early (only for `type: 'hold'` or `type: 'holdInfinite'`).
* **teleportStage**: Stage at which to apply teleport (only for `type: 'teleport'`).
* **partyOnly** (boolean): Lockon only applies to party members (only for `type: 'lockon'`).
* **flyingSpeed**: Projectile speed (only for `type: 'userProjectile'`).
* **flyingDistance**: Projectile curve endpoint (only for `type: 'userProjectile'`).
* **hasChains** (boolean): Flags this skill as being prone to desync (enables strict notify location checking).
* **noRetry** (boolean): Disables automatic retries for this skill.
* **race** (object): Keys are race+gender ID, values override `skillData` properties.
* **level** (object): Keys are skill level - 1 (to enable array usage), values override `skillData` properties.
* **abnormRedirect** (groupId): for granting skills when a stage runs out of the abnormality window but the skill should still be granted.