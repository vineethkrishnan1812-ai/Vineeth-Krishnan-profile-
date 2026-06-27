/* ==========================================
   THREE-SCENE.JS V9
   PART 1
========================================== */

const canvas = document.getElementById("bg-canvas");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
60,
window.innerWidth/window.innerHeight,
1,
1000
);

camera.position.z = 120;

const renderer = new THREE.WebGLRenderer({

canvas,

alpha:true,

antialias:true

});

renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));

renderer.setSize(

window.innerWidth,

window.innerHeight

);

/* ===========================
   PARTICLES
=========================== */

const particleCount = 700;

const geometry = new THREE.BufferGeometry();

const positions = [];

const colors = [];

for(let i=0;i<particleCount;i++){

positions.push(

(Math.random()-0.5)*500,

(Math.random()-0.5)*500,

(Math.random()-0.5)*500

);

colors.push(

1,

0.18 + Math.random()*0.3,

0.25

);

}

geometry.setAttribute(

"position",

new THREE.Float32BufferAttribute(

positions,

3

)

);

geometry.setAttribute(

"color",

new THREE.Float32BufferAttribute(

colors,

3

)

);

const material = new THREE.PointsMaterial({

size:2.5,

vertexColors:true,

transparent:true,

opacity:0.8

});

const particles = new THREE.Points(

geometry,

material

);

scene.add(particles);
/* ==========================================
   PART 2
   ANIMATION + PARALLAX
========================================== */

const mouse = {

x:0,

y:0

};

window.addEventListener("mousemove",(e)=>{

mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;

mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;

});

/* ===========================
   RESIZE
=========================== */

window.addEventListener("resize",()=>{

camera.aspect = window.innerWidth / window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(

window.innerWidth,

window.innerHeight

);

});

/* ===========================
   ANIMATION LOOP
=========================== */

function animate(){

requestAnimationFrame(animate);

/* Rotate particles */

particles.rotation.y += 0.0007;

particles.rotation.x += 0.00025;

/* Mouse parallax */

camera.position.x += (mouse.x * 10 - camera.position.x) * 0.03;

camera.position.y += (-mouse.y * 8 - camera.position.y) * 0.03;

camera.lookAt(scene.position);

/* Floating effect */

particles.position.y = Math.sin(Date.now()*0.0002) * 5;

renderer.render(scene,camera);

}

animate();
