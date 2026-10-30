import confetti from "canvas-confetti";
import fetchApi from "./api";

export default async function checkGuess(
    currentMap,
    characters,
    setCharacters,
    setShowScoreForm,
) {
    try {
        const response = await fetchApi(
            `/api/maps/${currentMap.id}/getCheckedCharacters`,
            "POST",
            { characters },
        );
        setCharacters(response.characters);

        const end = Date.now() + 5000;
        const colors = ["#bb0000", "#ffffff"];

        function frame() {
            confetti({
                particleCount: 4,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors,
            });
            confetti({
                particleCount: 4,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors,
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }

        if (response.win) {
            setShowScoreForm(true);
            frame();
        }

        return;
    } catch (err) {
        throw err;
    }
}
