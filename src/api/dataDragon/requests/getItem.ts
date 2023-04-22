import { getClient } from "@tauri-apps/api/http"
import { RIOT_GAMES_DATA_DRAGON_API_ENDPOINT } from "../../../utils/envVariables"
import { Basic, Data, Group, Tree } from "../models/item"

export interface ItemsResult {
	type: string
	version: string
	basic: Basic
	data: Data
	groups: Group[]
	tree: Tree[]
}

const getItem = async (version: string, itemId: number): Promise<ItemsResult> => {
	const client = await getClient()
	const { data } = await client.get<ItemsResult>(
		`${RIOT_GAMES_DATA_DRAGON_API_ENDPOINT}cdn/${version}/data/en_US/champion/item/${itemId}.json`,
	)
	return data
}

export default getItem
