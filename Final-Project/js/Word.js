// Word obj for display a single word
class Word {
  constructor(x, y, chars) {
    this.chars = chars;
    this.underline = false;
    this.highlight = false;

    this.rgb = [255, 255, 255];

    this.opacity = 255;
    this.rotation = 0;

    this.underlineColor = COLOR_WHITE;
    this.highlightColor = HIGHLIGHT_COLORS[0];

    this.originX = x;
    this.originY = y;

    this.posX = x;
    this.posY = y;

    this.width = textWidth(chars);

    this.FONT_SIZE = 18;
    this.fontSize = this.FONT_SIZE;
    this.UNDERLINE_WEIGHT = 2;

    this.underlineEnabled = false;
    this.highlightEnabled = false;

    this.globalX = this.posX + windowWidth / 2 - MAX_NOTE_SIZE / 2;
    this.globalY = this.posY + TOP_MARGIN;

    this.globalXCenter = this.globalX + this.width / 2;
    this.globalYCenter = this.globalY + MAX_NOTE_SIZE / CHAR_HEIGHT / 2;

    this.isLightSource = false;
    this.nearbyLight = [];

    this.underlineWidth = this.width;
  }

  setupRotation(v1 ,v2 = 0){
    if (v2 <= v1){
      this.rotation = v1;
    }else{
      this.rotation = random(v1, v2);
    }
  }

  calculateGlobalPos() {
    this.globalX = this.posX + windowWidth / 2 - MAX_NOTE_SIZE / 2;
    this.globalY = this.posY + TOP_MARGIN;
  }

  distToMouse() {
    this.opacity = map(dist(this.globalX, this.globalY, mouseX, mouseY), FLASH_RADIUS, 32, 0, 255);
  }

  isNearLight() {
    let o = 0;
    for (let i = 0; i < this.nearbyLight.length; i++) {
      o += map(dist(this.globalX, this.globalY, this.nearbyLight[i].globalX, this.nearbyLight[i].globalY), FLASH_RADIUS, 32, 0, 255);
      o = constrain(o, 0, 255);
      this.opacity = o;
    }
  }

  display() {
    if (!this.isLightSource && lightOff) {
      this.distToMouse();
    }

    push();
    translate(this.posX, this.posY);
    angleMode(DEGREES);
    rotate(this.rotation);
    rectMode(CORNER);

    if (this.chars === "") {
      this.width = textWidth(" ");
    } else {
      this.width = textWidth(this.chars);
    }
    /**
    push();
    stroke(200);
    strokeWeight(1);
    rect(0, 0, this.width, MAX_NOTE_SIZE / CHAR_HEIGHT);
    pop();**/

    fill(this.rgb[0], this.rgb[1], this.rgb[2], this.opacity);
    textAlign(LEFT, CENTER);
    text(this.chars, MAX_NOTE_SIZE / CHAR_WIDTH / 2, MAX_NOTE_SIZE / CHAR_HEIGHT / 2);

    //underline
    if (this.underline) {
      push();
      fill(this.rgb[0], this.rgb[1], this.rgb[2], this.opacity);
      noStroke();
      rect(0, MAX_NOTE_SIZE / CHAR_HEIGHT - this.UNDERLINE_WEIGHT, this.underlineWidth, this.UNDERLINE_WEIGHT);
      pop();
    }
    pop();

    /*
    push();
    noStroke();
    fill(255);
    ellipse(this.posX, this.posY, 4);
    pop();*/
  }
}
