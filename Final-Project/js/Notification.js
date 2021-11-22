// gives feedback to users
class Notification{
  constructor(){
    this.width = windowWidth/32;
    this.size = this.width;

    this.ICON_SHRINK = 0.75;

    this.x = 0;
    this.y = 0;

    this.id = 0;
    this.color = [255, 255, 255];
    this.BG_GREEN = [179, 227, 141];
    this.BG_RED = [254, 163, 170];

    // animation
    this.offsetX = 0;
    this.offsetY = 0;
    this.opacity = 0;
    this.show = false;

    this.timer = null;
  }

  showFeedback(x, y, id){
    this.id = id;
    this.x = x;
    this.y = y;
    // reset
    this.size = 0;
    this.opacity = 0;

    this.show = true;
  }

  startTimer(){
    var obj = this;
    this.timer = setInterval(function() {
      obj.show = false;
      obj.endTimer();
    }, 1500);
  }

  // clear Interval
  endTimer() {
    clearInterval(this.timer);
    this.timer = null;
  }

  display(){
    if (this.show){
      this.size = lerp(this.size, this.width, 0.25);
      this.opacity = lerp(this.opacity, 255, 0.1);
      if (this.timer === null){
        this.startTimer();
      }
    }else{
      this.size = lerp(this.size, 0, 0.2);
      this.opacity = lerp(this.opacity, 0, 0.1);
    }
    push();
    ellipseMode(CENTER);
    imageMode(CENTER);
    noStroke();
    if (this.id === 0){
      this.color = this.BG_GREEN;
      tint(255, this.opacity);
      image(ICON_SUCCESS, this.x,this.y,this.size * this.ICON_SHRINK, this.size * this.ICON_SHRINK);
    }else{
      this.color = this.BG_RED;
      tint(255, this.opacity);
      image(ICON_FAIL, this.x,this.y,this.size * this.ICON_SHRINK, this.size * this.ICON_SHRINK);
    }
    fill(this.color[0], this.color[1], this.color[2], this.opacity);
    //ellipse(this.x,this.y + this.offsetY, this.width);

    pop();
  }
}
