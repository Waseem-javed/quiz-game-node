const username = document.getElementById('username');
const savebtn = document.getElementById("savebtn");
const finalScores = document.getElementById("finalScore");

const recentScores = localStorage.getItem("mostRecentScore");


const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const MAX_HIGH_SCORE = 5;

finalScores.innerText = recentScores;

username.addEventListener('keyup', () => {
    savebtn.disabled = !username.value;
})
saveHighScore = e => {
    e.preventDefault();

    const score = {
        score: recentScores,
        name:username.value,
    }

    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign('/')
}