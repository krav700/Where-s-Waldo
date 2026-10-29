import confetti from "canvas-confetti";
import fetchApi from "./api";

var end = Date.now() + 3 * 1000;

var colors = ["#bb0000", "#ffffff"];

function frame() {
    confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
    });
    confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
    });

    if (Date.now() < end) {
        requestAnimationFrame(frame);
    }
}

export default async function checkGuess(
    currentMap,
    characters,
    setCharacters,
    setWinner,
    setShowScoreForm,
) {
    try {
        const response = await fetchApi(
            `/api/maps/${currentMap.id}/getCheckedCharacters`,
            "POST",
            { characters },
        );
        setCharacters(response.characters);

        if (response.win) {
            frame();
            setWinner(true);
            setShowScoreForm(true);
        }

        return;
    } catch (err) {
        throw err;
    }
}
