const required = (envVariable: string | undefined): string => {
	if (!envVariable) {
		throw new Error("Found undefined env variable.")
	}

	return envVariable
}

// GAME STATS API
export const GAME_STATS_API_ENDPOINT: string = required(process.env.GAME_STATS_API_ENDPOINT)

// DATA DRAGON ROUTING VALUES
export const RIOT_GAMES_DATA_DRAGON_API_ENDPOINT: string = required(process.env.RIOT_GAMES_DATA_DRAGON_API_ENDPOINT)
