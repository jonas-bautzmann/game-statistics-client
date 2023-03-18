import { ChampionStats } from "./championStats"
import { Rune, StatRune } from "./rune"
import { Abilities } from "./gameData"
import { Item } from "./item"
import { Scores } from "./scores"
import { SummonerSpells } from "./spell"

export interface ActivePlayer {
	abilities: Abilities
	championStats: ChampionStats
	currentGold: number
	fullRunes: {
		generalRunes: Rune[]
		keystone: Rune
		primaryRuneTree: Rune
		secondaryRuneTree: Rune
		statRunes: StatRune[]
	}
	level: number
	summonerName: string
	teamRelativeColors: boolean
}

export interface Player {
	championName: string
	isBot: boolean
	isDead: boolean
	items: Item[]
	level: number
	position: string
	rawChampionName: string
	rawSkinName: string
	respawnTimer: number
	runes: {
		keystone: Rune
		primaryRuneTree: Rune
		secondaryRuneTree: Rune
	}
	scores: Scores
	skinID: number
	skinName: string
	summonerName: string
	summonerSpells: SummonerSpells
	team: "ORDER" | "CHAOS"
}
