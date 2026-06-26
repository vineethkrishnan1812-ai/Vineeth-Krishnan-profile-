// ===================================================
// THREE-SCENE.JS (REVISED & REAL 3D REALIZATION)
// Realizing the Space-Cyberpunk HR Network Look
// ===================================================

// ---------- Scene Setup ----------
const scene = new THREE.Scene();
scene.background = null;

// Deep galactic fog matching mockup background tones
scene.fog = new THREE.FogExp2(0x03020d, 0.0012);

// ---------- Camera ----------
const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
);
// Repositioned to balance the split layout (Hero text on left, Profile on right)
camera.position.set(20, 0, 150);

// ---------- Renderer ----------
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("bg-canvas"),
    alpha: true,
    antialias: true,
    powerPreference: "high-performance"
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = false;
controls.enablePan = false;

// ---------- Bright Starfield & Nebulae Galaxy Cosmic Background ----------
const STAR_COUNT = 4000;
const starGeometry = new THREE.BufferGeometry();
const starVertices = [];
const starColors = [];

const colorPalette = [new THREE.Color(0x5ad1ff), new THREE.Color(0xa855f7), new THREE.Color(0xff4040)];

for (let i = 0; i < STAR_COUNT; i++) {
    // Creating a flattened cosmic disc orientation instead of a simple random box
    const radius = Math.random() * 800;
    const theta = Math.random() * Math.PI * 2;
    const phi = (Math.random() - 0.5) * 0.4; // flat

    starVertices.push(
        Math.cos(theta) * Math.sin(phi) * radius + 100, // biased slightly right towards profile
        Math.sin(theta) * Math.sin(phi) * radius - 20,
        Math.cos(phi) * radius - 300
    );

    const randomColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    starColors.push(randomColor.r, randomColor.g, randomColor.b);
}

starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starVertices, 3));
starGeometry.setAttribute("color", new THREE.Float32BufferAttribute(starColors, 3));

const starMaterial = new THREE.PointsMaterial({
    size: 1.5,
    vertexColors: true,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending,
    depthWrite: false
});

const starField = new THREE.Points(starGeometry, starMaterial);
scene.add(starField);

// ---------- Central Profile Neon Light Ring ----------
const ringRadius = 38;
const ringGeometry = new THREE.RingGeometry(ringRadius, ringRadius + 1.2, 64);
const ringMaterial = new THREE.MeshBasicMaterial({
    color: 0xa855f7,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});
const profileRing3D = new THREE.Mesh(ringGeometry, ringMaterial);
// Align positioning perfectly behind your profile photo container's layout
profileRing3D.position.set(42, 22, 0); 
scene.add(profileRing3D);

// ---------- Morphing Liquid Glass Blobs ----------
const glassGroup = new THREE.Group();
const glassPositions = [
    { x: -10, y: 55, z: 20, size: 10 },    // Top Left Orb
    { x: 80, y: 45, z: 10, size: 12 },     // Top Right Orb
    { x: -5, y: -10, z: 30, size: 14 },    // Mid Left Orb
    { x: 95, y: -15, z: 15, size: 9 }      // Mid Right Orb
];

const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transparent: true,
    transmission: 0.9,
    opacity: 1.0,
    roughness: 0.05,
    metalness: 0.1,
    ior: 1.5,
    thickness: 5.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    envMapIntensity: 2.0
});

glassPositions.forEach((pos) => {
    // Using Icosahedron for smooth, organic distortion capabilities
    const geom = new THREE.IcosahedronGeometry(pos.size, 4);
    
    // Store original coordinate array for displacement math
    const positionAttribute = geom.attributes.position;
    const originals = [];
    for (let i = 0; i < positionAttribute.count; i++) {
        originals.push(new THREE.Vector3().fromBufferAttribute(positionAttribute, i));
    }
    geom.userData = { originals: originals };

    const mesh = new THREE.Mesh(geom, glassMaterial);
    mesh.position.set(pos.x, pos.y, pos.z);
    mesh.userData = {
        speed: 0.002 + Math.random() * 0.002,
        offset: Math.random() * 10,
        waveSpeed: 1.5 + Math.random() * 1.5
    };
    glassGroup.add(mesh);
});
scene.add(glassGroup);

// ---------- HR Neural Network Roots & Data Glow Flows ----------
const networkGroup = new THREE.Group();
const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x5ad1ff,
    transparent: true,
    opacity: 0.35,
    blending: THREE.AdditiveBlending
});

const pulseGeometry = new THREE.SphereGeometry(0.7, 8, 8);
const pulseMaterial = new THREE.MeshBasicMaterial({
    color: 0xff3b3b,
    blending: THREE.AdditiveBlending
});
const pulses = [];

// Branching out logic focused from the bottom of the profile ring center downwards
function createNeuralRoot(startX, startY, startZ, length, angle, depth) {
    if (depth <= 0) return;

    const endX = startX + Math.cos(angle) * length;
    const endY = startY - Math.sin(angle) * length;
    const endZ = startZ + (Math.random() - 0.5) * 12;

    const points = [new THREE.Vector3(startX, startY, startZ), new THREE.Vector3(endX, endY, endZ)];
    const branchGeom = new THREE.BufferGeometry().setFromPoints(points);
    const branch = new THREE.Line(branchGeom, lineMaterial);
    networkGroup.add(branch);

    // Data pulse points (Red glow nodes traversing down the lines)
    if (Math.random() > 0.2) {
        const pulseMesh = new THREE.Mesh(pulseGeometry, pulseMaterial);
        pulseMesh.position.set(startX, startY, startZ);
        pulseMesh.userData = {
            start: points[0],
            end: points[1],
            progress: Math.random(),
            speed: 0.003 + Math.random() * 0.004
        };
        pulses.push(pulseMesh);
        networkGroup.add(pulseMesh);
    }

    // Branch variations mimicking layout graphic roots
    const childBranches = 2;
    for (let i = 0; i < childBranches; i++) {
        const angleSpread = 0.35 + (Math.random() - 0.5) * 0.2;
        const nextAngle = i === 0 ? angle - angleSpread : angle + angleSpread;
        createNeuralRoot(endX, endY, endZ, length * 0.78, nextAngle, depth - 1);
    }
}

// Spawns roots explicitly originating from base of profile ring location (x: 42, y: -16)
createNeuralRoot(42, -16, 0, 24, Math.PI / 2, 6);
scene.add(networkGroup);

// ---------- Lighting Additions ----------
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const blueGlow = new THREE.PointLight(0x42d4ff, 5, 300);
blueGlow.position.set(42, 22, 30);
scene.add(blueGlow);

const purpleGlow = new THREE.PointLight(0xa855f7, 4, 400);
purpleGlow.position.set(-20, -20, 20);
scene.add(purpleGlow);

// ---------- Interactive Parallax System Setup ----------
let mouseX = 0, mouseY = 0;
document.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ---------- Animation Core Loop ----------
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // Constant slow rotation of cosmic background 
    starField.rotation.y = t * 0.015;
    starField.rotation.x = t * 0.005;

    // Pulse Ring Glow Oscillation Effect
    profileRing3D.material.opacity = 0.5 + Math.sin(t * 3) * 0.2;

    // Animate morphing liquid glass blobs (Vertex-level shifting wave distortions)
    glassGroup.children.forEach((mesh) => {
        mesh.rotation.y += mesh.userData.speed;
        mesh.rotation.x += mesh.userData.speed * 0.5;

        // Subtly float position up and down
        mesh.position.y += Math.sin(t + mesh.userData.offset) * 0.04;

        // Liquid fluid surface wave distortion simulation
        const posAttr = mesh.geometry.attributes.position;
        const originals = mesh.geometry.userData.originals;
        for (let i = 0; i < posAttr.count; i++) {
            const orig = originals[i];
            // Multi-frequency wave addition to give a fluid look
            const wave = Math.sin(orig.x * 0.2 + t * mesh.userData.waveSpeed) * Math.cos(orig.y * 0.2 + t * mesh.userData.waveSpeed) * 0.12;
            
            posAttr.setXYZ(
                i,
                orig.x + (orig.x * wave),
                orig.y + (orig.y * wave),
                orig.z + (orig.z * wave)
            );
        }
        posAttr.needsUpdate = true;
    });

    // Run active data packets along the neural track
    pulses.forEach((p) => {
        p.userData.progress += p.userData.speed;
        if (p.userData.progress > 1) p.userData.progress = 0;
        p.position.lerpVectors(p.userData.start, p.userData.end, p.userData.progress);
    });

    // Smooth Interactive Mouse Parallax (Moves camera gently based on viewport mouse offsets)
    const targetCamX = 20 + (mouseX * 25);
    const targetCamY = -(mouseY * 20);
    camera.position.x += (targetCamX - camera.position.x) * 0.05;
    camera.position.y += (targetCamY - camera.position.y) * 0.05;
    camera.lookAt(20, 0, 0);

    controls.update();
    renderer.render(scene, camera);
}

// Init animation loop execution
animate();

