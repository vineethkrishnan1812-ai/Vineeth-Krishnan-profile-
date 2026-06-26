// ===================================================
// THREE-SCENE.JS (FINAL PRO ULTRA 3D EFFECT SYSTEM)
// ===================================================

const scene = new THREE.Scene();
scene.background = null;
scene.fog = new THREE.FogExp2(0x020108, 0.001);

// 3D ലുക്ക് വ്യക്തമാകാൻ ക്യാമറ പൊസിഷൻ സെറ്റ് ചെയ്യുന്നു
const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.set(20, 0, 160); // Depth ദൂരം കൃത്യമാക്കി

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

// ---------- നക്ഷത്രക്കൂട്ടങ്ങളും ഗാലക്സിയും (Cosmic Starfield) ----------
const STAR_COUNT = 3500;
const starGeometry = new THREE.BufferGeometry();
const starVertices = [];
const starColors = [];
const colorPalette = [new THREE.Color(0x00d2ff), new THREE.Color(0xbf26ff), new THREE.Color(0xff2a2a)];

for (let i = 0; i < STAR_COUNT; i++) {
    // 3D സ്പേസിൽ നക്ഷത്രങ്ങളെ പല അടരുകളായി (Layers) വിന്യസിക്കുന്നു
    const radius = Math.random() * 800;
    const theta = Math.random() * Math.PI * 2;
    const phi = (Math.random() - 0.5) * 0.4;

    starVertices.push(
        Math.cos(theta) * Math.sin(phi) * radius + 80,
        Math.sin(theta) * Math.sin(phi) * radius - 10,
        Math.cos(phi) * radius - 200 // Z-axis depth നൽകുന്നു
    );

    const randomColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    starColors.push(randomColor.r, randomColor.g, randomColor.b);
}

starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starVertices, 3));
starGeometry.setAttribute("color", new THREE.Float32BufferAttribute(starColors, 3));

const starMaterial = new THREE.PointsMaterial({
    size: 2.2,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false
});
const starField = new THREE.Points(starGeometry, starMaterial);
scene.add(starField);

// ---------- പ്രൊഫൈൽ നിയോൺ റിംഗ് (Glowing Anchor) ----------
const ringRadius = 38;
const ringGeometry = new THREE.RingGeometry(ringRadius, ringRadius + 1.8, 64);
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

// ---------- ലിക്വിഡ് ഗ്ലാസ് ഒബ്ജക്റ്റുകൾ (Morphing Glass Blobs) ----------
const glassGroup = new THREE.Group();
const glassPositions = [
    { x: -25, y: 45, z: 40, size: 11 },  // ഫോർഗ്രൗണ്ട് (മുന്നിൽ നിൽക്കുന്നവ)
    { x: 90, y: 35, z: 20, size: 13 },
    { x: -15, y: -20, z: 50, size: 14 }, // ക്യാമറയോട് ഏറ്റവും അടുത്ത ഒബ്ജക്റ്റ്
    { x: 105, y: -25, z: 15, size: 10 }
];

const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transparent: true,
    transmission: 0.96,
    opacity: 1.0,
    roughness: 0.03,
    metalness: 0.1,
    ior: 1.65, 
    thickness: 7.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02
});

glassPositions.forEach((pos) => {
    const geom = new THREE.IcosahedronGeometry(pos.size, 4);
    const positionAttribute = geom.attributes.position;
    const originals = [];
    for (let i = 0; i < positionAttribute.count; i++) {
        originals.push(new THREE.Vector3().fromBufferAttribute(positionAttribute, i));
    }
    geom.userData = { originals: originals };

    const mesh = new THREE.Mesh(geom, glassMaterial);
    mesh.position.set(pos.x, pos.y, pos.z);
    mesh.userData = {
        speed: 0.003,
        offset: Math.random() * 10,
        waveSpeed: 2.2
    };
    glassGroup.add(mesh);
});
scene.add(glassGroup);

// ---------- ന്യൂറൽ നെറ്റ്‌വർക്ക് ശാഖകൾ (Interactive Roots) ----------
const networkGroup = new THREE.Group();
const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x00d2ff,
    transparent: true,
    opacity: 0.55,
    blending: THREE.AdditiveBlending
});

const pulseGeometry = new THREE.SphereGeometry(0.9, 8, 8);
const pulseMaterial = new THREE.MeshBasicMaterial({
    color: 0xff1a1a,
    blending: THREE.AdditiveBlending
});
const pulses = [];

function createNeuralRoot(startX, startY, startZ, length, angle, depth) {
    if (depth <= 0) return;

    const endX = startX + Math.cos(angle) * length;
    const endY = startY - Math.sin(angle) * length;
    const endZ = startZ + (Math.random() - 0.5) * 20; // 3D സ്പേസിലേക്ക് പടരുന്നു

    const points = [new THREE.Vector3(startX, startY, startZ), new THREE.Vector3(endX, endY, endZ)];
    const branchGeom = new THREE.BufferGeometry().setFromPoints(points);
    const branch = new THREE.Line(branchGeom, lineMaterial);
    networkGroup.add(branch);

    if (Math.random() > 0.15) {
        const pulseMesh = new THREE.Mesh(pulseGeometry, pulseMaterial);
        pulseMesh.position.set(startX, startY, startZ);
        pulseMesh.userData = {
            start: points[0],
            end: points[1],
            progress: Math.random(),
            speed: 0.006
        };
        pulses.push(pulseMesh);
        networkGroup.add(pulseMesh);
    }

    const childBranches = 2;
    for (let i = 0; i < childBranches; i++) {
        const angleSpread = 0.38 + (Math.random() - 0.5) * 0.2;
        const nextAngle = i === 0 ? angle - angleSpread : angle + angleSpread;
        createNeuralRoot(endX, endY, endZ, length * 0.8, nextAngle, depth - 1);
    }
}
createNeuralRoot(42, -16, 0, 25, Math.PI / 2, 6);
scene.add(networkGroup);

// ---------- വെളിച്ചം (Super Lighting System) ----------
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambientLight);

const blueGlow = new THREE.PointLight(0x00d2ff, 15, 450);
blueGlow.position.set(42, 22, 50);
scene.add(blueGlow);

const purpleGlow = new THREE.PointLight(0xbf26ff, 12, 550);
purpleGlow.position.set(-30, -30, 40);
scene.add(purpleGlow);

// ---------- 3D ക്യാമറ മൂവ്‌മെന്റ് സിസ്റ്റം (Mouse / Touch Parallax) ----------
let mouseX = 0, mouseY = 0;
let targetX = 0, targetY = 0;

document.addEventListener("mousemove", (e) => {
    // മൗസ് അനക്കുമ്പോൾ -1 മുതൽ 1 വരെയുള്ള വാല്യൂ കണക്കാക്കുന്നു
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

// മൊബൈൽ ഫോണുകൾക്കും 3D മൂവ്‌മെന്റ് സപ്പോർട്ട് നൽകുന്നു
document.addEventListener("touchmove", (e) => {
    if(e.touches.length > 0) {
        mouseX = (e.touches[0].clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.touches[0].clientY / window.innerHeight - 0.5) * 2;
    }
}, { passive: true });

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

const clock = new THREE.Clock();

// ---------- ആനിമേഷൻ റൺ ലൂപ്പ് ----------
function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // ഗാലക്സി പതുക്കെ കറങ്ങുന്നു
    starField.rotation.y = t * 0.008;
    starField.rotation.x = t * 0.003;
    
    profileRing3D.material.opacity = 0.7 + Math.sin(t * 3.5) * 0.3;

    // ഗ്ലാസ് ബോൾസിന്റെ ലിക്വിഡ് വേവ് ചലനം
    glassGroup.children.forEach((mesh) => {
        mesh.rotation.y += mesh.userData.speed;
        mesh.rotation.x += mesh.userData.speed * 0.5;
        mesh.position.y += Math.sin(t + mesh.userData.offset) * 0.06;

        const posAttr = mesh.geometry.attributes.position;
        const originals = mesh.geometry.userData.originals;
        for (let i = 0; i < posAttr.count; i++) {
            const orig = originals[i];
            const wave = Math.sin(orig.x * 0.25 + t * mesh.userData.waveSpeed) * Math.cos(orig.y * 0.25 + t * mesh.userData.waveSpeed) * 0.16;
            posAttr.setXYZ(i, orig.x + (orig.x * wave), orig.y + (orig.y * wave), orig.z + (orig.z * wave));
        }
        posAttr.needsUpdate = true;
    });

    // റെഡ് ലൈറ്റ് പൾസുകൾ ഓടുന്നു
    pulses.forEach((p) => {
        p.userData.progress += p.userData.speed;
        if (p.userData.progress > 1) p.userData.progress = 0;
        p.position.lerpVectors(p.userData.start, p.userData.end, p.userData.progress);
    });

    // 🔴 ക്രൂശ്യൽ ക്യാമറ മൂവ്‌മെന്റ് ലോജിക് (Y-Axis & X-Axis Tilt)
    // മൗസ് ചലനത്തിന് അനുസരിച്ച് ക്യാമറയുടെ ലക്ഷ്യം (Target Location) മാറുന്നു
    targetX += (mouseX * 45 - targetX) * 0.05; // 45 ഡിഗ്രി വരെ മൂവ്മെന്റ് വ്യാപ്തി കൂട്ടിക്കൊടുത്തു
    targetY += (-mouseY * 35 - targetY) * 0.05;

    camera.position.x = 20 + targetX;
    camera.position.y = targetY;
    
    // ക്യാമറ എപ്പോഴും സ്ക്രീനിന്റെ മധ്യഭാഗത്തേക്ക് ഫോക്കസ് ചെയ്തു നിൽക്കും
    camera.lookAt(20, 0, 0);

    controls.update();
    renderer.render(scene, camera);
}

animate();
