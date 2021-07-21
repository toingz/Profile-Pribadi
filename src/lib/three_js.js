let width = window.innerWidth;
let height = window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 5);
const renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;

const geo = new THREE.BufferGeometry();
let vertices = new Float32Array([
	-1.0, -1.0,  1.0,
	 1.0, -1.0,  1.0,
	 1.0,  1.0,  1.0,

	 1.0,  1.0,  1.0,
	-1.0,  1.0,  1.0,
	-1.0, -1.0,  1.0
]);

let colors = new Float32Array([
    //   R    G    B
        1.0, 0.0, 0.0,  // 0
        1.0, 1.0, 0.0,  // 1
        1.0, 0.0, 1.0,  // 2
        1.0, 0.0, 1.0,  // 3

        1.0, 0.0, 0.0,  // 4
        1.0, 1.0, 0.0,  // 5
        1.0, 0.0, 0.0,  // 6
        1.0, 0.0, 1.0,  // 7
    ]);

geo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

geo.setIndex([
    // sisi depan
    1,2,0,
    3,1,0,
    // sisi belakang
    4,6,5,
    5,7,4,
    // sisi kiri
    4,0,2,
    2,6,4,
    // sisi kanan
    5,1,3,
    3,7,5,
    // sisi atas
    1,5,6,
    6,2,1,
    // sisi bawah
    0,4,7,
    7,3,0
]);

const material = new THREE.MeshBasicMaterial({vertexColors:THREE.VertexColors});
let mesh = new THREE.Mesh(geo, material);
scene.add(mesh);

window.addEventListener('resize', function() {
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

function update() {
    mesh.rotation.y += 0.01;
    requestAnimationFrame(update);
    renderer.render(scene, camera);
}

update();

/*
-> BoxGeometry merupakan built-in method yang digunakan untuk menggambar sebuah objek 3D berupa balok atau kubus, dan membutuhkan 3 parameter yaitu lebar, tinggi, dan tebal objek. 
-> MeshBasicMaterial digunakan untuk memberi warna pada objek 3D, dengan format bilangan heksadesimal
-> Mesh merupakan sebuah method yang digunakan untuk menggabungkan objek 3D dan pengaturan pewarnaan material yang digunakan.
-> Camera.position.z merupakan sebuah atribut untuk mengeset posisi kamera. Semakin besar nilainya, berarti kamera semakin mendekat ke arah kita dan semakin menjauhi objek.
-> document.body.appendChild(renderer.domElement)digunakan untuk menghubungkan antara file js kita dengan halaman HTML melalui DOM
*/