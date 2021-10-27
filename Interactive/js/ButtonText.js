// a button with text
class ButtonText extends Button {
  constructor(posX, posY, width, height, bgColor, inRect, textColor, text) {
    super(posX, posY, width, height);

    this.bgColor = bgColor;
    this.inRect = inRect;
    this.textColor = textColor;
    this.text = text;

    this.CORNER_RADIUS = 8;

    this.cursorChangeEnabled = true;
  }

  // button style
  normalStyle() {
    if (this.inRect) {
      fill(this.bgColor);
      rect(this.posX, this.posY, this.width, this.height, this.CORNER_RADIUS);
      fill(this.textColor);
    } else {
      fill(this.textColor);
    }
  }

  // button style when hovered
  hoverStyle() {
    fill(COLOR_ORANGE);
  }

  // button style when clicked
  clickStyle() {
    if (this.inRect) {
      fill(this.bgColor);
      rect(this.posX, this.posY, this.width, this.height, this.CORNER_RADIUS);
      fill(255, 255, 255, 75);
      rect(this.posX, this.posY, this.width, this.height, this.CORNER_RADIUS);
      fill(this.textColor);
    } else {
      fill(this.textColor);
    }
  }

  display() {
    this.checkForMouse();
    push();
    rectMode(CENTER);
    noStroke();
    textAlign(CENTER, CENTER);
    fill("#252525");
    rect(this.posX, this.posY, this.width, this.height);
    if (this.isHovered) {
      this.hoverStyle();
      if (this.mouseClicked) {
        this.clickStyle();
      }
    } else {
      this.normalStyle();
    }

    text(this.text, this.posX, this.posY);
    pop();
  }
}
