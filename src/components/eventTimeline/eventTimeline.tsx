import { Timeline } from "antd"
import { AllGameData } from "../../api/liveClient/requests/getAllLiveClientData"

const EventTimeline = (allGameData: AllGameData): JSX.Element => {
	// const { t } = useTranslation()
	const events = allGameData.events.Events

	return <Timeline reverse mode="left" items={events.map(() => ({}))} />
}

export default EventTimeline
