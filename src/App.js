import React, { useEffect, useState } from "react"
import { makeCancelable } from "./lib/makeCancelable"

function App() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const postsFetcher = makeCancelable(fetch("/posts"))

    postsFetcher.promise.then((response) => response.json()).then(setPosts)

    return () => postsFetcher.cancel()
  }, [])

  return (
    <div>
      <h1>TDD in React is awesome!!!</h1>
      {posts.map((post) => (
        <code key={post.id}>
          <pre>{JSON.stringify(post, 0, 2)}</pre>
        </code>
      ))}
    </div>
  )
}

export default App
