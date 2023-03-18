const { i18n } = require("./next-i18next.config")
const { returnNull, ...nextI18n } = i18n

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	i18n: nextI18n,

	// Note: This feature is required to use NextJS Image in SSG mode.
	// See https://nextjs.org/docs/messages/export-image-api for different workarounds.
	images: {
		unoptimized: true,
	},
}

module.exports = nextConfig
