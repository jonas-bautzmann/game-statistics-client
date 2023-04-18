import styles from "./layout.module.scss"
import React, { ReactNode } from "react"
import VideoCameraOutlined from "@ant-design/icons/VideoCameraOutlined"
import DesktopOutlined from "@ant-design/icons/DesktopOutlined"
import UploadOutlined from "@ant-design/icons/UploadOutlined"
import DashboardOutlined from "@ant-design/icons/DashboardOutlined"
import { Layout, Menu, theme } from "antd"
import useAllLiveClientData from "../../api/liveClient/hooks/useAllLiveClientData"
import { useRouter } from "next/router"
import compact from "lodash/compact"
import { useTranslation } from "next-i18next"
import Link from "next/link"

const { Header, Sider, Content } = Layout

interface LayoutProps {
	children: ReactNode
}

const AppLayout = ({ children }: LayoutProps): JSX.Element => {
	const { t } = useTranslation()
	const { pathname, replace } = useRouter()

	const {
		token: { colorBgContainer },
	} = theme.useToken()

	const { data: allGameData } = useAllLiveClientData({
		retry: true,
		retryDelay: 3000,
	})

	return (
		<Layout className={styles.appLayout}>
			<Sider theme="dark" trigger={null} collapsible collapsed>
				<Link className={styles.logo} href="/">
					Logo
				</Link>
				<Menu
					theme="dark"
					mode="inline"
					selectedKeys={[pathname]}
					items={compact([
						{
							key: "",
							icon: <DashboardOutlined />,
							label: t("common:dashboard"),
						},
						allGameData
							? {
									key: "live/match",
									icon: <DesktopOutlined className={styles.liveMatchIcon} />,
									label: t("common:match"),
							  }
							: undefined,
						{
							key: "profile",
							icon: <VideoCameraOutlined />,
							label: "nav 2",
						},
						{
							key: "3",
							icon: <UploadOutlined />,
							label: "nav 3",
						},
					])}
					onSelect={async selected => replace(selected.keyPath.join("/"))}
				/>
			</Sider>
			<Layout className="site-layout">
				<Header style={{ padding: 0, background: colorBgContainer }} />
				<Content
					style={{
						margin: "24px 16px",
						padding: 24,
						minHeight: 280,
						background: colorBgContainer,
					}}
				>
					{children}
				</Content>
			</Layout>
		</Layout>
	)
}

export default AppLayout
