import { Skin } from "./skin"
import { Passive, Spell } from "./spell"

export interface ChampionBase {
	id: string
	key: string
	name: string
	title: string
	blurb: string
	info: ChampionInfo
	image: ChampionImage
	tags: string[]
	partype: string
	stats: ChampionStats
}

export interface ChampionFull extends ChampionBase {
	skins: Skin[]
	lore: string
	allytips: string[]
	enemytips: string[]
	spells: Spell
	passive: Passive
	recommended: []
}

export interface ChampionShort extends ChampionBase {
	version: string
}

export interface ChampionInfo {
	attack: number
	defense: number
	magic: number
	difficulty: number
}

export interface ChampionImage {
	full: string
	sprite: string
	group: string
	x: number
	y: number
	w: number
	h: number
}

export interface ChampionStats {
	hp: number
	hpperlevel: number
	mp: number
	mpperlevel: number
	movespeed: number
	armor: number
	armorperlevel: number
	spellblock: number
	spellblockperlevel: number
	attackrange: number
	hpregen: number
	hpregenperlevel: number
	mpregen: number
	mpregenperlevel: number
	crit: number
	critperlevel: number
	attackdamge: number
	attackdamageperlevel: number
	attackspeedperlevel: number
	attackspeed: number
}
