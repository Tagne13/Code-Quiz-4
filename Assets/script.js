// Variables for HTML Elements
    // Time/score
let timeEl = document.querySelector("p.timer");
let secondsLeft = 75000;
let scoreEl = document.querySelector("p.score");
let score = 0;
let answer = null;

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
const answer1Btn = document.querySelector("#answer1");
const answer2Btn = document.querySelector("#answer2");
const answer3Btn = document.querySelector("#answer3");
const answer4Btn = document.querySelector("#answer4");
const submitScoreBtn = document.querySelector("#submit-score");
const goBackBtn = document.querySelector("#goback");
const clearScoresBtn = document.querySelector("#clearscores");

// Object for Q & A
const questions = [
    {
        // Question 0
        question: "Commonly used data types do NOT include:",
        answers: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        correctAnswer: 2
    },
    {
        // Question 1
        question: "The condition in an if/else statement is enclosed within _____.",
        answers: ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"],
        correctAnswer: 1
    },
    {
        // Question 2
        question: "Arrays in JavaScript can be used to store _____.",
        answers: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        correctAnswer: 3
    },
    {
        // Question 3
        question: "String values must be closed within _____ when being assigned to variables.",
        answers: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
        correctAnswer: 2
    },
    {
        // Question 4
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"],
        correctAnswer: 3
    },
    {
        // Question 5
        question: "Which of the following is used to define a variable in JavaScript?",
        answers: ["1. var", "2. const", "3. let", "4. all of the above"],
        correctAnswer: 3
    },
];

// Functions
    // Timer
function startTimer() {
    let timer = setInterval(function() {
        timerCount--;
        timerEl.textContent = timerCount;
    })
}

function checkClockCondition() {
    if (timerCount <= 0) {
        clearInterval(timer);
        timerElement.textContent = "Time's up!";
    }
}


    // Start quiz
function startQuiz() {
 // Set the question to first question when the quiz starts
    setInterval(() => {
        // Check if the timer has reached 0
        if (secondsLeft <= 0){
            // If so, stop the timer and end the quiz
        }
        
        // Check if the answer is correct
        if (checkAnswer()){
            
            // If correct, add to the score 
        }
        else if(answer === null){
            // If not answered, subtract the standard amount of time
        }
        else{
        // If incorrect, subtract a larger amount of time
        }
    }, 1000)
}
    // Set questions
function setQuestions(i) {
    if (i < questions.length) {
        questionEl.textContent = questions[i].question;
        answer1Btn.textContent = questions[i].answers[0];
        answer2Btn.textContent = questions[i].answers[1];
        answer3Btn.textContent = questions[i].answers[2];
        answer4Btn.textContent = questions[i].answers[3];
    }
}
    // Check answer
function checkAnswer(event) {
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
     if(questions[currentQuestion].correctAnswer === questions[currentQuestion].answers[answer]) {
        p.textContent = "Correct!";
     } else if ([currentQuestion].correctAnswer !==  questions[currentQuestion].answers[answer])
    {
        secondsLeft = secondsLeft - 5;
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

    // Display score
function displayScore() {
    // Get stored scores from local storage; parse string into object
    let storedScoreList = JSON.parse(localStorage.getItem("scoreList"));
    // If scores were retrieved from local storage, update
    if (storedScoreList !== null) {
        scoreList = storedScoreList;
    }
}
    // Save score to local storage and put into string
function saveScore() {
    localStorage.setItem("scoreList", JSON.stringify(scoreList));

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
item.addEventListener("click", checkAnswer);

    // Submit score
submitScoresBtn.addEventListener("click", submitScore);

    // Go back
goBackBtn.addEventListener("click", function() {
    highScoresEl.style.display = "none";
    introEl.style.display = "block";
    secondsLeft = 75000;
    timeEl.textContent = "Time: " + secondsLeft;
});

    // Clear high scores
clearScoresBtn.addEventListener("click", clearScores);



