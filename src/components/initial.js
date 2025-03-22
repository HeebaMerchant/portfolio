import * as THREE from 'three';

// Create scene
const scene = new THREE.Scene();

// Create camera
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create renderer with alpha (transparency) enabled
const renderer = new THREE.WebGLRenderer({ 
  alpha: true,
  antialias: true 
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0); // Transparent background
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// Create cube geometry
const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);

// Create glassy material
const material = new THREE.MeshPhysicalMaterial({
  color: 0xFFFFFF,       // Light blue tint
  transparent: true,     // Enable transparency
  opacity: 6,          // Make it quite transparent
  roughness: 0.1,        // Low roughness for a polished look
  transmission: 0.95,    // High transmission for glass-like refraction
  thickness: 2,        // Thickness for refraction
  clearcoat: 2,        // Add a clear coat layer
  clearcoatRoughness: 5, // Make the clear coat glossy
  ior: 1.5,              // Index of refraction similar to glass
  reflectivity: 0.9,     // High reflectivity
  side: THREE.DoubleSide // Render both sides of faces
});

// Create cube mesh
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Optional: Set a fixed rotation if desired
// cube.rotation.x = Math.PI / 6; // 30 degrees in radians
// cube.rotation.y = Math.PI / 4; // 45 degrees in radians

// Add lights
// Ambient light for general illumination
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Directional light for highlights and shadows
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// Add point lights for more interesting reflections
const pointLight1 = new THREE.PointLight(0xff9000, 1, 10);
pointLight1.position.set(2, 1, 1);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0x0060ff, 1, 10);
pointLight2.position.set(-2, -1, 1);
scene.add(pointLight2);

// Create environment map for reflections (simple version)
const pmremGenerator = new THREE.PMREMGenerator(renderer);
pmremGenerator.compileEquirectangularShader();
const envTexture = pmremGenerator.fromScene(new THREE.Scene()).texture;
scene.environment = envTexture;

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation function
function animate() {
  // Add rotation
//   cube.rotation.x += 0.005;
  cube.rotation.y += 0.005;
  
  renderer.render(scene, camera);
}