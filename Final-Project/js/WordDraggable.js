// a draggable object
class WordDraggable extends WordButton{
  constructor(x, y, chars, id, disabled = false) {
    super(x, y, chars, disabled);

    this.rgb = [51, 222, 122];

    this.isDraggable = false;

    this.offsetX = 0.0;
    this.offsetY = 0.0;

    this.id = id;

    this.chars = chars.replace(' ', '');
    this.draggableChars = this.chars.replace('.','');

    var thisBtn = this;
    this.func = function(){
      draggableInstance.x = thisBtn.globalX + textWidth(this.chars + " ")/2 - textWidth(" ")/2;
      draggableInstance.y = thisBtn.globalY + MAX_NOTE_SIZE/CHAR_HEIGHT/2;
      draggableInstance.originX = thisBtn.globalX;
      draggableInstance.originY = thisBtn.globalY;
      draggableInstance.offsetX = mouseX - draggableInstance.x;
      draggableInstance.offsetY = mouseY - draggableInstance.y;
      if (thisBtn.chars.charAt(thisBtn.chars.length - 1) === '.'){
        draggableInstance.chars = thisBtn.chars.replace('.','');
      }else{
        draggableInstance.chars = thisBtn.chars;
      }
      draggableInstance.opacity = 255;
    }
  }

  // forget this draggable
  forget() {
    this.isHovered = false;
    this.mouseClicked = false;
  }

  checkForDrag() {
    if (this.mouseClicked) {
      this.posX = mouseX - this.offsetX;
      this.posY = mouseY - this.offsetY;
    }
  }

  display() {
    if (clickedItem === this){
      this.opacity = 255 * 0.5;
    }else{
      this.opacity = lerp(this.opacity, 255, 0.05);
    }
    super.display();
  }
}
