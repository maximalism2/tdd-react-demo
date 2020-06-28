import React, { useState } from "react"
import styled from "@emotion/styled"
import { Author } from "./Post.comopnents"

const TRUNCATE_THRESHOLD = 2

export function Comments({ comments }) {
  const [commentsTruncated, setCommentsTruncated] = useState(true)

  if (comments.length === 0) {
    return null
  }

  const shouldTruncateComments =
    comments.length > TRUNCATE_THRESHOLD && commentsTruncated
  const commentsToShow = shouldTruncateComments
    ? comments.slice(0, 1)
    : comments

  return (
    <CommentsWrapper>
      {commentsToShow.map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}
      {shouldTruncateComments && commentsTruncated && (
        <ShowMoreButton
          count={comments.length - 1}
          onClick={() => setCommentsTruncated(false)}
        />
      )}
    </CommentsWrapper>
  )
}

function Comment({ author, content }) {
  return (
    <CommentWrapper>
      <Author {...author} />
      <p>{content}</p>
    </CommentWrapper>
  )
}

function ShowMoreButton({ count, onClick }) {
  return (
    <button type="button" onClick={onClick}>
      Show {count} more
    </button>
  )
}

const CommentsWrapper = styled.section`
  border-top: 1px solid #ddd;
  font-size: 0.85rem;
`

const CommentWrapper = styled.article`
  padding: 1em;
`
