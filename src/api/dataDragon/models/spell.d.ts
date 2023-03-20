export interface Spell {
	id: string
	name: string
	description: string
	tooltip: string
	leveltip: Leveltip
	maxrank: number
	cooldown: number[]
	cooldownburn: string
	cost: number[]
	costBurn: string
	datavalues: unknown
	effect: (string[] | null)[]
	effectBurn: string[] | null
	vars: []
	costType: string
	maxammo: string
	range: number[]
	rangeBurn: string
	image: Image
	resource: string
}

export interface Leveltip {
	label: string[]
	effect: string[]
}

export interface Image {
	full: string
	sprite: string
	group: string
	x: number
	y: number
	w: number
	h: number
}

export interface Passive {
	name: string
	description: string
	image: Image
}
