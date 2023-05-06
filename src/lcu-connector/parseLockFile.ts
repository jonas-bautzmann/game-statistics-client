// Original code comes from https://github.com/Pupix/lol-lockfile-parser and was adapted to work within the tauri client
import { readTextFile } from "@tauri-apps/api/fs"

interface LockFileData {
	process: string
	PID: number
	port: number
	password: string
	protocol: string
}

const parseLockFile = async (path: string): Promise<LockFileData> => {
	const file = await readTextFile(path)
	const parts = file.split(":")

	return {
		process: parts[0],
		PID: Number(parts[1]),
		port: Number(parts[2]),
		password: parts[3],
		protocol: parts[4],
	}
}

export default parseLockFile
