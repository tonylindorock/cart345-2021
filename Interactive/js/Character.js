// character obj for display a single char
class Character {
  constructor(x, y, char) {
    this.char = char;
    this.underline = false;
    this.highlight = false;

    this.opacity = 255;

    this.underlineColor = COLOR_BLACK;
    this.highlightColor = HIGHLIGHT_COLORS[0];

    this.button = null;

    this.posX = x;
    this.posY = y;
    this.size = 1;
    this.FONT_SIZE = 18;
    this.fontSize = this.FONT_SIZE;
    this.UNDERLINE_WEIGHT = 3;

    this.underlineEnabled = false;
    this.highlightEnabled = false;

    this.pressTime = 0;

    this.animationDone = true;
    this.animationId = 0;

    this.globalX = windowWidth / 2 - MAX_NOTE_SIZE / 2 + this.posX * MAX_NOTE_SIZE / CHAR_WIDTH + (MAX_NOTE_SIZE / CHAR_WIDTH) / 2;
    this.globalY = TOP_MENU_HEIGHT / 2 + this.posY * MAX_NOTE_SIZE / CHAR_HEIGHT + (MAX_NOTE_SIZE / CHAR_HEIGHT) / 2;

  }
  // spawn a button in the position of a checkbox
  setupButton() {
    this.button = new ButtonText(this.globalX, this.globalY, MAX_NOTE_SIZE / CHAR_WIDTH, MAX_NOTE_SIZE / CHAR_HEIGHT, COLOR_WHITE, false, COLOR_BLACK, " ");
    var thisObject = this;
    this.button.connectFunc(function() {
      if (thisObject.char === " ") {
        thisObject.char = "X";
      } else {
        thisObject.char = " ";
      }
      if (charGrid.theme === 1){
        SFX_BEEP.play();
      }
    });
  }

  distToMouse(){
    this.opacity = map(dist(this.globalX, this.globalY, mouseX, mouseY),FLASH_RADIUS, 32, 0 ,255);
  }

  display(bgColor, textColor) {
    push();
    translate(this.posX * MAX_NOTE_SIZE / CHAR_WIDTH, this.posY * MAX_NOTE_SIZE / CHAR_HEIGHT);
    rectMode(CORNER);

    if (this.button != null) {
      this.button.display();
    }

    // highlight
    if (this.highlight) {
      fill(this.highlightColor);
      rect(0, this.UNDERLINE_WEIGHT / 2, MAX_NOTE_SIZE / CHAR_WIDTH, MAX_NOTE_SIZE / CHAR_HEIGHT - this.UNDERLINE_WEIGHT);
    } else {
      push();
      fill(255, 255, 255, 0);


      stroke(255);
      strokeWeight(1);


      rect(0, 0, MAX_NOTE_SIZE / CHAR_WIDTH, MAX_NOTE_SIZE / CHAR_HEIGHT);
      pop();
    }
    //underline
    if (this.underline) {
      fill(this.underlineColor);
      rect(0, MAX_NOTE_SIZE / CHAR_HEIGHT - this.UNDERLINE_WEIGHT / 2, MAX_NOTE_SIZE / CHAR_WIDTH, this.UNDERLINE_WEIGHT);
    }

    //this.distToMouse();

    fill(255, 255, 255, this.opacity);
    textAlign(CENTER, CENTER);
    textSize(this.fontSize);
    text(this.char, MAX_NOTE_SIZE / CHAR_WIDTH / 2, MAX_NOTE_SIZE / CHAR_HEIGHT / 2);
    pop();
  }
}
