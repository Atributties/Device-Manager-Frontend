export default async function postObjectAsJson(url, object, httpVerbum, token) {
    const objectAsJsonString = JSON.stringify(object);
    console.log(objectAsJsonString);

    const headers = {
        "Content-Type": "application/json"
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const fetchOptions = {
        method: httpVerbum,
        headers: headers,
        body: objectAsJsonString
    };

    const response = await fetch(url, fetchOptions);
    return response;
}

