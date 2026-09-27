import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import fetchApi from "./api/api";
import CharacterImage from "./components/characters/CharacterImages";
import waldoImage from "./assets/Waldo.jpeg";
import skySlopeMap from "./assets/Sky_Slope_Map.png";

function App() {
    const [color, setColor] = useState();

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

    useEffect(() => {
        window.addEventListener("mousemove", (e) => {
            const circle = document.createElement('div');
            circle.style = `h-5 w-5 rounded-xl left-${e.clientX} top-${e.clientY}`;
        });
    }, []);

    return (
        <>
            <main className="grid grid-cols-[1fr_3fr_1fr] min-h-screen">
                <div className="flex flex-col gap-4 p-6 my-auto">
                    <CharacterImage
                        image={waldoImage}
                        color={"red"}
                        name={"Waldo"}
                        setColor
                    />
                    <CharacterImage
                        image={waldoImage}
                        color={"red"}
                        name={"Waldo"}
                        setColor
                    />
                    <CharacterImage
                        image={waldoImage}
                        color={"red"}
                        name={"Waldo"}
                        setColor
                    />
                </div>
                <div className="flex flex-col justify-center items-center">
                    <img src={skySlopeMap} alt="Sknow map" />
                </div>
            </main>
        </>
    );
}

export default App;
