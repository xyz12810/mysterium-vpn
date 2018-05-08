// @flow
type Callback = (data: any) => void

/**
 * Subscribes for specific event and resolves when first event is received.
 *
 * @param subscriber - function to subscribe for specific event
 * @returns {Promise<any>}
 */
function onFirstEvent (subscriber: (Callback) => void): Promise<void> {
  return new Promise((resolve) => {
    subscriber((data) => {
      resolve(data)
    })
  })
}

export { onFirstEvent }