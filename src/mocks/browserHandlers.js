import { rest } from "msw"
import { fakePosts } from "../lib/fakedData"

export const browserHandlers = [
  rest.get("/posts", (req, res, ctx) => res(ctx.json(fakePosts(5)))),
]