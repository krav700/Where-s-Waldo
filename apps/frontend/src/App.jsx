import { useState, useEffect, useRef } from "react";
import CharacterImage from "./components/characters/CharacterImages";
import waldoImage from "./assets/Waldo.jpeg";
import skySlopeMap from "./assets/Sky_Slope_Map.png";

function App() {
    const [currentCharacter, setCurrentCharacter] = useState({});
    const [characters, setCharacters] = useState([
        {
            isActive: true,
            color: "red",
            isMarkerPlaced: false,
            xCoordinate: 0,
            yCoordinate: 0,
            characterName: "Waldo",
            imgSrc: waldoImage,
        },
        {
            isActive: false,
            color: "purple",
            isMarkerPlaced: false,
            xCoordinate: 0,
            yCoordinate: 0,
            characterName: "Wilma",
            imgSrc: waldoImage,
        },
        {
            isActive: false,
            color: "yellow",
            isMarkerPlaced: false,
            xCoordinate: 0,
            yCoordinate: 0,
            characterName: "WhiteBeard",
            imgSrc: waldoImage,
        },
    ]);
    const currentMapRef = useRef();

    function getScaledCoordinates(event, targetElement, newWidth, newHeight) {
        const rect = targetElement.getBoundingClientRect();

        // 1. Get raw pixel position inside the element
        const xPixel = event.clientX - rect.left;
        const yPixel = event.clientY - rect.top;

        // 2. Normalize to ratios (0 to 1)
        const xRatio = xPixel / rect.width;
        const yRatio = yPixel / rect.height;

        // 3. Scale to your target resolution dimensions
        return {
            x: xRatio * newWidth,
            y: yRatio * newHeight,
        };
    }

    function addFollowingDot(e) {
        console.log(currentCharacter)
        const previousElement = document.querySelector(
            `#selectorDot${currentCharacter?.color}`,
        );
        if (previousElement) {
            previousElement.parentNode.removeChild(previousElement);
        }
        console.log(currentCharacter);
        const circle = document.createElement("div");
        circle.id = `selectorDot${currentCharacter?.color}`;
        circle.style = `pointer-events: none; height: 10px; width: 10px; border-radius: 100vw; position:fixed; background: ${currentCharacter?.color}; left: ${e.clientX - 5}px; top: ${e.clientY - 5}px;`;
        document.body.appendChild(circle);
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

    function handleClick(characterName, e) {
        setCharacters((prev) =>
            prev.map(
                (char) =>
                    (char.characterName === characterName
                        ? {
                              ...char,
                              isMarkerPlaced: !char.isMarkerPlaced,
                              xCoordinate: e.clientX,
                              yCoordinate: e.clientY,
                          }
                        : char),
            ),
        );
    }

    useEffect(() => {
        const activeCharacter = characters.find((char) => {
            console.log(char)
            if (char.isActive) {
                return char;
            }
        });
        setCurrentCharacter(activeCharacter);
    }, [characters]);

    useEffect(() => {
        function sendCharName(e) {
            handleClick(currentCharacter?.characterName, e);
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
                    <CharacterImage
                        image={waldoImage}
                        name={"Waldo"}
                        onClick={() => {
                            setCharacters((prev) =>
                                prev.map((char) =>
                                    char.characterName === "Waldo"
                                        ? {
                                              ...char,
                                              isActive: true,
                                          }
                                        : {
                                              ...char,
                                              isActive: false,
                                          },
                                ),
                            );
                        }}
                    />
                    <CharacterImage
                        image={waldoImage}
                        name={"Wilma"}
                        onClick={() => {
                            setCharacters((prev) =>
                                prev.map((char) =>
                                    char.characterName === "Wilma"
                                        ? {
                                              ...char,
                                              isActive: true,
                                          }
                                        : {
                                              ...char,
                                              isActive: false,
                                          },
                                ),
                            );
                        }}
                    />
                    <CharacterImage
                        image={waldoImage}
                        name={"WhiteBeard"}
                        onClick={() => {
                            setCharacters((prev) =>
                                prev.map((char) =>
                                    char.characterName === "WhiteBeard"
                                        ? {
                                              ...char,
                                              isActive: true,
                                          }
                                        : {
                                              ...char,
                                              isActive: false,
                                          },
                                ),
                            );
                        }}
                    />
                </div>
                <div className="flex flex-col justify-center items-center">
                    <img
                        ref={currentMapRef}
                        id="currentMap"
                        src={skySlopeMap}
                        alt="Sknow map"
                    />
                </div>
                <div className="flex flex-col max-h-137.5 h-full mr-4 bg-amber-300">
                    <h2 className="text-black">Scoreboard:</h2>
                </div>
            </main>
        </>
    );
}

export default App;
