class WordLinkable extends WordButton {
  constructor(x, y, chars, id, disabled = false) {
    super(x, y, chars, id, disabled);

    this.rgb = [75, 175, 255];

    this.id = id;

    this.dropFrame = 0;
    this.dropPossible = false;

    var thisBtn = this;
    this.func = function() {}
  }

  complete() {
    addVisibleLink(this.globalXCenter, this.globalYCenter, lastClickedItem.globalXCenter, lastClickedItem.globalYCenter);
    this.disabled = true;
    lastClickedItem.disabled = true;
    feedbackSystem.showFeedback(this.globalXCenter, this.globalY, 0);
  }

  detectLink() {
    if (clickedItem instanceof WordLinkable && mouseIsPressed && this.isHovered) {
      this.dropFrame = 1;
    }
    if (this.dropFrame === 1 & this != lastClickedItem) {
      if (this.isHovered && lastClickedItem instanceof WordLinkable && !mouseIsPressed) {
        let result = checkLink(this.id, lastClickedItem.id);
        if (result === true) {
          this.complete();
        }else if (typeof result === 'string') {
          this.complete();
          charGrid.addLine(result);
        } else if (result === false) {
          feedbackSystem.showFeedback(this.globalXCenter, this.globalY, 1);
          console.log("Wrong linkable");
        }
      }
      if (!mouseIsPressed) {
        if (this.dropFrame > 0) {
          this.dropFrame -= 1;
        }
      }
    }
  }

  display() {
    this.detectLink();
    super.display();
  }
}
