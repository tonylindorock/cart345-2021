class WordDroppable extends WordButton{
  constructor(x, y, chars, id, disabled = false) {
    super(x, y, chars, disabled);

    this.clickable = false;

    this.rgb = [51, 222, 122];

    this.id = id;

    this.dropFrame = 0;
    this.dropPossible = false;

    this.ORIGINAL_TEXT = this.chars;
    this.NO_SPACE = this.ORIGINAL_TEXT.replace(' ', '');

    this.getBlankSpace();
  }

  complete(){
    this.chars = this.ORIGINAL_TEXT;
    this.disabled = true;
    feedbackSystem.showFeedback(this.globalXCenter, this.globalY, 0);
  }

  detectDrop(){
    if (clickedItem instanceof WordDraggable && mouseIsPressed && this.isHovered){
      this.dropFrame = 1;
    }
    if (this.dropFrame === 1){
      if(this.isHovered && lastClickedItem instanceof WordDraggable && !mouseIsPressed){
        if (this.NO_SPACE === lastClickedItem.draggableChars){
          this.complete();
        }else{
          feedbackSystem.showFeedback(this.globalXCenter, this.globalY, 1);
          console.log("Wrong draggable");
        }
      }
      if (!mouseIsPressed){
        if (this.dropFrame > 0){
          this.dropFrame -= 1;
        }
      }
    }
  }

  getBlankSpace(){
    let blank = "";
    for(let i = 0; i < this.NO_SPACE.length; i++){
      if (this.NO_SPACE.charAt(i) === '.'){
        blank += ".";
      }else{
        blank += " ";
      }
    }
    this.chars = blank + " ";
  }

  display(){
    this.detectDrop();
    super.display();
  }
}
