import config from "../config"
export default (endPoint, options = {}, getResponse) => {

    const defaultOptions = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    options = Object.assign(defaultOptions, options)

    if (options.body && typeof options.body != "string") {
        options.body = JSON.stringify(options.body)
    }

    let fetchPromise = window.fetch(`${config.apiUrl}/${endPoint}`, options)

    if(!getResponse)
        fetchPromise = fetchPromise.then((res) => {
            res.json()
            document.dispatchEvent(new CustomEvent("apiCall", { res }))
        })

    return fetchPromise
}