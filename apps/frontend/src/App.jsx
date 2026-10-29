import { useState, useEffect, useRef } from "react";
import CharacterImage from "./components/characters/CharacterImages";
import skySlopeMap from "./assets/Sky_Slope_Map.png";
import fetchApi from "./api/api";
import ScoreForm from "./components/forms/ScoreForm";
import getClockTime from "./utilities/getClockTime.js";
import addFollowingDot from "./utilities/addFollowingDot.js";
import checkGuess from "./api/checkGuess.js";

function App() {
    const [characters, setCharacters] = useState([
        {
            isActive: true,
            name: "Waldo",
            color: "red",
            imgSrc: "../public/Characters/Waldo.webp",
            guessed: false,
            xCoordinate: 0,
            yCoordinate: 0,
        },
        {
            name: "Wilma",
            color: "purple",
            imgSrc: "../public/Characters/Wilma.webp",
            guessed: false,
            xCoordinate: 0,
            yCoordinate: 0,
        },
        {
            name: "White Beard",
            color: "yellow",
            imgSrc: "../public/Characters/WhiteBeard.webp",
            guessed: false,
            xCoordinate: 0,
            yCoordinate: 0,
        },
    ]);
    const [currentCharacter, setCurrentCharacter] = useState({});
    const [maps, setMaps] = useState([]);
    const [currentMap, setCurrentMap] = useState({});
    const [scores, setScores] = useState([]);
    const [showScoreForm, setShowScoreForm] = useState(false);
    const [winner, setWinner] = useState(false);
    const mainRef = useRef();
    const currentMapRef = useRef();

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
                console.log(response?.scores)

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

    useEffect(() => {
        const handleMouseMove = (event) => {
            addFollowingDot(event, mainRef?.current, currentCharacter);
        }

        if (!currentCharacter?.isMarkerPlaced) {
            currentMapRef?.current?.addEventListener(
                "mousemove",
                handleMouseMove,
            );
        }

        return () => {
            currentMapRef?.current?.removeEventListener(
                "mousemove",
                handleMouseMove,
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
        function sendToHandleMarkerPlacing(e) {
            handleMarkerPlacing(currentCharacter?.name, e);
        }

        currentMapRef?.current?.addEventListener("click", sendToHandleMarkerPlacing);

        return () => {
            currentMapRef?.current?.removeEventListener("click", sendToHandleMarkerPlacing);
        };
    }, [currentCharacter]);

    return (
        <>
            <main
                className="grid p-4 lg:grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr] md:grid-rows-[1fr_1fr] lg:grid-rows-1 md:gap-4 lg:gap-4 min-h-screen justify-center items-center"
                ref={mainRef}
            >
                <div className="flex lg:flex-col md:flex-col gap-4 p-4 pr-0 my-auto">
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
                <div className="row-start-1 md:row-start-auto lg:md:row-start-auto flex flex-col justify-center items-center relative gap-5">
                    <select
                        name="mapSelection"
                        id="mapSelection"
                        className="px-5 py-1 bg-mist-800 border-y-4 border-x-8 border-mist-800"
                    >
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
                        onClick={() => {checkGuess(currentMap, characters, setCharacters, setWinner, setShowScoreForm)}}
                        className="px-2 py-1 font-bold bg-[repeating-linear-gradient(45deg,var(--color-red-400),var(--color-red-400)_10px,white_10px,white_20px)]
                                   disabled:bg-[repeating-linear-gradient(45deg,var(--color-gray-400),var(--color-gray-400)_10px,white_10px,white_20px)]
                                   disabled:cursor-not-allowed"
                        disabled={winner}
                    >
                        Submit Guess
                    </button>
                </div>
                <div className="flex flex-col self-start md:justify-self-start md:row-start-2 md:col-span-3 md:justify-start lg:justify-start lg:col-start-3 lg:row-start-1 lg:self-center max-h-137.5 h-full md:h-fit lg:h-full lg:mr-4 bg-white border-4 border-red-600 py-2 rounded-lg">
                    <h2 className="py-2 border-b">Scoreboard:</h2>
                    <div className="flex flex-col gap-2">
                        {scores?.map((score) => (
                            <div
                                className="grid grid-cols-2 border-b border-black lg:bg-black gap-0.5"
                                key={score.id}
                            >
                                <h3 className="flex justify-center bg-white h-full w-full min-w-[9ch]">{getClockTime(score.score)}</h3>
                                <h3 className="flex justify-center bg-white h-full w-full lg:justify-self-start lg:max-w-[11ch] overflow-hidden whitespace-nowrap">{score.username}</h3>
                            </div>
                        ))}
                    </div>
                </div>
                {showScoreForm && (
                    <ScoreForm
                        currentMap={currentMap}
                        setShowScoreForm={setShowScoreForm}
                        setScores={setScores}
                    />
                )}
            </main>
        </>
    );
}

export default App;
