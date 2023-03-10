var block = document.getElementById("block");
var score = document.getElementById("scoreSpan");
var character = document.getElementById("character");

let counter = 0;
let scores = [];

const loadScores = () => {
    scores = JSON.parse(localStorage.getItem("scores"));
};

const saveNewScore = () => {
    scores.push(counter);
    localStorage.setItem("scores", JSON.stringify(scores));
};

const jump = () => {
    if (character.classList === "animate") return;
    character.classList.add("animate");
    document.getElementById("audio2").play();
    
    setTimeout(() => {
        character.classList.remove("animate");
    }, 300);
};

const timer = setInterval(() => {
    const characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    const blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));

    if (blockLeft < 20 && blockLeft > -20 && characterTop >= 130) {
        const score_max = Math.max(...scores);

        document.getElementById("audio3").play();

        saveNewScore();
        block.style.animation = "none";
        clearInterval(timer);
        if (counter > score_max) {
            alert("New RANK! Game score: " + Math.floor(counter / 100));

        } else {
            alert("Game score: " + Math.floor(counter / 100));
        }
        counter = 0;
        location.reload();
    } else {
        counter++;
        score.innerHTML = Math.floor(counter / 100);
    }
}, 10);

// Events
window.addEventListener("load", () => {
    loadScores();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" || e.keyCode === 32) jump();
});