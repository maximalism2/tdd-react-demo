import React from "react"
import { format } from "date-fns"
import { Author, PostContainer, PostDate, PostHeader } from "./Post.components"
import { Comments } from "./Comments"

export function Post({
  id,
  author,
  content,
  timestamp,
  comments,
  totalComments,
}) {
  return (
    <PostContainer>
      <PostHeader>
        <Author {...author} />

        <PostDate>{format(new Date(timestamp), "yyyy-MM-dd")}</PostDate>
      </PostHeader>

      <p>{content}</p>

      <Comments comments={comments} totalComments={totalComments} postId={id} />
    </PostContainer>
  )
}
