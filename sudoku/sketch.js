let cellSize
let canvasSize
let actual = []
let ind
let inp
let button
let timer;
let puzzlecount = 3;


class element {
  constructor(i, j) {
    this.i = -1;
    this.j = -1;
  }
}

let selected = element


function setup() {
  canvasSize = min(windowWidth, windowHeight)*0.8;
  cellSize = canvasSize/9
  createCanvas(canvasSize, canvasSize+70);
  ind = Math.floor(Math.random()*puzzlecount);
  actual = initNewActual(ind);
  createCheckButton();
  timer = 151;
  
}

function createCheckButton() {
  button = createButton("Ellenőrzés");
  button.position(canvasSize-120, canvasSize+20);
  button.mousePressed(checkSolution);
  button.size(100);
  button.style('background-color', '#8E00D1');
  button.style('transition-duration', '0.4s');
  button.style('border', 'none')
  button.style('padding', '12px 16px');
  button.style('text-align', 'center');
  button.style('display', 'inline-block');
  button.style('font-size', '12px');
  button.style('cursor', 'pointer');
  button.mouseOver(hover);
  button.mouseOut(notHover);
}

function notHover() {
  button.style('background-color', '#C100D1');
}

function hover() {
  button.style('background-color', '#8E00D1');
}

function checkSolution() {
  if (isCorrect()) {
    noLoop();
    background(255, 210, 135,100);
    textSize(60);
    fill(200, 12, 12, 255);
    text("Nyertél!", canvasSize/2, canvasSize/2);
    console.log("Nyertél!");
    noLoop();
    
  }
  else {
    console.log("Próbálkozz tovább!");
    timer = 100;
  }
}

function isCorrect() {
  for (i=0; i<9; i++) {
    for (j=0; j<9; j++) {
      if (actual[i][j] != solutions[ind][i][j])
        return false;
    }
  }
  return true;
}

function initNewActual(numb) {
  let a = [];
  let temp = [];
  for (i=0; i<9; i++) {
    for(j=0; j<9; j++) {
      temp.push(puzzles[numb][i][j]);
    }
    a.push(temp);
    temp = [];
  }
  return a;
}

function drawCells() {
  fill(255,255,255);
  stroke(0);
  strokeWeight(1);
  for (i=0; i<9; i++) {
    for (j=0; j<9; j++) {
        rect(i*cellSize, j*cellSize, cellSize-2, cellSize-2);
    }
  }
  strokeWeight(4);
  line(cellSize*3, 0, cellSize*3, canvasSize);
  line(cellSize*6, 0, cellSize*6, canvasSize);
  line(0, cellSize*3, canvasSize, cellSize*3);
  line(0, cellSize*6, canvasSize, cellSize*6);
  
  
}

function fillCells(matrix) {
  noStroke();
  textAlign(CENTER, CENTER);
  textFont('Georgia');
  textSize(40);
  for (i=0; i<9; i++) {
    for (j=0; j<9; j++) {
      if (matrix[i][j] != 0) {
        if (puzzles[ind][i][j] === 0) {
          fill(150,150,150);
        }
        else
          fill(0);
        text(matrix[i][j], (j+0.5)*cellSize, (i+0.5)*cellSize);
      }
    }
  }
}

function drawHighlight() {
  if (selected.i !=-1 && selected.j != -1) {
    fill(150, 115, 255, 180)
    rect(selected.j*cellSize, selected.i*cellSize, cellSize, cellSize);
  }
  strokeWeight(3);
  fill(150, 115, 255, 120)
  if (mouseY <= canvasSize)
    square(floor(mouseX/cellSize)*cellSize, floor(mouseY/cellSize)*cellSize, cellSize)
}

function mouseClicked() {
  if (mouseY <=canvasSize) {
    let a = floor(mouseX/cellSize);
    let b = floor(mouseY/cellSize);
    if (puzzles[ind][b][a] == 0) {
      console.log("Módosítható");
      if (b===selected.i && a===selected.j) {
        selected.i=-1;
        selected.j=-1;
        removeElements();
        createCheckButton();
      }
      else {
        selected.i = b;
        selected.j = a;
        inp = createInput('');
        inp.position(canvasSize/2-50,canvasSize+30);
        inp.size(100);
      }
    }
  }
}

function keyPressed() {
  if(keyCode == ENTER) {
    if (inp.value() <10 & inp.value()>0) {
      console.log(inp.value());
      removeElements();
      createCheckButton();
      actual[selected.i][selected.j] = inp.value();
    }
    else {
      console.log("Rossz input!");
    }
  }
}

function draw() {
  background(220);
  drawCells();
  fillCells(actual);
  drawHighlight();
  if (timer < 151 && timer > 0) {
    noStroke();
    textSize(20);
    fill(200, 12, 12, 255);
    text("Próbálkozz tovább!", canvasSize/2-200, canvasSize+30);
    timer --;
  }
  else {
    timer = 151;
  }
}
