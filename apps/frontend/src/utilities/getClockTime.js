export default function getClockTime(seconds) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let remainingSeconds = seconds % 60;

    return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
}
