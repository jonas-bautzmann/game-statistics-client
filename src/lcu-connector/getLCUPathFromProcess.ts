// Original code comes from https://github.com/Pupix/lcu-connector and was adapted to work within the tauri client
import { platform as getPlatform } from "@tauri-apps/api/os"
import { Command } from "@tauri-apps/api/shell"

const INSTALL_REGEX_WIN = /"--install-directory=(.*?)"/
const INSTALL_REGEX_MAC = /--install-directory=(.*?)( --|\n|$)/

const COMMAND_WIN = "win-process-command"
const COMMAND_MAC = "mac-process-command"

const getLCUPathFromProcess = async (): Promise<string | undefined> => {
	const platform = await getPlatform()
	const IS_WIN = platform === "win32"
	const INSTALL_REGEX = IS_WIN ? INSTALL_REGEX_WIN : INSTALL_REGEX_MAC
	const command = new Command(IS_WIN ? COMMAND_WIN : COMMAND_MAC)

	return new Promise<string>((resolve, reject) => {
		command.addListener("close", data => {
			const parts = data.match(INSTALL_REGEX) || []
			resolve(parts[1])
		})
		command.addListener("error", error => {
			reject(error)
		})
		command.stdout.on("data", line => {
			const parts = line.match(INSTALL_REGEX) || []
			resolve(parts[1])
		})
		command.stderr.on("data", line => {
			reject(line)
		})

		void command.spawn()
	})
}

export default getLCUPathFromProcess
