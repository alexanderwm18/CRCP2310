// Add real time texturing using Canvas 2D context
//Built off of Ira GreenBergs Painted Cube 2 

import { AmbientLight, BoxGeometry, CanvasTexture, ClampToEdgeWrapping, Color, DirectionalLight, Mesh, MeshPhongMaterial, PCFSoftShadowMap, PerspectiveCamera, PlaneGeometry, Scene, SphereGeometry, SpotLight, Vector2, Vector3, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


// Get 2D canvas context. By default this type is null.
const ctx = document.createElement('canvas').getContext('2d');

let texture: CanvasTexture;
let cube: Mesh;
let sphere: Mesh;

const partCount = 240000;
const rad: number[] = [];
let pos: Vector3[] = [];
const col: Color[] = [];
let x = 0;
let y = 0;


const geomDim = new Vector2(600, 400);

for(let i = 0; i < partCount; i++){
    
    
    col[i] = new Color(Math.random() * 0xffffff);
    console.log(col[i]);

    pos[i] = new Vector3(x,y,0);
    if(x <= 600){x = x+1;} else (x = 0);
    if(y <= 400 && x == 600){y = y +1;}

}


// ensure ctx is not null throughout code
if (ctx) {
    ctx.canvas.width = geomDim.x;
    ctx.canvas.height = geomDim.y;
    texture = new CanvasTexture(ctx.canvas);
    //texture.wrapS = ClampToEdgeWrapping;
   // texture.wrapT = ClampToEdgeWrapping;
}

function drawPixels() {
    if (ctx) {

        // draw particles
        for (let i = 0; i < partCount ; i++) {
            ctx.fillStyle = `rgb(
                ${col[i].r * 255},
                ${col[i].g * 255},
                ${col[i].b * 255})`;

            ctx.beginPath();
            ctx.rect(pos[i].x, pos[i].y, 1, 1);
          
            ctx.fill();
        
        }
      
        }
     }
    




// create and position camera
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 7;

const scene = new Scene();
scene.background = new Color(0xAABBFF);

// main renderer
let renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// based on main scene camera
const controls = new OrbitControls(camera, renderer.domElement);

const ambientTexturesLight = new AmbientLight(0xFFFFFF, .35);
scene.add(ambientTexturesLight);

const col2 = 0xFFAAFF;
const intensity = 1;
const light = new DirectionalLight(col2, intensity);
light.position.set(15.2, 10.2, 12);
light.castShadow = true;
scene.add(light);
3
const spot = new SpotLight(0xEEEEFF, .6);
spot.position.set(-10, 8, 12);
spot.castShadow = true;
spot.shadow.radius = 8; //doesn't work with PCFsoftshadows
spot.shadow.bias = -0.0001;
spot.shadow.mapSize.width = 1024 * 4;
spot.shadow.mapSize.height = 1024 * 4;
scene.add(spot);


// add Cube
if (ctx) {
    const planeGeom = new PlaneGeometry(14,10);
    // we know texture is not undefined here, so force TS compiler to accept it using !, the non-null operator
    const planeMat = new MeshPhongMaterial({ map: texture!, color: 0xBB55FF });

    cube = new Mesh(planeGeom, planeMat);
    scene.add(cube);
}


function animate() {
    requestAnimationFrame(animate);
    controls.update();
   // cube.rotateX(Math.PI / 540);
   // cube.rotateY(Math.PI / 720);

    drawPixels();

    // required to see texture changes each animation frame
    texture.needsUpdate = true;
    render();
}

function render() {
    renderer.render(scene, camera);
}
animate();
