import React from "react"
import { render, screen } from "@testing-library/react"
import { mergeDeepRight } from "ramda"
import userEvent from "@testing-library/user-event"
import { rest } from "msw"

import { mockServer, server } from "../mocks/server"

import { Post } from "./Post"

describe("Post", () => {
  mockServer(server)

  function buildPost(props) {
    const defaultAuthor = {
      fullName: "Default author full name",
      avatar: "/default_author_avatar.webp",
    }

    return (
      <Post
        author={defaultAuthor}
        timestamp={1593340437010}
        content="Default post content"
        comments={[]}
        totalComments={0}
        {...props}
      />
    )
  }

  it("renders post", () => {
    render(buildPost({ content: "Post content" }))

    expect(screen.getByText("Post content")).toBeInTheDocument()
  })

  it("renders author info", () => {
    const author = { avatar: "avatar_url.webp", fullName: "Author full name" }

    render(buildPost({ author }))

    expect(screen.getByText("Author full name")).toBeInTheDocument()
    expect(screen.getByRole("img")).toHaveAttribute("src", "avatar_url.webp")
  })

  it("renders formatted post date", () => {
    render(buildPost({ timestamp: 1593347437010 }))

    expect(screen.getByText("2020-06-28")).toBeInTheDocument()
  })

  describe("Comments", () => {
    const comments = [
      getTestComment({ id: "first", content: "First comment" }),
      getTestComment({ id: "second", content: "Second comment" }),
      getTestComment({ id: "third", content: "Third comment" }),
    ]

    const firstComment = comments[0]

    it("renders comments for the post", () => {
      render(buildPost({ comments: [getTestComment()] }))

      expect(screen.getByText("Comments")).toBeInTheDocument()
      expect(screen.getByText("Comment content")).toBeInTheDocument()

      expect(screen.queryByRole("button")).toBe(null)
    })

    it("does render comments section when there are no comments", () => {
      render(buildPost({ comments: [] }))

      expect(screen.queryByText("Comments")).toBe(null)
    })

    it("shows the first comment only when there are multiple comments present", () => {
      render(buildPost({ comments: [firstComment], totalComments: 3 }))

      expect(screen.getByText("First comment")).toBeInTheDocument()
      expect(screen.queryByText("Second comment")).toBe(null)
      expect(screen.queryByText("Third comment")).toBe(null)

      expect(screen.getByRole("button")).toHaveTextContent("Show 2 more")
    })

    it("shows all comments after clicking on `Show N more` button", async () => {
      server.use(
        rest.get("/posts/:postId/comments", (req, res, ctx) => {
          const { postId } = req.params

          if (postId !== "post-with-comments") {
            ctx.set("statusCode", 404)
            return res(ctx.text("Not found"))
          }

          return res(ctx.json(comments))
        })
      )

      render(
        buildPost({
          comments: [firstComment],
          totalComments: 3,
          id: "post-with-comments",
        })
      )

      userEvent.click(screen.getByText("Show 2 more"))

      expect(await screen.findByText("Second comment")).toBeInTheDocument()
      expect(await screen.findByText("Third comment")).toBeInTheDocument()

      expect(screen.queryByText("Show 2 more")).toBe(null)
    })
  })
})

function getTestComment(overrides = {}) {
  return mergeDeepRight(
    {
      id: "test-comment",
      author: {
        avatar: "/comment_author_avatar.webp",
        fullName: "Comment author full name",
      },
      content: "Comment content",
    },
    overrides
  )
}
