class WordTypable extends WordButton {
  constructor(x, y, chars, disabled = false) {
    super(x, y, chars, disabled);

    this.rgb = [192, 115, 255];

    this.originText = chars;
    this.typableText = this.originText;
    this.randomizeDisplayText();

    this.func = function(){
      lineEdit.show = !lineEdit.show;
      lineEdit.charNum = this.typableText.length;
      isTyping = true;
    };
  }

  randomizeDisplayText() {
    let word = this.originText;
    // remove white space and period
    word = word.replace(' ', '');
    word = word.replace('.', '');

    this.typableText = word;

    let rCount = Math.ceil(word.length / 2); // how many letters should be removed

    // remove letters randomly
    let a = []; // for remembering selected index
    for (let i = 0; i < rCount; i++) {
      let index = Math.floor(Math.random() * word.length);
      // cannot have repeated index
      while (a.includes(index) || index === 0 || index === word.length - 1) {
        index = Math.floor(Math.random() * word.length);
      }
      a.push(index);
    }
    // replace letter with space
    for (let i = 0; i < a.length; i++) {
      this.chars = this.setCharAt(this.chars, a[i], "*");
    }
  }

  display() {
    super.display();
  }

  setCharAt(str, index, char) {
    if (index > str.length - 1) {
      return str;
    }
    return str.substring(0, index) + char + str.substring(index + 1);
  }
}
