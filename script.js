/* ==========================================
   V9 PREMIUM PORTFOLIO
   SCRIPT.JS
   PART 1
========================================== */

document.addEventListener("DOMContentLoaded", () => {

const sections = document.querySelectorAll(".section");

const navLinks = document.querySelectorAll(".navbar nav a");

const backToTop = document.getElementById("backToTop");

/* ===========================
   ACTIVE NAVBAR
=========================== */

window.addEventListener("scroll", () => {

let current = "";

sections.forEach(section => {

const sectionTop = section.offsetTop - 150;

const sectionHeight = section.offsetHeight;

if (window.scrollY >= sectionTop &&
window.scrollY < sectionTop + sectionHeight) {

current = section.getAttribute("id");

}

});

navLinks.forEach(link => {

link.classList.remove("active");

if (link.getAttribute("href") === "#" + current) {

link.classList.add("active");

}

});

});

/* ===========================
   BACK TO TOP
=========================== */

window.addEventListener("scroll", () => {

if (window.scrollY > 500) {

backToTop.style.display = "flex";

} else {

backToTop.style.display = "none";

}

});

backToTop.addEventListener("click", () => {

window.scrollTo({

top:0,

behavior:"smooth"

});

});

});
/* ==========================================
   PART 2
   SCROLL REVEAL + TYPING EFFECT
========================================== */

/* ===========================
   SCROLL REVEAL
=========================== */

const revealItems = document.querySelectorAll(

".glass-card,.skill-card,.timeline-card,.education-card,.contact-card,.hero-left,.hero-right"

);

const revealOnScroll = () => {

const trigger = window.innerHeight * 0.85;

revealItems.forEach(item => {

const top = item.getBoundingClientRect().top;

if(top < trigger){

item.classList.add("show");

}

});

};

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();

/* ===========================
   TYPING EFFECT
=========================== */

const typing = document.querySelector(".hero h2");

if(typing){

const words = [

"MBA HR & Finance Graduate",

"HR Professional",

"Recruitment Specialist",

"Payroll & Finance"

];

let word = 0;

let char = 0;

let deleting = false;

function typeEffect(){

const current = words[word];

typing.textContent = current.substring(0,char);

if(!deleting){

char++;

if(char > current.length){

deleting = true;

setTimeout(typeEffect,1500);

return;

}

}else{

char--;

if(char === 0){

deleting = false;

word = (word + 1) % words.length;

}

}

setTimeout(typeEffect,deleting ? 50 : 100);

}

typeEffect();

}
/* ==========================================
   PART 3
   PREMIUM EFFECTS
========================================== */

/* ===========================
   MOUSE SPOTLIGHT
=========================== */

const hero = document.querySelector(".hero");

if(hero){

hero.addEventListener("mousemove",(e)=>{

const x = e.clientX / window.innerWidth;

const y = e.clientY / window.innerHeight;

hero.style.background = `
radial-gradient(
circle at ${x*100}% ${y*100}%,
rgba(255,60,60,.12),
transparent 45%
)
`;

});

hero.addEventListener("mouseleave",()=>{

hero.style.background = "transparent";

});

}

/* ===========================
   FLOATING CARDS
=========================== */

const cards = document.querySelectorAll(".floating-card");

cards.forEach((card,index)=>{

card.animate(

[

{transform:"translateY(0px)"},

{transform:"translateY(-15px)"},

{transform:"translateY(0px)"}

],

{

duration:3500 + (index*500),

iterations:Infinity,

easing:"ease-in-out"

}

);

});

/* ===========================
   CARD TILT
=========================== */

document.querySelectorAll(

".glass-card,.skill-card,.timeline-card,.education-card,.contact-card"

).forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect = card.getBoundingClientRect();

const x = e.clientX - rect.left;

const y = e.clientY - rect.top;

const rotateX = -(y - rect.height/2)/20;

const rotateY = (x - rect.width/2)/20;

card.style.transform =

`perspective(1000px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
translateY(-6px)`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform="";

});

});

/* ===========================
   CURRENT YEAR
=========================== */

const year = document.getElementById("year");

if(year){

year.textContent = new Date().getFullYear();

}
