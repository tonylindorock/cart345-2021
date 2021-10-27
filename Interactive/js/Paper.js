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
      // add a new word
      this.addWordToPaper(noReturn[i]);
      // run each time when there is a gap between element
      if (i + 1 <= noReturn.length - 1){
        this.addWordToPaper("");
        this.nextLine();
      }
    }
  }

  // check for space in a line
  hasSpace(width){
    let x = textWidth(this.lines[this.pointerPosY]);
    return (MAX_NOTE_SIZE - x > width);
  }

  addWordToPaper(word){
    // if no space, add a new line
    if (!this.hasSpace(textWidth(word))){
      this.nextLine();
    }
    // get the current width of text
    let x = textWidth(this.lines[this.pointerPosY]);
    // create a Word object

    let newWord;
    if (word.charAt(0) === '#'){
      word = word.replace('#', '');
      console.log("Add a button");
      newWord = new WordButton(x, this.pointerPosY * MAX_NOTE_SIZE/CHAR_HEIGHT,word);
    }else{
      newWord = new Word(x, this.pointerPosY * MAX_NOTE_SIZE/CHAR_HEIGHT,word);
    }
    // update
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
        this.words[i][j].display(255, 255, 255);
      }
    }

    pop();
  }
}
