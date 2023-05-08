import { GetStaticProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import React from "react"
import { useQuery } from "@tanstack/react-query"
import getWinrate from "../api/statsApi/requests/getWinrate"
import getChampions from "../api/dataDragon/requests/getChampions"
import Image from "next/legacy/image"

export const getStaticProps: GetStaticProps = async ({ locale, defaultLocale }) => {
	return { props: { ...(await serverSideTranslations(locale ?? defaultLocale ?? "en", ["common", "home"])) } }
}

const Viz = (): JSX.Element => {
	const { data: winrate, isLoading: isWinrateLoading } = useQuery({
		queryKey: ["statsApi/winrate"],
		queryFn: async () => getWinrate(),
	})

	const { data: champions, isLoading: isChampionsLoading } = useQuery({
		queryKey: ["api/dataDaragon/requests/getChampions"],
		queryFn: async () => getChampions("13.8.1"),
	})

	console.warn(isWinrateLoading, champions, isChampionsLoading)

	return (
		<>
			<Head>
				<title>{"common:title"}</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<main>
				<div className="grid-container">
					<div className="top-hero-card">
						<div className="top-hero-stats">
							<h1>TOP HERO</h1>
							<div className="top-hero-name">
								<p>
									<span> {winrate?.[0].ChampionName} </span> Games played: {winrate?.[0].Games}{" "}
								</p>
							</div>
							<hr style={{ margin: "0 0 20px 0" }} />
							<div className="top-hero-games">
								<h2>Winrate</h2>
								<p>50%</p>
								<h2>Wins</h2>
								<p>5</p>
								<h2>Losses</h2>
								<p>5</p>
							</div>
							<div className="top-hero-kda">
								<h2>
									{" "}
									<object data="kills.svg" height={20} width={20} />
									Kills
								</h2>
								<p>2</p>
								<h2>
									{" "}
									<object data="death.svg" height={20} width={20} />
									Deaths
								</h2>
								<p>2</p>
								<h2>
									{" "}
									<object data="assist.svg" height={20} width={20} />
									Assists
								</h2>
								<p>2</p>
							</div>
						</div>
						<div
							className="top-hero-image"
							style={{ position: "relative", overflow: "hidden", borderRadius: "0 0 20px 0" }}
						>
							<Image
								src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${winrate?.[0].ChampionName}_0.jpg`}
								alt="Champion Picture"
								width={200}
								height={500}
							/>
						</div>
					</div>
					<div className="competitive-card"></div>
					<div className="stats-card1"></div>
					<div className="stats-card2"></div>
					<div className="stats-card3"></div>
					<div className="stats-card4"></div>
					<div className="match-history"></div>
				</div>
			</main>
		</>
	)
}

export default Viz
