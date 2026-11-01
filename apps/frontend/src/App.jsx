import { useState, useEffect, useRef } from "react";
import CharacterImage from "./components/characters/CharacterImages";
import skySlopeMap from "./assets/Sky_Slope_Map.png";
import fetchApi from "./api/api";
import ScoreForm from "./components/forms/ScoreForm";
import getClockTime from "./utilities/getClockTime.js";
import addFollowingDot from "./utilities/addFollowingDot.js";
import checkGuess from "./api/checkGuess.js";
import isMobile from "./utilities/isMobile.js";

function App() {
    const [characters, setCharacters] = useState([
        {
            id: 1,
            isActive: true,
            name: "Waldo",
            color: "red",
            imgSrc: "../public/Characters/Waldo.webp",
            guessed: false,
            xCoordinate: 0,
            yCoordinate: 0,
        },
        {
            id: 2,
            name: "Wilma",
            color: "purple",
            imgSrc: "../public/Characters/Wilma.webp",
            guessed: false,
            xCoordinate: 0,
            yCoordinate: 0,
        },
        {
            id: 3,
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
            const response = await fetchApi(`/api/maps/${mapId}`, "GET");
            response.characters[0].isActive = true;

            const redArrow = document.querySelector(`#selectorArrowred`);
            const purpleArrow = document.querySelector(`#selectorArrowpurple`);
            const cyanArrow = document.querySelector(`#selectorArrowcyan`);
            const yellowArrow = document.querySelector(`#selectorArrowyellow`);
            const whiteArrow = document.querySelector(`#selectorArrowwhite`);

            const redDot = document.querySelector(`#selectorDotred`);
            const purpleDot = document.querySelector(`#selectorDotpurple`);
            const cyanDot = document.querySelector(`#selectorDotcyan`);
            const yellowDot = document.querySelector(`#selectorDotyellow`);
            const whiteDot = document.querySelector(`#selectorDotwhite`);

            redArrow?.parentNode.removeChild(redArrow);
            purpleArrow?.parentNode.removeChild(purpleArrow);
            cyanArrow?.parentNode.removeChild(cyanArrow);
            yellowArrow?.parentNode.removeChild(yellowArrow);
            whiteArrow?.parentNode.removeChild(whiteArrow);

            redDot?.parentNode.removeChild(redDot);
            purpleDot?.parentNode.removeChild(purpleDot);
            cyanDot?.parentNode.removeChild(cyanDot);
            yellowDot?.parentNode.removeChild(yellowDot);
            whiteDot?.parentNode.removeChild(whiteDot);

            setCurrentMap(response?.map);
            setCharacters(response?.characters);
            setScores(response?.scores);
            return;
        } catch (err) {
            throw err;
        }
    }

    useEffect(() => {
        const handleMouseMove = (event) => {
            addFollowingDot(event, mainRef?.current, currentCharacter);
        };

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

        currentMapRef?.current?.addEventListener(
            "click",
            sendToHandleMarkerPlacing,
        );

        return () => {
            currentMapRef?.current?.removeEventListener(
                "click",
                sendToHandleMarkerPlacing,
            );
        };
    }, [currentCharacter]);

    const mainBackground = [
        "bg-[#16171d] [background-image:radial-gradient(white_1px,transparent_0)] [background-size:40px_40px] [background-position:-19px_-19px]",
        "bg-[#fef99c] [background-image:radial-gradient(#98e4ff_5px,transparent_0)] [background-size:40px_40px] [background-position:-19px_-19px]",
        "bg-[#a3c3a3] [background-image:radial-gradient(#f7fff2b7_3px,transparent_0)] [background-size:40px_40px] [background-position:-19px_-19px]",
        "bg-[#162759] [background-image:radial-gradient(white_1px,transparent_0)] [background-size:40px_40px] [background-position:-19px_-19px]",
        "bg-black [background-image:radial-gradient(white_1px,transparent_0)] [background-size:40px_40px] [background-position:-19px_-19px]",
    ];

    return (
        <>
            <main
                className={`grid px-4 gap-8 lg:grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr] md:grid-rows-[1fr_1fr] lg:grid-rows-1 md:gap-4 lg:gap-4 min-h-screen justify-center items-center ${mainBackground[maps.findIndex((map) => map.title === currentMap.title)]}`}
                ref={mainRef}
            >
                <div
                    className={
                        !isMobile()
                            ? `grid gap-4 md:p-4 lg:p-4 max-h-screen`
                            : `flex gap-4 md:p-4 lg:p-4 max-h-screen`
                    }
                    style={{gridTemplateRows: !isMobile() && `repeat(${characters?.length}, minmax(0, 1fr))`}}
                >
                    {characters?.map((char) => (
                        <CharacterImage
                            key={char?.name}
                            characters={characters}
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
                        className={`px-5 py-1 font-bold ${localStorage.getItem(`${currentMap.title}`) === "completed" && "text-green-500 text-shadow-xs"}`}
                        defaultValue={maps[0]?.title}
                        onChange={(e) => {
                            changeMap(e.target.value);
                        }}
                    >
                        {maps?.map((map) => (
                            <option
                                key={map.id}
                                value={map.id}
                                className="rounded-2xl border-2 border-red-400 my-1"
                            >
                                {map.title} &nbsp;
                                {localStorage.getItem(`${map.title}`) ===
                                    "completed" && "Complete"}
                            </option>
                        ))}
                    </select>

                    <img
                        ref={currentMapRef}
                        src={currentMap?.imgSrc ?? skySlopeMap}
                        alt={currentMap?.title ?? "Map Image"}
                        className="w-full"
                    />

                    <button
                        onClick={() => {
                            checkGuess(
                                currentMap,
                                characters,
                                setCharacters,
                                setShowScoreForm,
                            );
                        }}
                        className="px-2 py-1 font-bold bg-[repeating-linear-gradient(45deg,var(--color-red-400),var(--color-red-400)_10px,white_10px,white_20px)]
                                   disabled:bg-[repeating-linear-gradient(45deg,var(--color-gray-400),var(--color-gray-400)_10px,white_10px,white_20px)]
                                   disabled:cursor-not-allowed w-[30%]"
                        disabled={
                            localStorage.getItem(`${currentMap.title}`) ===
                            "completed"
                        }
                    >
                        Submit Guess
                    </button>
                </div>
                <div className="flex flex-col self-start md:justify-self-start md:row-start-2 md:col-span-3 md:justify-start lg:justify-start lg:col-start-3 lg:row-start-1 lg:self-center max-h-137.5 h-full md:h-fit lg:h-full lg:mr-4 bg-white border-4 border-red-600 py-2 rounded-lg w-full">
                    <h2 className="py-2 border-b">Scoreboard:</h2>
                    <div className="flex flex-col gap-2">
                        {scores?.map((score) => (
                            <div
                                className="grid w-full grid-cols-2 border-b border-black lg:bg-black gap-0.5"
                                key={score.id}
                            >
                                <h3 className="flex justify-center bg-white h-full w-full min-w-[9ch]">
                                    {getClockTime(score.score)}
                                </h3>
                                <h3 className="flex justify-center bg-white h-full w-full lg:justify-self-start overflow-hidden whitespace-nowrap">
                                    {score.username}
                                </h3>
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
