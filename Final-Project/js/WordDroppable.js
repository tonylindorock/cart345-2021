class WordDroppable extends WordButton{
  constructor(x, y, chars, id, disabled = false) {
    super(x, y, chars, disabled);

    this.id = id;

    this.originText = chars;
    this.getBlankSpace();
  }

  getBlankSpace(){
    let blank = "";
    for(let i = 0; i < this.originText.length; i++){
      blank += " ";
    }
    this.chars = blank;
  }

  display(){
    super.display();
  }
}
