// ===================================================
// THREE-SCENE.JS
// PART 1
// Scene + Camera + Renderer + Galaxy
// ===================================================

// ---------- Scene ----------

const scene = new THREE.Scene();

scene.background = null;

scene.fog = new THREE.FogExp2(
0x02040d,
0.0015
);

// ---------- Camera ----------

const camera = new THREE.PerspectiveCamera(

60,

window.innerWidth/window.innerHeight,

0.1,

3000

);

camera.position.set(0,0,140);

// ---------- Renderer ----------

const renderer = new THREE.WebGLRenderer({

canvas:document.getElementById("bg-canvas"),

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

renderer.outputEncoding=THREE.sRGBEncoding;
const controls = new THREE.OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;
controls.dampingFactor = 0.05;

controls.enableZoom = false;
controls.enablePan = false;

controls.autoRotate = true;
controls.autoRotateSpeed = 0.4;


// ---------- Resize ----------

window.addEventListener("resize",()=>{

camera.aspect=

window.innerWidth/

window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(

window.innerWidth,

window.innerHeight

);

});


// ===================================================
// GALAXY STARS
// ===================================================

const STAR_COUNT=15000;

const starGeometry=

new THREE.BufferGeometry();

const starVertices=[];

for(let i=0;i<STAR_COUNT;i++){

starVertices.push(

(Math.random()-.5)*3500,

(Math.random()-.5)*2200,

(Math.random()-.5)*3500

);

}

starGeometry.setAttribute(

"position",

new THREE.Float32BufferAttribute(

starVertices,

3

)

);

const starMaterial=

new THREE.PointsMaterial({

color:0xffffff,

size:1,

transparent:true,

opacity:.85,

depthWrite:false

});

const stars=

new THREE.Points(

starGeometry,

starMaterial

);

scene.add(stars);


// ===================================================
// BRIGHT STAR CLUSTERS
// ===================================================

const clusterGeometry=

new THREE.BufferGeometry();

const cluster=[];

for(let i=0;i<1200;i++){

cluster.push(

(Math.random()-.5)*1200,

(Math.random()-.5)*900,

(Math.random()-.5)*1200

);

}

clusterGeometry.setAttribute(

"position",

new THREE.Float32BufferAttribute(

cluster,

3

)

);

const clusterMaterial=

new THREE.PointsMaterial({

color:0x79d9ff,

size:2.2,

transparent:true,

opacity:1,

depthWrite:false

});

const brightStars=

new THREE.Points(

clusterGeometry,

clusterMaterial

);

scene.add(brightStars);


// ===================================================
// Ambient Light
// ===================================================

const ambient=

new THREE.AmbientLight(

0xffffff,

1.4

);

scene.add(ambient);
// ===================================================
// THREE-SCENE.JS
// PART 2
// Nebula + Glass Objects + Shooting Stars
// ===================================================

// ---------- Nebula ----------

const nebulaGroup = new THREE.Group();

for(let i=0;i<10;i++){

const geometry=new THREE.SphereGeometry(

40+Math.random()*30,

32,

32

);

const material=new THREE.MeshBasicMaterial({

color:i%2===0 ? 0x5a9cff : 0xa855f7,

transparent:true,

opacity:0.05,

depthWrite:false

});

const cloud=new THREE.Mesh(

geometry,

material

);

cloud.position.set(

(Math.random()-.5)*800,

(Math.random()-.5)*500,

(Math.random()-.5)*600

);

cloud.scale.setScalar(

2+Math.random()*2

);

cloud.userData={

speed:0.0005+Math.random()*0.001,

offset:Math.random()*Math.PI*2

};

nebulaGroup.add(cloud);

}

scene.add(nebulaGroup);


// ===================================================
// Liquid Glass Objects
// ===================================================

const glassGroup=new THREE.Group();

for(let i=0;i<8;i++){

const glass=new THREE.Mesh(

new THREE.IcosahedronGeometry(

10+Math.random()*8,

5

),

new THREE.MeshPhysicalMaterial({

color:0x8fc7ff,

transparent:true,

transmission:1,

opacity:.28,

roughness:.08,

metalness:.15,

clearcoat:1,

ior:1.45

})

);

glass.position.set(

(Math.random()-.5)*220,

(Math.random()-.5)*160,

(Math.random()-.5)*120

);

glass.userData={

speed:0.002+Math.random()*0.002,

offset:Math.random()*6

};

glassGroup.add(glass);

}

scene.add(glassGroup);


// ===================================================
// Shooting Stars
// ===================================================

const shootingStars=[];

for(let i=0;i<6;i++){

const star=new THREE.Mesh(

new THREE.SphereGeometry(.6,8,8),

new THREE.MeshBasicMaterial({

color:0xffffff

})

);

star.position.set(

-700+Math.random()*400,

300+Math.random()*300,

-400

);

star.userData={

speed:6+Math.random()*4

};

shootingStars.push(star);

scene.add(star);

}


// ===================================================
// Blue Glow Light
// ===================================================

const glowLight=new THREE.PointLight(

0x42d4ff,

3,

600

);

glowLight.position.set(

120,

120,

120

);

scene.add(glowLight);
// ===================================================
// THREE-SCENE.JS
// PART 3
// HR ROOT NETWORK + RED DATA FLOW
// ===================================================

const networkGroup = new THREE.Group();

const lineMaterial = new THREE.LineBasicMaterial({

color:0x5ad1ff,

transparent:true,

opacity:.18

});

const pulseMaterial = new THREE.MeshBasicMaterial({

color:0xff4040

});

const pulses=[];

function createRoot(x,y,z,length,angle,depth){

if(depth<=0) return;

const nx=x+Math.cos(angle)*length;

const ny=y-Math.sin(angle)*length;

const nz=z+(Math.random()-.5)*15;

const geometry=new THREE.BufferGeometry().setFromPoints([

new THREE.Vector3(x,y,z),

new THREE.Vector3(nx,ny,nz)

]);

const branch=new THREE.Line(

geometry,

lineMaterial

);

networkGroup.add(branch);

const pulse=new THREE.Mesh(

new THREE.SphereGeometry(1.2,16,16),

pulseMaterial

);

pulse.position.set(x,y,z);

pulse.userData={

start:new THREE.Vector3(x,y,z),

end:new THREE.Vector3(nx,ny,nz),

progress:Math.random(),

speed:.004+Math.random()*.003

};

pulses.push(pulse);

networkGroup.add(pulse);

createRoot(

nx,

ny,

nz,

length*.76,

angle-.45,

depth-1

);

createRoot(

nx,

ny,

nz,

length*.76,

angle+.45,

depth-1

);

}

createRoot(

0,

-70,

0,

26,

Math.PI/2,

8

);

scene.add(networkGroup);


// ===================================================
// ROOT ANIMATION
// ===================================================

function animateRoots(){

pulses.forEach(p=>{

p.userData.progress+=p.userData.speed;

if(p.userData.progress>1){

p.userData.progress=0;

}

p.position.lerpVectors(

p.userData.start,

p.userData.end,

p.userData.progress

);

});

}
// ===================================================
// THREE-SCENE.JS
// PART 4
// Animation Loop + Mouse Parallax
// ===================================================

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove",(e)=>{

mouseX = (e.clientX/window.innerWidth-.5)*2;

mouseY = (e.clientY/window.innerHeight-.5)*2;

});

const clock = new THREE.Clock();

function animate(){

requestAnimationFrame(animate);

const t = clock.getElapsedTime();


// ======================================
// Galaxy Rotation
// ======================================

stars.rotation.y += 0.00005;

brightStars.rotation.y += 0.00015;


// ======================================
// Nebula Animation
// ======================================

nebulaGroup.children.forEach((cloud,i)=>{

cloud.rotation.y += cloud.userData.speed;

cloud.position.y +=

Math.sin(

t+cloud.userData.offset

)*0.02;

});


// ======================================
// Liquid Glass
// ======================================

glassGroup.children.forEach((glass)=>{

glass.rotation.x += 0.0015;

glass.rotation.y += 0.002;

glass.position.y +=

Math.sin(

t+glass.userData.offset

)*0.03;

glass.position.x +=

Math.cos(

t+glass.userData.offset

)*0.015;

});


// ======================================
// Shooting Stars
// ======================================

shootingStars.forEach(star=>{

star.position.x += star.userData.speed;

star.position.y -= star.userData.speed*0.35;

if(star.position.x>800){

star.position.set(

-800,

300+Math.random()*350,

-400

);

}

});


// ======================================
// HR Root Animation
// ======================================

animateRoots();


// ======================================
// Camera Parallax
// ======================================

camera.position.x +=

(mouseX*15-camera.position.x)*0.03;

camera.position.y +=

(-mouseY*10-camera.position.y)*0.03;

camera.lookAt(scene.position);

controls.update();
// ======================================
// Render
// ======================================

renderer.render(

scene,

camera

);

}
