"use strict"
/*------------------------------------------Global Variables----------------------------------------*/
let numberOfBuildings = 5; // Range 0-5
let numberOfFloors = 1; // Range 1-5
let numberOfWindows = 5; // Range 1-5

/*---------------------------------------------Canvas-----------------------------------------------*/
// Set up drawings
let canvas = SVG("drawing");

// Set up canvas sizes
canvas.size(1500,900);

// draw rectangles around each canvas so you can see them for this demo
canvas.rect(canvas.width(), canvas.height()).fill("white").stroke("black");

/*---------------------------------------------City------------------------------------------------*/

drawCity(canvas,numberOfFloors,numberOfWindows,numberOfBuildings);
ground(canvas);


function drawCity(d,floorNum,winNum,buildingNum) {
  let houseSepcs = [[300, 100, windowAArray, roofA, 820, doorA],
                    [220, 80,  windowBArray, roofB, 820, doorB],
                    [300, 100, windowCArray, roofC, 830, doorA],
                    [200, 90,  windowDArray, roofD, 830, doorB],
                    [210, 120, windowEArray, roofE, 840, doorB]];
   let idx = 0;
   let currentX = 5;
   while(idx < buildingNum) {
       currentX = currentX + drawHouse(d, currentX, floorNum, winNum, houseSepcs[Math.floor(Math.random() * 5)]) + 5;
       idx++;
   }
}

function drawHouse(d, x, floorNum, winNum, spec){
  baseArray(d, x, floorNum, spec[0], spec[1]);
  spec[2](d, x, floorNum, winNum, spec[0], spec[1]);
  spec[3](d, x, spec[4] - (floorNum + 1) * spec[1], spec[0]);
  spec[5](d, x, spec[0]);
  return spec[0];
}

/*
    This code does not even set up your SVG canvas, so you need to do that first.
    For this assignment, you don't have to have to have a "default city" that draws
    before the user picks options, as I did in Homework 1E.

    Instead, you will need to add at least one line at the end of the formChanged()
    event handler function that calls your city drawing code.

    If you are unsure of what this might look like, review Homework 1E to see how I
    did it. There are many other ways to do it besides how I did it, so pick what makes
    the most sense to you.

    PLEASE DELETE THIS COMMENT BEFORE TURNING IN YOUR CODE!
*/

/*---------------------------------------------Event-----------------------------------------------*/
document.forms.citySpecs.addEventListener("change", formChanged);

function formChanged(event) {

    /* get data for number of buildings in city */
    numberOfBuildings = Number(document.forms.citySpecs.numBuildings.value);
    console.log("Number of buildings in city is: " + numberOfBuildings);

    /* get data for number of floors per building */
    numberOfFloors = Number(document.forms.citySpecs.numFloors.value);
    console.log("Number of floors per building is: " + numberOfFloors);

    /* get data for number of windows per floor */
    numberOfWindows = Number(document.forms.citySpecs.numWindows.value);
    console.log("Number of windows per floor (except first) is: " + numberOfWindows);

    /* All data processed. Start drawing!*/
    console.log("******* LET'S DRAW A CITY! ********");

    canvas.clear();
    drawCity(canvas,numberOfFloors,numberOfWindows,numberOfBuildings);
    ground(canvas);

    if (Math.random() < 0.75) {
    car(canvas, 0, 230).animate(2500).x(1500);
    car(canvas, 0, 290).animate(2000).x(1500);
    }
}
