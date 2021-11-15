// a draggable object
class WordDraggable extends Word{
  constructor(x, y, chars, disabled = false) {
    super(x, y, chars);

    super.isLightSource = true;

    super.rgb = [255, 157, 38];
    super.underline = true;

    this.mouseClicked = false;
    this.isHovered = false;
    this.pressTime = 0;
    this.disabled = disabled;

    this.func = null;

    this.isDraggable = false;

    this.offsetX = 0.0;
    this.offsetY = 0.0;
  }

  // check for mouse hovering and clicking
  checkForMouse() {
    if (checkForMouseOver(this.posX, this.posY, this.width, this.height)) {
      this.isHovered = true;

      // push to hovered draggables array
      //updateDraggableItems(this, true);

      if (mouseIsPressed) {
        // if it's the selected item and the object on the top
        if (selectedItem.id != this.id && selectedItem.type != this.type) {
            if (selectedItem.id === -1){
              // remember the selected object
              updateSelectedItem(this.type, this.id);
            }
          }
        // check for remembered draggable and move it with mouse motion
        if (selectedItem.id === this.id && selectedItem.type === this.type) {
          this.mouseClicked = true;
          this.posX = mouseX - this.offsetX;
          this.posY = mouseY - this.offsetY;
        }
      // if mouse button up
      } else {
        this.mouseClicked = false;
        // reset selected item
        if (selectedItem.id === this.id && selectedItem.type === this.type) {
          updateSelectedItem("", -1);
        }
      }

      if (this.isHovered){
        enlargeCursor = true;
        wordButtonIsHovered(this, this.globalX + this.width/2, this.globalY + MAX_NOTE_SIZE / CHAR_HEIGHT/2, this.width);
      }
      
      // so that the draggable won't reposition when selected
      this.offsetX = mouseX - this.posX;
      this.offsetY = mouseY - this.posY;
    // if not hovered
    } else {
      if (this.isHovered) {

      }
      this.isHovered = false;
      //updateDraggableItems(this, false);
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

  display() {
    this.checkForMouse();
    super.display();
  }
}
