// need a var to hold all questions
// need to have 15 questions with 4 answers each
// need to have an indicator of which answer is correct
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
];
var count = 0;
var answerChoices = ["ans1", "ans2", "ans3", "correct"];
var randomizedAnswerSet = [];
var correct = 0;
var incorrect = 0;

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
    $("#question").text(questions[count].q);
    $("#ans1").text(questions[count][randomizedAnswerSet[0]]);
    $("#ans1").attr("value", randomizedAnswerSet[0]);
    $("#ans2").text(questions[count][randomizedAnswerSet[1]]);
    $("#ans2").attr("value", randomizedAnswerSet[1]);
    $("#ans3").text(questions[count][randomizedAnswerSet[2]]);
    $("#ans3").attr("value", randomizedAnswerSet[2]);
    $("#ans4").text(questions[count][randomizedAnswerSet[3]]);
    $("#ans4").attr("value", randomizedAnswerSet[3]);
}

// show the win screen for 2 seconds
function displayCorrect() {
    correct++;
    $("#game").hide();
    $("#win").text("YOU'RE RIGHT! WOO!");
}

// answer selection and if else statements
// if timer runs out display ran out of time screen
// set interval for a couple seconds and then call function to start time and show question again
$(".answerButton").on("click", function () {
    // if user chooses correctly 
    // show the win screen, wait a couple seconds then call next question
    if ($(this).attr("value") === "correct") {
        $("#game").hide();
        $("#win").text("YOU'RE RIGHT! WOO!");
        var viewCorrect = setTimeout(displayQuestion, 2000);
        $("#win").hide();
        $("#game").show();
    }

    // if user chooses incorrectly 
    // same as timer running out
    else {
        incorrect++;
        console.log(incorrect);

    }

    // show results (tallied correct vs incorrect)

    // restart function

})


// grab button to start the game
// on click call all the functions
$("#start").on("click", function () {
    $("#start").hide();
    setRandomAnswers();
    displayQuestion();
    count++;
    if (count === 4) {
        count = 0;
        $("#start").text("Start Game");
    }

});