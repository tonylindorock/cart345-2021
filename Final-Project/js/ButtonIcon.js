// a button with an icon
class ButtonIcon extends Button {
  constructor(posX, posY, width, height, icon, toggle = false) {
    super(posX, posY, width, height, toggle);

    this.icon = icon;
    this.iconSize = height * 0.75;

    this.CORNER_RADIUS = 8;

    this.rotation = 0;
    this.RAND_ROTATE = 12;
  }

  rotateIcon(){
    this.rotation = random(-this.RAND_ROTATE, this.RAND_ROTATE);
  }

  // button style
  normalStyle() {}

  // button style when hovered
  hoverStyle() {
    fill(255, 255, 255, 50);
    if (this.toggleMode && this.toggled) {
      rect(this.posX, this.posY, this.width * 1.2, this.width * 1.2, this.CORNER_RADIUS);
    } else {
      rect(this.posX, this.posY, this.width, this.width, this.CORNER_RADIUS);
    }
  }

  // button style when clicked
  clickStyle() {
    if (this.toggleMode) {
      fill(255, 255, 255, 50);
    } else {
      fill(255, 255, 255, 75);
    }
    rect(this.posX, this.posY, this.width, this.width, this.CORNER_RADIUS);
  }

  display() {
    this.checkForMouse();
    push();
    rectMode(CENTER);
    imageMode(CENTER);
    angleMode(DEGREES);
    if (this.isHovered || (this.toggleMode && this.toggled)) {
      if (this.mouseClicked) {
        this.clickStyle();
      } else {
        this.hoverStyle();
      }
    } else {
      this.normalStyle();
    }
    push();
    translate(this.posX, this.posY);
    rotate(this.rotation);
    image(this.icon, 0,0, this.iconSize, this.iconSize);
    if (this.disabled) {
      image(ICON_DISABLED, 0,0, this.width / 2, this.width / 2);
    }
    pop();
    if (this.showingTooltip) {
      this.showTooltip();
    }
    pop();
  }
}
