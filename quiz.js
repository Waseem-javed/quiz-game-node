const question = document.querySelector('.question');
const choices = Array.from(document.getElementsByClassName("choice-text"));
var questCounter = document.getElementById("questions-counter");
var scoreCounter = document.getElementById("scores-counter");
var progressbar = document.querySelector(".progress-bar");
var loader = document.getElementById("loader");
var game = document.getElementById("game");
let currentQuestion = {};
let acceptAnswer = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = {};

let questions = [];

fetch(
	"https://opentdb.com/api.php?amount=20&category=18&difficulty=hard&type=multiple"
)
	.then((res) => {
		return res.json();
	})
	.then((loadquestions) => {
		console.log(loadquestions.results);
		questions = loadquestions.results.map((loadquestion) => {
			const formatedQuestion = {
				question: loadquestion.question,
			};

			const answerChoices = [...loadquestion.incorrect_answers];
			formatedQuestion.answer = Math.floor(Math.random() * 3) + 1;
			answerChoices.splice(
				formatedQuestion.answer - 1,
				0,
				loadquestion.correct_answer
			);

			answerChoices.forEach((choice, index) => {
				formatedQuestion["choice" + (index + 1)] = choice;
			});
			return formatedQuestion;
		});
		startGame();
	});

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 20;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    game.classList.remove("d-none");
	loader.classList.add("d-none");
}

getNewQuestion = () => {

	if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
		// score stored in localstorage
		localStorage.setItem('mostRecentScore', score);
        // go to the end page
        return window.location.assign('./end.html')
    }

    questionCounter++;
    questCounter.innerText = `Questions: ${questionCounter} - ${MAX_QUESTIONS}`;
    
    // update progress bar
    progressbar.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
    
    const n = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[n];
    question.innerText = currentQuestion.question;
    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })

    availableQuestions.splice(n, 1);
    acceptAnswer = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptAnswer) return;

        acceptAnswer = false;
        const selectedChoice = e.target;
        // console.log(selectedChoice);
        const selectedAnswer = parseInt(selectedChoice.dataset["number"]);
        // console.log(selectedAnswer == currentQuestion.answer);

        const classToApply = selectedAnswer === currentQuestion.answer ? 'correct' : 'incorrect';
        // console.log(typeof selectedAnswer,typeof currentQuestion.answer,classToApply)
        if (classToApply === 'correct') {
            score += 10;
            scoreCounter.innerText = score;
        }
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        },1000)

    })
})

