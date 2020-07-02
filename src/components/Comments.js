import React, { useState } from "react"
import { Author, CommentsWrapper, CommentWrapper } from "./Post.components"

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
