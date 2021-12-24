function mouseClicked() {
  if (mouseY <=boardSize) {
    let a = floor(mouseX/cellSize);
    let b = floor(mouseY/cellSize);
    if (actual[b][a] === -2) { //csillagot rakunk le
      stars.push([b,a]);
      actual[b][a] = -3;
    }
    else if (actual[b][a] === -3) {//csillagot szedünk fel
      actual[b][a] = -2
      let ind = isInStars(b,a);
      stars.splice(ind, 1);
    }
  }
}

function isInStars(i,j) {
  for (k=0; k<stars.length; k++) {
    if (stars[k][0]===i && stars[k][1] === j) {
      return k;
    }
  }
}

function spreadLight(i, j) { //i-sor, j-oszlop
  let begin=-5;
  let end=-5;
  let t=j;
  let counter = 0;
  while (begin === -5 && counter <30) {
    if (t===-1 || actual[i][t] >= -1)
      begin = t;
    t --;
    counter++;
  }
  counter = 0;
  t = j;
  while (end === -5 && counter <30) {
    if (t===10 || actual[i][t] >= -1)
      end = t;
    t ++;
    counter++;
  }
  for (k=begin+1; k<end; k++) {
    if (k!=j)
      stroke(0);
      fill(255,255,50);
      rect(k*cellSize, i*cellSize, cellSize, cellSize);
  }
  
  begin = -5;
  end = -5;
  t = i;
  counter = 0
  while (begin === -5 && counter <30) {
    if (t===-1 || actual[t][j] >= -1)
      begin = t;
    t --;
    counter++
  }
  t = i;
  counter = 0;
  while (end === -5 && counter <30) {
    if (t===10 || actual[t][j] >= -1)
      end = t;
    t++;
    counter++;
  }
  for (k=begin+1; k<end; k++) {
    if (k!=i)
      stroke(0);
      fill(255,255,50);
      rect(j*cellSize, k*cellSize, cellSize, cellSize);
  }
}

function starStuff() {
  for (i=0; i<stars.length; i++) {
    spreadLight(stars[i][0], stars[i][1]);
  }
  for (i=0; i<stars.length; i++) {
    stroke(0);
    imageMode(CENTER);
    image(img, (stars[i][1]+0.5)*cellSize,(stars[i][0]+0.5)*cellSize, cellSize*0.9, cellSize*0.9);
  }
}