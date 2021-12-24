//tibi: wasd, csaba: nyilak, players: 0-Tibi, 1-Csaba, insult <0 Tibi, >0 Csaba

let boardSize;
let shoottibi;
let shootcsaba;
const playerSize = 60
const cannonSize = 30
const bulletSize = 10
const insultCount = 2;
let say;
let insult=0;

class Player {
  constructor (x, y, dir, left, right, forward, backwards, points, name) {
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.left = left;
    this.right = right;
    this.forward = forward;
    this.backwards = backwards;
    this.points = points;
    this.name = name;
  }
}

class Bullet {
  constructor (x,y,dir, targetIndex) {
    this.x =x;
    this.y=y;
    this.dir = dir;
    this.targetIndex = targetIndex;
  }
}

let b;
let bullets = [];
let players = [];
let tibi
let csaba

function preload() {
  imgtibi=loadImage("tibi.png");
  imgcsaba = loadImage("csaba.png");
}

function setup() {
  boardSize = min(windowWidth, windowHeight)*0.8;
  createCanvas(boardSize, boardSize+100);
  tibi = new Player(playerSize/2+10, boardSize/2, 0, 65, 68, 87, 83, 0, "Tibi");
  csaba = new Player(boardSize-playerSize/2-10, boardSize/2, 180, 37, 39, 38, 40, 0, "Csaba");
  rectMode(CENTER);
  angleMode(DEGREES);
  shoottibi = false;
  shootcsaba = false;
  players.push(tibi);
  players.push(csaba);
  frameRate(50);
  textAlign(CENTER, CENTER);
  imageMode(CENTER);

}



function movePlayer(item) {
    if (keyIsDown(item.left))
      item.dir -=2;
    if (keyIsDown(item.right))
      item.dir +=2;
    if (keyIsDown(item.forward) && (item.x+cos(item.dir)*2)<boardSize-playerSize/2 && (item.x+cos(item.dir)*2)>playerSize/2 && (item.y+sin(item.dir)*2)>playerSize/2 && (item.y+sin(item.dir)*2)<boardSize-playerSize/2) {
      item.x += cos(item.dir)*2;
      item.y += sin(item.dir)*2;
    }
    if (keyIsDown(item.backwards)) {
      item.x -= cos(item.dir)*2;
      item.y -= sin(item.dir)*2;
    }  
}

function checkIfShooting() {
  if (keyIsDown(32) && !shootcsaba)/*space*/ {
    shootcsaba = true;
    b = new Bullet(csaba.x+cos(csaba.dir)*(playerSize/2+cannonSize+bulletSize/2), csaba.y+sin(csaba.dir)*(playerSize/2+cannonSize+bulletSize/2), csaba.dir, 0);
    bullets.push(b);
  }
  if (keyIsDown(70) && !shoottibi)/*F*/ {
    shoottibi = true;
    b = new Bullet(tibi.x+cos(tibi.dir)*(playerSize/2+cannonSize+bulletSize/2), tibi.y+sin(tibi.dir)*(playerSize/2+cannonSize+bulletSize/2), tibi.dir, 1);
    bullets.push(b);
  }
}

function keyReleased() {
  if (keyCode === 70)
    shoottibi = false;
  if (keyCode === 32)
    shootcsaba = false;
}

function moveBullets() {
  for (i=0; i<bullets.length; i++) {
    bullets[i].x += cos(bullets[i].dir)*6;
    bullets[i].y += sin(bullets[i].dir)*6;
    if (bullets[i].x < 0 || bullets[i].x > boardSize || bullets[i].y > boardSize || bullets[i].y < 0)
      bullets.splice(i, 1);
    else if (abs(bullets[i].x-players[bullets[i].targetIndex].x)<playerSize/2 && abs(bullets[i].y-players[bullets[i].targetIndex].y) <playerSize/2 ) {
      players[(bullets[i].targetIndex+1) % 2].points++;
      say = insults[(bullets[i].targetIndex+1) % 2][Math.floor(Math.random()*insultCount)];
      if (bullets[i].targetIndex ===0)
        insult = 100;
      else
        insult = -100;
      bullets.splice(i,1);
    }
  }
}

function drawPlayerStuff() {
  stroke(0);
  fill(40, 205,0);
  circle(tibi.x, tibi.y, playerSize);
  image(imgtibi, tibi.x, tibi.y, playerSize*0.9, playerSize*0.9);
  circle(tibi.x+cos(tibi.dir)*(playerSize/2+cannonSize/2), tibi.y+sin(tibi.dir)*(playerSize/2+cannonSize/2), cannonSize);
  fill(110, 10, 180);
  circle(csaba.x, csaba.y, playerSize);
  image(imgcsaba, csaba.x, csaba.y, playerSize*0.9, playerSize*0.9);
  circle(csaba.x+cos(csaba.dir)*(playerSize/2+cannonSize/2), csaba.y+sin(csaba.dir)*(playerSize/2+cannonSize/2), cannonSize);
  noStroke();
  textSize(15);
  fill(40, 205,0);
  text(`${tibi.name} pontszáma: ${tibi.points}`, 80 , boardSize+70);
  fill(110, 10, 180);
  text(`${csaba.name} pontszáma: ${csaba.points}`, boardSize-80 , boardSize+70);
}

function checkForWinner() {
  if (tibi.points >=20)
    endGame(tibi);
  else if (csaba.points>=20)
    endGame(csaba);
}

function endGame(p) {
  noLoop();
  background(255, 178, 102);
  noStroke()
  fill(0,0,0)
  textSize(30)
  textAlign(CENTER, CENTER)
  text(`Játék vége! A nyertes: ${p.name}`, width/2, height/2);
  textSize(15);
  fill(40, 205,0);
  text(`${tibi.name} pontszáma: ${tibi.points}`, 100 , boardSize-40);
  fill(110, 10, 180);
  text(`${csaba.name} pontszáma: ${csaba.points}`, boardSize-150 , boardSize-40);
}

function sayInsult() {
  if (insult > 0) {
    stroke(0);
    fill(0);
    ellipse(boardSize/2, boardSize+50, 251, 71);
    fill(255);
    triangle(boardSize/2+150, boardSize+60, boardSize/2, boardSize+30, boardSize/2, boardSize+70);
    noStroke();
    ellipse(boardSize/2, boardSize+50, 250, 70);
    textAlign(CENTER, CENTER);
    fill(0)
    text(say, boardSize/2, boardSize+50);
    insult --;
  }
  else if (insult < 0) {
    stroke(0);
    fill(0);
    ellipse(boardSize/2, boardSize+50, 251, 71);
    fill(255);
    triangle(boardSize/2-150, boardSize+60, boardSize/2, boardSize+30, boardSize/2, boardSize+70);
    noStroke();
    ellipse(boardSize/2, boardSize+50, 250, 70);
    textAlign(CENTER, CENTER);
    fill(0)
    text(say, boardSize/2, boardSize+50);
    insult ++;
  }
}

function draw() {
  background(153,255,255);
  noStroke()
  fill(224,224,224);
  rect(boardSize/2,boardSize+50,boardSize, 100);
  for (i=0; i<bullets.length; i++) {
    fill(0);
    circle(bullets[i].x, bullets[i].y, 10);
  }
  players.forEach(movePlayer);
  drawPlayerStuff();
  checkIfShooting();
  moveBullets();
  sayInsult();
  checkForWinner();
}
