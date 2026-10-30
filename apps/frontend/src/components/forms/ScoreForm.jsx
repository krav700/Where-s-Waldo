import { useEffect, useRef, useState } from "react";
import fetchApi from "../../api/api.js";
import getClockTime from "../../utilities/getClockTime.js";

function ScoreForm({ currentMap, setShowScoreForm, setScores }) {
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

            if (response.errors) {
                setErrors(response.errors);
                submitButton.current.disabled = false;
                return;
            }

            const scoreResponse = await fetchApi(`/api/maps/${currentMap.id}/scores`, "GET");

            if (!scoreResponse) {
                console.log("No response recieved: ", response);
                return;
            }

            setShowScoreForm(false);
            setScores(scoreResponse.scores);
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


                localStorage.setItem(`${currentMap.title}`, "completed");
                setScore(response.score);
            } catch (err) {
                return err;
            }
        }
        getScore();
    }, []);

    return (
        <div className="absolute top-[50%] left-[50%] translate-[-50%] z-50 p-5 flex flex-col gap-2 justify-center items-center h-fit w-fit border-3 border-red-500 bg-white rounded-2xl">
            {errors ? (
                <div className="flex flex-col justify-center items-center p-1">
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
                    <fieldset className="flex flex-col gap-2 justify-center items-center w-fit border-red-500 rounded-xl">
                        <legend className="font-bold text-2xl">You won!</legend>
                        <div className="flex flex-col gap-4 p-2">
                            <div>
                                <h3>Your completed this map in:</h3>
                                <h2>{getClockTime(score)}</h2>
                            </div>
                            <div className="flex flex-col gap-1 py-2">
                                <label htmlFor="username" className="text-xl font-semibold">Username:</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    className="bg-white border border-black text-black"
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <button className="w-full p-1 rounded-lg bg-blue-900 text-xl
                        bg-[repeating-linear-gradient(45deg,var(--color-red-400),var(--color-red-400)_10px,white_10px,white_20px)]
                                   disabled:bg-[repeating-linear-gradient(45deg,var(--color-gray-400),var(--color-gray-400)_10px,white_10px,white_20px)]
                                   disabled:cursor-not-allowed text-white font-semibold border border-red-500" ref={submitButton}>
                            Submit
                        </button>
                    </fieldset>
                </form>
        </div>
    );
}

export default ScoreForm;
