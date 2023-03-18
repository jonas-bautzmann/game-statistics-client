export interface StatRune {
	id: number
	rawDescription: string
}

export interface Rune extends StatRune {
	displayName: string
	rawDisplayName: string
}
