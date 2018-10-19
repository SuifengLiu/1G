"use strict"
/*------------------------------------------Global Variables----------------------------------------*/
let numberOfBuildings = 0; // Range 0-5
let numberOfFloors = 2; // Range 1-5
let numberOfWindows = 2; // Range 1-5

/*---------------------------------------------Canvas-----------------------------------------------*/
// Set up drawings
let canvas = SVG("drawing");

// Set up canvas sizes
canvas.size(1600,900);

// draw rectangles around each canvas so you can see them for this demo
canvas.rect(canvas.width(), canvas.height()).fill("white").stroke("black");

/*---------------------------------------------City------------------------------------------------*/

drawCity(canvas,numberOfFloors,numberOfWindows,numberOfBuildings);


function drawCity(d,floorNum,winNum,buildingNum) {

   ground(canvas);

   let idx = 0;
   let currentX = 5;
   while(idx < buildingNum) {
       let gap = Math.floor(Math.random() * 20) + 5;
       currentX = currentX + drawHouse(d, currentX, floorNum, winNum) + gap;
       idx++;
   }


   if (Math.random() < 0.75) {
        drawCar(d);
   }
}

function drawHouse(d, x, floorNum, winNum){
  
  let pickHouse = Math.floor(Math.random() * houseSpecs.length);
  baseArray(d, x, floorNum, pickHouse);

  let pickWindow = Math.floor(Math.random() * windowSpecs.length);;
  windowArray(d, x, floorNum, winNum, pickHouse, pickWindow);

  let pickRoof =  Math.floor(Math.random() * roofSpecs.length);
  roofArray(d, x, floorNum, pickHouse, pickRoof);

  let pickDoor = Math.floor(Math.random() * doorSpecs.length);
  doorArray(d, x, pickHouse, pickDoor);

  return houseSpecs[pickHouse][0];
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

}
