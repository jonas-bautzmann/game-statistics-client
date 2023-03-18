import axios from "axios"
import { GAME_STATS_API_ENDPOINT } from "../../utils/envVariables"

// https://axios-http.com/docs/config_defaults
export const gameStatsApiClient = axios.create({
	baseURL: GAME_STATS_API_ENDPOINT,
})
