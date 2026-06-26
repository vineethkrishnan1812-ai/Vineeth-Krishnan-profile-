// ===================================================
// THREE-SCENE.JS (SCROLL-DRIVEN 3D SPINAL COORD NETWORK)
// ===================================================

const scene = new THREE.Scene();
scene.background = null;
scene.fog = new THREE.FogExp2(0x010005, 0.0012);

// Camera viewport configuration for organic 3D depth perception
const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.set(20, 0, 160); 

const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("bg-canvas"),
    alpha: true,
    antialias: true,
    powerPreference: "high-performance"
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.NoToneMapping;

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = false;
controls.enablePan = false;

// ---------- Live Document Scroll Vector Tracking ----------
let scrollPercent = 0;
window.addEventListener('scroll', () => {
    const h = document.documentElement, 
          b = document.body,
          st = 'scrollTop',
          sh = 'scrollHeight';
    scrollPercent = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight);
});

// ---------- Volumetric Galaxy Starfield Layers ----------
const STAR_COUNT = 3000;
const starGeometry = new THREE.BufferGeometry();
const starVertices = [];
const starColors = [];
const colorPalette = [new THREE.Color(0x00d2ff), new THREE.Color(0xbf26ff), new THREE.Color(0xff2a2a)];

for (let i = 0; i < STAR_COUNT; i++) {
    const radius = Math.random() * 900;
    const theta = Math.random() * Math.PI * 2;
    const phi = (Math.random() - 0.5) * 0.4;

    starVertices.push(
        Math.cos(theta) * Math.sin(phi) * radius + 80,
        Math.sin(theta) * Math.sin(phi) * radius - 10,
        Math.cos(phi) * radius - 150 // Disperses layers into the Z-axis background
    );

    const randomColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    starColors.push(randomColor.r, randomColor.g, randomColor.b);
}
starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starVertices, 3));
starGeometry.setAttribute("color", new THREE.Float32BufferAttribute(starColors, 3));

const starMaterial = new THREE.PointsMaterial({
    size: 2.0,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    depthWrite: false
});
const starField = new THREE.Points(starGeometry, starMaterial);
scene.add(starField);

// ---------- Profile Neon Glowing Ring ----------
const ringGeometry = new THREE.RingGeometry(38, 40, 64);
const ringMaterial = new THREE.MeshBasicMaterial({
    color: 0xbf26ff,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1.0,
    blending: THREE.AdditiveBlending
});
const profileRing3D = new THREE.Mesh(ringGeometry, ringMaterial);
profileRing3D.position.set(42, 22, 0); 
scene.add(profileRing3D);

// ---------- Morphing Realtime Liquid Glass Blobs ----------
const glassGroup = new THREE.Group();
const glassPositions = [
    { x: -30, y: 40, z: 50, size: 10 },
    { x: 95, y: 30, z: 30, size: 12 },
    { x: -20, y: -30, z: 60, size: 13 },
    { x: 110, y: -20, z: 20, size: 9 }
];

const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff, transparent: true, transmission: 0.96,
    opacity: 1.0, roughness: 0.03, metalness: 0.1, ior: 1.65, thickness: 7.0
});

glassPositions.forEach((pos) => {
    const geom = new THREE.IcosahedronGeometry(pos.size, 4);
    const originals = [];
    for (let i = 0; i < geom.attributes.position.count; i++) {
        originals.push(new THREE.Vector3().fromBufferAttribute(geom.attributes.position, i));
    }
    geom.userData = { originals: originals };

    const mesh = new THREE.Mesh(geom, glassMaterial);
    mesh.position.set(pos.x, pos.y, pos.z);
    mesh.userData = { speed: 0.003, offset: Math.random() * 10, waveSpeed: 2.0 };
    glassGroup.add(mesh);
});
scene.add(glassGroup);

// ---------- Spinal Cord & Procedural Nerve Veins ----------
const networkGroup = new THREE.Group();
const veins = [];

const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x00d2ff,
    transparent: true,
    opacity: 0.4,
    blending: THREE.AdditiveBlending
});

// Generates an interactive, branching spinal cluster along spatial parameters
function createSpinalVein(startX, startY, startZ, length, angle, depth) {
    if (depth <= 0) return;

    const endX = startX + Math.cos(angle) * length;
    const endY = startY - Math.sin(angle) * length;
    const endZ = startZ + (Math.random() - 0.5) * 25; 

    const points = [new THREE.Vector3(startX, startY, startZ), new THREE.Vector3(endX, endY, endZ)];
    const branchGeom = new THREE.BufferGeometry().setFromPoints(points);
    const branch = new THREE.Line(branchGeom, lineMaterial);
    networkGroup.add(branch);

    // Collects segment heights for scroll pulse intersection math
    veins.push({
        mesh: branch,
        depth: depth,
        startY: startY,
        endY: endY
    });

    const childBranches = 2;
    for (let i = 0; i < childBranches; i++) {
        const angleSpread = 0.35 + (Math.random() - 0.5) * 0.15;
        const nextAngle = i === 0 ? angle - angleSpread : angle + angleSpread;
        createSpinalVein(endX, endY, endZ, length * 0.82, nextAngle, depth - 1);
    }
}

// Drops roots precisely from the bottom alignment coordinates of your header profile
createSpinalVein(42, -16, 0, 26, Math.PI / 2, 6);
scene.add(networkGroup);

// ---------- Environmental Lighting Setup ----------
const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
scene.add(ambientLight);

const blueGlow = new THREE.PointLight(0x00d2ff, 15, 450);
blueGlow.position.set(42, 22, 50);
scene.add(blueGlow);

const purpleGlow = new THREE.PointLight(0xbf26ff, 12, 550);
purpleGlow.position.set(-30, -30, 40);
scene.add(purpleGlow);

// Intense laser tracking light linked to scroll speeds
const scrollPulseGlow = new THREE.PointLight(0xff1a1a, 25, 120); 
scene.add(scrollPulseGlow);

// ---------- Mouse Pointer Parallax Logic ----------
let mouseX = 0, mouseY = 0;
let targetX = 0, targetY = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

const clock = new THREE.Clock();

// ---------- Global Animation Loop Controller ----------
function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // 1. Scroll-Driven 3D Matrix Transformations (Cinematic Camera Zoom)
    const targetCamZ = 160 - (scrollPercent * 90); // Travels inward into Z-plane depths
    const targetCamY = -(scrollPercent * 110);     // Translates downward across document view fields

    // Blends pointer offsets cleanly with current scroll vectors
    targetX += (mouseX * 30 - targetX) * 0.05;
    targetY += (-mouseY * 25 - targetY) * 0.05;

    camera.position.z += (targetCamZ - camera.position.z) * 0.06;
    camera.position.y += (targetCamY + targetY - camera.position.y) * 0.06;
    camera.position.x += (20 + targetX - camera.position.x) * 0.06;
    
    camera.lookAt(20, -(scrollPercent * 80), 0);

    // 2. Realtime Positional Nerve Light Ignition
    const pulseYPosition = 20 - (scrollPercent * 160);
    scrollPulseGlow.position.set(42, pulseYPosition, Math.sin(t) * 10);
    
    // Updates node color states dynamically as scanner passes coordinate parameters
    veins.forEach((vein) => {
        const distance = Math.abs(vein.startY - pulseYPosition);
        if (distance < 35) {
            vein.mesh.material.opacity = 0.9;
            vein.mesh.material.color.setHex(0xff2a2a); // Fires laser red pulse down the path
        } else {
            vein.mesh.material.opacity = 0.35;
            vein.mesh.material.color.setHex(0x00d2ff); // Restores baseline glowing cyan
        }
    });

    // 3. Asset Matrix Rotations
    starField.rotation.y = t * 0.005 + (scrollPercent * 0.05); 
    profileRing3D.material.opacity = 0.7 + Math.sin(t * 3.5) * 0.3;

    // Organic liquid vertex manipulation formulas on glass geometries
    glassGroup.children.forEach((mesh) => {
        mesh.rotation.y += mesh.userData.speed;
        mesh.position.y += Math.sin(t + mesh.userData.offset) * 0.05;

        const posAttr = mesh.geometry.attributes.position;
        const originals = mesh.geometry.userData.originals;
        for (let i = 0; i < posAttr.count; i++) {
            const orig = originals[i];
            const wave = Math.sin(orig.x * 0.25 + t * mesh.userData.waveSpeed) * Math.cos(orig.y * 0.25 + t * mesh.userData.waveSpeed) * 0.15;
            posAttr.setXYZ(i, orig.x + (orig.x * wave), orig.y + (orig.y * wave), orig.z + (orig.z * wave));
        }
        posAttr.needsUpdate = true;
    });

    controls.update();
    renderer.render(scene, camera);
}

animate();

