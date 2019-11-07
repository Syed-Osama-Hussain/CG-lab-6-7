const cultus = new car(20, 20);
//copy of car
const copy = new car(20, 20);
let animate = true;
let animateID;
let dx = 1;
//0.91;
let dy = 1;
//0.4;
//flag for x axis
let flagx = "none";
//flag for y axis
let flagy = "none"

function start() {
  animate = true;
  animateID = window.requestAnimationFrame(mainLoop);
}

function stop() {
  animateID && window.cancelAnimationFrame(mainLoop);
  animate = false;
}

function update() {
  cultus.advancePosition(dx, dy);
  //advance position of copy car
  copy.advancePosition(dx, dy);
}

function clearCanvas(cvs) {
  const ctx = cvs.getContext("2d");
  ctx.save();
  ctx.globalCompositeOperation = "copy";
  ctx.strokeStyle = "transparent";
  ctx.beginPath();
  ctx.lineTo(0, 0);
  ctx.stroke();
  ctx.restore();

}

function render() {
  context.beginPath();
  clearCanvas(canvas);
  context.drawImage(cultus.img, cultus.x, (canvas.height - cultus.img.height));
  context.closePath();

  let A = canvas.width / cultus.x;
  let B = canvas.height / cultus.y;
  let C = -cultus.img.width;
  let D = (canvas.height - cultus.img.height) - B * cultus.img.height;

  //set flags 
  if ((Math.floor(copy.x) % (canvas.width - cultus.img.width) == 0)) {
    flagx = flagx === "right" ? "left" : "right"
  }

  if ((Math.floor(copy.y) % (canvas.height - cultus.img.height) == 0)) {
    flagy = flagy === "bottom" ? "top" : "bottom"
  }


  if (cultus.x > (canvas.width - cultus.img.width)) {
    //collided from right
    if (flagx == "right")
      context.translate(-1, 0);

    //collided from left
    if (flagx == "left")
      context.translate(1, 0);

    cultus.x = A * cultus.x + C;
  }

  if (cultus.y > (canvas.height - cultus.img.height)) {
    if (flagy == "bottom")
      context.translate(0, -1);

    if (flagy == "top")
      context.translate(0, 1);

    cultus.y = B * cultus.y + D;
  }
}

function mainLoop() {

  if (animate) animateID = window.requestAnimationFrame(mainLoop);
  render();
  update();
}