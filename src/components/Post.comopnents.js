import React from "react"
import styled from "@emotion/styled"

export const PostContainer = styled.article`
  border: 1px solid #ddd;
  border-radius: 0.2rem;
  max-width: 35rem;
  margin: 0 auto 2rem;
  padding: 1rem;
`

export function Author({ avatar, fullName }) {
  return (
    <AuthorWrapper>
      <AuthorAvatar src={avatar} />
      <AuthorName>{fullName}</AuthorName>
    </AuthorWrapper>
  )
}

const AuthorWrapper = styled.div`
  display: flex;
  align-items: center;
`
const AuthorAvatar = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 0.2rem;
  margin-right: 1rem;
`
const AuthorName = styled.span`
  font-weight: bold;
`
export const PostHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
export const PostDate = styled.span`
  color: #666;
  font-size: 0.8rem;
`
