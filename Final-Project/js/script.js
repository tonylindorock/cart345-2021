/*****************

The Old House
Yichen Wang
CART 345

The Old House is a demo for a more interactive interactive fiction.
It features clicking, drag-and-dropping, linking, and typing as
its 4 main interactive methods.
The cursor also serves as a more interesting device that adopts
different interactive elements and manipulates the text around it.

******************/
const CHAR_WIDTH = 64;
const CHAR_HEIGHT = 26;
const FONT_SIZE = 16;

const MAX_NOTE_SIZE = 720;

const MARGIN = 32;
let TOP_MENU_HEIGHT = 32;
const TOP_MARGIN = 96;

const ADD_MENU_WIDTH = 320;
const ADD_MENU_HEIGHT = 160;

const UNI_BTN_HEIGHT = 32;
const UNI_BTNC_HEIGHT = 192;

const INFO_SQUARE_SIZE = 160;

const ALL_CHAR = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

// **************** COLORS ****************
const COLOR_BLACK = "#000000";
const COLOR_GREY_DARK = "#484848";
const COLOR_GREY = "#aaa";
const COLOR_GREY_LIGHT = "#ccc";
const COLOR_WHITE = "#eee";
const COLOR_RED = "#ff6464";
const COLOR_RED_PASTEL = "#fea3aa";
const COLOR_ORANGE = "#ffaf4b";
const COLOR_ORANGE_PASTEL = "#f8b88b";
const COLOR_YELLOW = "#ffe600";
const COLOR_YELLOW_PASTEL = "#edea8c";
const COLOR_GREEN = "#33de7a";
const COLOR_GREEN_PASTEL = "#b3e38d";
const COLOR_BLUE = "#4bafff";
const COLOR_BLUE_PASTEL = "#a6c0ed";
const COLOR_PURPLE = "#c073ff";
const COLOR_PURPLE_PASTEL = "#eba0e1";

const HIGHLIGHT_COLORS = ["#ffff0080", "#ff800080", "#00ff0080", "#0080ff80", "#ff00ff80"];

const LIGHT_RADIUS = 80;

const FLASH_RADIUS = 160;
const DEFAULT_CURSOR_SIZE = 16;
const LARGER_CURSOR_SIZE = 24;

let ICON_SUCCESS;
let ICON_FAIL;

let interactableCounter = {
  button: 0,
  linkable: 0
}

let draggableInstance = {
  offsetX: 0,
  offsetY: 0,
  x: 0,
  y: 0,
  originX: 0,
  originY: 0,
  dropX: 0,
  dropY: 0,
  opacity: 255,
  speed: 0.08,
  chars: ""
}

let mouseScrolled = false;
let scrollTimer = null;

let lastClickedItem = null;
let clickedItem = null;
let hoveredItem = null;

let cursorOpacity = 150;
let disableCursorAnimation = false;
let cursorSize = DEFAULT_CURSOR_SIZE;
let enlargeCursor = false;
let cursorHoverSize = {
  w: 0,
  h: 0,
  targetWidth: 0
};
let cursorOffset = {
  x: 0,
  y: 0,
  targetX: 0,
  targetY: 0
}
let hoveringButton;

let STORY;
let passageId = 1;

var charGrid;
var lineEdit;
var feedbackSystem;

let linkContainer = [];

let isTyping = false;

function preload() {
  loadStory();

  ICON_SUCCESS = loadImage("assets/images/icon_success.png");
  ICON_FAIL = loadImage("assets/images/icon_fail.png");
}

function setup() {
  createCanvas(windowWidth, TOP_MARGIN + MAX_NOTE_SIZE);

  textSize(18);
  textFont("Courier");

  updatePaper();

  lineEdit = new LineEditWindow();
  feedbackSystem = new Notification();

  noCursor();
}

function loadStory() {
  STORY = loadJSON("data/story.json");
}

function draw() {
  background("#262626");
  displayNoteEditor();
  displayAllVisibleLinks();
  lineEdit.display();

  if (clickedItem != null) {
    if (clickedItem instanceof WordLinkable) {
      showLink();
    }
  }
  showDraggable();

  showCursor();
  feedbackSystem.display();

  // resolving mouse pressing triggering button event by moving over it
  if (hoveredItem === null && clickedItem === null){
    if (mouseIsPressed){
      clickedItem = -1;
    }else{
      clickedItem = null;
    }
  }else{
    if (clickedItem === -1 && !mouseIsPressed){
      clickedItem = null;
    }
  }
}

function updateWindowHeight(amount) {
  resizeCanvas(windowWidth, windowHeight + amount);
}

// display note editor
function displayNoteEditor() {
  // text editor
  charGrid.display();
}

// check if mouse is over within a square radius in its position
function checkForMouseOver(x, y, w, h) {
  return (mouseX >= x - w / 2 && mouseX <= x + w / 2 &&
    mouseY >= y - h / 2 && mouseY <= y + h / 2);
}

// check for delete and return key
function keyPressed() {
  if (isTyping) {
    // delete
    if (keyCode === 8) {
      lineEdit.removeLastChar();
    }
    // return
    if (keyCode === 13) {
      lineEdit.verify();
    }
  }
}

// check for character typed
function keyTyped() {
  if (isTyping) {
    if (ALL_CHAR.includes(key)) {
      lineEdit.updateText(key);
    }
  }
}

// if scrolled
function mouseWheel(event) {
  // hide mouse
  mouseScrolled = true;
}

// if mouse moved
function mouseMoved() {
  // if mouse is hidden, enlarge it
  if (mouseScrolled === true) {
    cursorSize = LARGER_CURSOR_SIZE * 2;
  }
  // make mouse appear
  mouseScrolled = false;
}

// display a custom circular cursor
// automatically widen to the word's width when hovering on a clickable word
function showCursor() {
  push();
  cursorOffset.x = lerp(cursorOffset.x, cursorOffset.targetX, 0.2);
  cursorOffset.y = lerp(cursorOffset.y, cursorOffset.targetY, 0.2);
  translate(mouseX + cursorOffset.x, mouseY + cursorOffset.y);
  rectMode(CENTER);
  ellipseMode(CENTER);

  if (mouseScrolled) {
    cursorOpacity = lerp(cursorOpacity, 0, 0.2);
  } else {
    cursorOpacity = lerp(cursorOpacity, 150, 0.2);
  }
  if (mouseIsPressed) {
    fill(255, 255, 255, cursorOpacity);
  } else {
    fill(255, 255, 255, cursorOpacity / 1.875);
  }

  if (enlargeCursor) {
    cursorSize = lerp(cursorSize, LARGER_CURSOR_SIZE, 0.2);
    cursorHoverSize.w = lerp(cursorHoverSize.w, cursorHoverSize.targetWidth, 0.3);
    cursorHoverSize.h = lerp(cursorHoverSize.h, MAX_NOTE_SIZE / CHAR_HEIGHT, 0.3);
    // case 1: dragging linkable
    // case 2: dragging draggable
    if ((clickedItem instanceof WordLinkable && clickedItem != hoveredItem) || (clickedItem instanceof WordDraggable && hoveredItem === clickedItem)) {
      noFill();
      strokeWeight(4);
      stroke(255, 255, 255, 150);
      rect(0, 0, cursorHoverSize.w, cursorHoverSize.h, 8);
      // if dragging a draggable and hovering on a droppable
    } else if (clickedItem instanceof WordDraggable && hoveredItem instanceof WordDroppable) {
      noStroke();
      fill(255, 255, 255, 60);
      rect(0, 0, cursorHoverSize.w + 16, cursorHoverSize.h + 16, 12);
    } else {
      noStroke();
      rect(0, 0, cursorHoverSize.w, cursorHoverSize.h, 8);
    }
  } else {
    cursorSize = lerp(cursorSize, DEFAULT_CURSOR_SIZE, 0.2);
    cursorHoverSize.w = lerp(cursorHoverSize.w, 0, 0.3);
    cursorHoverSize.h = lerp(cursorHoverSize.h, 0, 0.3);
    cursorOffset.x = 0;
    cursorOffset.y = 0;
    cursorOffset.targetX = 0;
    cursorOffset.targetY = 0;
    cursorHoverSize.targetWidth = 0;
    noStroke();
    rect(0, 0, cursorHoverSize.w, cursorHoverSize.h, 8);
    ellipse(0, 0, cursorSize);
  }
  pop();
}

function wordButtonIsHovered(ref, x, y, width) {
  hoveringButton = ref;
  cursorOffset.targetX = (x - mouseX);
  cursorOffset.targetY = (y - mouseY);
  cursorHoverSize.targetWidth = width
}

// update dragged item
function updateSelectedItem(type, id) {
  selectedItem.type = type;
  selectedItem.id = id;
}

function checkLink(l1, l2) {
  if (l1 === l2) {
    return false;
  }
  // load link config
  let link = loadConfig();
  for (let i = 0; i < link.length; i++) {
    // if array has both link id
    if (link[i].includes(l1) && link[i].includes(l2)) {
      console.log("Correct links");
      return true;
    }
  }
  console.log("Incorrect links");
  return false;
}

function showLink() {
  push();
  stroke(255, 255, 255, 150);
  strokeWeight(4);
  strokeCap(ROUND);
  line(clickedItem.globalX + clickedItem.width / 2, clickedItem.globalY + MAX_NOTE_SIZE / CHAR_HEIGHT / 2, mouseX, mouseY);
  pop();
}

function addVisibleLink(x1, y1, x2, y2) {
  let line = new Line(x1, y1, x2, y2);
  linkContainer.push(line);
}

function displayAllVisibleLinks() {
  for (let i = 0; i < linkContainer.length; i++) {
    linkContainer[i].display();
  }
}

function showDraggable() {
  push();
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  noStroke();
  //fill(COLOR_BLACK);
  //rect(mouseX, mouseY, clickedItem.width, MAX_NOTE_SIZE/CHAR_HEIGHT, 8);
  fill(COLOR_GREEN);
  if (clickedItem != null && clickedItem instanceof WordDraggable) {
    let x = mouseX - draggableInstance.offsetX;
    let y = mouseY - draggableInstance.offsetY;

    text(draggableInstance.chars, x, y);
    // remember cursor position
    draggableInstance.x = x;
    draggableInstance.y = y;
    draggableInstance.dropX = x;
    draggableInstance.dropY = y;
  } else if (lastClickedItem != null && lastClickedItem instanceof WordDraggable) {
    let s = draggableInstance.speed;
    let orgX = draggableInstance.originX + textWidth(draggableInstance.chars + " ") / 2;
    let orgY = draggableInstance.originY + MAX_NOTE_SIZE / CHAR_HEIGHT / 2;
    // move draggable back to its original position
    draggableInstance.x = lerp(draggableInstance.x, orgX, s);
    draggableInstance.y = lerp(draggableInstance.y, orgY, s);

    let d = dist(draggableInstance.x, draggableInstance.y, orgX, orgY); // get distance to origin
    // if close enough, turn to transparent
    if (d <= 16) {
      draggableInstance.opacity = lerp(draggableInstance.opacity, 0, s * 2.5);
    }

    fill(51, 222, 122, draggableInstance.opacity);
    text(draggableInstance.chars, draggableInstance.x, draggableInstance.y);
  }
  pop();
}

function loadConfig() {
  // current passage dictionary
  let currentPassage = STORY["passages"][passageId];

  let linkables = currentPassage["linkables"];
  if (linkables != null) {
    if (Array.isArray(linkables)) {
      return linkables;
    }
  }
}

function updatePaper() {
  charGrid = new Paper("#111", COLOR_WHITE); // reset paper
  // reset counter
  interactableCounter.button = 0;
  interactableCounter.linkable = 0;
  // reset mouse items
  setTimeout(function(){
    lastClickedItem = null;
    clickedItem = null;
    hoveredItem = null;
  }, 200);

  linkContainer = []; // remove links

  charGrid.addLine(STORY["passages"][passageId]["text"]);

  window.scrollTo(0, 0); // reset scroll
}

function openHpyerText(id) {
  // if has button id
  if (id < STORY["passages"][passageId]["options"].length) {
    enlargeCursor = false;
    // update passage
    passageId = STORY["passages"][passageId]["options"][id];
    updatePaper();
  } else {
    console.log("Options is fewer than the amount of buttons.");
  }
}
