import { Timeline } from "antd"
import { AllGameData } from "../../api/liveClient/requests/getAllLiveClientData"
import { useTranslation } from "next-i18next"

interface EventTimelineProps {
	allGameData: AllGameData
}

const EventTimeline = ({ allGameData }: EventTimelineProps): JSX.Element => {
	const { t } = useTranslation()
	const events = allGameData.events.Events

	return (
		<Timeline
			reverse
			mode="right"
			items={events.map(event => ({
				label: t(`match:event.${event.EventName}`, { ...event }),
			}))}
		/>
	)
}

export default EventTimeline
