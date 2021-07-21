let width = window.innerWidth;
let height = window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;

/* Geometri Material */
const geo = new THREE.BoxGeometry(1, 1, 1);

// MeshPhongMaterial
let light1 = new THREE.PointLight(0xffffff, 1);
light1.position.set(0, 3, 2);
scene.add(light1);

let light2 = new THREE.PointLight(0xffffff, 1);
light2.position.set(0, -3, 2);
scene.add(light2);

/* Custom Material */
const ATexture = new THREE.TextureLoader().load(
    'https://thumbs.dreamstime.com/b/green-grass-texture-background-lawn-pattern-close-up-image-138447320.jpg'
);
const BTexture = new THREE.TextureLoader().load(
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Red_brick_wall_texture.JPG/1200px-Red_brick_wall_texture.JPG'
);
const CTexture = new THREE.TextureLoader().load(
    'https://st4.depositphotos.com/4423507/27844/i/450/depositphotos_278444048-stock-photo-sea-water-texture.jpg'
);

const matArray = [
    new THREE.MeshBasicMaterial({
        color: 'green',
        map: ATexture,
        map: BTexture,
        map: CTexture,
        shininess: 100,
    }),
    new THREE.MeshBasicMaterial({
        color: 'blue',
        map: ATexture,
        map: BTexture,
        map: CTexture,
        shininess: 100,
    }),
    new THREE.MeshBasicMaterial({
        color: 'red',
        map: ATexture,
        map: BTexture,
        map: CTexture,
        shininess: 100,
    }),
    new THREE.MeshBasicMaterial({
        color: 'yellow',
        map: ATexture,
        map: BTexture,
        map: CTexture,
        shininess: 100,
    }),
    new THREE.MeshBasicMaterial({
        color: 'purple',
        map: ATexture,
        map: BTexture,
        map: CTexture,
        shininess: 100,
    }),
    new THREE.MeshBasicMaterial({
        color: 'white',
        map: ATexture,
        map: BTexture,
        map: CTexture,
        shininess: 100,
    }),
];

let mesh = new THREE.Mesh(geo, matArray);
scene.add(mesh);

/* Lanjutan Custom Material */
// Persegi
const geo2 = new THREE.BufferGeometry();
let vertices = new Float32Array([
    -1.0, -1.0, 0.0,
    1.0, -1.0, 0.0,
    1.0, 1.0, 0.0,

    1.0, 1.0, 0.0,
    -1.0, 1.0, 0.0,
    -1.0, -1.0, 0.0,
]);



let material2 = new THREE.MeshBasicMaterial(
    {
        color: 0xff0000,
        map: ATexture,
        map: BTexture,
        map: CTexture,
        shininess: 100,
    }
);
let mesh2 = new THREE.Mesh(geo2, material2);
mesh2.position.set(-2,0,0);
scene.add(mesh2);



window.addEventListener('resize', function () {
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

function update() {
    mesh.rotation.y += 0.01;
    mesh.rotation.x += 0.01;

    requestAnimationFrame(update);
    renderer.render(scene, camera);
}

update();