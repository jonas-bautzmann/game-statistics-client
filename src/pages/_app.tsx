import "../styles/globals.scss"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { appWithTranslation } from "next-i18next"
import type { AppProps } from "next/app"

import queryClient from "../api/queryClient/queryClient"
import AppLayout from "../components/layout/layout"

const App = ({ Component, pageProps }: AppProps) => (
	<QueryClientProvider client={queryClient}>
		<AppLayout>
			<Component {...pageProps} />
		</AppLayout>
		<ReactQueryDevtools />
	</QueryClientProvider>
)
export default appWithTranslation(App)
