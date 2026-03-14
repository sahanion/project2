const attempted = localStorage.getItem("attempted") || 0;
const correct = localStorage.getItem("correct") || 0;
const wrong = localStorage.getItem("wrong") || 0;

const totalTime = localStorage.getItem("totalTime") || 0;

const topic = localStorage.getItem("quizTopic") || "unknown";

document.getElementById("attempted").innerText =
"Questions Attempted: " + attempted;

document.getElementById("correct").innerText =
"Correct Answers: " + correct;

document.getElementById("wrong").innerText =
"Wrong Answers: " + wrong;

document.getElementById("totalTime").innerText =
"Total Time: " + totalTime + " seconds";

const avg = attempted > 0 ? (totalTime / attempted).toFixed(2) : 0;

document.getElementById("avgTime").innerText =
"Average Time per Question: " + avg + " seconds";

function goHome(){

window.location.href="/";

}

fetch("/api/submitResult", {

method: "POST",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify({

topic: topic,

attempted: attempted,

correct: correct,

wrong: wrong,

time: totalTime

})

})
.then(res => res.json())
.then(data => console.log("Analytics saved"))
.catch(err => console.error("Analytics error", err));