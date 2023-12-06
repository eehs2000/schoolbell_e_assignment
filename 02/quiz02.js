//1
document.querySelector("#target-1").classList.remove("border");

//2
document.querySelector("#target-1").style.left = "250px";

//3
document.querySelectorAll(".target-2").forEach((el) => {
  el.classList.remove("border");
  el.classList.add("blue");
});

//4
document.querySelectorAll(".target-2").forEach((el) => {
  el.style.left = "50px";
  el.style.marginTop = "-15px";
});

//5
let target3 = document.querySelector("#target-3");
target3.style.transition = "opacity 2s ease";
target3.style.opacity = 0;

setTimeout(() => {
  document.querySelector("#target-4").classList.add("green");
}, 2000);
