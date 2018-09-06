$("#game").hide();

// delclare vars
var questions = [{
        q: "Which of these is not a Beatle?",
        ans1: "John",
        ans2: "Paul",
        ans3: "George",
        correct: "Bingo"
    },
    {
        q: "What is Ringo's real name?",
        ans1: "Ricky Starr",
        ans2: "Richard Starnes",
        ans3: "Richard Starr",
        correct: "Richard Starkey"
    },
    {
        q: "Which Beatles album sold the most copies?",
        ans1: "Sgt Pepper's Lonely Hearts Club Band",
        ans2: "Please Please Me",
        ans3: "Abbey Road",
        correct: "The White Album (The Beatles)"
    },
    {
        q: "Who did Paul McCartney write the song Hey Jude for?",
        ans1: "His son",
        ans2: "A close family friend",
        ans3: "John Lennon",
        correct: "John Lennon's son"
    },
    {
        q: "What was the only song to appear on a Beatles album that John recorded by himself?",
        ans1: "Let it Be",
        ans2: "Imagine",
        ans3: "Hey Bulldog",
        correct: "Julia"
    },
    {
        q: "What was the final album The Beatles recorded and what year was it released?",
        ans1: "Let it Be, 1969",
        ans2: "Abbey Road, 1969",
        ans3: "Abbey Road, 1970",
        correct: "Let it Be, 1970"
    },
    {
        q: "Who was the first Beatle to have a #1 hit as a solo artist?",
        ans1: "John Lennon",
        ans2: "Paul McCartney",
        ans3: "Ringo Starr",
        correct: "George Harrison"
    },
    {
        q: "Pattie Boyd was the first wife of Eric Clapton, but before that she was the first wife of which Beatle?",
        ans1: "John Lennon",
        ans2: "Ringo Starr",
        ans3: "Paul McCartney",
        correct: "George Harrison"
    },
    {
        q: "Which Beatles song spent the most time as a #1 hit on the Billboard top 100 (12 weeks)?",
        ans1: "I Want to Hold Your Hand",
        ans2: "Please Please Me",
        ans3: "Get Back",
        correct: "Hey Jude"
    },
    {
        q: "Where was the last public performance of The Beatles held before the band broke up?",
        ans1: "Candlestick Park",
        ans2: "Penny Lane",
        ans3: "The roof of Abbey Road Studio",
        correct: "The roof of Apple Corps"
    }
];
var count = 0;
var answerChoices = ["ans1", "ans2", "ans3", "correct"];
var randomizedAnswerSet = [];
var correct = 0;
var incorrect = 0;
var startInterval;
var delay;
var timeCount = 10;
var timer;
var gameStarted = false;

// create a function to arrange the answers randomly but not repeat answers
function setRandomAnswers() {
    while (randomizedAnswerSet.length < 4) {
        var randomAnswer = answerChoices[Math.floor(Math.random() * answerChoices.length)];
        if (randomizedAnswerSet.indexOf(randomAnswer) === -1) {
            randomizedAnswerSet.push(randomAnswer);
        }
    }
}

// function to display a question and its answers
function displayQuestion() {
    if (count === questions.length) {
        // if count === questions.length show end screen with score
        // run endgame
        endGame();
        // count = 0;
    } else {
        $("#background-image").attr("src", "images/sgt-pepper.jpg");
        $("#win").text("Nailed it!");
        $("#win").hide();
        $("#lose").text("The Beatles are not impressed, the correct answer is " + questions[count].correct);
        $("#lose").hide();
        setRandomAnswers();
        $("#question").text(questions[count].q);
        $("#ans1").text(questions[count][randomizedAnswerSet[0]]);
        $("#ans1").attr("value", randomizedAnswerSet[0]);
        $("#ans2").text(questions[count][randomizedAnswerSet[1]]);
        $("#ans2").attr("value", randomizedAnswerSet[1]);
        $("#ans3").text(questions[count][randomizedAnswerSet[2]]);
        $("#ans3").attr("value", randomizedAnswerSet[2]);
        $("#ans4").text(questions[count][randomizedAnswerSet[3]]);
        $("#ans4").attr("value", randomizedAnswerSet[3]);
        timeCount = 10;
        $("#timer").text(timeCount);
        clearInterval(timer);
        timer = setInterval(timerFunction, 1000);
        count++;
    }
}

// timer function for individual questions
function timerFunction() {
    timeCount--;
    $("#timer").text(timeCount);
    // if timer runs out show time ran out screen - after two seconds continue game
    if (timeCount === 0) {
        incorrect++;
        clearInterval(timer);
        clearInterval(startInterval);
        $("#game").hide();
        $("#lose").show();
        delay = setTimeout(questionCycle, 2000);
    }
}

// create a function that will cycle through questions
function questionCycle() {
    gameStarted = true;
    $("#game").show();
    $("#start").text("Start Over");
    displayQuestion();
    startInterval = setInterval(displayQuestion, 10000);
}

$(".answerButton").click(function () {
    // if user clicks correct answer show win screen - after two seconds continue game
    if ($(this).attr("value") === "correct") {
        correct++;
        $("#background-image").attr("src", "images/beatles-win.jpg");
        clearInterval(timer);
        clearInterval(startInterval);
        $("#game").hide();
        $("#win").show();
        delay = setTimeout(questionCycle, 2000);
    }
    // if user chooses incorrectly show show inccorect guess screen - after two seconds contnue game
    else {
        incorrect++;
        $("#background-image").attr("src", "images/beatles-background.jpeg");
        clearInterval(timer);
        clearInterval(startInterval);
        $("#game").hide();
        $("#lose").show();
        delay = setTimeout(questionCycle, 2000);
    }

})

// end game function
function endGame() {
    clearInterval(timer);
    clearInterval(startInterval);
    $("#background-image").attr("src", "images/sgt-pepper.jpg");
    var percent = (correct / 10) * 100;
    $("#game").hide();
    $("#win").hide();
    $("#lose").hide();
    $("#end-game").html(`
    <h1>Your Score:</h1>
    <p> ${percent} </p>
    <p> You got ${correct} questions right and ${incorrect} questions wrong.`);
    $("#end-game").show();
}

// start over 
function startOver() {
    gameStarted = false;
    $("#end-game").hide();
    count = 0;
    correct = 0;
    incorrect = 0;
    clearInterval(timer);
    clearInterval(startInterval);
    timeCount = 10;
    questionCycle();
}

// create a function that will be passed in once "start game" is clicked
$("#start").click(function () {
    if (gameStarted) {
        startOver();
    } else {
        questionCycle();
    }
});