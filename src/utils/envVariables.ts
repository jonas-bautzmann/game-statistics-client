const required = (envVariableKey: string, property: string | undefined): string => {
	if (!property) {
		throw new Error(`${envVariableKey} is not an defined env variable.`)
	}

	return property
}

// GAME STATS API
export const GAME_STATS_API_ENDPOINT: string = required(
	"NEXT_PUBLIC_GAME_STATS_API_ENDPOINT",
	process.env.NEXT_PUBLIC_GAME_STATS_API_ENDPOINT,
)

// GAME CLIENT API
export const RIOT_GAMES_GAME_CLIENT_API_ENDPOINT: string = required(
	"NEXT_PUBLIC_RIOT_GAMES_GAME_CLIENT_API_ENDPOINT",
	process.env.NEXT_PUBLIC_RIOT_GAMES_GAME_CLIENT_API_ENDPOINT,
)

// DATA DRAGON ROUTING VALUES
export const RIOT_GAMES_DATA_DRAGON_API_ENDPOINT: string = required(
	"NEXT_PUBLIC_RIOT_GAMES_DATA_DRAGON_API_ENDPOINT",
	process.env.NEXT_PUBLIC_RIOT_GAMES_DATA_DRAGON_API_ENDPOINT,
)
