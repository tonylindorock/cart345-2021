// a draggable object
class Draggable {
  constructor(posX, posY, width, height, type, id) {
    this.posX = posX;
    this.posY = posY;

    this.width = width;
    this.height = height;

    this.type = type;
    this.id = id;

    this.isHovered = false;
    this.mouseClicked = false;

    this.offsetX = 0.0;
    this.offsetY = 0.0;
  }
  // check for mouse hovering and clicking
  checkForMouse() {
    if (checkForMouseOver(this.posX, this.posY, this.width, this.height)) {
      this.isHovered = true;

      if (mouseIsPressed) {
        // check for remembered draggable and move it with mouse motion
        if (selectedItem.id === this.id && selectedItem.type === this.type) {
          this.mouseClicked = true;
          this.posX = mouseX - this.offsetX;
          this.posY = mouseY - this.offsetY;
        }
      // if mouse button up
      } else {
        this.mouseClicked = false;
      }
      // so that the draggable won't reposition when selected
      this.offsetX = mouseX - this.posX;
      this.offsetY = mouseY - this.posY;
    // if not hovered
    } else {
      this.isHovered = false;
    }
  }
  // forget this draggable
  forget() {
    this.isHovered = false;
    this.mouseClicked = false;
  }

  checkForDrag() {
    if (this.mouseClicked && selectedItem.id === this.id && selectedItem.type === this.type) {
      this.posX = mouseX - this.offsetX;
      this.posY = mouseY - this.offsetY;
    }
  }

  display() {}
}
