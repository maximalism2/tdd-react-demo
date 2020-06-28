import React from "react"
import { format } from "date-fns"
import { Author, PostContainer, PostDate, PostHeader } from "./Post.comopnents"

export function Post({ author, content, timestamp }) {
  return (
    <PostContainer>
      <PostHeader>
        <Author {...author} />

        <PostDate>{format(new Date(timestamp), "yyyy-MM-dd")}</PostDate>
      </PostHeader>

      <p>{content}</p>
    </PostContainer>
  )
}
