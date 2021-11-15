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

let selectedItem = {
  type: "",
  id: -1
};

let clickedItem = null;
let hoveredItem = null;

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

var charGrid;
var lineEdit;

let isTyping = false;

function preload() {
  //loadStory();
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  textSize(18);
  textFont("Courier");

  charGrid = new Paper("#111", COLOR_WHITE);
  lineEdit = new LineEditWindow();


  charGrid.addLine("This is a #button.");
  charGrid.addLine("\n\nThis is a #>draggable.");
  charGrid.addLine("\n\nThis is a #<droppable.");
  charGrid.addLine("\n\nThis is a #^linkable1.");
  charGrid.addLine("\n\nThis is a #^linkable2.");
  charGrid.addLine("\n\nThis is a #:typable. Click to guess and type out the word.");
  charGrid.addLine("\n\nThis is a sentence.");

  noCursor();
}

function loadStory() {
  STORY = loadJSON("data/story.json");
}

function draw() {
  background(0);
  displayNoteEditor();
  lineEdit.display();

  if (clickedItem != null && clickedItem instanceof WordLinkable){
    showLink();
  }

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
  noStroke();
  if (mouseIsPressed) {
    fill(255, 255, 255, 150);
  } else {
    fill(255, 255, 255, 80);
  }

  if (enlargeCursor) {
    cursorSize = lerp(cursorSize, LARGER_CURSOR_SIZE, 0.2);
    cursorHoverSize.w = lerp(cursorHoverSize.w, cursorHoverSize.targetWidth, 0.3);
    cursorHoverSize.h = lerp(cursorHoverSize.h, MAX_NOTE_SIZE / CHAR_HEIGHT, 0.3);
    rect(0, 0, cursorHoverSize.w, cursorHoverSize.h, 8);
  } else {
    cursorSize = lerp(cursorSize, DEFAULT_CURSOR_SIZE, 0.2);
    cursorHoverSize.w = lerp(cursorHoverSize.w, 0, 0.3);
    cursorHoverSize.h = lerp(cursorHoverSize.h, 0, 0.3);
    cursorOffset.x = 0;
    cursorOffset.y = 0;
    cursorOffset.targetX = 0;
    cursorOffset.targetY = 0;
    cursorHoverSize.targetWidth = 0;
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

function showLink(){
  push();
  stroke(255, 255, 255, 150);
  strokeWeight(4);
  strokeCap(ROUND);
  line(clickedItem.globalX + clickedItem.width/2, clickedItem.globalY + MAX_NOTE_SIZE/CHAR_HEIGHT/2, mouseX, mouseY);
  pop();
}
