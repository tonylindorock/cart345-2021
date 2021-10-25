// Notepad with lines
class CharGrid {
  constructor(bgColor, textColor) {
    this.font = "Courier";
    this.bgColor = bgColor;
    this.textColor = textColor;

    this.pointerPosX = 0;
    this.pointerPosY = 0;

    this.lines = [""];
    this.characters = [];
    this.characters[0] = [];

    this.noSpace = false;

    this.MAX_SIZE = MAX_NOTE_SIZE;
    this.MAX_WORD_COUNT = CHAR_WIDTH * CHAR_HEIGHT;

    this.buttons = [];

    this.setup();
  }

  // setup if theme is playful or terminal
  setup() {

  }

  // return the first line
  getFirstLine() {
    return (this.lines[1] === undefined ? this.lines[0] : this.lines[0].replace("\n", " ") + this.lines[1]);
  }

  // add a character
  addChar(character, nextChar = "") {
    let valid = true;
    if (this.pointerPosY >= CHAR_HEIGHT){
      valid = false;
    }
    // if end of the line, add a new line
    if (this.pointerPosX === CHAR_WIDTH) {
      if (this.pointerPosY < CHAR_HEIGHT - 1) {
        this.nextLine();
        if (character === " "){
          valid = false;
        }
        // if no space
      }
    }
    if (valid){
      let nextWord = nextChar.replace('\n', '').replace('#', '');
      if (CHAR_WIDTH - (this.pointerPosX + 1) < nextWord.length){
        this.nextLine();
      }
    }

    if (this.pointerPosX === 0){
      if (character === " "){
        valid = false;
      }
    }

    // if can add a character
    if (valid) {
      this.keyIsTyped = true;
      let newChar = new Character(this.pointerPosX, this.pointerPosY, character);
      newChar.underlineEnabled = this.underlineEnabled;
      newChar.highlightEnabled = this.highlightEnabled;

      this.lines[this.pointerPosY] = this.lines[this.pointerPosY] + character;
      this.characters[this.pointerPosY].push(newChar);
      //console.log(character + " New char added at "+ this.pointerPosX + " " + this.pointerPosY);
      if (character === "\n") {
        if (this.pointerPosY < CHAR_HEIGHT - 1) {
          this.nextLine();
        }
      } else {
        this.pointerPosX += 1;
        // go to next if end of the line after adding a character
        if (this.pointerPosX === CHAR_WIDTH && this.pointerPosY < CHAR_HEIGHT - 1){
          this.nextLine();
        }
      }
    }
  }

  // go to the next line
  nextLine(){
    this.pointerPosY += 1;
    this.pointerPosX = 0;
    this.lines.push("");
    this.characters.push([]);
  }

  // add line of characters
  addLine(line) {
    let words = line.split(" ");
    let nextWord = "";
    for(let i = 0; i < words.length; i++){
      if (i < words.length - 2){
        nextWord = words[i + 1];
      }
      for (let j = 0; j < words[i].length; j++){
        if (words[i].charAt(0) === "#"){
          this.addButton(words[i].replace('#', ''));
          break;
        }else{
          this.addChar(words[i].charAt(j));
        }
      }
      this.addChar(" ", nextWord);
    }
  }


  // add a button
  addButton(word) {
    // if has space in the current line
    if (this.pointerPosX < CHAR_WIDTH - word.length - 1) {

      let globalX = windowWidth / 2 - MAX_NOTE_SIZE / 2 + this.pointerPosX * MAX_NOTE_SIZE / CHAR_WIDTH + (MAX_NOTE_SIZE / CHAR_WIDTH) / 2;
      let globalY = TOP_MENU_HEIGHT / 2 + this.pointerPosY * MAX_NOTE_SIZE / CHAR_HEIGHT + (MAX_NOTE_SIZE / CHAR_HEIGHT) / 2;

      let button = new ButtonText(globalX, globalY, MAX_NOTE_SIZE / CHAR_WIDTH * word.length, MAX_NOTE_SIZE / CHAR_HEIGHT, COLOR_WHITE, false, COLOR_WHITE, word);
      this.buttons.push(button);
      // fill the space;
      for(let i = 0; i < word.length; i++){
        this.addChar(word.charAt(i));
      }
    } else {
      this.nextLine();
    }
  }

  // remove a character
  removeChar() {
    this.keyIsTyped = true;
    // if the pointer is at the begin of a line
    // goes to the previous line end
    if (this.pointerPosX === 0) {
      if (this.pointerPosY > 0) {
        this.pointerPosY -= 1;
        this.lines.pop();
        this.characters.pop();

        let temp = this.lines[this.pointerPosY];
        if (temp[temp.length - 1] === "\n"){
          this.lines[this.pointerPosY] = temp.substring(0, temp.length - 1);
          this.characters[this.pointerPosY].pop();
        }
      }
      this.tempPointPosX = this.pointerPosX;
      this.pointerPosX = this.lines[this.pointerPosY].length;
    } else {
      this.tempPointPosX = this.pointerPosX;
      this.pointerPosX -= 1;
      let temp = this.lines[this.pointerPosY];
      this.lines[this.pointerPosY] = temp.substring(0, temp.length - 1);
      this.characters[this.pointerPosY].pop();
    }
  }

  // combine all lines and display an alert
  copyNote() {
    let text = "";
    for (let i = 0; i < this.lines.length; i++) {
      text += this.lines[i];
    }
    alert(text);
  }

  display() {
    push();
    translate(windowWidth / 2 - this.MAX_SIZE / 2, TOP_MENU_HEIGHT);
    rectMode(CORNER);
    fill(this.bgColor);
    // padding
    stroke(this.bgColor);
    strokeWeight(32);

    // rect(0, 0, this.MAX_SIZE, this.MAX_SIZE);
    // display characters
    noStroke();
    textFont(this.font);
    for (let i = 0; i < this.characters.length; i++) {
      for (let j = 0; j < this.characters[i].length; j++) {
        this.characters[i][j].display(this.bgColor, this.textColor);
      }
    }

    for (let i = 0; i < this.buttons.length; i++){
      this.buttons[i].display();
    }

    pop();
  }
}
