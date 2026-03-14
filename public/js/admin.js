const ADMIN_USER = "admin";
const ADMIN_PASS = "quiz123";

function authenticate(){

const user = prompt("Enter Admin ID");

const pass = prompt("Enter Password");

if(user !== ADMIN_USER || pass !== ADMIN_PASS){

alert("Access Denied");

window.location.href="/";

return false;

}

return true;

}

async function loadAnalytics(){

if(!authenticate()){
return;
}

const res = await fetch("/admin/analytics");

const data = await res.json();

const tableBody = document.querySelector("#analyticsTable tbody");

tableBody.innerHTML = "";

data.forEach(entry => {

const row = document.createElement("tr");

row.innerHTML = `
<td>${entry.ip}</td>
<td>${entry.topic}</td>
<td>${entry.attempted}</td>
<td>${entry.correct}</td>
<td>${entry.wrong}</td>
<td>${entry.time}</td>
<td>${entry.timestamp}</td>
`;

tableBody.appendChild(row);

});

}

loadAnalytics();


async function loadAnalytics(){

const res = await fetch("/admin/analytics");

const data = await res.json();

const tableBody = document.querySelector("#analyticsTable tbody");

tableBody.innerHTML = "";

data.forEach(entry => {

const row = document.createElement("tr");

row.innerHTML = `

<td>${entry.ip}</td>
<td>${entry.topic}</td>
<td>${entry.attempted}</td>
<td>${entry.correct}</td>
<td>${entry.wrong}</td>
<td>${entry.time}</td>
<td>${entry.timestamp}</td>

`;

tableBody.appendChild(row);

});

}

loadAnalytics();