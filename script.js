const questions = [
    {
        question: "What is SWOT analysis?",
        answers: [
            {text: "Strengths, Weaknesses, Opportunities, Threats", correct: true},
            {text: "Sales, Work, Operations, Taxes", correct: false},
            {text: "Strategic, Worldwide, Objectives, Targets", correct: false},
            {text: "None of the above", correct: false},
        ]
    },
    {
        question: "What does ROI stand for?",
        answers: [
            {text: "Return on Investment", correct: true},
            {text: "Revenue of Income", correct: false},
            {text:  "Rate of Interest", correct: false},
            {text: "Real Output Increase", correct: false},
        ]        
    },
    {
        question: "What is the main goal of supply chain management?",
        answers: [
            {text: "Maximizing profit", correct: false},
            {text: "Minimizing costs", correct: false},
            {text: "Maximizing customer value", correct: true},
            {text: "Reducing inventory levels", correct: false},
        ]        
    },
    {
        question: "What does CRM stand for?",
        answers: [
            {text: "Customer Relationship Management", correct: true},
            {text: "Centralized Resource Management", correct: false},
            {text: "Cost Reduction Model", correct: false},
            {text: "Customer Retention Method", correct: false},
        ]        
    },
    {
        question: "What is the function of human resource management?",
        answers: [
            {text: "Finance management", correct: false},
            {text: "Production planning", correct: false},
            {text: "Employee recruitment and training", correct: true},
            {text: "Marketing strategies", correct: false},
        ]        
    },
    {
        question:"What is the purpose of a balance sheet?" ,
        answers: [
            {text: "To track revenue", correct: false},
            {text: "To analyze expenses", correct: false},
            {text: "To measure profitability", correct: false},
            {text: "To show financial position", correct: true},
        ]
    },
    {
        question: "What is meant by the term 'break-even point'?",
        answers: [
            {text: "The point where costs exceed revenue", correct: false},
            {text:"The point where revenue exceeds costs", correct: false},
            {text:  "The point where profit is maximized", correct: false},
            {text: "The point where revenue equals costs", correct: true},
        ]        
    },
    {
        question:  "What is the purpose of market research?",
        answers: [
            {text: "To increase production costs", correct: false},
            {text: "To analyze competitors", correct: true},
            {text: "To decrease customer base", correct: false},
            {text: "To reduce product quality", correct: false},
        ]        
    },
    {
        question: "What is the primary function of operations management?",
        answers: [
            {text:"Human resource management", correct: false},
            {text: "Marketing strategies", correct: false},
            {text: "Supply chain management", correct: false},
            {text:"Production and manufacturing", correct: true},
        ]        
    },
    {
        question:  "What does KPI stand for?",
        answers: [
            {text: "Key Performance Indicator", correct: true},
            {text: "Key Profit Increase", correct: false},
            {text: "Known Product Inventory", correct: false},
            {text: "Keen Performance Improvement", correct: false},
        ]        
    },

];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
 
let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function dingSound(){
    let ding = new Audio ('sounds/correct.mp3');
    ding.play();
}

function wrongSound(){
    let wrong = new Audio ('sounds/wrong.mp3');
    wrong.play();
}


function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        dingSound();
        selectedBtn.classList.add("correct"); 
        score++;
    }else{
        wrongSound();
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";

}


function showScore(){
    resetState();
    let userScore = `You scored ${score} out of ${questions.length}.`;
    questionElement.innerHTML = userScore;
    questionElement.style.textAlign = "center"; 
    nextButton.innerHTML = "Again";
    nextButton.style.display = "block";
    
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();