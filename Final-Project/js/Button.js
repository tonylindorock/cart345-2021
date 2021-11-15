// The base class for all buttons
class Button{
  constructor(posX, posY, width, height, toggle = false){
    this.posX = posX;
    this.posY = posY;

    this.width = width;
    this.height = height;

    this.isHovered = false;
    this.mouseClicked = false;
    this.toggleMode = toggle;
    this.toggled = false;
    this.disabled = false;

    this.pressTime = 0;
    this.func = null;

    this.tooltip = "";
    this.cursorChangeEnabled = false;
    this.hoverTimeout = null;
  }
  // function when pressed
  connectFunc(def){
    this.func = def;
  }

  checkForMouse(){
    if (checkForMouseOver(this.posX, this.posY, this.width, this.height) && !this.disabled){
      if (this.cursorChangeEnabled){
        cursor(HAND);
      }
      this.isHovered = true;

      if (mouseIsPressed){
        this.mouseClicked = true;
        // do once
        if (this.pressTime < 1){
          this.pressTime += 1;
          this.toggled = !this.toggled;

          if (this.func != null){
            this.func();
          }
        }
      }else{
        this.pressTime = 0;
        this.mouseClicked = false;
      }

    }else{
      if (this.isHovered){
        if (this.cursorChangeEnabled){
          cursor(ARROW);
        }
      }
      this.isHovered = false;
    }
  }

  display(){}
}
