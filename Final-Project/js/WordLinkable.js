class WordLinkable extends WordButton{
  constructor(x, y, chars, id, disabled = false) {
    super(x, y, chars, disabled);

    this.id = id;

    var thisBtn = this;
    this.func = function(){
      if (clickedItem != thisBtn){
        clickedItem = thisBtn;
        console.log(thisBtn);
      }
    }
  }

  display(){
    super.display();
  }
}
