export interface SummonerSpells {
	summonerSpellOne: SummonerSpell
	summonerSpellTwo: SummonerSpell
}

export interface SummonerSpell {
	displayName: string
	rawDescription: string
	rawDisplayName: string
}
