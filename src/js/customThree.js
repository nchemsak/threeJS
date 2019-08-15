var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({ color: 0xf0f0f0 });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

var animate = function() {
    if (WEBGL.isWebGLAvailable()) {

        // Initiate function or other initializations here
        animate();

    } else {

        var warning = WEBGL.getWebGLErrorMessage();
        document.getElementById('container').appendChild(warning);

    }
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
};

animate();
