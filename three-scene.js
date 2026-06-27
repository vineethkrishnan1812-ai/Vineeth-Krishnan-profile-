/* ==========================================
   THREE SCENE V10
   LUXURY FLOATING LIGHTS
   PART 1
========================================== */

const canvas = document.getElementById("bg-canvas");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
45,
window.innerWidth / window.innerHeight,
0.1,
1000
);

camera.position.z = 30;

const renderer = new THREE.WebGLRenderer({

canvas:canvas,

alpha:true,

antialias:true

});

renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));

renderer.setSize(

window.innerWidth,

window.innerHeight

);

/* ===========================
   LIGHTING
=========================== */

scene.add(

new THREE.AmbientLight(
0xffffff,
0.45
)

);

const redLight = new THREE.PointLight(
0xff3b3b,
3,
80
);

redLight.position.set(8,8,12);

scene.add(redLight);

const redLight2 = new THREE.PointLight(
0x8b0000,
2,
80
);

redLight2.position.set(-8,-6,10);

scene.add(redLight2);

/* ===========================
   GLOWING ORBS
=========================== */

const orbMaterial = new THREE.MeshBasicMaterial({

color:0xff4a4a,

transparent:true,

opacity:0.18

});

const orbs=[];

for(let i=0;i<18;i++){

const orb = new THREE.Mesh(

new THREE.SphereGeometry(

0.35 + Math.random()*0.45,

32,

32

),

orbMaterial.clone()

);

orb.position.set(

(Math.random()-0.5)*28,

(Math.random()-0.5)*18,

(Math.random()-0.5)*12

);

orb.material.opacity =

0.08 + Math.random()*0.18;

scene.add(orb);

orbs.push({

mesh:orb,

speed:0.15 + Math.random()*0.35,

offset:Math.random()*10

});

}
/* ==========================================
   PART 2
   FLOATING ANIMATION
========================================== */

const clock = new THREE.Clock();

const mouse = {

x:0,

y:0

};

window.addEventListener("mousemove",(e)=>{

mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;

mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;

});

window.addEventListener("resize",()=>{

camera.aspect = window.innerWidth / window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(

window.innerWidth,

window.innerHeight

);

});

/* ===========================
   ANIMATE
=========================== */

function animate(){

requestAnimationFrame(animate);

const t = clock.getElapsedTime();

/* Floating Orbs */

orbs.forEach((orb,index)=>{

orb.mesh.position.y +=

Math.sin(

t * orb.speed + orb.offset

) * 0.003;

orb.mesh.position.x +=

Math.cos(

t * orb.speed + orb.offset

) * 0.0015;

orb.mesh.scale.setScalar(

1 + Math.sin(

t + index

) * 0.08

);

});

/* Camera Breathing */

camera.position.x +=

(mouse.x * 1.5 - camera.position.x)

* 0.02;

camera.position.y +=

(-mouse.y * 1.2 - camera.position.y)

* 0.02;

camera.lookAt(scene.position);

/* Gentle Light Motion */

redLight.position.x =

Math.sin(t * 0.4) * 10;

redLight.position.y =

Math.cos(t * 0.3) * 6;

redLight2.position.x =

Math.cos(t * 0.25) * -10;

redLight2.position.y =

Math.sin(t * 0.35) * -6;

renderer.render(scene,camera);

}

animate();
