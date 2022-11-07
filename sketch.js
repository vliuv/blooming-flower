let serial;
let flowerBloomIn = 50;
let flowerBloomOut = 100; //flower blooming rotation from photoresistor
let leafMove = 7; //leaf movement from photoresistor
let randomRed = 200;
let randomGreen = 15;
let randomBlue = 55; //rgb values from button

function setup() {
  createCanvas(400, 400); //instantiate serial port object
  serial = new p5.SerialPort(); //open the serial port
  serial.open("/dev/tty.usbmodem101"); //call the callback function when there is data
  serial.on("data", gotData);

  angleMode(DEGREES);
}
function gotData() {
  let currentString = serial.readLine();
  if (currentString.length > 0) {
    let readings = split(currentString, ",");
    let buttonRedData = readings[0];
    let buttonGreenData = readings[1];
    let buttonBlueData = readings[2];
    let photoData = readings[3]; //splitting the values from arduino
    flowerBloomIn = map(photoData, 180, 660, 0, 50);
    flowerBloomOut = map(photoData, 180, 660, 0, 100); //using photoresistor values to control the flower blooming
    leafMove = map(photoData, 220, 860, 7, 20); //using photoresistor values to add a slight movement to the leaves

    if (buttonRedData == 1) {
      randomRed = random(255);
    }
    if (buttonGreenData == 1) {
      randomGreen = random(255);
    }
    if (buttonBlueData == 1) {
      randomBlue = random(255); //setting the red, green, and blue buttons to randomize a value for RGB values when pressed
    }
  }
  console.log(currentString);
}

function draw() {
  background(140, 180, 220);
  noStroke();

  fill(130, 170, 120);
  rectMode(CENTER);
  rect(200, 300, 8, 220);
  fill(100, 140, 90);
  ellipse(200, 200, 20, 40); //stem of flower

  push();
  translate(200, 325);
  rotate(30 + leafMove);
  drawPetal(0, 0);
  pop(); //right leaf

  push();
  translate(200, 375);
  rotate(-30 - leafMove);
  drawPetal(0, 0);
  pop(); //left leaf

  fill(randomRed, randomGreen, randomBlue);
  drawPetal(200, 200); //still petal in back

  fill(255, 220, 140);
  arc(200, 200, 50, 50, -115, -105);
  arc(200, 200, 50, 50, -95, -85);
  arc(200, 200, 50, 50, -75, -65); //middle of flower

  push();
  translate(200, 200);
  rotate(flowerBloomIn);
  fill(randomRed - 50, randomGreen - 50, randomBlue - 50);
  drawPetal(0, 0);
  pop(); //inner right petal

  push();
  translate(200, 200);
  rotate(-flowerBloomIn);
  fill(randomRed - 50, randomGreen - 50, randomBlue - 50);
  drawPetal(0, 0);
  pop(); //inner left petal

  push();
  translate(200, 200);
  rotate(flowerBloomOut);
  fill(randomRed, randomGreen, randomBlue);
  drawPetal(0, 0);
  pop(); //outer right petal

  push();
  translate(200, 200);
  rotate(-flowerBloomOut);
  fill(randomRed, randomGreen, randomBlue);
  drawPetal(0, 0);
  pop(); //outer left petal
}

function drawPetal(x = 0, y = 0) {
  circle(x, y - 50, 50);
  triangle(x - 20, y - 35, x, y, x + 20, y - 35);
  triangle(x - 20, y - 65, x, y - 100, x + 20, y - 65); //reusable function to draw petal shape for flower
}
