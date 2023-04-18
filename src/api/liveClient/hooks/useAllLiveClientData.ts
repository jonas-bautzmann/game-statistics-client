import { useQuery } from "@tanstack/react-query"
import isClient from "../../../utils/isClient"
import getAllLiveClientData, { AllGameData } from "../requests/getAllLiveClientData"
import { UseQueryOptions, UseQueryResult } from "@tanstack/react-query/src/types"

const REFETCH_INTERVAL_MS = 3000

type UseAllLiveClientDataOptions = Omit<
	UseQueryOptions<unknown, unknown, AllGameData | undefined, string[]>,
	"queryKey" | "queryFn" | "refetchInterval"
>

const useAllLiveClientData = (options?: UseAllLiveClientDataOptions): UseQueryResult<AllGameData | undefined> => {
	return useQuery<unknown, unknown, AllGameData | undefined, string[]>({
		queryKey: ["liveclientdata/allgamedata"],
		queryFn: async () => {
			if (!isClient()) {
				return undefined
			}
			return getAllLiveClientData()
		},
		refetchInterval: REFETCH_INTERVAL_MS,
		...options,
	})
}

export default useAllLiveClientData
