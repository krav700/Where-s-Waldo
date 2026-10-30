export default function isMobile() {
    return window.matchMedia("(max-width: 767px)").matches;
}