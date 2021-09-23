// Alexander Matthew Williams
// Nature & Code
// September 19, 2021

// Description:
// Springing - use a leader to generate uniform movement in the lines
// Code expanded from P5_Springnig01 by Ira Greenberg 

// P5_lineslead.js



let bounds; // vector

let leadLineTop; //Vector
let leadLineBot; //Vector

let follOneTop; //Vector
let follOneBot; //Vector

let follTwoTop; //Vector
let follTwoBot; //Vector

let follTreTop;
let follTreBot;

let follQadTop;
let follQadBot;

let leadSpd; //Vector

let follTopSpd; //vector
let follTwoTopSpd; //vector

let follTreBotSpd; //vector
let follQadBotSpd; //vector




let springing = .0044;
let damping = 0.65;

  
function setup() {
    createCanvas(400, 400); 
    bounds = createVector(400, 400);
    strokeWeight(3);
    
    leadLineTop = createVector(0,-125);
    leadLineBot = createVector(0,125);

    follOneTop = createVector(leadLineTop.x, leadLineTop.y);
    follOneBot = createVector(leadLineBot.x - 50, leadLineBot.y);

    follTwoTop = createVector(leadLineTop.x,leadLineTop.y);
    follTwoBot = createVector(leadLineTop.x + 50,leadLineBot.y);

    follTreTop = createVector(leadLineTop.x - 50, leadLineTop.y);
    follTreBot = createVector(leadLineBot.x, leadLineBot.y);

    follQadTop = createVector(leadLineTop.x + 50,leadLineTop.y);
    follQadBot = createVector(leadLineTop.x,leadLineBot.y);

    leadSpd = createVector(-1.5, random(0, 0));


    follTopSpd = createVector(); 
    follTwoTopSpd = createVector(); 
    follTreBotSpd = createVector(); //vector
    follQadBotSpd = createVector();
 
}

function draw() {
     background(100,40,185,20);

    translate(width/2, height/2);
    drawBounds();
    lead();
    follow();
    render();
    checkBoundsCollision();
}

function drawBounds(){
    noFill();
    stroke(0);
    rect(-bounds.x/2, -bounds.y/2, bounds.x, bounds.y);
}

function lead() {

    leadLineTop.add(leadSpd); // euler integration
    leadLineBot.add(leadSpd);

    }



function follow() {
    
//create following vector
    let deltaTopXT = leadLineTop.x-follTwoTop.x;
    let deltaBotXQ = leadLineBot.x-follQadBot.x;
    
    let deltaTopXO = leadLineTop.x-follOneTop.x;
    let deltaBotXTre = leadLineBot.x-follTreBot.x;


    //springing effect
    deltaTopXT *= springing;
    deltaBotXQ *= springing;
    deltaTopXO *= springing;
    deltaBotXTre *= springing;



    follTwoTopSpd.x += deltaTopXT;
    follTopSpd.x += deltaTopXO;
    follQadBotSpd.x += deltaBotXQ;
    follTreBotSpd.x += deltaBotXTre;

    // fol --> leader
    follQadBot.x +=  follQadBotSpd.x;
    follTreBot.x +=  follTreBotSpd.x;
    follOneTop.x +=  follTopSpd.x;
    follTwoTop.x +=  follTwoTopSpd.x;


    // slow down springing
    follTwoTopSpd.x *= damping;
    follQadBotSpd.x *= damping;
    follTopSpd.x *= damping;
    follTreBotSpd.x *= damping;



}

function render() {
    noStroke();  
    line(leadLineTop.x, leadLineTop.y, leadLineBot.x, leadLineBot.y);
    
    
    stroke(255, 5, 200);
    line(follOneTop.x, follOneTop.y, follOneBot.x, follOneBot.y);
    line(follTwoTop.x, follTwoTop.y, follTwoBot.x, follTwoBot.y);
    line(follTreTop.x, follTreTop.y, follTreBot.x, follTreBot.y);
    line(follQadTop.x, follQadTop.y, follQadBot.x, follQadBot.y);
}

function checkBoundsCollision(){
//leader
if (leadLineTop.x > bounds.x/2) {
        leadLineTop.x = bounds.x/2;
        leadLineBot.x = bounds.x/2;
        leadSpd.x*=-1;
    } 
    else if (leadLineBot.x < -bounds.x/2) {
        leadLineBot.x = -bounds.x/2;
        leadLineBot.x = -bounds.x/2;
        leadSpd.x*=-1;
        
    }

}

   