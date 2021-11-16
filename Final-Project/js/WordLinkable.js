class WordLinkable extends WordButton{
  constructor(x, y, chars, id, disabled = false) {
    super(x, y, chars, disabled);

    this.rgb = [75, 175, 255];

    this.id = id;

    var thisBtn = this;
    this.func = function(){
    }
  }

  display(){
    super.display();
  }
}
