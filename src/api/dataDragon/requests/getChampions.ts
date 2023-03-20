import { getClient } from "@tauri-apps/api/http"
import { RIOT_GAMES_DATA_DRAGON_API_ENDPOINT } from "../../../utils/envVariables"
import { ChampionShort } from "../models/champion"

export interface ChampionsResult {
	type: string
	format: string
	version: string
	data: Record<string, ChampionShort>
}

const getChampions = async (version: string): Promise<ChampionsResult> => {
	const client = await getClient()
	const { data } = await client.get<ChampionsResult>(
		`${RIOT_GAMES_DATA_DRAGON_API_ENDPOINT}cdn/${version}/data/en_US/champion.json`,
	)
	return data
}

export default getChampions
