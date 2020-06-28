import { rest } from "msw"

const firstTestPost = {
  id: "first-post-id",
  author: {
    avatar: "/author_avatar_url.jpg",
    fullName: "First Post Author Name",
  },
  content: "First post content",
  comments: [
    {
      id: "first-comment-id",
      author: {
        avatar: "/comment_author_avatar.jpg",
        fullName: "First Comment Author Name",
      },
      content: "First comment content",
    },
  ],
}

const secondTestPost = {
  id: "second-test-post",
  author: {
    avatar: "/second_author_avatar_url.jpg",
    fullName: "Second Post Author Name",
  },
  content: "Second post content",
  comments: [],
}

const posts = [firstTestPost, secondTestPost]

export const serverHandlers = [
  rest.get("/posts", (req, res, ctx) => res(ctx.json(posts))),
]
