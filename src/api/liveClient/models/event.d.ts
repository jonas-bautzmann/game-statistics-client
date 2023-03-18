export type EventName =
	| "GameStart"
	| "MinionsSpawning"
	| "FirstBrick"
	| "TurretKilled"
	| "InhibKilled"
	| "DragonKill"
	| "HeraldKill"
	| "BaronKill"
	| "ChampionKill"
	| "Multikill"
	| "Ace"

export type Event =
	| GameEvent
	| FirstBrickEvent
	| TurretKilledEvent
	| InhibKilledEvent
	| DragonKilledEvent
	| HeraldKilledEvent
	| BaronKilledEvent
	| ChampionKilledEvent
	| MultikillEvent
	| AceEvent

export interface BaseEvent {
	EventID: number
	EventName: EventName
	EventTime: number
}

export interface GameEvent extends BaseEvent {
	EventName: "GameStart" | "MinionsSpawning"
}

export interface KillEvent extends BaseEvent {
	KillerName: string
}

export interface KillWithAssistsEvent extends KillEvent {
	Assisters: string[]
}

export interface FirstBrickEvent extends KillEvent {
	EventName: "FirstBrick"
}

export interface TurretKilledEvent extends KillWithAssistsEvent {
	EventName: "TurretKilled"
	TurretKilled: string
}

export interface InhibKilledEvent extends KillWithAssistsEvent {
	EventName: "InhibKilled"
	InhibKilled: string
}

export interface DragonKilledEvent extends KillWithAssistsEvent {
	EventName: "DragonKill"
	DragonType: string
	// seems to be a string like "False"
	Stolen: string
}

export interface HeraldKilledEvent extends KillWithAssistsEvent {
	EventName: "HeraldKill"
	// seems to be a string like "False"
	Stolen: string
}

export interface BaronKilledEvent extends KillWithAssistsEvent {
	EventName: "BaronKill"
	// seems to be a string like "False"
	Stolen: string
}

export interface ChampionKilledEvent extends KillWithAssistsEvent {
	EventName: "ChampionKill"
	VictimName: string
}

export interface MultikillEvent extends KillEvent {
	EventName: "Multikill"
	KillStreak: number
}

export interface AceEvent extends BaseEvent {
	EventName: "Ace"
	Acer: string
	AcingTeam: "ORDER" | "CHAOS"
}
