class WordButton extends Word {
  constructor(x, y, chars, disabled = false) {
    super(x, y, chars);

    super.rgb = [255, 157, 38];
    super.underline = true;

    this.mouseClicked = false;
    this.isHovered = false;
    this.pressTime = 0;
    this.disabled = disabled;

    this.func = null;
  }

  checkForHouse() {
    if (checkForMouseOver(this.globalX + this.width/2, this.globalY + MAX_NOTE_SIZE / CHAR_HEIGHT/2, this.width, MAX_NOTE_SIZE / CHAR_HEIGHT) && !this.disabled) {
      //console.log("Hover");
      this.isHovered = true;

      if (mouseIsPressed) {
        this.mouseClicked = true;
        // do once
        if (this.pressTime < 1) {
          this.pressTime += 1;

          if (this.func != null) {
            this.func();
          }
        }
      } else {
        this.pressTime = 0;
        this.mouseClicked = false;
      }

    } else {
      this.isHovered = false;
    }

    if (this.isHovered){
      enlargeCursor = true;
    }else{
      enlargeCursor = false;
    }
  }

  display() {
    this.checkForHouse();
    super.display();
  }
}
