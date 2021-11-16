class WordDroppable extends WordButton{
  constructor(x, y, chars, id, disabled = false) {
    super(x, y, chars, disabled);

    this.rgb = [51, 222, 122];

    this.id = id;

    this.originText = chars.replace(' ', '');
    this.getBlankSpace();
  }

  getBlankSpace(){
    let blank = "";
    for(let i = 0; i < this.originText.length; i++){
      if (this.originText.charAt(i) === '.'){
        blank += ".";
      }else{
        blank += " ";
      }
    }
    this.chars = blank;
  }

  display(){
    super.display();
  }
}
