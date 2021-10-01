let displayTime =() => {
let currentTime = new Date();
let h2 = document.querySelector("#current-time");
let date = currentTime.getDate();
let year = currentTime.getFullYear();
let hours = currentTime.getHours();
let minutes = currentTime.getMinutes();
let days = ["Sunday", "Monday", "Tuesday", "Wednsday", "Thursday", "Friday", "Saturday"];
let day = days[currentTime.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let month = months[currentTime.getMonth()];
h2.innerHTML = `Today is ${day}, ${month}, ${date}, ${year}, ${hours}:${minutes}`;
;}
displayTime();

let formatHours = (timestamp) =>{
  let currentTime = new Date(timestamp);
  let hours = currentTime.getHours();
  if(hours<10){hours = `0${hours}`;}
let minutes = currentTime.getMinutes();
if (minutes <10){
  minutes =`0${minutes}`;
}
  return `${hours}:${minutes}`
};

let formatDay= (timestamp) =>{
  let date = new Date(timestamp *1000);
  let day = date.getDay();
  let week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fry', 'Sat', 'Sun'];
  return week[day];
};