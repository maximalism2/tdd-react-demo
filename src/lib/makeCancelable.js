export const makeCancelable = (promise) => {
  let wasCanceled = false
  const canceledError = new CanceledPromiseError()

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      (val) => (wasCanceled ? reject(canceledError) : resolve(val)),
      (error) => (wasCanceled ? reject(canceledError) : reject(error))
    )
  })

  return {
    promise: wrappedPromise,
    cancel() {
      wasCanceled = true
    },
  }
}

export class CanceledPromiseError extends Error {
  constructor() {
    super("Promise has been canceled")
  }
}
