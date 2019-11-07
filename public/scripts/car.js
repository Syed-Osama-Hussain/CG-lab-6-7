const canvas = document.querySelector("#glcanvas");
const context = canvas.getContext("2d");
const elm = document.querySelector("#elm");

class car {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    const img = new Image();
    img.src = "images/car.jpg"
    img.onload = () => {
      this.img = img;
    }

  }

  lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
  }
}

car.prototype.advancePosition = function (dx, dy) {
  this.x = this.lerp(this.x, this.x + dx, 1);
  this.y = this.lerp(this.y, this.y + dy, 1);
}
