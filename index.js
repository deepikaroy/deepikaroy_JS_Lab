function Question(text, choices, rightAnswer) {
    this.answer = rightAnswer;
    this.choices = choices;
    this.text = text;
    this.isCorrectAnswer = function(choice) {
        return this.answer == choice;
    }
}

function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
    this.getQuestionByIndex = function() {
        return this.questions[this.questionIndex];
    }
    this.isLastQuestion = function() {
        return this.questionIndex === this.questions.length;
    }
    this.checkOptionsWithAnswer = function(answer) {
        if (this.getQuestionByIndex().isCorrectAnswer(answer)) {
            this.score++;
        }
        this.questionIndex++;
    }
}


function handleOptionOnClick(id, choice) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.checkOptionsWithAnswer(choice);
        loadQuestions();
    }
}

function loadQuestions() {
    if (quiz.isLastQuestion()) {
        showResultPage();
    } else {
        showQuizPage();
    }
}

function showQuizPage() {
    var questionElement = document.getElementById("question");
    questionElement.innerHTML = quiz.getQuestionByIndex().text

    var choices = quiz.getQuestionByIndex().choices;
    for (let i = 0; i < choices.length; i++) {
        var choiceElement = document.getElementById(`choice${i}`);
        choiceElement.innerHTML = choices[i];
        handleOptionOnClick(`btn${i}`, choices[i]);
    }

    showProgress();
}

function showProgress() {
    var progressElement = document.getElementById("progress");
    progressElement.innerHTML = `Question ${quiz.questionIndex+1}  of ${quiz.questions.length}`;

}

function showResultPage() {
    var resultHTML = `<h1>Result<h1>
                        <h2 id='score'> Your scores: ${quiz.score}. Your percentage is : ${(quiz.score / questions.length * 100)} </h2>`;
    var quizElement = document.getElementById("quiz");
    quizElement.innerHTML = resultHTML;
}

var questions = [
    new Question("JavaScript supports", ["Functions", "XHTML", "CSS", "HTML"], "Functions"),
    new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery", "Django", "NodeJS"], "Django"),
    new Question("Which is used for Connect To Database?", ["PHP", "HTML", "JS", "All"], "PHP"),
    new Question("JavaScript is a ", ["Language", "Programming Language", "Development", "All"], "Programming Language")
];

var quiz = new Quiz(questions);

loadQuestions();