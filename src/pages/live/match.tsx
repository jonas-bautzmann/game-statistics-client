import { Skeleton, Typography } from "antd"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import Link from "next/link"
import { GetStaticProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import { getPlayerBySummonerName } from "../../utils/liveGame"
import EventTimeline from "../../components/eventTimeline/eventTimeline"
import getDataDragonVersions from "../../api/dataDragon/requests/getDataDragonVersions"
import getChampions from "../../api/dataDragon/requests/getChampions"
import getChampion from "../../api/dataDragon/requests/getChampion"
import getItems from "../../api/dataDragon/requests/getItems"
import getItem from "../../api/dataDragon/requests/getItem"
import useAllLiveClientData from "../../api/liveClient/hooks/useAllLiveClientData"

export const getStaticProps: GetStaticProps = async ({ locale, defaultLocale }) => {
	return { props: { ...(await serverSideTranslations(locale ?? defaultLocale ?? "en", ["common", "match"])) } }
}

const LiveGamePage = (): JSX.Element => {
	const { t } = useTranslation()
	const router = useRouter()

	const { data, isLoading } = useAllLiveClientData({
		onError: async () => router.replace("/"),
	})

	const { data: version, isLoading: isVersionLoading } = useQuery({
		queryKey: ["datadragon/versions"],
		queryFn: async () => getDataDragonVersions(),
		select: versions => versions[0],
	})

	const { data: champions, isLoading: isChampionsLoading } = useQuery({
		queryKey: ["datadragon/champions"],
		queryFn: async () => {
			if (!version) {
				throw new Error("Version is not defined.")
			}
			return getChampions(version)
		},
		enabled: !!version,
	})

	const playerChampion = data ? getPlayerBySummonerName(data, data.activePlayer.summonerName) : undefined

	const playerChampionId = playerChampion?.rawChampionName.split("_").pop()

	const { data: champion, isLoading: isChampionLoading } = useQuery({
		queryKey: ["datadragon/champion", playerChampionId],
		queryFn: async () => {
			if (!version) {
				throw new Error("Version is not defined.")
			}
			if (!playerChampionId) {
				throw new Error("playerChampionId is not defined.")
			}
			return getChampion(version, playerChampionId)
		},
		enabled: !!version && !!playerChampionId,
	})

	const { data: items, isLoading: isItemsLoading } = useQuery({
		queryKey: ["datadragon/items"],
		queryFn: async () => {
			if (!version) {
				throw new Error("Version is not defined.")
			}
			return getItems(version)
		},
		enabled: !!version,
	})

	const playerItemId = data?.allPlayers[1].items[1].itemID

	const { data: item, isLoading: isItemLoading } = useQuery({
		queryKey: ["datadragon/item", playerItemId],
		queryFn: async () => {
			if (!version) {
				throw new Error("Version is not defined.")
			}
			if (!playerItemId) {
				throw new Error("playerItemId is not defined.")
			}
			return getItem(version, playerItemId)
		},
		enabled: !!version && !!playerItemId,
	})

	console.warn(
		isVersionLoading,
		champions,
		isChampionsLoading,
		champion,
		isChampionLoading,
		items,
		item,
		isItemLoading,
		isItemsLoading,
	)

	return (
		<div>
			<Typography.Title>{t("match:title")}</Typography.Title>
			{isLoading && <Skeleton active />}
			{!isLoading && !!data && (
				<div
					style={{
						backgroundImage: `url(http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${playerChampionId}_0.jpg)`,
					}}
				>
					<div>Your Champion: {getPlayerBySummonerName(data, data.activePlayer.summonerName).championName}</div>
					<Link href="/">Home</Link>
					<EventTimeline allGameData={data} />
					<div>{JSON.stringify(data, null, 2)}</div>
				</div>
			)}
		</div>
	)
}

export default LiveGamePage
