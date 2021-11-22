class Line {
  constructor(x, y, x1, y1) {
    this.x = x;
    this.y = y;
    this.x1 = x1;
    this.y1 = y1;

    this.color = color;
    this.width = 4;
  }

  update() {}

  display() {
    push();
    strokeWeight(this.width);
    stroke(255, 255, 255, 150);
    strokeCap(ROUND);
    line(this.x, this.y, this.x1, this.y1);
    pop();
  }
}
