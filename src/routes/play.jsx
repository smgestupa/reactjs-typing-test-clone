import { useEffect, useRef, useState } from "react"

export default function Play() {
    // React Variables
    const wordsElement = useRef();
    const [timer, setTimer] = useState(30);

    // Variables
    const words = "lorem ipsum dolor sit amet consectetur adipisicing elit esse consequatur eum minima odio necessitatibus aspernatur quibusdam repudiandae voluptas voluptatem aperiam laudantium laboriosam sit iusto ea a aliquid beatae iste cumque".split(" ");

    // Functions
    function addClassName(element, name) {
        let classNames = element.className.trim().split(" ");

        if (classNames.includes(name)) return;

        classNames[classNames.length] = name;
        
        element.className = classNames.join(" ");
    }

    function removeClassName(element, name) {
        const classNames = element.className.trim().split(" ");
        element.className = classNames.filter(className => className != name).join(" ");
    } 

    const newGame = () => {    
        wordsElement.current.innerHTML = "";
        
        const wordsLength = words.length;

        for (let i = 0; i < timer * 7; i++) {
            const randomWord = words[Math.ceil(Math.random() * wordsLength - 1)];
            wordsElement.current.innerHTML += `<div class="word inline-block"><span class="letter opacity-50">${randomWord.split("").join(`</span><span class="letter opacity-50">`)}</span></div>`
        }

        addClassName(document.querySelector(".word"), "current");
        addClassName(document.querySelector(".letter"), "current");
    }

    useEffect(() => {
        document.body.onmouseleave = (event) => {
            console.log("ruh roh");
        };

        document.body.onkeyup = (event) => {
            const key = event.key;
            const currentWord = document.querySelector(".word.current");
            let currentLetter = document.querySelector(".letter.current");
            const expected = currentLetter?.innerHTML || " ";

            const extraLetters = [...document.querySelectorAll(".letter.extra")];

            if (key.length === 1 && key !== " ") {
                if (currentLetter) {
                    if (key === expected) {
                        removeClassName(currentLetter, "incorrect");
                        removeClassName(currentLetter, "current");
                        addClassName(currentLetter, "correct");
    
                        if (currentLetter.nextSibling)
                            addClassName(currentLetter.nextSibling, "current");
                    } else {
                        removeClassName(currentLetter, "correct");
                        addClassName(currentLetter, "incorrect");
                    } 
                } else if (extraLetters.length <= 5) {
                    const incorrectLetter = `<span class="letter extra incorrect">${key}</span>`;
                    currentWord.innerHTML += incorrectLetter;
                }
            } else if (key === " ") {
                if (expected !== " ") {
                    const invalidatedLetters = [...document.querySelectorAll(".word.current .letter:not(.correct)")];
                    invalidatedLetters.forEach((letter) => {
                        addClassName(letter, "incorrect");
                    });

                    removeClassName(currentWord, "current");
                    removeClassName(currentLetter, "current");
                } else {
                    if (currentWord.nextSibling) {
                        removeClassName(currentWord, "current");
                        removeClassName(currentWord.lastChild, "current");
                        addClassName(currentWord.nextSibling, "current");
                        addClassName(currentWord.nextSibling.firstChild, "current");
                    };
                }
            }

            const cursor = document.querySelector("#play-area > .cursor");

            if (key === "Backspace") {                
                if (extraLetters.length > 0) {
                    currentWord.removeChild(currentWord.lastChild);
                } else if (!currentLetter && extraLetters.length === 0) {
                    removeClassName(currentWord.lastChild, "correct");
                    removeClassName(currentWord.lastChild, "incorrect");
                    addClassName(currentWord.lastChild, "current");

                    const top = Math.ceil(currentWord.getBoundingClientRect().top - currentWord.lastChild.getBoundingClientRect().top);
                    const left = Math.ceil(currentWord.getBoundingClientRect().left - currentWord.lastChild.getBoundingClientRect().left);
                    cursor.style.top = Math.abs(top) + "px";
                    cursor.style.left = Math.abs(left) + "px";
                } else if (currentLetter) {
                    if (currentLetter.previousSibling) {
                        removeClassName(currentLetter, "current");
                        removeClassName(currentLetter, "incorrect");
                        removeClassName(currentLetter, "correct");
                        removeClassName(currentLetter.previousSibling, "incorrect");
                        removeClassName(currentLetter.previousSibling, "correct");
                        addClassName(currentLetter.previousSibling, "current");
    
                        const top = Math.ceil(currentWord.getBoundingClientRect().top - currentLetter.previousSibling.getBoundingClientRect().top);
                        const left = Math.ceil(currentWord.getBoundingClientRect().left - currentLetter.previousSibling.getBoundingClientRect().left);
                        cursor.style.top = Math.abs(top) + "px";
                        cursor.style.left = Math.abs(left) + "px";
                    } else {
                        removeClassName(currentLetter, "incorrect");
                        removeClassName(currentLetter, "correct");
                        addClassName(currentLetter, "current");
    
                        const top = Math.ceil(currentWord.getBoundingClientRect().top - currentLetter.getBoundingClientRect().top);
                        const left = Math.ceil(currentWord.getBoundingClientRect().left - currentLetter.getBoundingClientRect().left);
                        cursor.style.top = Math.abs(top) + "px";
                        cursor.style.left = Math.abs(left) + "px";
                    }
                    
                }
            } else if (key === " ") {
                const top = Math.ceil(currentWord.getBoundingClientRect().top - currentLetter.getBoundingClientRect().top);
                const left = Math.ceil(currentWord.getBoundingClientRect().left - currentLetter.getBoundingClientRect().left);
                cursor.style.top = Math.abs(top) + "px";
                cursor.style.left = Math.abs(left) + "px";
            } else if (currentLetter && currentLetter.nextSibling) {
                const top = Math.ceil(currentWord.getBoundingClientRect().top - currentLetter.getBoundingClientRect().top);
                const left = Math.ceil(currentWord.getBoundingClientRect().left - currentLetter.getBoundingClientRect().right);
                cursor.style.top = Math.abs(top) + "px";
                cursor.style.left = Math.abs(left) + "px";
            } else if (currentLetter && !currentLetter.nextSibling) {
                const top = Math.ceil(currentWord.getBoundingClientRect().top - currentLetter.getBoundingClientRect().top);
                const left = Math.ceil(currentWord.getBoundingClientRect().left - currentLetter.getBoundingClientRect().right);
                cursor.style.top = Math.abs(top) + "px";
                cursor.style.left = Math.abs(left) + "px";
            }
        };

        newGame();
    });

    return (
        <>
            <section className="px-10 w-full max-w-[80rem] mx-auto">
                <div id="play-header" className="flex justify-between">
                    <p className="wpm">WPM: {timer}</p>
                    <button className="new-game">New Game</button>
                </div>
                <div id="play-area" className="relative w-full mt-6 border">
                    <div className="flex w-full [&>.word>.letter.correct]:opacity-100 [&>.word>.letter.incorrect]:opacity-100 [&>.word>.letter.incorrect]:text-red-500 flex-wrap gap-x-3 leading-[2.1875rem] h-[6.5625rem] overflow-hidden focus:bg-red-500" ref={wordsElement}></div>
                    <div className="cursor animate-[blink_.5s_infinite] w-[0.125rem] h-[1.6rem] bg-red-500 absolute top-1.5 left-0"></div>
                </div>
            </section>
        </>
    )
}