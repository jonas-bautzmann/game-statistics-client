import { ActivePlayer, Player } from "../models/player"
import { Event } from "../models/event"
import { GameData } from "../models/gameData"
import { RIOT_GAMES_GAME_CLIENT_API_ENDPOINT } from "../../../utils/envVariables"
import { invoke } from "@tauri-apps/api/tauri"

export interface AllGameData {
	activePlayer: ActivePlayer
	allPlayers: Player[]
	events: {
		Events: Event[]
	}
	gameData: GameData
}

const getAllLiveClientData = async (): Promise<AllGameData> => {
	const jsonString = await invoke<string>("fetch_from_game_client_api", { url: RIOT_GAMES_GAME_CLIENT_API_ENDPOINT })
	return JSON.parse(jsonString) as AllGameData
}

export default getAllLiveClientData
