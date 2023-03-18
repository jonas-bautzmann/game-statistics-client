import { AllGameData } from "../api/liveClient/requests/getAllLiveClientData"
import { Player } from "../api/liveClient/models/player"

export const getPlayerBySummonerName = (allGameData: AllGameData, summonerName: string): Player => {
	const playerBySummonerName = allGameData.allPlayers.find(player => player.summonerName === summonerName)
	if (!playerBySummonerName) {
		const validSummonerNames = allGameData.allPlayers.map(player => player.summonerName)
		throw new Error(`Unknown summonerName '${summonerName}'. Valid names are ${validSummonerNames.join(", ")}`)
	}
	return playerBySummonerName
}
