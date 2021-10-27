// Word obj for display a single word
class Word {
  constructor(x, y, chars) {
    this.chars = chars;
    this.underline = false;
    this.highlight = false;

    this.opacity = 255;

    this.underlineColor = COLOR_BLACK;
    this.highlightColor = HIGHLIGHT_COLORS[0];

    this.button = null;

    this.posX = x;
    this.posY = y;

    this.width = textWidth(chars);

    this.FONT_SIZE = 18;
    this.fontSize = this.FONT_SIZE;
    this.UNDERLINE_WEIGHT = 3;

    this.underlineEnabled = false;
    this.highlightEnabled = false;

    this.pressTime = 0;

    this.globalX = windowWidth / 2 - MAX_NOTE_SIZE / 2 + this.posX * MAX_NOTE_SIZE / CHAR_WIDTH + (MAX_NOTE_SIZE / CHAR_WIDTH) / 2;
    this.globalY = TOP_MENU_HEIGHT / 2 + this.posY * MAX_NOTE_SIZE / CHAR_HEIGHT + (MAX_NOTE_SIZE / CHAR_HEIGHT) / 2;
  }

  display(bgColor, textColor) {
    push();
    translate(this.posX, this.posY);
    rectMode(CORNER);

    if (this.button != null) {
      this.button.display();
    }

    if (this.chars === ""){
      this.width = textWidth(" ");
    }else{
      this.width = textWidth(this.chars);
    }

    push();
    stroke(200);
    strokeWeight(1);
    rect(0, 0, this.width, MAX_NOTE_SIZE / CHAR_HEIGHT);
    pop();


    //underline
    if (this.underline) {
      fill(this.underlineColor);
      rect(0, MAX_NOTE_SIZE / CHAR_HEIGHT - this.UNDERLINE_WEIGHT / 2, MAX_NOTE_SIZE / CHAR_WIDTH, this.UNDERLINE_WEIGHT);
    }

    //this.distToMouse();

    fill(255, 255, 255, this.opacity);
    textAlign(LEFT, CENTER);
    text(this.chars, MAX_NOTE_SIZE / CHAR_WIDTH / 2, MAX_NOTE_SIZE / CHAR_HEIGHT / 2);
    pop();
  }
}
