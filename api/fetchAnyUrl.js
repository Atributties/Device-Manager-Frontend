
export default function fetchAnyUrl(url) {
    return fetch(url).then(response => response.json())
}

