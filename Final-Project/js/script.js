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

const ADD_MENU_WIDTH = 320;
const ADD_MENU_HEIGHT = 160;

const UNI_BTN_HEIGHT = 32;
const UNI_BTNC_HEIGHT = 192;

const INFO_SQUARE_SIZE = 160;

const ALL_CHAR = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-=!@#$%^&*()_+,.<>?:;[]{}\'\"\|/\\";

// **************** COLORS ****************
const COLOR_BLACK = "#000000";
const COLOR_GREY_DARK = "#484848";
const COLOR_GREY = "#aaa";
const COLOR_GREY_LIGHT = "#ccc";
const COLOR_WHITE = "#111";
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

const PEN_COLORS = [COLOR_BLACK, COLOR_RED, COLOR_BLUE];
const HIGHLIGHT_COLORS = ["#ffff0080", "#ff800080", "#00ff0080", "#0080ff80", "#ff00ff80"];
const COLORS_NOTE_PLAYFUL = [COLOR_RED_PASTEL, COLOR_ORANGE_PASTEL, COLOR_YELLOW_PASTEL, COLOR_GREEN_PASTEL, COLOR_BLUE_PASTEL, COLOR_PURPLE_PASTEL, COLOR_WHITE, COLOR_GREY];
const COLORS_THEME = [COLOR_RED, COLOR_ORANGE, COLOR_YELLOW, COLOR_GREEN, COLOR_BLUE, COLOR_PURPLE, COLOR_WHITE];
const COLORS_NOTE_PLAIN = [COLOR_WHITE, COLOR_GREY_DARK];

const LIGHT_RADIUS = 80;

const FLASH_RADIUS = 160;
const DEFAULT_CURSOR_SIZE = 16;
const LARGER_CURSOR_SIZE = 24;
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

function preload() {
  //loadStory();
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  textSize(18);
  textFont("Courier");

  charGrid = new Paper("#111", COLOR_WHITE);

  charGrid.addLine("It is dark.\n\nI can barely tell the #window.\n\nI see #something growing in the dark.\n\nThe #button is not working.");
  charGrid.updateLightSource();

  noCursor();
}

function draw() {
  background(0);
  displayNoteEditor();
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

// display a custom circular cursor
// automatically widen to the word's width when hovering on a clickable word
function showCursor() {
  push();
  cursorOffset.x = lerp(cursorOffset.x, cursorOffset.targetX, 0.2);
  cursorOffset.y = lerp(cursorOffset.y, cursorOffset.targetY, 0.2);
  translate(mouseX + cursorOffset.x, mouseY + cursorOffset.y);
  rectMode(CENTER);
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

function loadStory() {
  STORY = loadJSON("data/story.json");
}
