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
];
var count = 0;
var answerChoices = ["ans1", "ans2", "ans3", "correct"];
var randomizedAnswerSet = [];
var correct = 0;
var incorrect = 0;
var startInterval;
var delay;

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
    $("#win").text("YOU'RE RIGHT WOO!!!");
    $("#win").hide();
    $("#lose").text("WRONG!");
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
    count++;
    if (count === questions.length) {
        // run endgame 
        count = 0;
    }
}

// create a function that will cycle through questions
function questionCycle() {
    $("#game").show();
    $("#start").text("Start Over");
    displayQuestion();
    startInterval = setInterval(displayQuestion, 5000);   
}

// need to show a timer
// if timer runs out show time ran out screen - after two seconds continue game
$(".answerButton").click(function() {
    // if user clicks correct answer show win screen - after two seconds continue game
    if ($(this).attr("value") === "correct") {
        correct++;
        clearInterval(startInterval);
        $("#game").hide();
        $("#win").show();
        delay = setTimeout(questionCycle, 2000);
    }
    // if user chooses incorrectly show show inccorect guess screen - after two seconds contnue game
    else {
        incorrect++;
        clearInterval(startInterval);
        $("#game").hide();
        $("#lose").show();
        delay = setTimeout(questionCycle, 2000);
    }

})


// if count === questions.length show end screen with score

// create a function that will be passed in once "start game" is clicked
$("#start").click(questionCycle);


