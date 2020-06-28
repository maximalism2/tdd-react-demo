import React from "react"
import { render, screen } from "@testing-library/react"
import { mergeDeepRight } from "ramda"
import userEvent from "@testing-library/user-event"

import { Post } from "./Post"

describe("Post", () => {
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

  it("renders post comments", () => {
    const comments = [
      getTestComment({ id: "first", content: "First comment" }),
      getTestComment({ id: "second", content: "Second comment" }),
    ]

    render(buildPost({ comments }))

    expect(screen.getByText("First comment")).toBeInTheDocument()
    expect(screen.getByText("Second comment")).toBeInTheDocument()
  })

  describe("Truncated comments", () => {
    const comments = [
      getTestComment({ id: "first", content: "First comment" }),
      getTestComment({ id: "second", content: "Second comment" }),
      getTestComment({ id: "third", content: "Third comment" }),
    ]

    it("renders ones comment and `Show N more` if there are more then two comments", () => {
      render(buildPost({ comments }))

      expect(screen.getByText("First comment")).toBeInTheDocument()
      expect(screen.queryByText("Second comment")).toBe(null)
      expect(screen.getByRole("button")).toHaveTextContent("Show 2 more")
    })

    it("renders all comments when user clicks on `Show N more` button", () => {
      render(buildPost({ comments }))

      userEvent.click(screen.getByText("Show 2 more"))

      expect(screen.getByText("Second comment")).toBeInTheDocument()
      expect(screen.getByText("Third comment")).toBeInTheDocument()
      expect(screen.queryByText("Show 2 more")).toBe(null)
    })
  })
})

function getTestComment(overrides) {
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
