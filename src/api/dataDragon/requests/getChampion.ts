import { getClient } from "@tauri-apps/api/http"
import { RIOT_GAMES_DATA_DRAGON_API_ENDPOINT } from "../../../utils/envVariables"
import { ChampionFull } from "../models/champion"

export interface ChampionResult {
	type: string
	format: string
	version: string
	data: Record<string, ChampionFull>
}

const getChampion = async (version: string, id: string): Promise<ChampionResult> => {
	const client = await getClient()
	const { data } = await client.get<ChampionResult>(
		`${RIOT_GAMES_DATA_DRAGON_API_ENDPOINT}cdn/${version}/data/en_US/champion/${id}.json`,
	)
	return data
}

export default getChampion
