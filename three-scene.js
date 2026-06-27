/* ===================================================
   HR PORTFOLIO V7
   THREE-SCENE.JS
   PART 1
   Scene • Camera • Renderer • Lights
=================================================== */

// ==========================
// CANVAS
// ==========================

const canvas = document.getElementById("bg-canvas");

// ==========================
// SCENE
// ==========================

const scene = new THREE.Scene();

scene.background = null;

scene.fog = new THREE.FogExp2(
0x070707,
0.0018
);

// ==========================
// CAMERA
// ==========================

const camera = new THREE.PerspectiveCamera(

55,

window.innerWidth / window.innerHeight,

0.1,

5000

);

camera.position.set(0,0,140);

// ==========================
// RENDERER
// ==========================

const renderer = new THREE.WebGLRenderer({

canvas,

alpha:true,

antialias:true,

powerPreference:"high-performance"

});

renderer.setPixelRatio(

Math.min(window.devicePixelRatio,2)

);

renderer.setSize(

window.innerWidth,

window.innerHeight

);

renderer.outputEncoding = THREE.sRGBEncoding;

renderer.physicallyCorrectLights = true;

renderer.shadowMap.enabled = false;

// ==========================
// RESIZE
// ==========================

window.addEventListener("resize",()=>{

camera.aspect =
window.innerWidth /
window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(

window.innerWidth,

window.innerHeight

);

});

// ==========================
// LIGHTING
// ==========================

// Ambient

const ambient = new THREE.AmbientLight(

0xffffff,

0.8

);

scene.add(ambient);

// Main Red

const redLight = new THREE.PointLight(

0xff3b3b,

3,

800

);

redLight.position.set(

120,

80,

180

);

scene.add(redLight);

// White Fill

const whiteLight = new THREE.PointLight(

0xffffff,

1.2,

600

);

whiteLight.position.set(

-140,

120,

120

);

scene.add(whiteLight);

// Bottom Glow

const bottomLight = new THREE.PointLight(

0xaa0000,

2,

900

);

bottomLight.position.set(

0,

-180,

120

);

scene.add(bottomLight);

// ==========================
// ROOT GROUP
// ==========================

const world = new THREE.Group();

scene.add(world);
/* ===================================================
   HR PORTFOLIO V7
   THREE-SCENE.JS
   PART 2
   Premium Particle Galaxy + Floating Glass Objects
=================================================== */

// ==========================
// PARTICLE FIELD
// ==========================

const particleGeometry = new THREE.BufferGeometry();

const particleCount = 8000;

const positions = new Float32Array(particleCount * 3);

for(let i=0;i<particleCount;i++){

const i3 = i * 3;

positions[i3]     = (Math.random() - 0.5) * 1800;
positions[i3 + 1] = (Math.random() - 0.5) * 1200;
positions[i3 + 2] = (Math.random() - 0.5) * 1800;

}

particleGeometry.setAttribute(

"position",

new THREE.BufferAttribute(positions,3)

);

const particleMaterial = new THREE.PointsMaterial({

color:0xff4444,

size:1.4,

transparent:true,

opacity:.7,

depthWrite:false

});

const particles = new THREE.Points(

particleGeometry,

particleMaterial

);

world.add(particles);


// ==========================
// FLOATING GLASS OBJECTS
// ==========================

const glassGroup = new THREE.Group();

world.add(glassGroup);

for(let i=0;i<12;i++){

const geo = new THREE.IcosahedronGeometry(

5 + Math.random()*6,

3

);

const mat = new THREE.MeshPhysicalMaterial({

color:0xffffff,

roughness:.05,

metalness:.1,

transmission:1,

transparent:true,

opacity:.22,

clearcoat:1,

ior:1.45

});

const mesh = new THREE.Mesh(geo,mat);

mesh.position.set(

(Math.random()-0.5)*180,

(Math.random()-0.5)*120,

(Math.random()-0.5)*120

);

mesh.rotation.set(

Math.random()*Math.PI,

Math.random()*Math.PI,

Math.random()*Math.PI

);

mesh.userData = {

speed:0.002 + Math.random()*0.003,

offset:Math.random()*10

};

glassGroup.add(mesh);

}


// ==========================
// RED GLOW SPHERES
// ==========================

const glowGroup = new THREE.Group();

world.add(glowGroup);

for(let i=0;i<6;i++){

const sphere = new THREE.Mesh(

new THREE.SphereGeometry(

10,

32,

32

),

new THREE.MeshBasicMaterial({

color:0xff2222,

transparent:true,

opacity:.12

})

);

sphere.position.set(

(Math.random()-0.5)*250,

(Math.random()-0.5)*180,

-120 - Math.random()*200

);

glowGroup.add(sphere);

}
/* ===================================================
   HR PORTFOLIO V7
   THREE-SCENE.JS
   PART 3
   Neural Network + Mouse Parallax + Animation
=================================================== */

// ==========================
// NEURAL NETWORK
// ==========================

const networkGroup = new THREE.Group();

world.add(networkGroup);

const nodeMaterial = new THREE.MeshBasicMaterial({

color:0xff5555

});

const nodes = [];

const nodeCount = 45;

for(let i=0;i<nodeCount;i++){

const node = new THREE.Mesh(

new THREE.SphereGeometry(0.8,12,12),

nodeMaterial

);

node.position.set(

(Math.random()-0.5)*180,

(Math.random()-0.5)*120,

(Math.random()-0.5)*120

);

networkGroup.add(node);

nodes.push(node);

}

// ==========================
// CONNECTION LINES
// ==========================

const lineMaterial = new THREE.LineBasicMaterial({

color:0xff4444,

transparent:true,

opacity:.12

});

for(let i=0;i<nodes.length;i++){

for(let j=i+1;j<nodes.length;j++){

const distance =

nodes[i].position.distanceTo(

nodes[j].position

);

if(distance<45){

const geometry = new THREE.BufferGeometry().setFromPoints([

nodes[i].position,

nodes[j].position

]);

const line = new THREE.Line(

geometry,

lineMaterial

);

networkGroup.add(line);

}

}

}

// ==========================
// MOUSE PARALLAX
// ==========================

let mouseX = 0;

let mouseY = 0;

window.addEventListener("mousemove",(e)=>{

mouseX =

(e.clientX/window.innerWidth-.5)*2;

mouseY =

(e.clientY/window.innerHeight-.5)*2;

});

// ==========================
// CLOCK
// ==========================

const clock = new THREE.Clock();

// ==========================
// ANIMATION LOOP
// ==========================

function animate(){

requestAnimationFrame(animate);

const t = clock.getElapsedTime();

// Particle Rotation

particles.rotation.y += 0.00015;

particles.rotation.x += 0.00003;

// Glass Objects

glassGroup.children.forEach((mesh)=>{

mesh.rotation.x += mesh.userData.speed;

mesh.rotation.y += mesh.userData.speed*1.2;

mesh.position.y +=

Math.sin(

t+mesh.userData.offset

)*0.02;

});

// Red Glow

glowGroup.children.forEach((g,i)=>{

g.scale.setScalar(

1+

Math.sin(

t+i

)*0.08

);

});

// Neural Nodes

nodes.forEach((node,i)=>{

node.position.y +=

Math.sin(

t+i

)*0.02;

});

// Camera Movement

camera.position.x +=

(mouseX*15-camera.position.x)*0.03;

camera.position.y +=

(-mouseY*10-camera.position.y)*0.03;

camera.lookAt(scene.position);

// Render

renderer.render(

scene,

camera

);

}

animate();
/* ===================================================
   THREE-SCENE.JS
   PART 4
   CAMERA + MAIN ANIMATION LOOP
=================================================== */

// =====================================
// MOUSE
// =====================================

let mouseX = 0;
let mouseY = 0;

window.addEventListener("mousemove",(e)=>{

mouseX = (e.clientX/window.innerWidth-.5)*2;

mouseY = (e.clientY/window.innerHeight-.5)*2;

});


// =====================================
// CLOCK
// =====================================

const clock = new THREE.Clock();


// =====================================
// ANIMATION
// =====================================

function animate(){

requestAnimationFrame(animate);

const t = clock.getElapsedTime();


// ================================
// FLOATING GLASS
// ================================

glassGroup.children.forEach(obj=>{

obj.position.y +=
Math.sin(
t*obj.userData.speed+
obj.userData.offset
)*0.02;

obj.rotation.x += obj.userData.rotate;

obj.rotation.y += obj.userData.rotate*0.8;

});


// ================================
// RED CRYSTALS
// ================================

crystalGroup.children.forEach(obj=>{

obj.rotation.x += 0.006;

obj.rotation.y += 0.01;

obj.position.y +=
Math.cos(
t*obj.userData.speed+
obj.userData.offset
)*0.015;

});


// ================================
// PARTICLES
// ================================

particles.rotation.y += 0.0004;

particles.rotation.x += 0.00008;


// ================================
// LIGHT MOTION
// ================================

redLight.position.x =
Math.sin(t*.4)*180;

redLight.position.z =
150+
Math.cos(t*.5)*70;

whiteLight.position.y =
120+
Math.sin(t*.6)*40;


// ================================
// CAMERA PARALLAX
// ================================

camera.position.x +=

(mouseX*12-camera.position.x)*0.03;

camera.position.y +=

(-mouseY*8-camera.position.y)*0.03;

camera.lookAt(

scene.position

);


// ================================
// WORLD ROTATION
// ================================

world.rotation.y += 0.0005;


// ================================
// RENDER
// ================================

renderer.render(

scene,

camera

);

}

animate();
