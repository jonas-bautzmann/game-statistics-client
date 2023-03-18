import { Typography } from "antd"
import { GetStaticProps } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import { invoke } from "@tauri-apps/api/tauri"
import { useState } from "react"

// Note: When working with Next.js in development you have 2 execution contexts:
// - The server (nodejs), where Tauri cannot be reached, because the current context is inside nodejs.
// - The client (webview), where it is possible to interact with the Tauri rust backend.
// To check if we are currently executing in the client context, we can check the type of the window object;
const isClient = typeof window !== "undefined"

export const getStaticProps: GetStaticProps = async ({ locale, defaultLocale }) => {
	return { props: { ...(await serverSideTranslations(locale ?? defaultLocale ?? "en", ["common", "home"])) } }
}

const Home = (): JSX.Element => {
	const { t } = useTranslation()
	const [greetMsg, setGreetMsg] = useState("")
	const [name, setName] = useState("")

	async function greet() {
		if (!isClient) {
			return
		}

		// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
		setGreetMsg(await invoke("greet", { name }))
	}

	return (
		<>
			<Head>
				<title>{t("common:title")}</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<main>
				<Typography.Title>{t("home:title")}</Typography.Title>

				<div className="row">
					<form
						onSubmit={e => {
							e.preventDefault()
							void greet()
						}}
					>
						<input id="greet-input" onChange={e => setName(e.currentTarget.value)} placeholder="Enter a name..." />
						<button type="submit">Greet</button>
					</form>
				</div>
				<p>{greetMsg}</p>
			</main>
		</>
	)
}

export default Home
