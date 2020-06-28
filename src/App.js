import React, { useEffect, useState } from "react"
import { makeCancelable } from "./lib/makeCancelable"
import { noop } from "./lib/noop"
import { Post } from "./components/Post"

function App() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const postsFetcher = makeCancelable(fetch("/posts"))

    postsFetcher.promise
      .then((response) => response.json())
      .then(setPosts)
      .catch(noop)

    return () => postsFetcher.cancel()
  }, [])

  return (
    <div>
      <h1>TDD in React is 🔥</h1>

      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  )
}

export default App
