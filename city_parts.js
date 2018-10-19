"use strict"

// houseSpecs: width, height
let houseSpecs = [[300, 100],
                  [280, 140],
                  [300, 130],
                  [240, 100],
                  [240, 120]];

// windowSpecs: width, height, window
let windowSpecs = [[40, 60, windowA],
                   [33, 20, windowB],
                   [40, 60, windowC],
                   [30, 30, windowD],
                   [30, 20, windowE]];
// roofSpecs:  roof;
let roofSpecs = [roofA, roofB, roofC, roofD, roofE];
// doorSpecs: width of the door, door
let doorSpecs = [[40, doorA],
                 [60, doorB]];

var carInterval;
/*-------------------------------------------------Ground---------------------------------------------------*/

function ground(d){
    let innerDraw = d.nested();
    // draw the base
    innerDraw.rect(d.width(),100).move(0,800).fill('grey').stroke('black');
    let x_pos = 15;
    while(x_pos < d.width()){
      innerDraw.polygon([
          [x_pos + 20,850],
          [x_pos + 70,850],
          [x_pos + 73,846],
          [x_pos + 23,846]
      ]).fill('yellow');
      x_pos = x_pos + 100;
    }
}


/*---------------------------------------------Building Bases-----------------------------------------------*/
function baseArray(d,x,numOfFloor, pickHouse){
  let innerDraw = d.nested();
  let spec = houseSpecs[pickHouse];
  let index = 1;
  innerDraw.rect(spec[0],spec[1] * numOfFloor)
           .move(x,800 - spec[1] * numOfFloor)
           .fill('orange')
           .stroke({width: 1.5, color: 'black'});

  while(index <= numOfFloor){
    innerDraw.rect(spec[0],10)
              .move(x,800 - index * spec[1])
              .fill('grey')
              .stroke({width: 1.5, color: 'black'});
    index++;
  }

  bricks(d,x,800,spec[0], spec[1] * numOfFloor);

}


function bricks(d,x,y,w,h){
    let innerDraw = d.nested();
    let i = 0;
    let brick_width = 10;
    let brick_height = 5;
    while(i < h){
      let j = i % 10 == 0 ? 0 : brick_width / 2;
      while(j < w){
        innerDraw.rect(Math.min(brick_width, w - j), brick_height)
                 .move(x + j, y - i)
                 .fill('none')
                 .stroke({color: 'black', opacity: 0.05});
        j += brick_width;
      }
      i += brick_height;
    }
}

/*--------------------------------------------Building Windows-----------------------------------------------*/
function windowArray(d, x, floorNum, windowNum, pickHouse, pickWindow){
  let houseSpec = houseSpecs[pickHouse];
  let windowSpec = windowSpecs[pickWindow];
  let yInit = (houseSpec[1] + windowSpec[1]) / 2 ;
  if(floorNum == 1){
    windowSpec[2](d, x + 0.1 * houseSpec[0], 800 - yInit);
    windowSpec[2](d, x + 0.9 * houseSpec[0] - windowSpec[0], 800 - yInit);
  } else {
    let i = 1;
    let xIncreased = (houseSpec[0] - windowNum * windowSpec[0]) / (windowNum + 1);
    while(i < floorNum){
      let j = 1;
      while(j <= windowNum){
        //800 - yInit - houseSpecs[1] * (i + 1)
        windowSpec[2](d, x + xIncreased * j + windowSpec[0] * (j - 1),
                      800 - yInit - i * houseSpec[1]);
        j++;
      }
      i++;
    }
  }
}

function windowA(d,x,y){
    let innerDraw = d.nested();
    innerDraw.rect(40,60).move(x,y).fill('lightblue').stroke({width: 2, color: 'white'});
    // two panes
    innerDraw.rect(2,60).move(x + 18.5,y).fill('white');
    // six panes
    innerDraw.rect(40,2).move(x, y + 20).fill('white');
    innerDraw.rect(40,2).move(x, y + 40).fill('white');
}

function windowB(d,x,y){
    let innerDraw = d.nested();
    innerDraw.rect(33,32).move(x,y).fill('white');
    innerDraw.circle(33).center(x + 16.5,y).fill('white');
    innerDraw.rect(30,30).move(x + 1.5,y).fill('lightblue');
    innerDraw.circle(30).center(x + 16.5,y).fill('lightblue');
    innerDraw.rect(2,46).center(x + 16.5,y + 7).fill('white');
}


function windowC(d,x,y){
    let innerDraw = d.nested();
    innerDraw.rect(40,60).move(x,y).fill('lightblue').stroke({width: 2, color: 'white'});
    // two panes
    innerDraw.rect(2,60).move(x + 18.5,y).fill('white');
}


function windowD(d,x,y){
    let innerDraw = d.nested();
    innerDraw.rect(30,30).move(x,y).fill('lightblue').stroke({width: 2, color: 'white'});
    // four panes
    innerDraw.rect(30,2).move(x,y + 13.5).fill('white');
    innerDraw.rect(2,30).move(x + 13.5,y).fill('white');
}


function windowE(d,x,y){
    let innerDraw = d.nested();
    innerDraw.rect(30,20).move(x,y).fill('lightblue').stroke({width: 2, color: 'white'});
}
/*--------------------------------------------Building Roofs------------------------------------------------*/
function roofArray(d, x, floorNum, pickHouse, pickRoof){
  let houseSpec = houseSpecs[pickHouse];
  // roofSpecs[pickRoof]
  roofSpecs[pickRoof](d, x, 800 - floorNum  * houseSpec[1], houseSpec[0]);
}

function roofA(d,x,y, w){
    let innerDraw = d.nested();
    innerDraw.rect(w-2,78).move(x + 1,y - 80).fill('brown').stroke({width: 4, color: 'black'});
}

function roofB(d,x,y, w){
    let innerDraw = d.nested();
    innerDraw.polygon([
        [3,60],
        [w - 3,60],
        [w - 40,0],
        [40,0]
    ]).move(x + 3,y - 60).fill('brown').stroke({width: 4, color: 'black'});
}

function roofC(d,x,y, w){
    let innerDraw = d.nested();
    innerDraw.polygon([
        [3,69],
        [w - 3,69],
        [w / 2,0]
    ]).move(x + 3,y - 69 ).fill('brown').stroke({width: 4, color: 'black'});
}

function roofD(d,x,y, w){
    let innerDraw = d.nested();
    innerDraw.polygon([
        [40,59],
        [w - 40,59],
        [w / 2,0]
    ]).move(x + 40,y - 59).fill('brown').stroke({width: 4, color: 'black'});
}

function roofE(d,x,y, w){
    let innerDraw = d.nested();
    innerDraw.rect(w-2,78).move(x + 1,y - 80).fill('brown').stroke({width: 4, color: 'black'});
}

function roofStripe (d,x,y){
    let innerDraw = d.nested();
    innerDraw.rect(10,50).move(x,y).fill('orange');
    innerDraw.circle(10).center(x+5,y).fill('orange');
    innerDraw.circle(10).center(x+5,y+50).fill('orange');
}
/*--------------------------------------------Building Doors------------------------------------------------*/
function doorArray(d, x, pickHouse, pickDoor){
  let houseSpec = houseSpecs[pickHouse];
  let doorSpec = doorSpecs[pickDoor];
  doorSpec[1](d, x + houseSpec[0] / 2 - doorSpec[0] / 2);
}
function doorA(d,x){
    let innerDraw = d.nested();
    innerDraw.rect(40,70).move(x,730).fill('grey').stroke({width: 2, color: 'black'});
    innerDraw.circle(6).center(x,765).fill('green').stroke('black');
}

function doorB(d,x){
    let innerDraw = d.nested();
    innerDraw.rect(60,60).move(x,740).fill('green').stroke({width: 2, color: 'black'});
    // draw door mid stroke
    innerDraw.rect(2,60).move(x + 30 ,740).fill('black');
    // draw door handle
    innerDraw.rect(3,6).move(x, 768).fill('grey').stroke('black');
    innerDraw.rect(3,6).move(x, 768).fill('grey').stroke('black');
}
/*-------------------------------------------------Car---------------------------------------------------------*/
/*
    Function:       car

    Description:    Draws a car


    Parameters:     d = SVG drawing area
                    x = horizontal coordinate,
                    y = vertical coordinate

    Author:         Suifeng Liu
*/

function drawCar(d){
   clearInterval(carInterval)
   carInterval = setInterval(function(){
    let level = Math.random() <= 0.5 ? 230 : 290;
    car(d, 0, level).animate(2500).x(d.width());
  }, 2000);
}
function car (d,x,y) {
    let carparts = d.nested();
    // Draw the body
    carparts.polygon([
        [0,100],
        [220,100],
        [220,50],
        [170,50],
        [150,0],
        [70,0],
        [50,50],
        [0,50]
      ]).move(x,y + 475).fill(getRandomColor()).stroke({width: 2});

    // Draw the glass
    carparts.polygon([
        [55,50],
        [73,4],
        [105,4],
        [105,50]
    ]).move(x + 55,y + 480).fill("#6E8898").stroke({width: 2});

    carparts.polygon([
        [63,50],
        [63,4],
        [98,4],
        [115,50]
    ]).move(x + 112, y + 480).fill("#6E8898").stroke({width: 2});
    // Draw the tires
    carparts.circle(40).center(x + 40, y + 575).fill('grey').stroke({width: 8});
    carparts.circle(40).center(x + 180,y + 575).fill('grey').stroke({width: 8});
    return carparts;
}

function getRandomColor(){
   var letters = '0123456789ABCDEF';
   var colors = '#';
   var i = 0;
   while (i < 6) {
       colors += letters[Math.floor(Math.random() * 16)];
       i++;
   }
   return colors;
}
