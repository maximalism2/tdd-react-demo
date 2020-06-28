import { setupServer } from "msw/node"
import { serverHandlers } from "./serverHandlers"

export const server = setupServer(...serverHandlers)

export function mockServer(testServer) {
  beforeAll(() => testServer.listen())
  afterEach(() => testServer.resetHandlers())
  afterAll(() => testServer.close())
}
