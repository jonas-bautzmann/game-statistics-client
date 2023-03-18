import { getClient } from "@tauri-apps/api/http"
import { ActivePlayer, Player } from "../models/player"
import { Event } from "../models/event"
import { GameData } from "../models/gameData"
import { RIOT_GAMES_GAME_CLIENT_API_ENDPOINT } from "../../../utils/envVariables"

export interface AllGameData {
	activePlayer: ActivePlayer
	allPlayers: Player[]
	events: {
		Events: Event[]
	}
	gameData: GameData
}

const getAllLiveClientData = async (): Promise<AllGameData> => {
	const client = await getClient()
	const { data } = await client.get<AllGameData>(RIOT_GAMES_GAME_CLIENT_API_ENDPOINT)
	return data
}

export default getAllLiveClientData
