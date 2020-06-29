import { rest } from "msw"
import { fakePosts } from "./fakedData"

const posts = fakePosts(5)

export const browserHandlers = [
  rest.get("/posts", (req, res, ctx) => res(ctx.json(posts))),
]
