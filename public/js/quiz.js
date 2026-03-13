let quizStartTime = Date.now();
let questions = [];
let totalLoaded = 0;
let currentIndex = 0;

let questionStartTime;

let correct = 0;
let wrong = 0;
let attempted = 0;

let timerInterval;
let timeSpent = 0;


const MAX_QUESTIONS = 50;
const topic = localStorage.getItem("quizTopic");

document.getElementById("topicTitle").innerText = topic;

async function startQuiz(){

document.getElementById("startBox").style.display="none";
document.getElementById("quizContainer").style.display="block";

await loadMoreQuestions();

currentIndex = 0;

showQuestion();

}

async function loadMoreQuestions(){

document.getElementById("loader").style.display="block";

const res = await fetch(`/api/questions?topic=${topic}`);

const newQuestions = await res.json();

questions = questions.concat(newQuestions);

totalLoaded += newQuestions.length;

document.getElementById("loader").style.display="none";

}

function showQuestion(){

if(!questions[currentIndex]){
return;
}

updateProgress();

const q = questions[currentIndex];

document.getElementById("questionCard").innerText = q.question;

const container = document.getElementById("optionsContainer");
container.innerHTML="";

document.getElementById("explanationCard").style.display="none";
document.getElementById("nextBtn").style.display="none";

q.options.forEach(option=>{

const btn = document.createElement("button");

btn.className="option";

btn.innerText=option;

btn.onclick=()=>selectOption(btn, option, q.answer, q.explanation);

container.appendChild(btn);

});

startTimer();

}

function selectOption(button, selected, answer, explanation){

stopTimer();

attempted++;

const options = document.querySelectorAll(".option");

options.forEach(btn=>{

if(btn.innerText===answer){
btn.classList.add("correct");
}

if(btn===button && selected!==answer){
btn.classList.add("wrong");
}

btn.disabled=true;

});

if(selected===answer){
correct++;
}else{
wrong++;
}

showExplanation(explanation);

document.getElementById("nextBtn").style.display="inline-block";

}

function showExplanation(text){

const card = document.getElementById("explanationCard");

card.style.display="block";

card.innerHTML="<b>Explanation:</b><br>"+text;

}

async function nextQuestion(){

currentIndex++;

// stop quiz when max reached
if(currentIndex >= MAX_QUESTIONS){
endQuiz();
return;
}

// load more questions if needed
if(currentIndex >= questions.length){
await loadMoreQuestions();
}

showQuestion();

}

async function skipQuestion(){

stopTimer();

currentIndex++;

if(currentIndex >= MAX_QUESTIONS){
endQuiz();
return;
}

if(currentIndex >= questions.length){
await loadMoreQuestions();
}

showQuestion();

}

function previousQuestion(){

if(currentIndex > 0){

currentIndex--;

showQuestion();

}

}

function startTimer(){

timeSpent=0;

timerInterval=setInterval(()=>{

timeSpent++;

document.getElementById("timer").innerText="Time: "+timeSpent+"s";

},1000);

}

function stopTimer(){

clearInterval(timerInterval);

}

function endQuiz(){

const totalTime = Math.floor((Date.now() - quizStartTime) / 1000);

localStorage.setItem("attempted", attempted);
localStorage.setItem("correct", correct);
localStorage.setItem("wrong", wrong);
localStorage.setItem("totalTime", totalTime);

window.location.href="finish.html";

}

function updateProgress(){

const current = currentIndex + 1;

document.getElementById("questionCounter").innerText =
`Question ${current} / ${MAX_QUESTIONS}`;

const percent = (current / MAX_QUESTIONS) * 100;

document.getElementById("progressBar").style.width =
percent + "%";

}