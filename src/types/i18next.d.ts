import "i18next"

// https://www.i18next.com/overview/typescript
declare module "i18next" {
	interface CustomTypeOptions {
		returnNull: false
	}
}
