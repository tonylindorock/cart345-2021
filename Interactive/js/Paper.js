// Paper with lines
class Paper {
  constructor(bgColor, textColor) {
    this.font = "Courier";
    this.bgColor = bgColor;
    this.textColor = textColor;

    this.pointerPosX = 0;
    this.pointerPosY = 0;

    this.lines = [""];
    this.words = [];
    this.words[0] = [];

    this.noSpace = false;

    this.MAX_SIZE = MAX_NOTE_SIZE;

    this.buttons = [];

  }

  // add a word
  addWord(characters, nextWord = "") {
    let newWord = new Word(0, 0, characters);

    this.lines[this.pointerPosY] = this.lines[this.pointerPosY] + characters;
    this.words[this.pointerPosY].push(newWord);
  }

  addLine(){

  }

  display() {
    push();
    translate(windowWidth / 2 - this.MAX_SIZE / 2, TOP_MENU_HEIGHT);
    rectMode(CORNER);
    fill(this.bgColor);
    // padding
    stroke(this.bgColor);
    strokeWeight(32);

    rect(0, 0, this.MAX_SIZE, this.MAX_SIZE);
    // display characters
    noStroke();
    textFont(this.font);
    for (let i = 0; i < this.words.length; i++) {
      for (let j = 0; j < this.words[i].length; j++) {
        this.words[i][j].display(this.bgColor, this.textColor);
      }
    }

    for (let i = 0; i < this.buttons.length; i++){
      this.buttons[i].display();
    }

    pop();
  }
}
