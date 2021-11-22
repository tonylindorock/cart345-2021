/*****************

Title of Project (Demo)
Yichen Wang

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
const CHAR_WIDTH = 64;
const CHAR_HEIGHT = 30;
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

let lastClickedItem = null;
let clickedItem = null;
let hoveredItem = null;

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
let passageId = 0;

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

function loadConfig(){
  // current passage dictionary
  let currentPassage = STORY["passages"][passageId];

  let linkables = currentPassage["linkables"];
  if (linkables != null){
    if (Array.isArray(linkables)){
      return linkables;
    }
  }
}

function checkLink(l1, l2){
  if (l1 === l2){
    return false;
  }
  // load link config
  let link = loadConfig();
  for(let i = 0; i < link.length; i++){
    // if array has both link id
    if (link[i].includes(l1) && link[i].includes(l2)){
      console.log("Correct links");
      return true;
    }
  }
  console.log("Incorrect links");
  return false;
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  textSize(18);
  textFont("Courier");

  charGrid = new Paper("#111", COLOR_WHITE);
  lineEdit = new LineEditWindow();
  feedbackSystem = new Notification();

  charGrid.addLine("Interactivity Examples: ");
  charGrid.addLine("\n\nCLICK:\nI'm a #button. Click it to trigger something.");
  charGrid.addLine("\n\nDRAG & DROP:\nDrag it to a blank space to make sense.");
  charGrid.addLine("\nI have a glass of #>water. I can see my plant is dying. Maybe I should #<water it.");
  charGrid.addLine("\n\nLINK:");
  charGrid.addLine("\nDrag one to link it to another to create a new outcome.");
  charGrid.addLine("\nThe door is strong. I need something powerful to brust it open. A box of #^matches is in my pocket. A #^dynamite sits near my feet.");
  charGrid.addLine("\n\nTYPE:");
  charGrid.addLine("\nComplete the word with missing characters.");
  charGrid.addLine("\n\"A tropical fruit that is yellow? With a pit?\" What else can it be? A #:mango ?");
  charGrid.addLine("\n");

  noCursor();
}

function loadStory() {
  STORY = loadJSON("data/story.json");
}

function draw() {
  background(0);
  displayNoteEditor();
  displayAllVisibleLinks();
  lineEdit.display();
  feedbackSystem.display();

  if (clickedItem != null) {
    if (clickedItem instanceof WordLinkable) {
      showLink();
    }
  }
  showDraggable();

  showCursor();
}

// display note editor
function displayNoteEditor() {
  background(COLOR_BLACK);
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

// display a custom circular cursor
// automatically widen to the word's width when hovering on a clickable word
function showCursor() {
  push();
  cursorOffset.x = lerp(cursorOffset.x, cursorOffset.targetX, 0.2);
  cursorOffset.y = lerp(cursorOffset.y, cursorOffset.targetY, 0.2);
  translate(mouseX + cursorOffset.x, mouseY + cursorOffset.y);
  rectMode(CENTER);
  ellipseMode(CENTER);
  if (mouseIsPressed) {
    fill(255, 255, 255, 150);
  } else {
    fill(255, 255, 255, 80);
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

function showLink() {
  push();
  stroke(255, 255, 255, 150);
  strokeWeight(4);
  strokeCap(ROUND);
  line(clickedItem.globalX + clickedItem.width / 2, clickedItem.globalY + MAX_NOTE_SIZE / CHAR_HEIGHT / 2, mouseX, mouseY);
  pop();
}

function addVisibleLink(x1, y1, x2, y2){
  let line = new Line(x1, y1, x2, y2);
  linkContainer.push(line);
}

function displayAllVisibleLinks(){
  for(let i = 0; i< linkContainer.length; i++){
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
