import { Skeleton, Typography } from "antd"
import { useQuery } from "@tanstack/react-query"
import getAllLiveClientData from "../../api/liveClient/requests/getAllLiveClientData"
import { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { GetStaticProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import { getPlayerBySummonerName } from "../../utils/liveGame"
import EventTimeline from "../../components/eventTimeline/eventTimeline"
import isClient from "../../utils/isClient"

const REFETCH_INTERVAL_MS = 3000

export const getStaticProps: GetStaticProps = async ({ locale, defaultLocale }) => {
	return { props: { ...(await serverSideTranslations(locale ?? defaultLocale ?? "en", ["common", "match"])) } }
}

const LiveGamePage = (): JSX.Element => {
	const { t } = useTranslation()
	const [interval, setInterval] = useState(0)
	const router = useRouter()

	const { data, isLoading } = useQuery({
		queryKey: ["liveclientdata/allgamedata"],
		queryFn: async () => {
			if (!isClient()) {
				return undefined
			}

			setInterval(prevState => prevState + 1)
			return getAllLiveClientData()
		},
		onError: async () => router.replace("/"),
		refetchInterval: REFETCH_INTERVAL_MS,
	})

	return (
		<div>
			<Typography.Title>{t("match:title")}</Typography.Title>
			{isLoading && <Skeleton active />}
			{!isLoading && !!data && (
				<>
					<div>Your Champion: {getPlayerBySummonerName(data, data.activePlayer.summonerName).championName}</div>
					<Link href="/">Home</Link>
					<div>Interval: {interval}</div>
					<EventTimeline allGameData={data} />
					<div>{JSON.stringify(data, null, 2)}</div>
				</>
			)}
		</div>
	)
}

export default LiveGamePage
