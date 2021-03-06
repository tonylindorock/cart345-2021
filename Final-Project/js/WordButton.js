// a word class can be triggered as a button
class WordButton extends Word {
  constructor(x, y, chars, id, disabled = false) {
    super(x, y, chars);

    this.rotation = 0;

    this.id = id;

    this.isLightSource = true;

    this.rgb = [255, 157, 38];
    this.underline = true;

    this.mouseClicked = false;
    this.isHovered = false;
    this.pressTime = 0;

    this.disabled = disabled;
    this.clickable = true;

    this.func = function() {
      openHpyerText(this.id); // head to next page
    };
  }

  checkForMouse() {
    if (checkForMouseOver(this.globalX + this.width / 2, this.globalY + MAX_NOTE_SIZE / CHAR_HEIGHT / 2, this.width, MAX_NOTE_SIZE / CHAR_HEIGHT) && !this.disabled) {
      //console.log("Hover");
      this.isHovered = true;

      if (hoveredItem != this) {
        hoveredItem = this;
      }

      if (mouseIsPressed && (clickedItem === null || clickedItem === this)) {
        lastClickedItem = clickedItem;
        clickedItem = this;

        this.mouseClicked = true;
        // do once
        if (this.pressTime < 1) {
          this.pressTime += 1;

          if (this.func != null && this.clickable) {
            this.func();
            this.isHovered = false;
          }
        }
      } else {
        this.pressTime = 0;
        this.mouseClicked = false;
      }

      if (this.isHovered) {
        enlargeCursor = true;
        // send size to cursor
        if (!disableCursorAnimation) {
          wordButtonIsHovered(this, this.globalX + this.width / 2, this.globalY + MAX_NOTE_SIZE / CHAR_HEIGHT / 2, this.width);
        }
      }

    } else {
      this.isHovered = false;

      if (hoveredItem === this) {
        enlargeCursor = false;
        hoveredItem = null;
      }

      if (!mouseIsPressed && clickedItem === this) {
        disableCursorAnimation = false;
        lastClickedItem = clickedItem;
        clickedItem = null;
      }
    }
  }

  display() {
    this.checkForMouse();
    super.display();
  }
}
