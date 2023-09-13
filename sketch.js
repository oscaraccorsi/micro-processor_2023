let baseUrlPictures = " https://oscaraccorsi.github.io/LoFi/";
let baseURLImage = "https://oscaraccorsi.github.io/pictures/";

let baseURLSound = 'https://oscaraccorsi.github.io/mp3_files/';
let soundList = ['beep.mp3',
                'tic.mp3'];
let beep;

let img;
let palette = [];
let clr;
let pictureList = ['processor01.png', 
                   'processor02.png', 
                   'processor03.png', 
                   'processor04.png', 
                   'processor05.png',  
                   'processor06.png', 
                   'processor07.png',
                   'processor08.png',
                   'processor09.png', 
                   'processor10.png',
                   'processor11.png',
                   'processor12.png', 
                   'processor13.png',
                   'processor14.png',
                   'processor15.png',
                   'processor16.png',
                   'processor17.png',
                   'processor18.png',
                   'processor19.png',
                   'processor20.png',
                   'processor21.png',
                   'processor22.png',
                   'processor23.png',
                   'processor24.png',
                   'processor25.png',
                   'processor26.png']

let speed = 100;
let halfWidth;
let halfHeight;
let x, y, x1, y1;
let counter = 0;
let counterChoice;
let counterArray = [15, 25, 40, 65, 115, 180];

let dimRect = [13, 21, 34, 55, 89, 144];

let timeChangeChoice;
let timeChangeArray = [5, 10, 15, 25, 40, 65];

let timeChoice;
let timeArray = [30, 60, 90, 150];

//---------------------------------------------------------preload
function preload() {
  let h = round(random(25));
  img = loadImage(baseUrlPictures + pictureList[h]);
  beep = loadSound(baseURLSound + soundList[0]);
  bit = loadSound(baseURLSound + soundList[1]);
}

function setup() {
  let canvas =  createCanvas(1920, 1920);
  canvas.position(windowWidth/2-width/2, windowHeight/2-height/2);
  //background(20);
  rectMode(CENTER);
  halfWidth = width/2;
  halfHeight = height/2;
  x = random(halfWidth-50, halfWidth+50);
  y = random(halfHeight-50, halfHeight+50);
  x1 = 0;
  y1 = height-30;

  frameRate(30);
  //-------------------------------------counter
  counterChoice = random(counterArray);
  timeChoice = random(timeArray);
  timeChangeChoice = random(timeChangeArray);

  setInterval(saveGlobal, 1000*timeChoice);
  setInterval(textTimeOut, 1000*timeChangeChoice);
  console.log(counterChoice, timeChangeChoice, timeChoice);
  
  
  //------------------------------------------------palette
  img.resize(8, 0);
  img.loadPixels();
 
  for (let i = 0; i < img.pixels.length; i += 4) {
    let r = img.pixels[i];
    let g = img.pixels[i + 1];
    let b = img.pixels[i + 2];
    let alpha = round(random(100, 200));
    let c = color(r, g, b, alpha);
    palette.push(c);
    fill(c);
    square(x1, y1, width/150);
    x1 += width/150;
  }
  clr = random(palette);

  //---------------------------------------rev
  reverb = new p5.Reverb();
  reverb.process(beep, 6, 0, false);
  reverb.process(bit, 2, 0, false);
  beep.play();
  beep.setVolume(0, 0.1, 0.1, 0, 0);
  bit.setVolume(0.05, 0.5);
  
}
function draw() {
  //background(20);
  frameRate(30);
  lineSquare(); 
}
//-----------------------------------lineSquare
function lineSquare() {
    counter++;
    strokeWeight(2);
    stroke(clr);

    //-----------------------------shape
    beginShape();
    noFill();
    vertex(x, y);
      if(random(0, 100) < 50) {
         x += random(-speed, speed);
      }
      else{
        y += random(-speed, speed);
      }
      
      if(x < 150 || x > width-150) {
        x = halfWidth;
      }
      if(y < 150 || y > height-150) {
        y = halfHeight;
      }
       vertex(x, y);
  endShape();

//---------------------------------------to rectRnd
  rectRnd();
  noStroke();
  fill(clr);
  circle(x, y, 6);

//----------------------------------------rectRnd  
function rectRnd() {
  if(counter >= counterChoice ) {
    counter = 0;
      noStroke();
     fill(clr);
     let rectW = random(dimRect);
     let rectH = random(dimRect);
     let productWH = (rectW*rectH)/5000;
     
     rect(x, y, rectW, rectH);
     bit.rate(random(0, 2));
     bit.pan(random(-1, 1));
     bit.play();
     
     }
    else{
      circle(x, y, 6);
    }
  } 
  
}
//-------------------------------------changeClr
function changeClr() {
  //save();
  clr = random(palette);
  beep.play(0, 1, 0.5, 0, 0.07);
  timeChangeChoice = random(timeChangeArray);
  console.log(timeChangeChoice);
  counterChoice = random(counterArray);
  console.log(counterChoice);
}

//----------------------------------reLoad
function reloadPage() {
  window.location.reload();
}

function keyPressed() {
  reloadPage();
}

function mousePressed() {
  save();
}

function saveGlobal() {
  textSize(50);
  fill(100);
  text(timeChoice + 'sec', width-width/10, height-25);
  save();
  frameRate(1);
  setTimeout(reloadPage, 1000);
}

function textTimeOut() {
  frameRate(1);
  setTimeout(changeClr, 1000);  
}