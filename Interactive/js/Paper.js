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
    // separate new line
    let noReturn = characters.split('\n');

    for (let i = 0; i < noReturn.length; i++){
      if (i > 0 && noReturn[i] != "" && noReturn[i-1] != ""){
        this.addWordToPaper("");
        this.nextLine();
      }

      this.addWordToPaper(noReturn[i]);

      if (noReturn[i] === ""){
        this.nextLine();
      }
    }
  }

  addWordToPaper(word){
    let x = textWidth(this.lines[this.pointerPosY]);
    let newWord = new Word(x, this.pointerPosY * MAX_NOTE_SIZE/CHAR_HEIGHT,word);
    this.lines[this.pointerPosY] = this.lines[this.pointerPosY] + word;
    this.words[this.pointerPosY].push(newWord);
  }

  // go to the next line
  nextLine(){
    this.pointerPosY += 1;
    this.pointerPosX = 0;
    this.lines.push("");
    this.words.push([]);
  }

  addLine(line){
    let words = line.split(" ");
    let nextWord = "";
    for(let i = 0; i < words.length; i++){
      if (i < words.length - 2){
        nextWord = words[i + 1];
      }
      this.addWord(words[i] + " ", nextWord);
    }
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
