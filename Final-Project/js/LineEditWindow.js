// A line edit class for typing a word
class LineEditWindow {
  constructor() {
    this.offsetX = 0;
    this.offsetY = 0;
    this.width = (windowWidth - MAX_NOTE_SIZE) / 2.25;
    this.height = 128;

    this.x = windowWidth - MARGIN;
    this.y = windowHeight - MARGIN;

    this.show = false;
    this.animSpeed = 0.15;

    this.text = "";
    this.canType = true;

    this.ANSWER = "";
    this.CHAR_NUM = 0;
  }

  // update the word
  updateText(char) {
    if (this.canType) {
      this.text += char.toLowerCase();
    }
  }

  // remove the last character
  removeLastChar() {
    this.text = this.text.substring(0, this.text.length - 1);
  }

  // check if the word is correct
  verify() {
    if (this.text === this.ANSWER) {
      if (lastClickedItem instanceof WordTypable) {
        lastClickedItem.complete();
      }
    } else {
      if (lastClickedItem instanceof WordTypable) {
        feedbackSystem.showFeedback(this.x - this.width / 2, this.y - this.height - MARGIN, 1);
      }
    }
  }

  display() {
    push();
    // animation
    if (this.show) {
      this.offsetX = lerp(this.offsetX, 0, this.animSpeed);
      this.offsetY = lerp(this.offsetY, 0, this.animSpeed);
    } else {
      this.offsetX = lerp(this.offsetX, MARGIN * 7, this.animSpeed - 0.05);
      this.offsetY = lerp(this.offsetY, MARGIN * 7, this.animSpeed - 0.05);
    }
    translate(this.x, this.y + this.offsetY);
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    noStroke();
    fill(COLOR_WHITE);
    rect(-this.width / 2, -this.height / 2, this.width, this.height, 16);
    fill(COLOR_BLACK);
    // if the character count is filled, no more typing
    let charLeft = this.CHAR_NUM - this.text.length;
    if (charLeft <= 0) {
      this.canType = false;
    } else {
      this.canType = true;
    }
    // character left
    if (charLeft <= 1) {
      text(charLeft + " character left", -this.width / 2, -this.height / 2 - 32);
    } else {
      text(charLeft + " character left", -this.width / 2, -this.height / 2 - 32);
    }
    // text field
    fill("#262626");
    rect(-this.width / 2, -this.height / 2 + 16, this.width * 0.8, this.height * 0.4, 12);
    fill(COLOR_ORANGE);
    text(this.text, -this.width / 2, -this.height / 2 + 16);
    pop();
  }
}
