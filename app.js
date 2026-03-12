const calendar = document.getElementById("calendar")
const streakLabel = document.getElementById("streak")
const monthLabel = document.getElementById("monthLabel")

let data = JSON.parse(localStorage.getItem("tracker") || "{}")

function todayString(){
return new Date().toISOString().slice(0,10)
}

function markToday(){

data[todayString()] = true
localStorage.setItem("tracker",JSON.stringify(data))

render()
}

document.getElementById("markBtn").onclick = markToday


function calculateStreak(){

let streak = 0
let d = new Date()

while(true){

let key = d.toISOString().slice(0,10)

if(data[key]){
streak++
d.setDate(d.getDate()-1)
}else{
break
}

}

return streak

}


function render(){

calendar.innerHTML=""

let now = new Date()

let year = now.getFullYear()
let month = now.getMonth()

monthLabel.innerText =
year + " / " + (month+1)

let firstDay = new Date(year,month,1).getDay()

let daysInMonth =
new Date(year,month+1,0).getDate()

for(let i=0;i<firstDay;i++){

let empty = document.createElement("div")
calendar.appendChild(empty)

}

for(let day=1;day<=daysInMonth;day++){

let div = document.createElement("div")
div.className="day"

let dateStr =
year + "-" +
String(month+1).padStart(2,"0") +
"-" +
String(day).padStart(2,"0")

if(data[dateStr]){

div.classList.add("done")
div.innerText="✓"

}else{

div.innerText=day

}

calendar.appendChild(div)

}

streakLabel.innerText =
"Current streak: " + calculateStreak() + " days"

}

render()