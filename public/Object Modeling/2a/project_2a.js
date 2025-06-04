// Sample code for Project 2A
// Draws 3D Simple Shapes (box, cylinder, sphere, cone, torus)


let time = 0;  // track time passing, used to move the objects

function setup() {
  createCanvas(600, 600, WEBGL);
  
  let fov = 60.0;  // 60 degrees FOV
  perspective(PI * fov / 180.0, width / height, 0.1, 2000);
}

// called repeatedly to draw new per-frame images
function draw() {
  
  background(255, 255, 255);  //  white background
  
  // set the virtual camera position
  // camera(0, 0, 85, 0, 0, 0, 0, 1, 0);  // from, at, up

  // self control
  orbitControl();
  
  // include some light even in shadows
  ambientLight(200, 175, 175);
  
  // set light position
  pointLight(255, 255, 255, 100, -100, 300);
  pointLight(255, 255, 255, -100, -250, -500); // position: left below back

  emissiveMaterial(15);
  specularMaterial(50);
  shininess(75);


  noStroke();  // don't draw polygon outlines
  
  let delta = 25;

  // vinyl
  drawBase();
  baseLegs();
  cdStack();
  buttons();
  lever();

  
  time += 0.01;  // update the time
}
const pinkColour = [200,95,85];
const blackColour = [51,51,51];
const edgeLength = 45;
const baseheight = 7;

function drawBase() {
  fill(...pinkColour);
  push();
  translate(0, 0);
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
}

const corner = 19;
const legHeight = baseheight/2;
function baseLegs() {
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
}

const greyColour = [93, 93, 93];
const creamColour = [239, 236, 277];
function cdStack() {
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
}

function buttons() {
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
}

function lever() {
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
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('your_object.jpg');
  }
}
