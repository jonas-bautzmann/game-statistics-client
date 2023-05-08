import { getClient } from "@tauri-apps/api/http"
import { GAME_STATS_API_ENDPOINT } from "../../../utils/envVariables"

export interface Winrate {
	Winrate: string
	TeamPosition: string
	ChampionName: string
	Win: string
	Games: string
}

const getWinrate = async (): Promise<Winrate[]> => {
	const client = await getClient()
	const { data } = await client.get<Winrate[]>(`${GAME_STATS_API_ENDPOINT}/api/database/get-winrates`)
	return data
}

export default getWinrate
