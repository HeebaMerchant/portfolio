// Sample code for Project 2A
// Draws 3D Simple Shapes (box, cylinder, sphere, cone, torus)


let notePositions = [];
let noteRotations = [];
const noteNumber = 16;

let peoplePositions = [];
let peopleRotations = [];
const peopleNumber = 6;

let time = 0;  // track time passing, used to move the objects

function setup() {
  createCanvas(800, 800, WEBGL);
  
  let fov = 90.0;  // 60 degrees FOV
  perspective(PI * fov / 180.0, width / height, 0.1, 2000);
  setupNotes();
  setupPeople();
}

// called repeatedly to draw new per-frame images
function draw() {
  
  // background(255, 255, 255);  //  white background
  background(100, 100, 100);  // black background

  // CAMERA MOVEMENT

  // set the virtual camera position
  let cameraX = 0;
  let cameraY = 0;
  let cameraZ = 0;

  let radius = 200;

  if (time < 110.0) {
    let t = (time * 4) / 10.0;  // normalize time to 0-1

    let theta = (t * PI) - PI/2;

    cameraX = radius * cos(theta);  // now varies with theta
    cameraY = radius * sin(theta);
    cameraZ = 500;  // maintain some distance from the scene
  }

  // camera(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ)
  camera(cameraX, cameraY, cameraZ, 0, 0, 0, 0, 1, 0);

  // self control
  orbitControl();
  
  // include some light even in shadows
  ambientLight(100, 125, 125);
  // set light position
  pointLight(255, 255, 255, 100, -100, 300);
  pointLight(255, 255, 255, -100, -250, -500); // position: left below back
  directionalLight(255, 0, 0, 0, 0.01, -0.5);
  directionalLight(0, 0, 255, 0, -0.8, -0.5);
  emissiveMaterial(15);
  specularMaterial(50);
  shininess(75);
  noStroke();  // don't draw polygon outlines
  

  let delta = 25;

  // vinyl
  drawVinyl();

  // background
  backgroundScene();
  stage();
  speakers();
  topSpeaker();
  speakerDetails();
  speakerDetails2();
  bottomSpeaker();
  djStage();
  // instancing of light bulbs
  lightsStands();
  // instancing of notes
  drawNotes();
  // instancing of people
  drawPeople();
  artist();

  
  time += 0.01;  // update the time
}

// draw base
const pinkColour = [200,95,85];
const blackColour = [51,51,51];
const edgeLength = 45;
const baseheight = 7;

// base legs
const corner = 19;
const legHeight = baseheight/2;

// cd stack
const greyColour = [93, 93, 93];
const creamColour = [239, 236, 277];

function drawVinyl() {
  fill(...pinkColour);
  push();
  translate(0, 140);
  let box_axis = createVector (0.0, 1.0, 0.0);
  rotate (-time, box_axis);

  // Right Edge
  push();
  translate(edgeLength/2, 0, 0);
  rotateX(PI/2);
  scale(.125, 1, 1);
  cylinder(baseheight/2, edgeLength);
  pop();

  // Left Edge
  push();
  translate(-edgeLength/2, 0, 0);
  rotateX(PI/2);
  scale(.125, 1, 1);
  cylinder(baseheight/2, edgeLength);
  pop();

  // Near Edge
  push();
  translate(0, 0, edgeLength/2);
  rotateX(PI/2);
  rotateZ(PI/2);
  scale(.125, 1, 1);
  cylinder(baseheight/2, edgeLength);
  pop();

  // Near Edge
  push();
  translate(0, 0, -edgeLength/2);
  rotateX(PI/2);
  rotateZ(PI/2);
  scale(.125, 1, 1);
  cylinder(baseheight/2, edgeLength);
  pop();

  // round corners
  // front right
  push();
  translate(edgeLength/2, 0, edgeLength/2);
  rotateX(PI/2);
  scale(0.12, 0.145, 1);
  sphere(baseheight/2);
  pop();

  // front left
  push();
  translate(-edgeLength/2, 0, edgeLength/2);
  rotateX(PI/2);
  scale(0.12, 0.145, 1);
  sphere(baseheight/2);
  pop();

  // back right
  push();
  translate(edgeLength/2, 0, -edgeLength/2);
  rotateX(PI/2);
  scale(0.12, 0.145, 1);
  sphere(baseheight/2);
  pop();

  // back left
  push();
  translate(-edgeLength/2, 0, -edgeLength/2);
  rotateX(PI/2);
  scale(0.12, 0.145, 1);
  sphere(baseheight/2);
  pop();

  // bottom cover
  push();
  translate(0, 3, 0);
  box(edgeLength+2, 2, edgeLength+2);
  pop();

  // top cover
  push();
  translate(0, -baseheight/2, 0);
  box(edgeLength, 0.1, edgeLength);
  pop();

  // top
  push();
  translate(0, -3.5, 0);
  box(edgeLength-2, 0.5, edgeLength-2);
  pop();

  // base legs
  fill(...blackColour);
  // back right corner
  push();
  translate(corner, legHeight, corner);
  rotateY(PI/2);
  cylinder(3, baseheight, 100);
  pop();

  // front right corner
  push();
  translate(-corner, legHeight, corner);
  rotateY(PI/2);
  cylinder(3, baseheight, 100);
  pop();

  // back left corner
  push();
  translate(-corner, legHeight, -corner);
  rotateY(PI/2);
  cylinder(3, baseheight, 100);
  pop();

  // front left corner
  push();
  translate(corner, legHeight, -corner);
  rotateY(PI/2);
  cylinder(3, baseheight, 100);
  pop();

  // cd stack
  fill(...greyColour);
  push();
  translate(0, -4, 0);
  cylinder(16, 0.4, 50);
  pop();


  // layer 1
  fill(...creamColour);
  push();
  translate(0, -4.3, 0);
  cylinder(16, 0.1, 100);
  pop();

  // 2
  fill(...greyColour);
  push();
  translate(0, -4.5, 0);
  cylinder(15.5, 0.4, 100);
  pop();

  // layer 2
  fill(...creamColour);
  push();
  translate(0, -4.8, 0);
  cylinder(15.5, 0.1, 100);
  pop();

  // layer 3
  fill(...greyColour);
  push();
  translate(0, -4.9, 0);
  cylinder(15, 0.1, 100);
  pop();

  // main layer
  fill(...creamColour);
  push();
  translate(0, -5.1, 0);
  cylinder(13, 0.7, 100);
  pop();

  // middle space
  // Outer rim
  fill(...pinkColour);  // Match base color
  push();
  translate(0, -5.3, 0);
  cylinder(5, 0.5, 100);
  pop();

  // Inner recessed area
  fill(255, 160, 150); 
  push();
  translate(0, -5.3, 0);
  cylinder(5, 0.3, 50);
  pop();

  // center spindle
  fill(...greyColour);
  push();
  translate(0, -5.4, 0);
  cylinder(1, 2, 100);
  pop(); 

  // center spindle top
  fill(...greyColour);
  push();
  translate(0, -6.4, 0);
  sphere(1);
  pop(); 

  // buttons
  // spin button
  // bottom
  fill(51, 51, 51);
  push();
  translate(-16, -4, -16);
  cylinder(0.7, 0.6, 100);
  pop();

  // top
  fill(51, 51, 51);
  push();
  translate(-16, -5, -16);
  cylinder(0.9, 2, 100);
  pop();

  // spin button 2
  // bottom
  fill(239, 236, 227);
  push();
  translate(-7, -5, -19);
  cylinder(0.7, 3, 50);
  pop();

  // top
  fill(239, 236, 227);
  push();
  translate(-7, -6, -19);
  cylinder(0.9, 1.5, 100);
  pop();

  // Details: white cirlces
  fill(239, 236, 227);
  push();
  translate(18.5, -4, 18.5);
  cylinder(2, 2, 50);
  pop();

  push();
  translate(-18.5, -4, 18.5);
  cylinder(2, 2, 50);
  pop();

  // lever
  // mover 
  // bottom
  fill(51, 51, 51);
  push();
  translate(17, -4, -17);
  cylinder(4, 0.8, 50);
  pop();

  // layer
  fill(51, 51, 51);
  push();
  translate(17, -4.2, -17);
  cylinder(3.5, 0.3, 50);
  pop();

  // top
  fill(51, 51, 51);
  push();
  translate(17, -4.7, -17);
  scale(1, 0.5, 1);
  sphere(2);
  pop();

  fill(51, 51, 51);
  push();
  translate(17, -5.5, -17);
  cylinder(1.3, -6, 50);
  pop();

  fill(239, 236, 227);
  push();
  translate(17, -10, -17);
  rotateX(PI/2);
  rotateZ(PI/4);
  cylinder(2, -6, 50);
  pop();

  push();
  translate(19, -10, -19);
  rotateX(PI/2);
  rotateZ(PI/4);
  sphere(2);
  pop();

  fill(51, 51, 51);
  push();
  translate(11, -10, -11);
  rotateX(PI/2);
  rotateZ(PI/4);
  cylinder(0.8, 15, 50);
  pop();

  fill(51, 51, 51);
  push();
  translate(5, -10, -5);
  rotateX(-PI/2);
  rotateZ(PI/4);
  box(3, 2, 3)
  pop();

  fill(16, 16, 16);
  push();
  translate(5, -7.5, -5);
  cone(1, 4, 50);
  pop();

  pop();
}

function backgroundScene() {
  // back
  fill(4, 26, 64);
  push();
  translate(0, 0, -400);
  box(2000, 2000, 30);
  pop();

  // top
  push();
  translate(0, -1000, 400);
  rotateX(PI/2);
  box(2000, 2000, 10);
  pop();

  // right
  push();
  translate(1000, 0, 400);
  rotateY(PI/2);
  box(2000, 2000, 10);
  pop();

  // left
  push();
  translate(-1000, 0, 400);
  rotateY(-PI/2);
  box(2000, 2000, 10);
  pop();

  // grass
  fill(32, 57, 44);
  push();
  translate(0, 270, 400);
  rotateX(-PI/2);
  box(2000, 2000, 10);
  pop();

}

const stageLength = 580;
const stageHeight = 30;
const stageColour = [217, 139, 175];
// background
function stage() {
  fill(...stageColour);
  push();
  translate(0, 250, 0);
  // let box_axis = createVector (0.0, 1.0, 0.0);
  // rotate (-time, box_axis);

  // Right Edge
  push();
  translate(stageLength/2, 0, 0);
  rotateX(PI/2);
  scale(.125, 1, 1);
  cylinder(stageHeight/2, stageLength);
  pop();

  // Left Edge
  push();
  translate(-stageLength/2, 0, 0);
  rotateX(PI/2);
  scale(.125, 1, 1);
  cylinder(stageHeight/2, stageLength);
  pop();

  // Near Edge
  push();
  translate(0, 0, stageLength/2);
  rotateX(PI/2);
  rotateZ(PI/2);
  scale(.125, 1, 1);
  cylinder(stageHeight/2, stageLength);
  pop();

  // Near Edge
  push();
  translate(0, 0, -stageLength/2);
  rotateX(PI/2);
  rotateZ(PI/2);
  scale(.125, 1, 1);
  cylinder(stageHeight/2, stageLength);
  pop();

  // round corners
  // front right
  push();
  translate(stageLength/2, 0, stageLength/2);
  rotateX(PI/2);
  scale(0.12, 0.145, 1);
  sphere(stageHeight/2);
  pop();

  // front left
  push();
  translate(-stageLength/2, 0, stageLength/2);
  rotateX(PI/2);
  scale(0.12, 0.145, 1);
  sphere(stageHeight/2);
  pop();

  // back right
  push();
  translate(stageLength/2, 0, -stageLength/2);
  rotateX(PI/2);
  scale(0.12, 0.145, 1);
  sphere(stageHeight/2);
  pop();

  // back left
  push();
  translate(-stageLength/2, 0, -stageLength/2);
  rotateX(PI/2);
  scale(0.12, 0.145, 1);
  sphere(stageHeight/2);
  pop();

  // bottom cover
  push();
  translate(0, stageHeight/2, 0);
  box(stageLength+2, 2, stageLength+2);
  pop();

  // top cover
  push();
  translate(0, -stageHeight/2, 0);
  box(stageLength, 2, stageLength);
  pop();
}

const speakerLenght = 150;
const speakerHeight = 400;
function speakers() {
  // left speaker

  fill(...stageColour);
  push();
  translate(-55-speakerLenght, -400+speakerHeight, -55-speakerLenght);

  // right edge
  push();
  translate(speakerLenght/2, -speakerHeight/2, 0);
  rotateX(PI/2);
  scale(.09, 1, 1);
  cylinder(speakerHeight/2, speakerLenght);
  pop();

  // Left Edge
  push();
  translate(-speakerLenght/2, -speakerHeight/2, 0);
  rotateX(PI/2);
  scale(.09, 1, 1);
  cylinder(speakerHeight/2, speakerLenght);
  pop();

  // Near Edge
  push();
  translate(0, -speakerHeight/2, speakerLenght/2);
  rotateX(PI/2);
  rotateZ(PI/2);
  scale(.09, 1, 1);
  cylinder(speakerHeight/2, speakerLenght);
  pop();

  // Near Edge
  push();
  translate(0, -speakerHeight/2, -speakerLenght/2);
  rotateX(PI/2);
  rotateZ(PI/2);
  scale(.09, 1, 1);
  cylinder(speakerHeight/2, speakerLenght);
  pop();

  // top left speaker
  push();
  translate(0, -speakerHeight+1, 0);
  box(speakerLenght, 2, speakerLenght);
  pop();

  // round corners
  // front right
  push();
  translate(speakerLenght/2,  -speakerHeight/2, speakerLenght/2);
  rotateX(PI/2);
  scale(0.09, 0.09, 1);
  sphere(speakerHeight/2);
  pop();

  // front left
  push();
  translate(-speakerLenght/2,  -speakerHeight/2, speakerLenght/2);
  rotateX(PI/2);
  scale(0.09, 0.09, 1);
  sphere(speakerHeight/2);
  pop();

  // back right
  push();
  translate(speakerLenght/2,  -speakerHeight/2, -speakerLenght/2);
  rotateX(PI/2);
  scale(0.09, 0.09, 1);
  sphere(speakerHeight/2);
  pop();

  // back left
  push();
  translate(-speakerLenght/2,  -speakerHeight/2, -speakerLenght/2);
  rotateX(PI/2);
  scale(0.09, 0.09, 1);
  sphere(speakerHeight/2);
  pop();
  
  pop();


  // right speaker

  fill(...stageColour);
  push();
  translate(55+speakerLenght, -400+speakerHeight, -55-speakerLenght);

  // right edge
  push();
  translate(speakerLenght/2, -speakerHeight/2, 0);
  rotateX(PI/2);
  scale(.09, 1, 1);
  cylinder(speakerHeight/2, speakerLenght);
  pop();

  // Left Edge
  push();
  translate(-speakerLenght/2, -speakerHeight/2, 0);
  rotateX(PI/2);
  scale(.09, 1, 1);
  cylinder(speakerHeight/2, speakerLenght);
  pop();

  // Near Edge
  push();
  translate(0, -speakerHeight/2, speakerLenght/2);
  rotateX(PI/2);
  rotateZ(PI/2);
  scale(.09, 1, 1);
  cylinder(speakerHeight/2, speakerLenght);
  pop();

  // Near Edge
  push();
  translate(0, -speakerHeight/2, -speakerLenght/2);
  rotateX(PI/2);
  rotateZ(PI/2);
  scale(.09, 1, 1);
  cylinder(speakerHeight/2, speakerLenght);
  pop();

  // top left speaker
  push();
  translate(0, -speakerHeight+1, 0);
  box(speakerLenght, 2, speakerLenght);
  pop();

  // round corners
  // front right
  push();
  translate(speakerLenght/2,  -speakerHeight/2, speakerLenght/2);
  rotateX(PI/2);
  scale(0.09, 0.09, 1);
  sphere(speakerHeight/2);
  pop();

  // front left
  push();
  translate(-speakerLenght/2,  -speakerHeight/2, speakerLenght/2);
  rotateX(PI/2);
  scale(0.09, 0.09, 1);
  sphere(speakerHeight/2);
  pop();

  // back right
  push();
  translate(speakerLenght/2,  -speakerHeight/2, -speakerLenght/2);
  rotateX(PI/2);
  scale(0.09, 0.09, 1);
  sphere(speakerHeight/2);
  pop();

  // back left
  push();
  translate(-speakerLenght/2,  -speakerHeight/2, -speakerLenght/2);
  rotateX(PI/2);
  scale(0.09, 0.09, 1);
  sphere(speakerHeight/2);
  pop();

  pop();
}

const speakerLenght2 = 250;
const speakerHeight2 = 200;

function topSpeaker() {
  fill(...stageColour);
  push();
  translate(0, -415+speakerHeight2, -40-speakerHeight2/2);

  // right edge
  push();
  translate(21+speakerLenght2/2, -speakerHeight2/2, -20);
  rotateX(PI/2);
  rotateZ(PI/20);
  scale(.09, 1, 1);
  cylinder(speakerHeight2/2, speakerLenght2+40);
  pop();

  // Left Edge
  push();
  translate(-21-speakerLenght2/2, -speakerHeight2/2, -20);
  rotateX(PI/2);
  rotateZ(-PI/20);
  scale(.09, 1, 1);
  cylinder(speakerHeight2/2, speakerLenght2+40);
  pop();

  // Near Edge
  push();
  translate(0, -speakerHeight2/2, speakerLenght2/2);
  rotateX(PI/2);
  rotateZ(PI/2);
  scale(.09, 1, 1);
  cylinder(speakerHeight2/2, speakerLenght2);
  pop();

  // far Edge
  push();
  translate(0, -speakerHeight2/2, -44-speakerLenght2/2);
  rotateX(PI/2);
  rotateZ(PI/2);
  scale(.09, 1, 1);
  cylinder(speakerHeight2/2, speakerLenght2+85);
  pop();

  // top over speaker
  push();
  translate(0, -speakerHeight2+1, 0);
  box(speakerLenght2, 2, speakerLenght2);
  pop();

  push();
  translate(-21, -speakerHeight2+1, -20);
  rotateY(PI/20);
  box(speakerLenght2, 2, speakerLenght2);
  pop();

  push();
  translate(21, -speakerHeight2+1, -20);
  rotateY(-PI/20);
  box(speakerLenght2, 2, speakerLenght2);
  pop();

  push();
  translate(0, -speakerHeight2+1, -45);
  box(speakerLenght2+8, 2, speakerLenght2);
  pop();

  push();
  translate(145, -speakerHeight2+1, -45);
  rotateY(-PI/20);
  box(speakerLenght2-240, 2, speakerLenght2);
  pop();

  push();
  translate(135, -speakerHeight2+1, -45);
  rotateY(-PI/20);
  box(speakerLenght2-240, 2, speakerLenght2);
  pop();

  push();
  translate(125, -speakerHeight2+1, -45);
  rotateY(-PI/20);
  box(speakerLenght2-240, 2, speakerLenght2);
  pop();
  
  push();
  translate(115, -speakerHeight2+1, -45);
  rotateY(-PI/20);
  box(speakerLenght2-240, 2, speakerLenght2);
  pop();



  push();
  translate(-145, -speakerHeight2+1, -45);
  rotateY(PI/20);
  box(speakerLenght2-240, 2, speakerLenght2);
  pop();

  push();
  translate(-135, -speakerHeight2+1, -45);
  rotateY(PI/20);
  box(speakerLenght2-240, 2, speakerLenght2);
  pop();

  push();
  translate(-125, -speakerHeight2+1, -45);
  rotateY(PI/20);
  box(speakerLenght2-240, 2, speakerLenght2);
  pop();
  
  push();
  translate(-115, -speakerHeight2+1, -45);
  rotateY(PI/20);
  box(speakerLenght2-240, 2, speakerLenght2);
  pop();

  // round corners
  // front right
  push();
  translate(speakerLenght2/2,  -speakerHeight2/2, speakerLenght2/2);
  rotateX(PI/2);
  scale(0.09, 0.09, 1);
  sphere(speakerHeight2/2);
  pop();

  // front left
  push();
  translate(-speakerLenght2/2,  -speakerHeight2/2, speakerLenght2/2);
  rotateX(PI/2);
  scale(0.09, 0.09, 1);
  sphere(speakerHeight2/2);
  pop();

  // back right
  push();
  translate(44+speakerLenght2/2,  -speakerHeight2/2, -44-speakerLenght2/2);
  rotateX(PI/2);
  scale(0.09, 0.09, 1);
  sphere(speakerHeight2/2);
  pop();

  // back left
  push();
  translate(-44-speakerLenght2/2,  -speakerHeight2/2, -44-speakerLenght2/2);
  rotateX(PI/2);
  scale(0.09, 0.09, 1);
  sphere(speakerHeight2/2);
  pop();

  pop();
}


function speakerDetails() {
  fill(...speakerColour);

  // left speaker
  push();
  translate(-speakerHeight/2, -speakerHeight/3, -20-speakerLenght/2);
  scale(0.3 * (sin(time * 20) * 0.3 + 3));
  torus(40, 10);
  pop();

  push();
  translate(-speakerHeight/2, -speakerHeight/3, -35-speakerLenght/2);
  rotateX(-PI/2);
  cone(35, 10, 100, 100, false);
  pop();

  fill(...greyColour)
  push();
  translate(-speakerHeight/2, -speakerHeight/3, -30-speakerLenght/2);
  sphere(10);
  pop();

  
  fill(...speakerColour);
  push();
  translate(-speakerHeight/2, -150-speakerHeight/3, -20-speakerLenght/2);
  scale(0.3 * (sin(time * 20) * 0.3 + 3));
  torus(40, 10);
  pop();

  push();
  translate(-speakerHeight/2, -150-speakerHeight/3, -35-speakerLenght/2);
  rotateX(-PI/2);
  cone(35, 10, 100, 100, false);
  pop();

  fill(...greyColour)
  push();
  translate(-speakerHeight/2, -150-speakerHeight/3, -30-speakerLenght/2);
  sphere(10);
  pop();

  // right speaker
  fill(...speakerColour);
  push();
  translate(speakerHeight/2, -speakerHeight/3, -20-speakerLenght/2);
  scale(0.3 * (sin(time * 20) * 0.3 + 3));
  torus(40, 10);
  pop();

  push();
  translate(speakerHeight/2, -speakerHeight/3, -35-speakerLenght/2);
  rotateX(-PI/2);
  cone(35, 10, 100, 100, false);
  pop();

  fill(...greyColour)
  push();
  translate(speakerHeight/2, -speakerHeight/3, -30-speakerLenght/2);
  sphere(10);
  pop();

  fill(...speakerColour)
  push();
  translate(speakerHeight/2, -150-speakerHeight/3, -20-speakerLenght/2);
  scale(0.3 * (sin(time * 20) * 0.3 + 3));
  torus(40, 10);
  pop();

  push();
  translate(speakerHeight/2, -150-speakerHeight/3, -35-speakerLenght/2);
  rotateX(-PI/2);
  cone(35, 10, 100, 100, false);
  pop();

  fill(...greyColour)
  push();
  translate(speakerHeight/2, -150-speakerHeight/3, -30-speakerLenght/2);
  sphere(10);
  pop();
}

const speakerColour = [191, 86, 125];
function speakerDetails2() {
  fill(...speakerColour)
  push();
  translate(0, -60-speakerLenght2, 134-speakerLenght2/2);
  scale(0.3 * (sin(time * 20) * 0.3 + 3));
  torus(60, 15);
  pop();

  push();
  translate(0, -60-speakerLenght2, speakerLenght2-250);
  rotateX(-PI/2);
  cone(50, 10, 100, 100, false);
  pop();

  push();
  translate(0, -60-speakerLenght2, speakerLenght2-250);
  sphere(20);
  pop();
}

const bottomLenght = 60;
const bottomHeight = 300;
const bottomDepth = 100;
function bottomSpeaker() {
  fill(...stageColour);
  push();
  translate(-100, -130-baseheight, -55-speakerLenght);
  box(bottomLenght, bottomHeight, bottomDepth);
  pop();

  push();
  translate(100, -130-baseheight, -55-speakerLenght);
  box(bottomLenght, bottomHeight, bottomDepth);
  pop();

  push();
  translate(0, -260-baseheight, -55-speakerLenght);
  box(bottomLenght+100, bottomHeight/2, bottomDepth);
  pop();

  push();
  translate(0, -150-baseheight, -106-speakerLenght);
  box(bottomLenght+100, bottomHeight, 0);
  pop();

  push()
  translate(-70, -189, -5-speakerLenght);
  sphere(10);
  pop();

  push()
  translate(70, -189, -5-speakerLenght);
  sphere(10);
  pop();

  push();
  translate(-70, -90, -5-speakerLenght);
  cylinder(10, 200)
  pop();

  push();
  translate(70, -90, -5-speakerLenght);
  cylinder(10, 200)
  pop();

  push();
  translate(0, -189, -5-speakerLenght);
  rotateX(PI/2);
  rotateZ(PI/2);
  cylinder(10, 140)
  pop();
}

function djStage() {
  fill(...speakerColour);
  push();
  translate(0, -18, -10);
  cylinder(120, 20);

  push();
  translate(0, -18, -10);
  cylinder(100, 20);
  pop();
  pop();
}

let numberOfBulbs = 8;  // Number of bulbs you want on each rod
let spacing = 260 / numberOfBulbs;

let numberOfBulbs2 = 16; 
let spacing2 = 260 / numberOfBulbs;

// instancing of light bulbs
function lightsStands() {
  // left side
  // back
  fill(0)
  push();
  translate(10-stageLength/2, -200-stageHeight, -50);
  cylinder(5, 420);

  push();
  translate(0, -210, 0);
  sphere(10);
  pop();
  
  // front
  push();
  translate(0, 10, 320);
  cylinder(5, 450);

  push();
  translate(0, -220, 0);
  sphere(10);
  pop();
  pop();
  pop();

  // back + front
  push();
  translate(10-stageLength/2, -440, 110);
  rotateX(PI/2);
  cylinder(2, 320);
  pop();
  
  for (let i = 0; i<= numberOfBulbs; i++){
    push();
    translate(10-stageLength/2, 66, 240-spacing*i);
    lightBulbs();
    pop();
  }

  // right
  // back
  fill(0)
  push();
  translate(-10+stageLength/2, -200-stageHeight, -50);
  cylinder(5, 420);

  push();
  translate(0, -210, 0);
  sphere(10);
  pop();
  
  // front
  push();
  translate(0, 10, 320);
  cylinder(5, 450);

  push();
  translate(0, -220, 0);
  sphere(10);
  pop();
  pop();
  pop();

  // back + front
  push();
  translate(-10+stageLength/2, -440, 110);
  rotateX(PI/2);
  cylinder(2, 320);
  pop();

  for (let i = 0; i<= numberOfBulbs; i++){
    push();
    translate(-10+stageLength/2, 66, 240-spacing*i);
    lightBulbs();
    pop();
  }
  
  // front pole
  push();
  translate(0, -440, 270);
  rotateX(PI/2);
  rotateZ(PI/2);
  cylinder(2, 560);
  pop();

  for (let i = 0; i<= numberOfBulbs2; i++){
    push();
    translate(-264+spacing2 * i, 66, 270);
    lightBulbs();
    pop();
  }

  // back pole
  push();
  translate(0, -440, -50);
  rotateX(PI/2);
  rotateZ(PI/2);
  cylinder(2, 560);
  pop();

  for (let i = 0; i<= numberOfBulbs2; i++){
    push();
    translate(-248+spacing2 * i, 66, -50);
    lightBulbs();
    pop();
  }
}

// instancing of light bulbs
function lightBulbs() {
  fill(0);
  push();
  translate(0, -500, 0);
  cylinder(2, 8);

  fill(255, 235, 0);
  push();
  translate(0, 5, 0);
  sphere(6);
  pop();
  pop();
}

const bigNoteRadius = 6;
const smallNoteRadius = 3;
const noteHeight = 30;
// instancing of notes
function musicNotes() {
  fill(0, 0, 0);
  
  // 1 music note
  // left
  push();
  translate(-200, -150, -70);
  sphere(bigNoteRadius);
  // pop();

  push();
  translate(3, -30, 0);
  sphere(smallNoteRadius);
  // pop();

  push();
  translate(0, 15, 0);
  cylinder(3,noteHeight);
  // pop();

  // right
  push();
  translate(20, 10, 0);
  sphere(bigNoteRadius);
  // pop();

  push();
  translate(2, -35, 0);
  sphere(smallNoteRadius);
  // pop();

  push();
  translate(0, 15, 0);
  cylinder(3, noteHeight);
  // pop();

  // left + right
  push();
  translate(-10, -10, 0);
  rotateZ(PI/2.7)
  cylinder(3, 25);
  pop();
  pop();
  pop();
  pop();
  pop();
  pop();
  pop();
}

// instancing of notes
function setupNotes() {
  notePositions = [];  // Reset to handle multiple calls
  noteRotations = [];  // Reset to handle multiple calls

  // Settings for left and right sides
  let baseXLeft = 650; // Example base x for left side
  let baseXRight = -350; // Example base x for right side
  let baseY = -300; // Base y position
  let baseZ = 10; // Base z position
  let angle = PI / 4; // 45 degrees for diagonal direction
  let distanceIncrement = 50; // Distance between notes
  
  for (let i = 0; i < noteNumber; i++) {
    let distance = i * distanceIncrement;

    // Calculate the diagonal spread for left
    let leftOutwardFlow = cos(angle) * distance;
    let leftUpwardFlow = sin(angle) * distance;

    // Positions for left side notes
    notePositions.push({
      x: baseXLeft - leftOutwardFlow,
      y: baseY + leftUpwardFlow,
      z: baseZ + (-90, -30) // Random depth within a range
    });

    // Calculate the diagonal spread for right
    let rightOutwardFlow = cos(angle) * distance;
    let rightUpwardFlow = sin(angle) * distance;

    // Positions for right side notes
    notePositions.push({
      x: baseXRight + rightOutwardFlow, // Note the change in addition
      y: baseY + rightUpwardFlow,
      z: baseZ + (-90, -30) // Random depth within a range
    });

    // Random rotations for both left and right side notes
    noteRotations.push({
      x: random(-PI/24, PI/24),
      y: random(-PI/24, PI/24),
      z: random(-PI/24, PI/24)
    });

    noteRotations.push({
      x: random(-PI/24, PI/24),
      y: random(-PI/24, PI/24),
      z: random(-PI/24, PI/24)
    });
  }
}

// instancing of notes
function drawNotes() {  
  for (let i = 0; i < noteNumber; i++) {
    push();
    let positions = notePositions[i];
    let rotations = noteRotations[i];
    
    // Smoother floating animation
    let floatY = sin(time * 2 + (i % noteNumber) * PI/3) * 15;
    
    // Position and rotate the note
    translate(positions.x, positions.y + floatY, positions.z);
    rotateX(rotations.x);
    rotateY(rotations.y);
    rotateZ(rotations.z);
    // Draw the music note
    musicNotes();
    pop();
  }
}

const shoeSize = 20;
const legHeight2 = 35;
// random colours change colours
let colours = [
  [189, 224, 254],
  [67, 33, 51],
  [94, 0, 9],
  [17, 36, 74],
  [107, 57, 188],
  [117, 185, 191]
];

// instancing of people
function onePerson(index) {
  let colourIndex = index % colours.length; // Ensure we don't go out of bounds
  let colour = colours[colourIndex];

  fill(0, 0, 0);
  // 1 person
  // shoes
  push();
  translate(20, -20, 200);
  rotateX(PI/2);
  scale(0.8, 1, 0.5);
  sphere(10, shoeSize);

  push();
  translate(25, 0, 0);
  sphere(10, shoeSize);
  pop();
  pop();

  fill(209, 157, 117);
  // legs
  push();
  translate(20, -40, 202);
  cylinder(4, legHeight2);

  push();
  translate(20, 0, 0);
  cylinder(4, legHeight2);
  pop();
  pop();

  fill(colour[0], colour[1], colour[2]);
  // body
  push();
  translate(30, -70, 202);
  rotateX(PI)
  cone(20, 50, 100);
  pop();

  fill(209, 157, 117);
  // arms 
  push();
  translate(20, -70, 202);
  rotateZ(-PI/4);
  cylinder(4, legHeight2/2);

  push();
  translate(0, -10, 0);
  rotateZ(-PI/4);
  sphere(6);
  pop();
  pop();

  push();
  translate(40, -70, 202);
  rotateZ(PI/4);
  cylinder(4, legHeight2/2);

  push();
  translate(0, -10, 0);
  rotateZ(-PI/4);
  sphere(6);
  pop();
  pop();

  fill(209, 157, 117);
  // head
  push();
  translate(30, -93, 202);
  scale(1, 1, 1);
  sphere(15);

  // hair
  fill(53, 33, 0);
  push();
  translate(0, 0, 4);
  scale(1, 1.2, 1);
  sphere(15);
  pop();
  pop();
}

// instancing of people
function setupPeople() {
  peoplePositions = [];  // Reset to handle multiple calls
  peopleRotations = [];  // Reset to handle multiple calls

  // Settings for left and right sides
  let baseXLeft = 160; // Starting position for left side
  let baseXRight = -160; // Starting position for right side
  let baseY = -30; // Base y position (ground level)
  let baseZ = -100; // Base z position
  let angle = PI / 4; // 45 degrees for diagonal spread
  let distanceIncrement = 40; // Distance between people
  
  for (let i = 0; i < peopleNumber/2; i++) {
    let distance = i * distanceIncrement;

    // Calculate the diagonal spread
    let outwardFlow = cos(angle) * distance;
    let backwardFlow = sin(angle) * distance;

    // Positions for left side people
    peoplePositions.push({
      x: baseXLeft - outwardFlow,
      y: baseY,
      z: baseZ + backwardFlow
    });

    // Positions for right side people
    peoplePositions.push({
      x: baseXRight + outwardFlow,
      y: baseY,
      z: baseZ + backwardFlow
    });

    // Random subtle rotations for both sides
    peopleRotations.push({
      x: 0,
      y: random(-PI/12, PI/12), // Slight turn left/right
      z: 0
    });

    peopleRotations.push({
      x: 0,
      y: random(-PI/12, PI/12),
      z: 0
    });
  }
}

// instancing of people
function drawPeople() {
  for (let i = 0; i < peopleNumber; i++) {
    push();
    let positions = peoplePositions[i];
    let rotations = peopleRotations[i];
    
    // Add jumping animation
    let jumpHeight = sin(time * 15 + i * PI/3) * 20; // Different phase for each person
    
    // Position and rotate the person
    translate(positions.x, positions.y - jumpHeight, positions.z);
    rotateX(rotations.x);
    rotateY(rotations.y);
    rotateZ(rotations.z);
    
    // Draw the person
    onePerson(i);
    pop();
  }
}

function artist() {
  let jumpHeight = sin(time * 15) * 20;
  fill(0, 0, 0);
  // 1 person
  // shoes
  push();
  translate(0, -70+jumpHeight, -80);
  rotateX(PI/2);
  scale(0.8, 1, 0.5);
  sphere(10, shoeSize);

  push();
  translate(25, 0, 0);
  sphere(10, shoeSize);
  pop();
  pop();

  fill(209, 157, 117);
  // legs
  push();
  translate(0, -90+jumpHeight, -82);
  cylinder(4, legHeight2);

  push();
  translate(20, 0, 0);
  cylinder(4, legHeight2);
  pop();
  pop();

  fill(0, 0, 0);
  // body
  push();
  translate(10, -120+jumpHeight, -82);
  rotateX(PI)
  cone(20, 50, 100);
  pop();

  fill(209, 157, 117);
  // arms 
  push();
  translate(-8, -120+jumpHeight, -82);
  rotateZ(-PI/4);
  cylinder(4, legHeight2/2);

  push();
  translate(0, -10, 0);
  rotateZ(-PI/4);
  sphere(6);
  pop();
  pop();

  push();
  translate(25, -120+jumpHeight, -82);
  rotateZ(PI/4);
  cylinder(4, legHeight2/2);

  push();
  translate(0, -10, 0);
  rotateZ(-PI/4);
  sphere(6);
  pop();
  pop();

  fill(209, 157, 117);
  // head
  push();
  translate(10, -140+jumpHeight, -82);
  scale(1, 1, 1);
  sphere(15);

  // hair
  fill(53, 33, 0);
  push();
  translate(0, 0, -4);
  scale(1, 1.2, 1);
  sphere(15);
  pop();
  pop();
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('your_object.jpg');
  }
}
