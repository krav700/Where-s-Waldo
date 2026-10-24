import { useState, useEffect, useRef } from "react";
import CharacterImage from "./components/characters/CharacterImages";
// import waldoImage from "./assets/Waldo.jpeg";
import skySlopeMap from "./../public/Sky_Slope_Map.png";
import fetchApi from "./api/api";

function App() {
    const [currentCharacter, setCurrentCharacter] = useState({});
    const [currentMap, setCurrentMap] = useState({});
    const currentMapRef = useRef();
    let firstLoad = true;
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        async function getInitialCharacters() {
            if (firstLoad) {
                try {
                    const response = await fetchApi(
                        `/api/characters/initial`,
                        "GET",
                    );

                    response.characters[0].isActive = true;

                    setCharacters(response.characters);

                    return;
                } catch (err) {
                    throw err;
                }
            }
        }
        getInitialCharacters();
    }, []);

    async function changeMap(title) {
        try {
            const response = await fetchApi(
                `/api/maps/${title}/characters`,
                "GET",
            );

            const data = response.json();

            setCurrentMap(data);
            firstLoad = false;
            return;
        } catch (err) {
            throw err;
        }
    }

    function checkGuess() {
        setCharacters((prev) =>
            prev?.map((char) => {
                if (
                    char.endXCoordinate > char.xCoordinate &&
                    char.xCoordinate > char.startXCoordinate &&
                    char.endYCoordinate > char.yCoordinate &&
                    char.yCoordinate > char.startYCoordinate
                ) {
                    return {
                        ...char,
                        guessed: true,
                    };
                }
                return {
                    ...char,
                    guessed: false,
                };
            }),
        );
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

        const arrow = document.createElement('p');
        arrow.id = `selectorArrow${currentCharacter?.color}`;
        arrow.textContent = '↓';
        arrow.style = `color: ${currentCharacter?.color};
        pointer-events: none;
        font-size: 1.5rem;
        position:absolute;
        left: ${e.pageX - 10}px; top: ${e.pageY - 40}px;
        text-shadow: 2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000,
             1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000;
        
        `;

        document.body.appendChild(circle);
        document.body.appendChild(arrow);
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

    function handleClick(name, e) {
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
        const activeCharacter = characters.find((char) => {
            if (char.isActive) {
                return char;
            }
        });
        setCurrentCharacter(activeCharacter);


        const undefinedCircle = document.querySelector(
            `#selectorDotundefined`,
        );
        const undefinedArrow = document.querySelector(
            `#selectorArrowundefined`,
        );
        undefinedCircle?.parentNode.removeChild(undefinedCircle);
        undefinedArrow?.parentNode.removeChild(undefinedArrow);

    }, [characters]);

    useEffect(() => {
        function sendCharName(e) {
            handleClick(currentCharacter?.name, e);
        }

        currentMapRef?.current?.addEventListener("click", sendCharName);

        return () => {
            currentMapRef?.current?.removeEventListener("click", sendCharName);
        };
    }, [currentCharacter]);

    return (
        <>
            <main className="grid grid-cols-[1fr_3fr_1fr] gap-4 min-h-screen justify-center items-center">
                <div className="flex flex-col gap-4 p-4 pr-0 my-auto">
                    {characters.map((char) => (
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
                        <option value="snowMap" defaultChecked>
                            Snow Map
                        </option>
                        <option value="otherOption" defaultChecked>
                            Other Option
                        </option>
                        <option value="otherOption" defaultChecked>
                            Other Option
                        </option>
                    </select>

                    <img
                        ref={currentMapRef}
                        src={skySlopeMap}
                        alt={currentMap?.title ?? "Map Image"}
                    />

                    <button
                        onClick={checkGuess}
                        className="px-2 py-1 text-black font-bold bg-[repeating-linear-gradient(45deg,var(--color-red-400),var(--color-red-400)_10px,white_10px,white_20px)]"
                    >
                        Submit Guess
                    </button>
                </div>
                <div className="flex flex-col max-h-137.5 h-full mr-4 bg-amber-300">
                    <h2 className="text-black">Scoreboard:</h2>
                </div>
            </main>
        </>
    );
}

export default App;
