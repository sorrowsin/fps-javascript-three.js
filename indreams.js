Physijs.scripts.worker = 'physijs_worker.js';
Physijs.scripts.ammo = 'ammo.js';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var objects = [];

var grid = new THREE.GridHelper(10, 10);
scene.add(grid);

var light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 2);
scene.add(light);

var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshPhysicalMaterial({color: 0x0000ff, metalness: 0, reflectivity: 1});
var cube = new THREE.Mesh(geometry, material);
cube.position.y = .5;
scene.add(cube);

objects.push(cube);
objects.push(camera);

//console.log(cube.geometry.vertices.length);
//console.log(cube.geometry.faceVertexUvs[0][0]);


var ambient = new THREE.AmbientLight(0x6a0dad, 1);
scene.add(ambient);


 
var speed = 0.1;
var yvelocity = 0;
var touchground;


var keycheck = {
	jump:false,
	fward:false,
	bward:false,
	left:false,
	right:false,
	shift:false,
	board: function(event) {
		var state = (event.type == 'keydown')?true:false;

		switch(event.keyCode){

			case 87:
				keycheck.fward = state;
			break;
			case 83:
				keycheck.bward = state;
			break;
			case 65:
				keycheck.left = state;
			break;
			case 68:
				keycheck.right = state;
			break;
			case 32:
				keycheck.jump = state;
			break;
			case 16:
				keycheck.shift = state;
			break;
		}
	}
};

function controls() {

	if(keycheck.fward){
		pointlock.moveForward(0.1);
	}
	if(keycheck.fward && keycheck.shift){
		pointlock.moveForward(0.2);
	}
	if(keycheck.bward){
		pointlock.moveForward(-0.1);
	}	
	if(keycheck.right){
		pointlock.moveRight(0.1);
	} 
	if(keycheck.left){
		pointlock.moveRight(-0.1);
	}
	if(keycheck.jump && touchground){
	
		yvelocity += 0.3; 
		touchground = false; 
	}
}

function jump(){
	yvelocity -= 0.017; //gravity 
	camera.position.y += yvelocity;
	yvelocity *= 0.9;

	if(camera.position.y <= 1){
		
		touchground = true;
		yvelocity = 0;
		camera.position.y = 1;
	}
}


document.addEventListener('keydown', keycheck.board, false);
document.addEventListener('keyup', keycheck.board, false);
//document.addEventListener('mousemove', track, false);

var pointlock = new THREE.PointerLockControls(camera, renderer.domElement);

window.onclick = function(){
	pointlock.lock();
}
//cube.position = vector
//cube.geometry.verticies[insert index] = vector;


var vector = new THREE.Vector3();
var vertex = cube.geometry.vertices;
// console.log(vertex);

// for(var i = 0; i < vertex.length; i++){
// 	console.log(vertex[i]);
// }


//console.log(cube.geometry.vertices[0]);
//console.log(vector);


// for (var vi = 0; vi < cube.geometry.vertices.length; vi++){
// 	var localvert = cube.geometry.vertices[vi].clone();
// 	var globalvert = cube.matrix.multiplyVector3(localvert);
// 	var dirVector = globalvert.sub(cube.position);

// 	var ray = new THREE.Ray(cube.position, dirVector.clone().normalize());
// 	var colResults = ray.intersectObjects(objects);
// 	if(colResults.length > 0 && colResults[0].distance < directionVector.length())
// 	{
// 		console.log('success beyatch');
// 	}
// }

function track(){
	var camy = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z);
	var box = new THREE.Box3().setFromObject(cube);
	var collision = box.intersectsBox(camy);
	//console.log(box);
	//console.log(camy);
}

var animate = function() {
	requestAnimationFrame(animate);
	controls();
	jump();
	track();
	renderer.render(scene, camera);
}
animate();

