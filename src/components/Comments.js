import React, { useState } from "react"
import styled from "@emotion/styled"
import { Author } from "./Post.comopnents"

const TRUNCATE_THRESHOLD = 2

export function Comments({ postId, totalComments, comments }) {
  const [loadedComments, setLoadedComments] = useState([])

  if (comments.length === 0) {
    return null
  }

  async function loadAllComments() {
    const response = await fetch(`/posts/${postId}/comments`)
    setLoadedComments(await response.json())
  }

  const allCommentsLoaded = loadedComments.length > 0
  const commentsToShow = allCommentsLoaded ? loadedComments : comments

  return (
    <CommentsWrapper>
      {commentsToShow.map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}
      {!allCommentsLoaded && totalComments > TRUNCATE_THRESHOLD && (
        <ShowMoreButton count={totalComments - 1} onClick={loadAllComments} />
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
