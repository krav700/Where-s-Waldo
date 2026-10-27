import { useEffect, useRef, useState } from "react";
import fetchApi from "../../api/api.js";

function ScoreForm({ currentMap, setShowScoreForm }) {
    const [username, setUsername] = useState("");
    const [errors, setErrors] = useState("");
    const [score, setScore] = useState("");
    const submitButton = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            submitButton.current.disabled = true;

            const response = await fetchApi(`/api/maps/${currentMap.id}/score`, "POST", { username });

            if (!response) {
                console.log("No response recieved: ", response);
                return;
            }

            setShowScoreForm(false);
        } catch (err) {
            console.log(err);
            return err;
        }
    };

    useEffect(() => {
        async function getScore() {
            try {
                const response = await fetchApi(
                    `/api/maps/${currentMap.id}/score`,
                    "GET",
                );

                if (!response) {
                    console.log("No response recieved: ", response);
                    return;
                }

                setScore(response.score);
            } catch (err) {
                return err;
            }
        }
        getScore();
    }, []);

    function getClockTime(seconds) {
        let hours = Math.floor(seconds / 3600);
        let minutes = Math.floor((seconds %  3600) / 60);
        let remainingSeconds = seconds % 60;

        return `${hours < 10 ? `0${hours}` : hours }:${minutes < 10 ? `0${minutes}` : minutes }:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds }`;
    }

    return (
        <div className="absolute top-[50%] left-[50%] translate-[-50%] z-50 p-5 flex flex-col gap-2 justify-center items-center h-fit w-fit bg-red-400">
            {errors ? (
                <div className="flex flex-col justify-center items-center p-5">
                    {errors.map((error) => (
                        <div key={error.msg}>
                            <h3 className="text-sm text-red-500">
                                {error.msg}
                            </h3>
                        </div>
                    ))}
                </div>
            ) : null}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col justify-center items-center"
                >
                    <fieldset className="flex flex-col gap-2 justify-center items-center w-fit">
                        <legend>You won!</legend>
                        <div className="grid grid-cols-[1fr_2fr] gap-y-3">
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                            />

                            <div>
                                <h3>Your completed this map in:</h3>
                                <h2>{getClockTime(score)}</h2>
                            </div>
                        </div>
                        <button className="w-full p-1 rounded-lg bg-blue-900 text-white" ref={submitButton}>
                            Submit
                        </button>
                    </fieldset>
                </form>
        </div>
    );
}

export default ScoreForm;
