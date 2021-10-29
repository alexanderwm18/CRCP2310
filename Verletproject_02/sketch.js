//Alexander Williams
//Verlet Midterm Project
//Adjusted Professor Greenbergs Verlet Toriod Code 





// Ira Greenberg
// Nature & Code
// Center of Creative Computation | SMU
// Fall, 2021

// Description:
// Creating a Verlet organism
// based on a Verlet Toroid

let bounds; // vector
let verletBox;

let whites,iris,pupil;

function setup() {
    createCanvas(600, 600, WEBGL);
    bounds = createVector(400, 200, 400);
    whites = new VerletToroid(200, 50, 4, 6, .3, 5);
    iris = new VerletToroid(130, 60, 4, 6, .3, 5);
    pupil = new VerletToroid(20, 40, 4, 6, .3, 5);
     
    //color(200, 125, 255)
    whites.nudge(-1, createVector(22.3, 22.5, 22.987));
    iris.nudge(-1, createVector(22.3, 22.5, 22.987));
   // pupil.nudge(-1, createVector(22.3, 22.5, 22.987));
}

function draw() {
    camera(0, 600, 0, 0, 0, 0, 0, 0, 1);
    background(22,140,180);

    ambientLight(222,10,222);
    directionalLight(10, 122, 100, 0.25, 0.25, 0);
    //pointLight(0, 0, 255, mouseX, mouseY, 250);

    rotateX(frameCount * PI / 720);
    rotateY(frameCount * PI / 720);
    drawBounds();

    specularMaterial(50,250);

    whites.verlet();
    whites.draw(false, false, true);

    specularMaterial(50,250);
    iris.verlet();
    iris.setColor(color(10,255,92));
    iris.draw(false, false, true);

    //specularMaterial(50,250);
    pupil.verlet();
    pupil.setColor(color(0,88));
    pupil.draw(false, false, true);
    
    whites.boundsCollide(bounds);
    
    iris.boundsCollide(bounds);
    
   // pupil.boundsCollide(bounds);
    
    

    whites.nudge(-1, createVector(random(-5.2, 5.2), random(-7.2, 7.2), random(-7.2, 7.2)));
    iris.nudge(-1, createVector(random(-5.2, 5.2), random(-7.2, 7.2), random(-7.2, 7.2)));
  //  pupil.nudge(-1, createVector(random(-5.2, 5.2), random(-7.2, 7.2), random(-7.2, 7.2)));
}

// NOTE: Needs to be a cube 
function drawBounds() {
    noFill();
    stroke(155, 75, 55, 5);
    //box(bounds.x, bounds.y, bounds.z)
}