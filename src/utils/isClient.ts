// Note: When working with Next.js in development you have 2 execution contexts:
// - The server (nodejs), where Tauri cannot be reached, because the current context is inside nodejs.
// - The client (webview), where it is possible to interact with the Tauri rust backend.
// To check if we are currently executing in the client context, we can check the type of the window object;
const isClient = (): boolean => typeof window !== "undefined"

export default isClient
