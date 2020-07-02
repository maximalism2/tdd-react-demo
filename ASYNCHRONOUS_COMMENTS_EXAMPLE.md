## 1. Change API of posts

### `Post.test.js`

```javascript
it("shows the first comment only when there are multiple comments present", () => {
  render(buildPost({ comments: [firstComment], totalComments: 3 }))
  // ...
})
```

### `Post.js`

```javascript
<Comments comments={comments} totalComments={totalComments} />
```

### `Comments.js`

```javascript
const hasMultipleComments = totalComments > 1
const commentsToShow = comments
```

## 2. Implement asynchronous comments download.

### `Post.test.js`

```javascript
it("shows all comments after clicking on `Show N more` button", async () => {
  const postCommentsHandler = rest.get("/posts/:postId/comments", (req, res, ctx) => {
    const { postId } = req.params

    if (postId !== "post-with-comments") {
      ctx.set("statusCode", 404)
      return res(ctx.text("Not found"))
    }

    return res(ctx.json(comments))
  })

  server.use(postCommentsHandler)

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
```

### `Post.js`

```javascript
<Comments comments={comments} totalComments={totalComments} postId={id} />
```

### `Comments.js`

```javascript
export function Comments({ postId, comments, totalComments }) {
  const [downloadedComments, setDownloadedComments] = useState([])

  if (comments.length === 0) {
    return null
  }

  const hasMultipleComments = totalComments > 1
  const commentsToShow =
    downloadedComments.length > 0 ? downloadedComments : comments

  async function loadAllComments() {
    const response = await fetch(`/posts/${postId}/comments`)
    setDownloadedComments(await response.json())
  }

  return (
    <CommentsWrapper>
      <h3>Comments</h3>

      {commentsToShow.map((comment) => (
        <CommentWrapper key={comment.id}>
          <Author {...comment.author} />
          <p>{comment.content}</p>
        </CommentWrapper>
      ))}

      {downloadedComments.length === 0 && hasMultipleComments && (
        <button onClick={loadAllComments}>Show {totalComments - 1} more</button>
      )}
    </CommentsWrapper>
  )
}
```

## Final. Check in browser!
