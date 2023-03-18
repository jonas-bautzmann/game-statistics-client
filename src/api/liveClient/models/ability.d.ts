export interface Abilities {
	Passive: Ability
	Q: Ability
	W: Ability
	E: Ability
	R: Ability
}

export interface Ability {
	abilityLevel?: number
	displayName: string
	id: string
	rawDescription: string
	rawDisplayName: string
}
