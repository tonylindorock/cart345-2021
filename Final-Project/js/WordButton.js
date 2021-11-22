class WordButton extends Word {
  constructor(x, y, chars, disabled = false) {
    super(x, y, chars);

    this.isLightSource = true;

    this.rgb = [255, 157, 38];
    this.underline = true;

    this.mouseClicked = false;
    this.isHovered = false;
    this.pressTime = 0;

    this.disabled = disabled;
    this.clickable = true;

    this.func = function(){
      charGrid.addLine("\nYou clicked the button.");
    };
  }

  checkForMouse() {
    if (checkForMouseOver(this.globalX + this.width/2, this.globalY + MAX_NOTE_SIZE / CHAR_HEIGHT/2, this.width, MAX_NOTE_SIZE / CHAR_HEIGHT) && !this.disabled) {
      //console.log("Hover");
      this.isHovered = true;
      if (hoveredItem != this){
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
          }
        }
      } else {
        this.pressTime = 0;
        this.mouseClicked = false;
      }

      if (this.isHovered){
        enlargeCursor = true;
        if (!disableCursorAnimation){
          wordButtonIsHovered(this, this.globalX + this.width/2, this.globalY + MAX_NOTE_SIZE / CHAR_HEIGHT/2, this.width);
        }
      }

    } else {
      this.isHovered = false;

      if (hoveredItem === this){
        enlargeCursor = false;
        hoveredItem = null;
      }

      if (!mouseIsPressed && clickedItem === this){
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
