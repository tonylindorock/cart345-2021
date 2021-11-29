// a drop area for draggables
class WordDroppable extends WordButton {
  constructor(x, y, chars, id, disabled = false) {
    super(x, y, chars, id, disabled);

    this.clickable = false;

    this.rgb = [51, 222, 122];

    this.id = id;

    this.dropFrame = 0;
    this.dropPossible = false;

    this.ORIGINAL_TEXT = this.chars;
    this.NO_SPACE = this.ORIGINAL_TEXT.replace(' ', '');

    this.getBlankSpace();
  }

  // complete the blank
  complete() {
    this.chars = this.ORIGINAL_TEXT;
    this.disabled = true;
    // show feeback
    feedbackSystem.showFeedback(this.globalXCenter, this.globalY, 0);

    // check if there's an outcome
    let config = loadConfig(2);
    if (config != null) {
      charGrid.addLine(config);
    }
  }

  // check if there's any dropping action
  detectDrop() {
    // if the clicked item is a draggable, mouse is down, hovering this
    if (clickedItem instanceof WordDraggable && mouseIsPressed && this.isHovered) {
      // open drop window
      this.dropFrame = 1;
    }
    // if drop window is open
    if (this.dropFrame === 1) {
      // if mouse is hovering, drops draggable, mouse isn't down
      if (this.isHovered && lastClickedItem instanceof WordDraggable && !mouseIsPressed) {
        // if the draggable is correct
        if (this.NO_SPACE === lastClickedItem.draggableChars) {
          this.complete();
        // if wrong, show feedback
        } else {
          feedbackSystem.showFeedback(this.globalXCenter, this.globalY, 1);
          console.log("Wrong draggable");
        }
      }
      // if mouse is up, close drop window
      if (!mouseIsPressed) {
        if (this.dropFrame > 0) {
          this.dropFrame -= 1;
        }
      }
    }
  }

  getBlankSpace() {
    let blank = "";
    for (let i = 0; i < this.NO_SPACE.length; i++) {
      if (this.NO_SPACE.charAt(i) === '.') {
        blank += ".";
      } else {
        blank += " ";
      }
    }
    this.chars = blank + " ";
  }

  display() {
    this.detectDrop();
    super.display();
  }
}
