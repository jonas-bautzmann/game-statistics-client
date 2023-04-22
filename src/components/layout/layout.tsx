import styles from "./layout.module.scss"
import React, { ReactNode } from "react"
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons"
import { Layout, Menu, theme } from "antd"

const { Header, Sider, Content } = Layout

interface LayoutProps {
	children: ReactNode
}

const AppLayout = ({ children }: LayoutProps): JSX.Element => {
	const {
		token: { colorBgContainer },
	} = theme.useToken()

	return (
		<Layout className={styles.appLayout}>
			<Sider theme="dark" trigger={null} collapsible collapsed>
				<div className={styles.logo} />
				<Menu
					theme="dark"
					mode="inline"
					defaultSelectedKeys={["1"]}
					items={[
						{
							key: "1",
							icon: <UserOutlined />,
							label: "nav 1",
						},
						{
							key: "2",
							icon: <VideoCameraOutlined />,
							label: "nav 2",
						},
						{
							key: "3",
							icon: <UploadOutlined />,
							label: "nav 3",
						},
					]}
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
