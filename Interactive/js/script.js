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

const PEN_COLORS = [COLOR_BLACK, COLOR_RED, COLOR_BLUE];
const HIGHLIGHT_COLORS = ["#ffff0080", "#ff800080", "#00ff0080", "#0080ff80", "#ff00ff80"];
const COLORS_NOTE_PLAYFUL = [COLOR_RED_PASTEL, COLOR_ORANGE_PASTEL, COLOR_YELLOW_PASTEL, COLOR_GREEN_PASTEL, COLOR_BLUE_PASTEL, COLOR_PURPLE_PASTEL, COLOR_WHITE, COLOR_GREY];
const COLORS_THEME = [COLOR_RED, COLOR_ORANGE, COLOR_YELLOW, COLOR_GREEN, COLOR_BLUE, COLOR_PURPLE, COLOR_WHITE];
const COLORS_NOTE_PLAIN = [COLOR_WHITE, COLOR_GREY_DARK];

const FLASH_RADIUS = 256;

var charGrid;

function preload() {

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  charGrid = new CharGrid("#111111", COLOR_WHITE);
  charGrid.addLine("This is a #button.");

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

function showCursor(){
  push();
  noStroke();
  fill(255, 255, 255, 100);
  ellipse(mouseX,mouseY,16);
  pop();
}
