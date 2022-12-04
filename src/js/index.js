//Clock const variables
const formatBtn = document.querySelector(".format-btn");
const period = document.querySelector(".period");
const menuBtn = document.querySelector(".menu-btn");
const menuList = document.querySelector(".menu-list");
const formatText = document.querySelector(".format-text");
//Timer const variables
const hourTimer = document.querySelector(".timer-hour");
const minuteTimer = document.querySelector(".timer-min");
const secondTimer = document.querySelector(".timer-sec");
//Btn const variables
const startBtn = document.querySelector(".btn-start");
const controlBtn = document.querySelector(".btn-control");
const resetBtn = document.querySelector(".btn-reset");

//Desclare timer variables
let hour = 0;
let minute = 0;
let second = 0;
let millisecond = 0;
let cronom;

console.log("Timer created by Alexandra Kononenko");

//Change the period(24h or 12h)
formatBtn.addEventListener("click", () => {
    formatBtn.classList.toggle("active");

    let formatValor = formatBtn.getAttribute("data-format");

    if (formatValor === "12") {
        formatBtn.setAttribute("data-format", "24");
        formatText.innerHTML = "24h format";
    } else {
        formatBtn.setAttribute("data-format", "12");
        formatText.innerHTML = "12h format";
    }
})

//Get time
function showTime() {
    const todayObject = new Date();

    let hour = todayObject.getHours();
    let minute = todayObject.getMinutes();
    let second = todayObject.getSeconds();
    let period = 'PM';

    //set period
    let formatValor = formatBtn.getAttribute("data-format");

    if (formatValor ==="12") {
        
        if(hour > 12) {
            hour = hour - 12;
            period = "PM";
        }else if(hour == 0){
            hour = 12;
            period = "AM";
        }
    }

    hour = checkTime(hour);
    minute = checkTime(minute);
    second = checkTime(second);

    let timeOutput = hour + ":" + minute;
    document.querySelector(".hour").innerHTML = timeOutput;
    document.querySelector(".seconds").innerHTML = second;
    document.querySelector(".period").innerHTML = period;
}

setInterval(showTime, 1000);

//Check time for add 0 in front of numbers < 10
function checkTime (hour) {
    if (hour < 10) {hour = "0" + hour};
    return hour;
}

//Get date 
function showDate() {
    const today = new Date();

    let dayNumber = today.getDate();
    let dayName = today.toLocaleString("default", {weekday: "long"});
    let monthName = today.toLocaleString("default", {month: "short"});
    let year = today.getFullYear();

    document.querySelector(".day-name").innerHTML = dayName;
    document.querySelector(".day-number").innerHTML = dayNumber;
    document.querySelector(".month-name").innerHTML = monthName;
    document.querySelector(".year").innerHTML = year;
}

showDate();

//Call the right button to change the period
menuBtn.addEventListener("click", () => {
    menuList.classList.toggle("active");
});

//Call the start button
startBtn.addEventListener("click", () => {
    clearInterval(cronom);
    cronom = setInterval(() => { timer(); }, 10);
});

//Call the pause button
controlBtn.addEventListener("click", () => {
    clearInterval(cronom);
});

//Call the reset button
resetBtn.addEventListener("click", () => {
    hour = 0;
    minute = 0;
    second = 0;
    millisecond = 0;
    hourTimer.innerText = '00';
    minuteTimer.innerText = '00';
    secondTimer.innerText = '00';
});

//Change the timer
function timer() {
    if ((millisecond += 10) == 1000) {
        millisecond = 0;
        second++;
    }
    if (second == 60) {
        second = 0;
        minute++;
    }
    if (minute == 60) {
        minute = 0;
        hour++;
    }
    hourTimer.innerText = checkTime(hour);
    minuteTimer.innerText = checkTime(minute);
    secondTimer.innerText = checkTime(second);
}