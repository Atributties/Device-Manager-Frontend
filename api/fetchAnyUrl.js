export default function fetchAnyUrl(url, options = {}, token) {
    // Standardindstillinger for fetch-anmodningen
    const defaultOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // Du kan tilføje flere standardheaders her, hvis det er nødvendigt
        },
    };

    // Sammensæt indstillingerne med standardindstillinger og eventuelle brugerdefinerede indstillinger
    const fetchOptions = { ...defaultOptions, ...options };

    // Hvis der er en token, tilføj den til headers
    if (token) {
        fetchOptions.headers['Authorization'] = `Bearer ${token}`;
    }
    console.log(token)
    console.log(fetchOptions)
    // Udfør fetch-anmodningen
    return fetch(url, fetchOptions)
        .then(response => response.json())
        .catch(error => {
            console.error("Fetch fejlede:", error);
            throw error; // Kast fejlen videre, så det kan håndteres af kaldende kode
        });

}


