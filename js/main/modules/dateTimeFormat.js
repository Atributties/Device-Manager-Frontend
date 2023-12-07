export default function formatDateTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);

    // Formatér tid som "hh:mm:ss"
    const timeString = dateTime.toLocaleTimeString("de-DE", { hour12: false });

    // Formatér dato som "dd-MM-yy"
    const dateArray = dateTime.toLocaleDateString("de-DE", {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit'
    }).split('.');

    const dateString = dateArray.join('-');

    return `${timeString} ${dateString}`;
}