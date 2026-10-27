import { useState, useEffect, useRef } from "react";
import CharacterImage from "./components/characters/CharacterImages";
import skySlopeMap from "./assets/Sky_Slope_Map.png";
import fetchApi from "./api/api";
import confetti from "canvas-confetti";
import ScoreForm from "./components/forms/ScoreForm";

function App() {
    const [characters, setCharacters] = useState([]);
    const [currentCharacter, setCurrentCharacter] = useState({});
    const [maps, setMaps] = useState([]);
    const [currentMap, setCurrentMap] = useState({});
    const [scores, setScores] = useState([]);
    const [showScoreForm, setShowScoreForm] = useState(false);
    const mainRef = useRef();
    const currentMapRef = useRef();

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

    useEffect(() => {
        async function getMaps() {
            try {
                const response = await fetchApi(`/api/maps`, "GET");
                setMaps(response.maps);
                return;
            } catch (err) {
                throw err;
            }
        }
        getMaps();

        async function getInitialProps() {
            try {
                const response = await fetchApi(`/api/initial`, "GET");
                response.characters[0].isActive = true;
                setCharacters(response?.characters);
                setCurrentMap(response?.map);
                setScores(response?.scores);

                return;
            } catch (err) {
                throw err;
            }
        }
        if (window.location.pathname === "/") {
            getInitialProps();
        }
    }, []);

    async function changeMap(mapId) {
        try {
            const response = await fetchApi(
                `/api/maps/${mapId}/characters`,
                "GET",
            );
            setCurrentMap(response?.map);
            return;
        } catch (err) {
            throw err;
        }
    }

    async function checkGuess() {
        try {
            const response = await fetchApi(
                `/api/maps/${currentMap.id}/getCheckedCharacters`,
                "POST",
                { characters },
            );
            setCharacters(response.characters);

            if (response.win) {
                frame();
                setShowScoreForm(true);
            }

            return;
        } catch (err) {
            throw err;
        }
    }

    function addFollowingDot(e) {
        const previousCircle = document.querySelector(
            `#selectorDot${currentCharacter?.color}`,
        );
        const previousArrow = document.querySelector(
            `#selectorArrow${currentCharacter?.color}`,
        );

        if (previousCircle) {
            previousCircle.parentNode.removeChild(previousCircle);
            previousArrow.parentNode.removeChild(previousArrow);
        }
        const circle = document.createElement("div");
        circle.id = `selectorDot${currentCharacter?.color}`;
        circle.style = `border: 1px solid black;
            pointer-events: none; height: 10px;
            width: 10px; border-radius: 100vw;
            position:absolute; background: ${currentCharacter?.color};
            left: ${e.pageX - 5}px; top: ${e.pageY - 5}px;
            `;

        const arrow = document.createElement("p");
        arrow.id = `selectorArrow${currentCharacter?.color}`;
        arrow.textContent = "↓";
        arrow.style = `color: ${currentCharacter?.color};
        pointer-events: none;
        font-size: 1.5rem;
        position:absolute;
        left: ${e.pageX - 10}px; top: ${e.pageY - 40}px;
        text-shadow: 2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000,
             1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000;
        
        `;

        mainRef.current.appendChild(circle);
        mainRef.current.appendChild(arrow);
    }

    useEffect(() => {
        if (!currentCharacter?.isMarkerPlaced) {
            currentMapRef?.current?.addEventListener(
                "mousemove",
                addFollowingDot,
            );
        }

        return () => {
            currentMapRef?.current?.removeEventListener(
                "mousemove",
                addFollowingDot,
            );
        };
    }, [currentCharacter]);

    function handleMarkerPlacing(name, e) {
        setCharacters((prev) =>
            prev?.map((char) =>
                char.name === name
                    ? {
                          ...char,
                          isMarkerPlaced: !char.isMarkerPlaced,
                          xCoordinate:
                              (e.clientX -
                                  e.currentTarget.getBoundingClientRect()
                                      .left) /
                              e.currentTarget.width,
                          yCoordinate:
                              (e.clientY -
                                  e.currentTarget.getBoundingClientRect().top) /
                              e.currentTarget.height,
                      }
                    : char,
            ),
        );
    }

    useEffect(() => {
        const activeCharacter = characters?.find((char) => {
            if (char.isActive) {
                return char;
            }
        });
        setCurrentCharacter(activeCharacter);

        const undefinedCircle = document.querySelector(`#selectorDotundefined`);
        const undefinedArrow = document.querySelector(
            `#selectorArrowundefined`,
        );
        undefinedCircle?.parentNode.removeChild(undefinedCircle);
        undefinedArrow?.parentNode.removeChild(undefinedArrow);
    }, [characters]);

    useEffect(() => {
        function sendCharName(e) {
            handleMarkerPlacing(currentCharacter?.name, e);
        }

        currentMapRef?.current?.addEventListener("click", sendCharName);

        return () => {
            currentMapRef?.current?.removeEventListener("click", sendCharName);
        };
    }, [currentCharacter]);

    useEffect(() => {
        console.log("No problem here")
        console.log(showScoreForm);
        console.log("yep")
    }, [showScoreForm])

    return (
        <>
            <main className="grid grid-cols-[1fr_3fr_1fr] gap-4 min-h-screen justify-center items-center" ref={mainRef}>
                <div className="flex flex-col gap-4 p-4 pr-0 my-auto">
                    {characters?.map((char) => (
                        <CharacterImage
                            key={char.id}
                            character={char}
                            onClick={() => {
                                setCharacters((prev) =>
                                    prev?.map((prevChar) =>
                                        prevChar.name === char.name
                                            ? { ...prevChar, isActive: true }
                                            : { ...prevChar, isActive: false },
                                    ),
                                );
                            }}
                        />
                    ))}
                </div>
                <div className="flex flex-col justify-center items-center relative gap-5">
                    <select name="mapSelection" id="mapSelection">
                        {maps?.map((map) => (
                            <option
                                value={map.title}
                                defaultChecked={maps[0] === map}
                                key={map.id}
                            >
                                {map.title}
                            </option>
                        ))}
                    </select>

                    <img
                        ref={currentMapRef}
                        src={currentMap?.imgSrc ?? skySlopeMap}
                        alt={currentMap?.title ?? "Map Image"}
                    />

                    <button
                        onClick={checkGuess}
                        className="px-2 py-1 text-black font-bold bg-[repeating-linear-gradient(45deg,var(--color-red-400),var(--color-red-400)_10px,white_10px,white_20px)]
                                   disabled:bg-[repeating-linear-gradient(45deg,var(--color-gray-400),var(--color-gray-400)_10px,white_10px,white_20px)]
                                   disabled:cursor-not-allowed"
                        disabled={showScoreForm}
                    >
                        Submit Guess
                    </button>
                </div>
                <div className="flex flex-col max-h-137.5 h-full mr-4 bg-amber-300">
                    <h2 className="text-black">Scoreboard:</h2>
                    {console.log(scores)}
                    <div className="flex flex-col gap-2">
                        {scores?.map((score) => (
                            <div className="grid grid-cols-2 border px-2 py-1" key={score.id}>
                                <h3>{score.score}</h3>
                                <h3>{score.username}</h3>
                            </div>
                        ))}
                    </div>
                </div>
                {showScoreForm && <ScoreForm currentMap={currentMap} setShowScoreForm={setShowScoreForm} />}
            </main>
        </>
    );
}

export default App;
