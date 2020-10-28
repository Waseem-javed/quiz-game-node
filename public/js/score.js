const highScoreList = document.getElementById("highScoreList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
highScoreList.innerHTML = highScores.map(score => {
    return `<li class="list-group-item text-info">${score.name} ${score.score}</li>`;
}).join("");

