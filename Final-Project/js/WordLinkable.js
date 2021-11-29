// a word can be linked with another linkable
class WordLinkable extends WordButton {
  constructor(x, y, chars, id, disabled = false) {
    super(x, y, chars, id, disabled);

    this.rgb = [75, 175, 255];

    this.id = id;

    this.dropFrame = 0;
    this.dropPossible = false;
  }

  // complete the link
  complete() {
    // add a link on the page
    addVisibleLink(this.globalXCenter, this.globalYCenter, lastClickedItem.globalXCenter, lastClickedItem.globalYCenter);
    // disable two linkables
    this.disabled = true;
    lastClickedItem.disabled = true;
    // show feedback
    feedbackSystem.showFeedback(this.globalXCenter, this.globalY, 0);
  }

  // check if there's linking action
  detectLink() {
    // similar to droppable
    if (clickedItem instanceof WordLinkable && mouseIsPressed && this.isHovered) {
      this.dropFrame = 1;
    }
    if (this.dropFrame === 1 & this != lastClickedItem) {
      if (this.isHovered && lastClickedItem instanceof WordLinkable && !mouseIsPressed) {
        // check if the link is valid
        let result = checkLink(this.id, lastClickedItem.id);
        if (result === true) {
          this.complete();
        // if there's an outcome
        } else if (typeof result === 'string') {
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
