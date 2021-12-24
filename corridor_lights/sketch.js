//-1-fal, -2-üres, -3-csillag
//megcsinálni: csillagok koordinátáit elmenteni, mindig végigmenni az összesen és berajzolni a sárga négyszögeket, nincs fényes üres! kijavítani
//starsban első koordináta i, második koordináta j

let cellSize;
let boardSize;
let actual = [];
let ind;
const puzzleCount = 2
let stars = []
let timer;


function preload() {
  img = loadImage('star.png');
}

function setup() {
  boardSize = min(windowWidth, windowHeight)*0.8;
  cellSize = boardSize/10;
  createCanvas(boardSize, boardSize+100);
  ind = Math.floor(Math.random()*puzzleCount);
  actual = initNewActual(ind);
  stars = [];
  createCheckButton();
  timer = 151;
}

function initNewActual(numb) {
  let a = [];
  let temp = [];
  for (i=0; i<10; i++) {
    for(j=0; j<10; j++) {
      temp.push(puzzles[numb][i][j]);
    }
    a.push(temp);
    temp = [];
  }
  return a;
}


function drawCells() {
  textAlign(CENTER, CENTER);
  textFont('Georgia');
  textSize(40);
  for (i=0; i<10; i++) {
    for (j=0; j<10; j++) {
      if (actual[i][j] >= -1) {
        fill(255,255,255);
        stroke(0);
        rect(j*cellSize, i*cellSize, cellSize, cellSize);
        if (actual[i][j] >= 0) {
          noStroke();
          fill(0,0,0);
          text(actual[i][j], (j+0.5)*cellSize, (i+0.5)*cellSize)
        }
      }
      else {
        if (actual[i][j] === -2) {
          stroke(255,255,255);
          fill(32,32,32);
          rect(j*cellSize, i*cellSize, cellSize, cellSize);
        }
      }
    }
  }
}


function drawHighlight() {
  fill(0, 102, 102, 120)
  if (mouseY <= boardSize && actual[floor(mouseY/cellSize)][floor(mouseX/cellSize)] < -1)
    square(floor(mouseX/cellSize)*cellSize, floor(mouseY/cellSize)*cellSize, cellSize)
}

function createCheckButton() {
  button = createButton("Ellenőrzés");
  button.position(boardSize-120, boardSize+20);
  button.mousePressed(checkSolution);
  button.size(100);
  button.style('background-color', '#3ABDE4');
  button.style('transition-duration', '0.4s');
  button.style('border', 'none')
  button.style('padding', '16px 20px');
  button.style('text-align', 'center');
  button.style('display', 'inline-block');
  button.style('font-size', '12px');
  button.style('cursor', 'pointer');
  button.mouseOver(hover);
  button.mouseOut(notHover);
}

function notHover() {
  button.style('background-color', '#3ABDE4');
}

function hover() {
  button.style('background-color', '#3AE4D5');
}

function checkSolution() {
  if (isCorrect()) {
    noLoop();
    background(255, 210, 135,100);
    textSize(60);
    fill(200, 12, 12, 255);
    text("Nyertél!", boardSize/2, boardSize/2);
    noLoop();
    
  }
  else {
    timer = 100;
  }
}

function isCorrect() {
  for (i=0; i<10; i++) {
    for (j=0; j<10; j++) {
      if (actual[i][j] != solutions[ind][i][j])
        return false;
    }
  }
  return true;
}


function draw() {
  background(220);
  drawCells();
  starStuff();
  drawHighlight();
  if (timer < 151 && timer > 0) {
    noStroke();
    textSize(20);
    fill(200, 12, 12, 255);
    text("Próbálkozz tovább!", boardSize/2-200, boardSize+50);
    timer --;
  }
  else {
    timer = 151;
  }
}