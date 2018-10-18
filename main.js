"use strict"
/*------------------------------------------Global Variables----------------------------------------*/
let numberOfBuildings = 5; // Range 0-5
let numberOfFloors = 1; // Range 1-5
let numberOfWindows = 5; // Range 1-5

let wallWidth;
let wallHeight;

let houseAx = 5;
let houseBx = 310;
let houseCx = 535;
let houseDx = 840;
let houseEx = 1050;

/*---------------------------------------------Canvas-----------------------------------------------*/
// Set up drawings
let canvas = SVG("drawing");

// Set up canvas sizes
canvas.size(1280,900);

// draw rectangles around each canvas so you can see them for this demo
canvas.rect(canvas.width(), canvas.height()).fill("white").stroke("black");

/*---------------------------------------------City------------------------------------------------*/
ground(canvas);
drawCity(canvas,numberOfFloors,numberOfWindows,numberOfBuildings);



// Bill
//let arrayOfHouse = [drawHouseA, drawHouseB, drawHouseC, drawHouseD, drawHouseE];
//let arrayOfHouseX = [houseAx, houseBx, houseCx, houseDx, houseEx];

function drawCity(d,floorNum,winNum,buildingNum) {
//   Bill
//    let idx = 0;
//    while(idx < buildingNum) {
//        arrayOfHouse[idx](d, arrayOfHouseX[idx], floorNum, winNum);
//        idx++;
//    }
    
    if (buildingNum >= 1){
        drawHouseA(d,houseAx,floorNum,winNum);
    }
    
    if (buildingNum >= 2){
        drawHouseB(d,houseBx,floorNum,winNum);
    }
    
    if (buildingNum >= 3){
        drawHouseC(d,houseCx,floorNum,winNum);
    }
    
    if (buildingNum >= 4){
        drawHouseD(d,houseDx,floorNum,winNum);
    }
    
    if (buildingNum == 5){
        drawHouseE(d,houseEx,floorNum,winNum);
    }
//   if (buildingNum == 0){
//        drawHouseA(d,houseAx,floorNum,winNum);
//   } else if (buildingNum != 1) {
//        drawHouseB(d,houseBx,floorNum,winNum);
//   } else if (buildingNum != 2) {
//        drawHouseC(d,houseCx,floorNum,winNum);
//   } else if (buildingNum != 3) {
//        drawHouseD(d,houseDx,floorNum,winNum);
//   } else if (buildingNum != 4) {
//        drawHouseE(d,houseEx,floorNum,winNum);
//   } else {
//       canvas.clear();
//   }
    ground(d);
}
function drawHouseA(d,x,floorNum,winNum) {
    wallWidth = 300;
    wallHeight = 100;
    // draw the base of houseA
    baseArray(canvas,houseAx,floorNum);
    // draw the windows of houseA
    windowAArray(canvas,houseAx,floorNum,winNum);
    // draw roof of houseA
    roofA(d,houseAx,820 - (floorNum + 1) * wallHeight);
    // draw door
    doorA(d, houseAx);
}

function drawHouseB(d,x,floorNum,winNum){
    wallHeight = 80;
    wallWidth = 220;
    // draw the base of houseB
    baseArray(canvas,houseBx,floorNum);
    // draw the windows of houseB
    windowBArray(canvas,houseBx,floorNum,winNum);
    // draw the roof of houseB
    roofB(d,houseBx,820 - (floorNum + 1) * wallHeight);
    // draw the door of houseB
    doorB(d,houseBx); 
}

function drawHouseC(d,x,floorNum,winNum){
    wallHeight = 110;
    wallWidth = 300;
    // draw the base of houseC
    baseArray(canvas,houseCx,floorNum);
    // draw the windows of houseC
    windowCArray(canvas,houseCx,floorNum,winNum);
    // draw the roof of houseC
    roofC(d,houseCx,840 - (floorNum + 1) * wallHeight);
    // draw the door of houseC
    doorA(d,houseCx);
}

function drawHouseD(d,x,floorNum,winNum){
    wallHeight = 90;
    wallWidth = 200;
    // draw the base of houseD
    baseArray(canvas,houseDx,floorNum);
    // draw the windows of houseD
    windowDArray(canvas,houseDx,floorNum,winNum);
    // draw the roof of houseD
    roofD(d,houseDx,830 - (floorNum + 1) * wallHeight);
    // draw the door of houseD
    doorA(d,houseDx);
}

function drawHouseE(d,x,floorNum,winNum){
    wallHeight = 120;
    wallWidth = 210;
    // draw the base of houseE
    baseArray(canvas,houseEx,floorNum);
    // draw the windows of houseE
    windowEArray(canvas,houseEx,floorNum,winNum);
    // draw the roof of houseE
    roofE(d,houseEx,840 - (floorNum + 1) * wallHeight);
    // draw the door of houseE
    doorB(d,houseEx);
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
