import { getClient } from "@tauri-apps/api/http"
import { RIOT_GAMES_DATA_DRAGON_API_ENDPOINT } from "../../../utils/envVariables"

const getDataDragonVersions = async (): Promise<string[]> => {
	const client = await getClient()
	const { data } = await client.get<string[]>(`${RIOT_GAMES_DATA_DRAGON_API_ENDPOINT}api/versions.json`)
	return data
}

export default getDataDragonVersions
