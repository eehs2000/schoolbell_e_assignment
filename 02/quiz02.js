//1
document.querySelector("#target-1").classList.remove("border");

//2
document.querySelector("#target-1").style.left = "250px";

//3
let target2 = document.querySelector(".target-2");
target2.classList.remove("border");
target2.classList.add("blue");

//4
target2.style.left = "50px";
target2.style.marginTop = "-15px";

//5
let target3 = document.querySelector("#target-3");
target3.style.transition = "opacity 2s ease";
target3.style.opacity = 0;

setTimeout(() => {
  document.querySelector("#target-4").classList.add("green");
}, 2000);
