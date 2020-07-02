import { rest } from "msw"
import { fakePosts } from "./fakedData"

export const browserHandlers = [
  rest.get("/posts", (req, res, ctx) => res(ctx.json(postsWithoutComments))),
  rest.get("/posts/:postId/comments", (req, res, ctx) => {
    const { postId } = req.params
    const comments = resolveComments(postId)
    return res(ctx.json(comments))
  }),
]

const posts = fakePosts(5)

const postsWithoutComments = posts.map((post) => ({
  ...post,
  totalComments: post.comments.length,
  comments: post.comments.slice(0, 1),
}))

function resolveComments(postId) {
  const post = posts.find((p) => p.id === postId)

  if (!post) {
    return null
  }

  return post.comments
}
