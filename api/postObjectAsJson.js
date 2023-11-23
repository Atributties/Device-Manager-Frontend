export default async function postObjectAsJson(url, object, httpVerbum, token) {
    const objectAsJsonString = JSON.stringify(object)
    console.log(objectAsJsonString)
    const fetchOptions = {
        method: httpVerbum,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: objectAsJsonString
    }
    const response = await fetch(url, fetchOptions)
    return response
}
