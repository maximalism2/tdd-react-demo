import React, { useState } from "react"
import { Author, CommentsWrapper, CommentWrapper } from "./Post.components"

export function Comments({ comments }) {
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
        <CommentWrapper key={comment.id}>
          <Author {...comment.author} />
          <p>{comment.content}</p>
        </CommentWrapper>
      ))}

      {hasMultipleComments && commentsTruncated && (
        <button onClick={() => setCommentsTruncated(false)}>
          Show {comments.length - 1} more
        </button>
      )}
    </CommentsWrapper>
  )
}
