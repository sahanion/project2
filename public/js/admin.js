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