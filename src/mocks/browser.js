import { setupWorker } from "msw"
import { browserHandlers } from "./browserHandlers"

export const worker = setupWorker(...browserHandlers)
