import * as THREE from 'three';

let camera, scene, renderer, controls;
let width = window.innerWidth, height = window.innerHeight;

class Bee {
    constructor(position) {
        this.position = position;
    }

    // Offset is for if we move the bee around.
    bee(offset = new THREE.Vector3(0, 0, 0)) {
        return [
            this.body(offset),
            this.eye('right', offset),
            this.eye('left', offset),
            this.stripe(0.75, 0.5, offset),
            this.stripe(0.825, 0, offset),
            this.stripe(0.75, -0.5, offset),
            this.stinger(offset),
            this.smile(offset),
            this.wing('left', offset),
            this.wing('right', offset),
            this.feet(offset)
        ].flat();
    }

    body(offset) {
        let geometry = new THREE.SphereGeometry(1, 30, 30);
        let material = new THREE.MeshPhongMaterial({
            color: 0xffc800,
            shininess: 20
        });
        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(this.position.clone().add(offset));
        mesh.scale.set(1, 1, 1.2);
        return mesh;
    }

    eye(side, offset) {
        // Using ellipsoid shape for eyes instead of capsule
        let geometry = new THREE.SphereGeometry(0.12, 30, 30);
        let material = new THREE.MeshPhongMaterial({
            color: 0x000000,
            shininess: 80,
            specular: 0xeeeeee
        });
        let mesh = new THREE.Mesh(geometry, material);
        let x_offset = side === 'left' ? 0.3 : -0.3;
        let eye_pos = new THREE.Vector3(x_offset, 0, 1.1).add(offset);
        mesh.position.copy(eye_pos);
        mesh.scale.set(1, 1.2, 1);
        return mesh;
    }

    stripe(size, z_pos, offset) {
        let geometry = new THREE.TorusGeometry(size, size / 4, 50, 50);
        let material = new THREE.MeshPhongMaterial({
            color: 0x000000,
            shininess: 20
        });
        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(new THREE.Vector3(0, 0, z_pos).add(offset));
        return mesh;
    }

    stinger(offset) {
        // Create a cone for the stinger instead of a capsule
        let geometry = new THREE.ConeGeometry(0.05, 0.3, 20);
        let material = new THREE.MeshPhongMaterial({
            color: 0x000000,
            shininess: 10
        });
        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(new THREE.Vector3(0, 0, -1.1).add(offset));
        mesh.rotation.x = -Math.PI / 2;
        return mesh;
    }

    smile(offset) {
        let geometry = new THREE.TorusGeometry(0.1, 0.02, 50, 50, Math.PI);
        let material = new THREE.MeshPhongMaterial({
            color: 0x000000,
            shininess: 10
        });
        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(new THREE.Vector3(0, 0, 1.2).add(offset));
        mesh.rotation.z = Math.PI;

        geometry = new THREE.SphereGeometry(0.02, 20, 20);
        material = new THREE.MeshPhongMaterial({
            color: 0x000000,
            shininess: 10
        });
        let mesh2 = new THREE.Mesh(geometry, material);
        mesh2.position.copy(new THREE.Vector3(0.1, 0, 1.2).add(offset));

        let mesh3 = new THREE.Mesh(geometry, material);
        mesh3.position.copy(new THREE.Vector3(-0.1, 0, 1.2).add(offset));
        return [mesh, mesh2, mesh3];
    }

    wing(side, offset) {
        // Create wing using an ellipsoid shape
        let geometry = new THREE.SphereGeometry(0.5, 20, 20);
        let material = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            shininess: 80,
            opacity: 0.7,
            transparent: true
        });
        let mesh = new THREE.Mesh(geometry, material);
        let x_offset = side === 'left' ? 0.5 : -0.5;
        let wing_pos = new THREE.Vector3(x_offset, 1.15, 0).add(offset);
        mesh.position.copy(wing_pos);
        mesh.scale.set(0.2, 0.8, 0.6);
        mesh.rotation.z = side === 'left' ? -Math.PI / 2.5 : Math.PI / 2.5;
        mesh.rotation.y = side === 'left' ? Math.PI / 4 : -Math.PI / 4;
        return mesh;
    }

    feet(offset) {
        // Create feet using small cylinders
        let geometry = new THREE.CylinderGeometry(0.05, 0.05, 0.2, 20);
        let material = new THREE.MeshPhongMaterial({
            color: 0x000000,
            shininess: 10
        });
        const leg_positions = [
            {
                position: new THREE.Vector3(0.8, -1, 0),
                rotation: Math.PI + 0.5
            },
            {
                position: new THREE.Vector3(0.6, -1.05, 0.5),
                rotation: Math.PI + 0.5
            },
            {
                position: new THREE.Vector3(0.6, -1.05, -0.5),
                rotation: Math.PI + 0.5
            },
            {
                position: new THREE.Vector3(-0.8, -1, 0),
                rotation: Math.PI - 0.5
            },
            {
                position: new THREE.Vector3(-0.6, -1.05, 0.5),
                rotation: Math.PI - 0.5
            },
            {
                position: new THREE.Vector3(-0.6, -1.05, -0.5),
                rotation: Math.PI - 0.5
            },
        ];
        let meshes = [];
        for (let pos of leg_positions) {
            let mesh = new THREE.Mesh(geometry, material);
            mesh.rotation.z = pos.rotation;
            mesh.position.copy(pos.position).add(offset);
            meshes.push(mesh);
        }
        return meshes;
    }

    addToScene() {
        for (let mesh of this.bee()) {
            scene.add(mesh);
        }
    }
}

// Setting up the scene!
function init() {
    camera = new THREE.PerspectiveCamera(75, width / height, 1, 100);
    camera.position.set(1, 1, 5);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene = new THREE.Scene();

    let hemisphereLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 1);
    scene.add(hemisphereLight);

    let spotlight = new THREE.SpotLight(0xffffff, 0.5);
    spotlight.castShadow = true;
    spotlight.position.set(0, 1, 5);
    camera.add(spotlight);
    scene.add(camera);

    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0); // Transparent background

    // Find the container and append the renderer
    const container = document.getElementById('bee-container');
    if (container) {
        container.appendChild(renderer.domElement);
    }

    let bee = new Bee(new THREE.Vector3(0, 0, 0));
    bee.addToScene();
}

// Let's make sure the window can resize properly.
function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

// camera rotation
function createAutoRotation() {
    let angle = 0;
    return function() {
        angle += 0.001;
        camera.position.z = Math.sin(angle) * 2;
        // camera.position.z = Math.cos(angle) * 5;
        camera.lookAt(0, 0, 0);
    };
}

const rotateCamera = createAutoRotation();

// Animating the scene.
function animate() {
    requestAnimationFrame(animate);
    rotateCamera(); // Simple camera rotation
    renderer.render(scene, camera);
}

// Initialize when the window loads
window.addEventListener('load', () => {
    init();
    animate();
});