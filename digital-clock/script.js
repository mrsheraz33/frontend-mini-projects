let hrs =document.getElementById("hrs")
let min =document.getElementById("min")
let sec =document.getElementById("sec")
let ampm =document.getElementById("ampm")


setInterval(() => {
    let currentdate = new Date();

hrs.innerHTML = (currentdate.getHours() <10 ?'0':"") + currentdate.getHours();
min.innerHTML = (currentdate.getMinutes()  <10 ?'0':"")+ currentdate.getMinutes();
sec.innerHTML = (currentdate.getSeconds()  <10 ?'0':"") + currentdate.getSeconds();
hrs.innerHTML = currentdate.getHours() % 12|| 12;
ampm.innerHTML = currentdate.getHours() >= 12 ? "AM": "PM"

}, 1000);




