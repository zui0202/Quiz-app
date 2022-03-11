const questionProgress = document.querySelector(".question-progress");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const homePage = document.querySelector(".homePage");
const quizPage = document.querySelector(".quizPage");
const resultPage = document.querySelector(".resultPage");

const questionLimit = 4;
let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;

function startQuiz(){
  //hide homePage
  homePage.classList.add("hide");
  //show quizPage
  quizPage.classList.remove("hide");
  //first we will set all question in availableQuestion Array
  setAvailableQuestions();
  //second we will call getNewQuestion() function
  getNewQuestion();
}

function setAvailableQuestions(){
  //set available questions for total quiz length
  const totalQuestion =  quiz.length;
  for (let i=0; i<totalQuestion; i++){
    availableQuestions.push(quiz[i])
  }
}

function getNewQuestion(){
  //set question number, progress bar, and current score
  questionProgress.querySelector(".question-num").innerHTML = "Question " + (questionCounter + 1) + " of " + questionLimit;
  quizPage.querySelector(".curScore").innerHTML = correctAnswers;
  quizPage.querySelector(".question-progress-bar").setAttribute("value", (questionCounter+1)*100/questionLimit);

  //get random question
  const questionIndex = availableQuestions[Math.floor(Math.random()*availableQuestions.length)];
  currentQuestion = questionIndex;
  //set question text
  questionText.innerHTML = currentQuestion.q;
  //get the position of 'questionIndex' from the availableQuestion Array
  const index1 = availableQuestions.indexOf(questionIndex);
  // remove the 'questionIndex' from the availableQuestion Array, so the question does not repeat
  availableQuestions.splice(index1, 1);

  //set options
  //get the length of options
  const optionLen = currentQuestion.options.length
  //push options into availableOptions Array
  for (let i=0; i<optionLen; i++){
    availableOptions.push(i);
  }
  optionContainer.innerHTML = '';

  //create options in html
  for (let i=0; i<optionLen; i++){
    //random option
    const optionIndex = availableOptions[Math.floor(Math.random()*availableOptions.length)];
    //get the position of 'optionIndex' from availableOptions Array
    const index2 = availableOptions.indexOf(optionIndex);
    //remove the 'optionIndex' from the availableOptions Array, so that the option does not repeat
    availableOptions.splice(index2, 1);

    const option = document.createElement("div");
    option.className = "option";
    option.id = optionIndex;
    const optionNum = document.createElement("div");
    //set option num(A, B, C, ...)
    switch(i){
      case 0:
        optionNum.innerHTML = 'A';
        break;
      case 1:
        optionNum.innerHTML = 'B';
        break;
      case 2:
        optionNum.innerHTML = 'C';
        break;
      case 3:
        optionNum.innerHTML = 'D';
        break;
    }
    optionNum.className = "optionNum";
    const optionText = document.createElement("div");
    //set option text
    optionText.innerHTML = currentQuestion.options[optionIndex];
    optionText.className = "optionText";
    option.appendChild(optionNum);
    option.appendChild(optionText);
    optionContainer.appendChild(option);
    //set attribute to get result when option div clicked
    option.setAttribute("onclick", "getResult(this)");
  }

  //add 1 to question number
  questionCounter++;
}

function getResult(element){
  const id = parseInt(element.id);
  //get the answer by comparing the id of clicked option
  if (id == currentQuestion.answer){
    //set the green color to the correct option
    element.setAttribute("style", "background-color: green");
    correctAnswers++;
  }
  else{
    //set the red color to the wrong option
    element.setAttribute("style", "background-color: red");
  }
  quizPage.querySelector(".curScore").innerHTML = correctAnswers;
  setTimeout(function(){next();}, 700);
}

function next(){
  //if there are no quiz left, finish quiz
  if (questionCounter == questionLimit){
    quizOver();
  }
  //if not, show next quiz
  else {
    getNewQuestion();
  }
}

function quizOver(){
  //hide quizPage
  quizPage.classList.add("hide");
  //show resultPage
  resultPage.classList.remove("hide");
  quizResult();
}

function quizResult(){
  //show quiz result
  resultPage.querySelector(".result").innerHTML = "Total score: " + correctAnswers;
}

function playAgain(){
  //hide the resultPage
  resultPage.classList.add("hide");
  //show the quizPage
  quizPage.classList.remove("hide");
  resetQuiz();
  startQuiz();
}

function resetQuiz(){
  //if playAgin clicked, reset quiz
  questionCounter = 0;
  correctAnswers = 0;
  availableQuestions = [];
}
