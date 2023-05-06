// Original code comes from https://github.com/Pupix/lcu-connector and was adapted to work within the tauri client
import { useQuery } from "@tanstack/react-query"

const LOCK_FILE_REFETCH_INTERVAL_MS = 10 * 1000
const ERROR_RETRY_DELAY_MS = 5 * 1000

export interface UseLCUConnectorResult {
	protocol: string
	address: "127.0.0.1"
	port: number
	username: "riot"
	password: string
}

const useLCUConnector = (): UseLCUConnectorResult | undefined => {
	const { data: path } = useQuery<string | undefined>({
		queryKey: ["lcu-connector", "path"],
		queryFn: async () => {
			const getLCUPathFromProcess = (await import("./getLCUPathFromProcess")).default
			return getLCUPathFromProcess()
		},
		onError: err => console.error("lcu-connector > path", err),
		retry: true,
		retryDelay: ERROR_RETRY_DELAY_MS,
	})

	const { data: lcuConnectorResult } = useQuery<UseLCUConnectorResult | undefined>({
		enabled: !!path?.length,
		queryKey: ["lcu-connector", "path", path, "lock-file"],
		queryFn: async (): Promise<UseLCUConnectorResult | undefined> => {
			if (!path) {
				return undefined
			}

			const { join } = await import("@tauri-apps/api/path")
			const lockFilePath = await join(path, "lockfile")

			const parseLockFile = (await import("./parseLockFile")).default
			const lockFileData = await parseLockFile(lockFilePath)

			return {
				protocol: lockFileData.protocol,
				address: "127.0.0.1",
				port: lockFileData.port,
				username: "riot",
				password: lockFileData.password,
			}
		},
		onError: err => console.error("lcu-connector > lockfile", err),
		refetchInterval: LOCK_FILE_REFETCH_INTERVAL_MS,
		retry: true,
		retryDelay: ERROR_RETRY_DELAY_MS,
	})

	return lcuConnectorResult
}

export default useLCUConnector
