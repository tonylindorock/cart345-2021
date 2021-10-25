// a button displays and controls color
class ButtonColor extends Button {
  constructor(posX, posY, width, colorProfile, colorIndex, icon = null) {
    super(posX, posY, width, width);

    this.icon = icon;
    this.iconSize = width * 0.75;

    this.colorProfile = colorProfile;
    this.colorIndex = colorIndex;
  }

  // button style
  normalStyle() {
    this.drawStroke();
    this.fillWithoutAlpha();
    ellipse(this.posX, this.posY, this.width);
  }

  // button style when hovered
  hoverStyle() {
    fill(255, 255, 255, 50);
    ellipse(this.posX, this.posY, this.width * 1.4);
    this.drawStroke();
    this.fillWithoutAlpha();
    ellipse(this.posX, this.posY, this.width);
  }

  // button style when clicked
  clickStyle() {
    fill(255, 255, 255, 75);
    ellipse(this.posX, this.posY, this.width * 1.4);
    this.drawStroke();
    this.fillWithoutAlpha();
    ellipse(this.posX, this.posY, this.width);
  }

  fillWithoutAlpha() {
    let color = this.colorProfile[this.colorIndex];
    if (color.length === 9) {
      color = color.substring(0, 7);
    }
    fill(color);
  }

  drawStroke() {
    stroke(COLOR_WHITE);
    strokeWeight(3);
  }

  display() {
    this.checkForMouse();
    push();
    rectMode(CENTER);
    ellipseMode(CENTER);
    imageMode(CENTER);
    if (this.isHovered) {
      if (this.mouseClicked) {
        this.clickStyle();
      } else {
        this.hoverStyle();
      }
    } else {
      this.normalStyle();
    }
    noStroke();
    if (this.icon != null) {
      image(this.icon, this.posX, this.posY, this.iconSize, this.iconSize);
    }
    if (this.disabled) {
      push();
      translate(this.posX, this.posY);
      angleMode(DEGREES);
      stroke(COLOR_BLACK);
      strokeWeight(2.5);
      fill(COLOR_WHITE);
      rotate(-45);
      rect(0, 0, this.width * 1.5, 5, 32);
      pop();
    }
    pop();
  }
}
