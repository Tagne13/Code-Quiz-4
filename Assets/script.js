// Variables for HTML Elements
    // Time/score
let timerEl = document.querySelector("p.timer");
let secondsLeft = 75;
let scoreEl = document.querySelector(".score");

// Sections
    // Intro
const introEl = document.querySelector("#intro");

    // Questions
const questionsEl = document.querySelector("#questions");
let questionEl = document.querySelector("#question");
let currentQuestion = 0;
const rightWrongEl = document.querySelector("#right-wrong");

    // Final
const finalEl = document.querySelector("#final");
let initialsInput = document.querySelector("#initials");

    // High Scores
const highScoresEl = document.querySelector("#highscores");
let scoreListEl = document.querySelector("#score-list");
let scoreList = [];

//Buttons
const viewScoreBtn = document.querySelector("#view-scores");
const startBtn = document.querySelector("#start");
const ansBtn = document.querySelectorAll("button.ansBtn")
const answer1Btn = document.querySelector("#answer1");
const answer2Btn = document.querySelector("#answer2");
const answer3Btn = document.querySelector("#answer3");
const answer4Btn = document.querySelector("#answer4");
const submitScoresBtn = document.querySelector("#submit-score");
const goBackBtn = document.querySelector("#goback");
const clearScoresBtn = document.querySelector("#clearscores");

// Object for Q & A
const questions = [
    {
        // Question 0
        question: "Commonly used data types do NOT include:",
        answers: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        correctAnswer: "3. alerts"
    },
    {
        // Question 1
        question: "The condition in an if/else statement is enclosed within _____.",
        answers: ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"],
        correctAnswer: "2. curly brackets"
    },
    {
        // Question 2
        question: "Arrays in JavaScript can be used to store _____.",
        answers: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        correctAnswer: "4. all of the above"
    },
    {
        // Question 3
        question: "String values must be closed within _____ when being assigned to variables.",
        answers: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
        correctAnswer: "3. quotes"
    },
    {
        // Question 4
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"],
        correctAnswer: "4. console.log"
    },
    {
        // Question 5
        question: "Which of the following is used to define a variable in JavaScript?",
        answers: ["1. var", "2. const", "3. let", "4. all of the above"],
        correctAnswer: "4. all of the above"
    },
];

// Functions
    // Timer
function startTimer() {
    let timerInterval = setInterval(function() {
        secondsLeft--;
        timerEl.textContent = `Time:${secondsLeft}`;

        if (secondsLeft === 0 || currentQuestion === questions.length) {
            clearInterval(timerInterval);
            questionsEl.style.display = "none";
            finalEl.style.display = "block";
            scoreEl.textContent = secondsLeft;
        }
    }, 1000);
}

     // Start quiz
function startQuiz() {
    introEl.style.display = "none";
    questionsEl.style.display = "block";
    currentQuestion = 0;

    startTimer();
    setQuestions(currentQuestion);
}

    // Set questions
function setQuestions(id) {
    if (id < questions.length) {
        console.log(questions[id]);
        questionEl.textContent = questions[id].question;
        answer1Btn.textContent = questions[id].answers[0];
        answer2Btn.textContent = questions[id].answers[1];
        answer3Btn.textContent = questions[id].answers[2];
        answer4Btn.textContent = questions[id].answers[3];
    }
}
    // Check answer
function checkAnswer(event) {
    console.log(event.target)
    console.log(questions[currentQuestion].correctAnswer);
    event.preventDefault();

    // Show right or wrong answer and append message
    rightWrongEl.style.display = "block";
    let p = document.createElement("p");
    rightWrongEl.appendChild(p);

    // Time out after 1 second
    setTimeout(function() {
        p.style.display = "none";
    }, 1000);

    // Compare value of current question to the value of the answer
     if(questions[currentQuestion].correctAnswer === event.target.innerHTML) {
        p.textContent = "Correct!";
     } else if (questions[currentQuestion].correctAnswer !== event.target.innerHTML) {
        secondsLeft = secondsLeft - 10;
        p.textContent = "Wrong!";
    }

    // Update currentQuestion to the next question
        if (currentQuestion < questions.length) {
            currentQuestion++;
        }
    
    // Bring in next question when answer button is clicked
    setQuestions(currentQuestion);
}

    // Submit score
function submitScore(event) {
    event.preventDefault();

    finalEl.style.display = "none";
    highScoresEl.style.display = "block";

    let init = initialsInput.value.toUpperCase();
    scoreList.push({initials: init, score: secondsLeft});

    scoreList = scoreList.sort((a,b) => {
        if (a.score < b.score) {
            return 1;
        } else {
            return -1;
        }
    });

    scoreListEl.innerHTML="";
    for (let i = 0; i < scoreList.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
        scoreListEl.append(li);
    }
    // Add to local storage and display
    saveScore();
    displayScore();
}

 // Save score to local storage and put into string
 function saveScore() {
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
 }

    // Display score
function displayScore() {
    // Get stored scores from local storage; parse string into object
    let storedScoreList = JSON.parse(localStorage.getItem("scoreList"));
    // If scores were retrieved from local storage, update
    if (storedScoreList !== null) {
        scoreList = storedScoreList;
    }
}

    // Clear scores
function clearScores() {
    localStorage.clear();
    scoreListEl.innerHTML="";
}

// Event Listeners
    // View high scores
viewScoreBtn.addEventListener("click", function() {
    if (highScoresEl.style.display === "none") {
        highScoresEl.style.display = "block";
    } else if (highScoresEl.style.display === "block") {
        highScoresEl.style.display = "none";
    } else {
        return alert("No scores to show!");
    }
});

    // Start quiz
startBtn.addEventListener("click", startQuiz);

    // Check answers
ansBtn.forEach(item => {
item.addEventListener("click", checkAnswer);
});

    // Submit score
submitScoresBtn.addEventListener("click", submitScore);

    // Go back
goBackBtn.addEventListener("click", function() {
    highScoresEl.style.display = "none";
    introEl.style.display = "block";
    secondsLeft = 75;
    timeEl.textContent = `Time:${secondsLeft}`;
});

    // Clear high scores
clearScoresBtn.addEventListener("click", clearScores);



