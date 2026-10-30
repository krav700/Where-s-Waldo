export default function addFollowingDot(e, parent, currentCharacter) {
    if (currentCharacter?.color == undefined) {
        return;
    }

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

    parent.appendChild(circle);
    parent.appendChild(arrow);
}
