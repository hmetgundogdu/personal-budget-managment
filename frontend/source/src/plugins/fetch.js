import config from "../config"
export default (endPoint, options = {}) => {

    const defaultOptions = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    options = Object.assign(defaultOptions, options)
    console.log(options)

    if (options.body && typeof options.body != "string") {
        options.body = JSON.stringify(options.body)
    }

    return window.fetch(`${config.apiUrl}/${endPoint}`, options)
}