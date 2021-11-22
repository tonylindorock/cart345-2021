class WordDroppable extends WordButton{
  constructor(x, y, chars, id, disabled = false) {
    super(x, y, chars, disabled);

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
  }

  detectDrop(){
    if (clickedItem instanceof WordDraggable && mouseIsPressed && this.isHovered){
      this.dropFrame = 1;
    }
    if (this.dropFrame === 1){
      if(this.isHovered && lastClickedItem instanceof WordDraggable && !mouseIsPressed){
        if (this.NO_SPACE === lastClickedItem.chars){
          this.complete();
        }else{
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
    this.NO_SPACE = this.ORIGINAL_TEXT.replace(' ', '');
    for(let i = 0; i < this.NO_SPACE.length; i++){
      if (this.NO_SPACE.charAt(i) === '.'){
        blank += ".";
      }else{
        blank += " ";
      }
    }
    this.chars = blank;
  }

  display(){
    this.detectDrop();
    super.display();
  }
}
