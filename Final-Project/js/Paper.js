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
      switch (word.charAt(1)){
        // draggable
        case ">":
          word = word.replace('#>', '');
          console.log("Add a draggable");
          newWord = new WordDraggable(x, this.pointerPosY * MAX_NOTE_SIZE/CHAR_HEIGHT,word, 0);
          break;
        // droppable
        case "<":
          word = word.replace('#<', '');
          console.log("Add a droppable");
          newWord = new WordDroppable(x, this.pointerPosY * MAX_NOTE_SIZE/CHAR_HEIGHT,word, 0);
          break;
        // linkable
        case "^":
          word = word.replace('#^', '');
          console.log("Add a linkable");
          newWord = new WordLinkable(x, this.pointerPosY * MAX_NOTE_SIZE/CHAR_HEIGHT,word, 0);
          break;
        // typable
        case ":":
          word = word.replace('#:', '');
          console.log("Add a typable");
          newWord = new WordTypable(x, this.pointerPosY * MAX_NOTE_SIZE/CHAR_HEIGHT,word);
          break;
        // button
        default:
          word = word.replace('#', '');
          console.log("Add a button");
          newWord = new WordButton(x, this.pointerPosY * MAX_NOTE_SIZE/CHAR_HEIGHT,word);
      }
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

  updateLightSource(){
    // find the light source
    for (let i = 0; i < this.words.length; i++) {
      for (let j = 0; j < this.words[i].length; j++) {
        if (this.words[i][j].isLightSource){
          // find nearby words
          for (let a = 0; a < this.words.length; a++) {
            for (let b = 0; b < this.words[a].length; b++) {
              let d = dist(this.words[i][j].globalX, this.words[i][j].globalY, this.words[a][b].globalX, this.words[a][b].globalY);
              if (d <= LIGHT_RADIUS && d != 0){
                this.words[a][b].nearbyLight.push(this.words[i][j]);
              }
            }
          }
        }
      }
    }
  }

  display() {
    push();
    translate(windowWidth / 2 - this.MAX_SIZE / 2, TOP_MARGIN);
    rectMode(CORNER);
    fill(this.bgColor);
    // padding
    stroke(this.bgColor);
    strokeWeight(32);

    //rect(0, 0, this.MAX_SIZE, this.MAX_SIZE);
    // display characters
    noStroke();
    for (let i = 0; i < this.words.length; i++) {
      for (let j = 0; j < this.words[i].length; j++) {
        this.words[i][j].display();
      }
    }
    pop();
  }
}
