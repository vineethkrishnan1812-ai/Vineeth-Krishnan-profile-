// ==========================================
// HR GALAXY PORTFOLIO V4
// script.js
// PART 1
// ==========================================

// Loader
window.addEventListener("load",()=>{

document.body.classList.add("loaded");

const loader=document.getElementById("loader");

if(loader){

loader.style.opacity="0";

setTimeout(()=>{

loader.remove();

},600);

}

});

// ==========================================
// Typing Effect
// ==========================================

const words=[

"Human Resources",

"Finance Graduate",

"MBA Graduate",

"Recruitment Specialist",

"Payroll Management",

"Employee Relations",

"HR Analytics"

];

let wordIndex=0;

let charIndex=0;

let deleting=false;

const typing=document.getElementById("typing");

function typingAnimation(){

if(!typing) return;

const current=words[wordIndex];

if(!deleting){

typing.textContent=current.substring(0,charIndex++);

if(charIndex>current.length){

deleting=true;

setTimeout(typingAnimation,1800);

return;

}

}else{

typing.textContent=current.substring(0,charIndex--);

if(charIndex===0){

deleting=false;

wordIndex++;

if(wordIndex>=words.length){

wordIndex=0;

}

}

}

setTimeout(

typingAnimation,

deleting?45:110

);

}

typingAnimation();


// ==========================================
// Mouse Spotlight
// ==========================================

document.addEventListener("mousemove",(e)=>{

document.documentElement.style.setProperty(

"--mouseX",

e.clientX+"px"

);

document.documentElement.style.setProperty(

"--mouseY",

e.clientY+"px"

);

});


// ==========================================
// Navbar Scroll
// ==========================================

const navbar=document.querySelector(".navbar");

window.addEventListener("scroll",()=>{

if(window.scrollY>50){

navbar.classList.add("glass");

}else{

navbar.classList.remove("glass");

}

});


// ==========================================
// Scroll Reveal
// ==========================================

const revealItems=document.querySelectorAll(

".glass-card,.skill-card,.timeline-card,.education-card,.contact-card,.section-title"

);

const observer=new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},

{

threshold:.15

}

);

revealItems.forEach(item=>{

observer.observe(item);

});
// ==========================================
// script.js
// PART 2
// ==========================================

// Floating Glass Cards

document.querySelectorAll(".glass-card").forEach(

(card,index)=>{

card.style.animation=

`floatCard ${6+index}s ease-in-out infinite`;

});


// ==========================================
// Mouse Parallax
// ==========================================

document.addEventListener("mousemove",(e)=>{

const x=(e.clientX/window.innerWidth-.5)*20;

const y=(e.clientY/window.innerHeight-.5)*20;

document.querySelectorAll(".blob").forEach(

(blob,i)=>{

blob.style.transform=

`translate(${x*(i+1)*0.35}px,

${y*(i+1)*0.35}px)

rotate(${x*.25}deg)`;

});

});


// ==========================================
// Active Navigation
// ==========================================

const sections=document.querySelectorAll("section");

const navLinks=document.querySelectorAll(".navbar nav a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const top=section.offsetTop-180;

if(window.scrollY>=top){

current=section.id;

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});


// ==========================================
// Counter Animation
// ==========================================

const counters=document.querySelectorAll("[data-count]");

const counterObserver=new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(!entry.isIntersecting) return;

const el=entry.target;

const target=Number(el.dataset.count);

let value=0;

const speed=Math.max(1,target/100);

const timer=setInterval(()=>{

value+=speed;

if(value>=target){

value=target;

clearInterval(timer);

}

el.textContent=Math.floor(value);

},20);

counterObserver.unobserve(el);

});

},

{

threshold:.5

}

);

counters.forEach(counter=>{

counterObserver.observe(counter);

});


// ==========================================
// Footer Year
// ==========================================

const year=document.getElementById("year");

if(year){

year.textContent=

new Date().getFullYear();

}
// ==========================================
// script.js
// PART 3
// ==========================================

// Smooth Scroll for Navigation

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

const target=document.querySelector(

this.getAttribute("href")

);

if(target){

window.scrollTo({

top:target.offsetTop-80,

behavior:"smooth"

});

}

});

});


// ==========================================
// Profile Ring Tilt Effect
// ==========================================

const profile=document.querySelector(".profile-ring");

document.addEventListener("mousemove",(e)=>{

if(!profile) return;

const x=(e.clientX/window.innerWidth-.5)*12;

const y=(e.clientY/window.innerHeight-.5)*12;

profile.style.transform=

`rotateX(${-y}deg)
 rotateY(${x}deg)`;

});


// ==========================================
// Button Glow Animation
// ==========================================

document.querySelectorAll(

".primary-btn,.resume-btn"

).forEach(btn=>{

btn.addEventListener("mouseenter",()=>{

btn.style.boxShadow=

"0 0 50px rgba(66,212,255,.65)";

});

btn.addEventListener("mouseleave",()=>{

btn.style.boxShadow="";

});

});


// ==========================================
// Floating Background Motion
// ==========================================

let offset=0;

function backgroundMotion(){

offset+=0.002;

document.querySelectorAll(".nebula").forEach(

(n,i)=>{

n.style.transform=

`translateY(${Math.sin(offset+i)*20}px)
 translateX(${Math.cos(offset+i)*15}px)`;

});

requestAnimationFrame(

backgroundMotion

);

}

backgroundMotion();


// ==========================================
// Console Signature
// ==========================================

console.log(

"%cHR Galaxy Portfolio Loaded",

"color:#42d4ff;font-size:18px;font-weight:bold;"

);
document.addEventListener("mousemove",(e)=>{

document.body.style.setProperty(

"--mouse-x",

e.clientX+"px"

);

document.body.style.setProperty(

"--mouse-y",

e.clientY+"px"

);

});
