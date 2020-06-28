import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import "./index.css"

import { worker } from "./mocks/browser"
;(async () => {
  await worker.start({
    serviceWorker: {
      url: process.env.PUBLIC_URL + "/mockServiceWorker.js",
      options: {
        scope: process.env.PUBLIC_URL,
      },
    },
  })

  console.log(process.env.PUBLIC_URL)

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  )
})()
