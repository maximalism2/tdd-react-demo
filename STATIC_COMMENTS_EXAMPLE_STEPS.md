## 1. Render comments 
### `Post.test.js`

```javascript
describe("Comments", () => {
  it("renders comments for the post", () => {
    render(buildPost({ comments: [getTestComment()] }))
    
    expect(screen.getByText("Comment content")).toBeInTheDocument()
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
```

### `Post.js`

```javascript
<section>
  <h3>Comments</h3>

  {comments.map((comment) => (
    <p key={comment.id}>{comment.content}</p>
  ))}
</section>
```


### `Comments.js`
```javascript
import React from "react"
import { CommentsWrapper, CommentWrapper } from "./Post.components"

export function Comments({ comments }) {
  return (
    <CommentsWrapper>
      <h3>Comments</h3>

      {comments.map((comment) => (
        <CommentWrapper key={comment.id}>{comment.content}</CommentWrapper>
      ))}
    </CommentsWrapper>
  )
}
```

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

## 2. Does not render anything if there are no comments.

### `Post.test.js`

```javascript
it("does render comments section when there are no comments", () => {
  render(buildPost({ comments: [] }))

  expect(screen.queryByText("Comments")).toBe(null)
})
```

### `Comments.js`
```javascript
if (comments.length === 0) {
  return null
}
```

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

## 3. Render only first comment and the "Show more" button for multiple comments

### `Post.test.js`
```javascript
const comments = [
  getTestComment({ id: 'first', content: 'First comment' }),
  getTestComment({ id: 'second', content: 'Second comment' }),
  getTestComment({ id: 'third', content: 'Third comment' }),
]

it("shows the first comment only when there are multiple comments present", () => {
  render(buildPost({ comments }))

  expect(screen.getByText("First comment")).toBeInTheDocument()
  expect(screen.queryByText("Second comment")).toBe(null)
  expect(screen.queryByText("Third comment")).toBe(null)

  expect(screen.getByRole("button")).toHaveTextContent("Show 2 more")
})
```

### `Comments.js`

```javascript
const commentsToShow = comments.length > 1 ? comments.slice(0, 1) : comments

return (
   <CommentsWrapper>
    <h3>Comments</h3>

    {commentsToShow.map((comment) => (
      <CommentWrapper key={comment.id}>{comment.content}</CommentWrapper>
    ))}

    <button>Show {comments.length - 1} more</button>
  </CommentsWrapper>
)
```

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

## 4. Hide "Show more" button when there is no more comments

### `Post.test.js`

```javascript
  expect(screen.queryByRole("button")).toBe(null)
```

### `Comments.js`

```javascript
const hasMultipleComments = comments.length > 1
const commentsToShow = hasMultipleComments ? comments.slice(0, 1) : comments

return (
  <CommentsWrapper>
    <h3>Comments</h3>

    {commentsToShow.map((comment) => (
      <CommentWrapper key={comment.id}>{comment.content}</CommentWrapper>
    ))}

    {hasMultipleComments && <button>Show {comments.length - 1} more</button>}
  </CommentsWrapper>
)
```

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

## 5. Shows all comments on a click on "Show more button".

### `Post.test.js`

```javascript
it("shows all comments after clicking on `Show N more` button", () => {
  render(buildPost({ comments }))

  userEvent.click(screen.getByText("Show 2 more"))

  expect(screen.getByText("Second comment")).toBeInTheDocument()
  expect(screen.getByText("Third comment")).toBeInTheDocument()

  expect(screen.queryByText("Show 2 more")).toBe(null)
})
```

### `Comments.js`

```javascript
  const [commentsTruncated, setCommentsTruncated] = useState(true)

  if (comments.length === 0) {
    return null
  }

  const hasMultipleComments = comments.length > 1
  const commentsToShow =
    hasMultipleComments && commentsTruncated ? comments.slice(0, 1) : comments

  return (
    <CommentsWrapper>
      <h3>Comments</h3>

      {commentsToShow.map((comment) => (
        <CommentWrapper key={comment.id}>{comment.content}</CommentWrapper>
      ))}

      {hasMultipleComments && commentsTruncated && (
        <button onClick={() => setCommentsTruncated(false)}>
          Show {comments.length - 1} more
        </button>
      )}
    </CommentsWrapper>
  )
```


## Final. Check it out in browser.
