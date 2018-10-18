"use strict"
/*--------------------------------------------------Array----------------------------------------------------*/
 function rectArray(hDis,vDis,hNum,vNum,d,x,y,func, pos) {
    if (vNum == 0){
        var buildingWidth = hDis * hNum;
        func(d, pos + buildingWidth * 0.15, y + vDis);
        func(d, pos + buildingWidth * 0.73, y + vDis);
    } else {
        let i = 0;
        let j = 0;
        while(i < hNum){
            while(j < vNum){
                func(d,x + i * hDis,y - j * vDis);
                j++;
            }
        j = 0;
        i++;
        }
    }
}
/*-------------------------------------------------Ground---------------------------------------------------*/

function ground(d){
    let innerDraw = d.nested();
    // draw the base
    innerDraw.rect(1280,100).move(0,800).fill('grey').stroke('black');
    rectArray(100,0,15,1,d,0,0,roadStrips);
}

function roadStrips (d,x,y){
    let innerDraw = d.nested();
    // draw the stripes
    innerDraw.polygon([
        [x + 20,y + 850],
        [x + 70,y + 850],
        [x + 73,y + 846],
        [x + 23,y + 846]
    ]).fill('yellow');
}

/*---------------------------------------------Building Bases-----------------------------------------------*/
function baseArray(d,x,numOfFloor){
    rectArray(0,wallHeight,1,numOfFloor,d,x,800 - wallHeight,buildingBase);
}

function buildingBase(d,x,y){
    let innerDraw = d.nested();
    innerDraw.rect(wallWidth,wallHeight).move(x,y).fill('orange').stroke({width: 1.5, color: 'black'});
    innerDraw.rect(wallWidth,10).move(x,y).fill('grey').stroke({width: 1.5, color: 'black'});
    // create the bricks
    bricks(d,x,y,wallWidth,wallHeight);
}

function bricks(d,x,y,w,h){
    rectArray(10,10,w/10,h/10,d,x,y + wallHeight - 5, wallStripes);
    rectArray(10,10,w/10 - 1,h/10,d,x + 5,y + wallHeight - 10, wallStripes);
}

function wallStripes(d,x,y){
    let innerDraw = d.nested();
    innerDraw.rect(10,5).move(x,y).fill('none').stroke({color: 'black', opacity: 0.05});
}
/*--------------------------------------------Building Windows-----------------------------------------------*/
function windowAArray(d,x,floorNum,winNum){
    rectArray(wallWidth / winNum,wallHeight,winNum,floorNum - 1,d,x + 11 * (6-winNum) + (5-winNum),720-wallHeight,windowA, x);
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

function windowBArray(d,x,floorNum,winNum){
    rectArray(wallWidth / winNum,wallHeight,winNum,floorNum - 1,d,x + 7 * (6-winNum) + (5-winNum),760-wallHeight,windowB, x);
}

function windowB(d,x,y){
    let innerDraw = d.nested();
    innerDraw.rect(33,32).move(x,y).fill('white');
    innerDraw.circle(33).center(x + 16.5,y).fill('white');
    innerDraw.rect(30,30).move(x + 1.5,y).fill('lightblue');
    innerDraw.circle(30).center(x + 16.5,y).fill('lightblue');
    innerDraw.rect(2,46).center(x + 16.5,y + 7).fill('white');
}

function windowCArray(d,x,floorNum,winNum){
    rectArray(wallWidth / winNum,wallHeight,winNum,floorNum - 1,d,x + 11 * (6-winNum) + (5-winNum),720-wallHeight,windowC, x);
}

function windowC(d,x,y){
    let innerDraw = d.nested();
    innerDraw.rect(40,60).move(x,y).fill('lightblue').stroke({width: 2, color: 'white'});
    // two panes
    innerDraw.rect(2,60).move(x + 18.5,y).fill('white');
}

function windowDArray(d,x,floorNum,winNum){
    rectArray(wallWidth / winNum,wallHeight,winNum,floorNum - 1,d,x + 7 * (6-winNum) + (5-winNum),740-wallHeight,windowD, x);
}

function windowD(d,x,y){
    let innerDraw = d.nested();
    innerDraw.rect(30,30).move(x,y).fill('lightblue').stroke({width: 2, color: 'white'});
    // four panes
    innerDraw.rect(30,2).move(x,y + 13.5).fill('white');
    innerDraw.rect(2,30).move(x + 13.5,y).fill('white');
}

function windowEArray(d,x,floorNum,winNum){
    rectArray(wallWidth / winNum,wallHeight,winNum,floorNum - 1,d,x + 7 * (6-winNum) + (5-winNum),720-wallHeight,windowE, x);
}

function windowE(d,x,y){
    let innerDraw = d.nested();
    innerDraw.rect(30,20).move(x,y).fill('lightblue').stroke({width: 2, color: 'white'});
}
/*--------------------------------------------Building Roofs------------------------------------------------*/
function roofA(d,x,y){
    let innerDraw = d.nested();
    innerDraw.rect(wallWidth-2,78).move(x + 1,y).fill('brown').stroke({width: 4, color: 'black'});
    bricks(d,x,y - 20,wallWidth,80);
    rectArray(20,0,wallWidth / 20 - 1,1,d,x + 12.5,y + 15,roofStripe);
}

function roofB(d,x,y){
    let innerDraw = d.nested();
    innerDraw.polygon([
        [3,60],
        [wallWidth - 3,60],
        [wallWidth - 40,0],
        [40,0]
    ]).move(x + 3,y).fill('brown').stroke({width: 4, color: 'black'});
}

function roofC(d,x,y){
    let innerDraw = d.nested();
    innerDraw.polygon([
        [3,69],
        [wallWidth - 3,69],
        [wallWidth / 2,0]
    ]).move(x + 3,y).fill('brown').stroke({width: 4, color: 'black'});
}

function roofD(d,x,y){
    let innerDraw = d.nested();
    innerDraw.polygon([
        [40,59],
        [wallWidth - 40,59],
        [wallWidth / 2,0]
    ]).move(x + 40,y).fill('brown').stroke({width: 4, color: 'black'});
}

function roofE(d,x,y){
    let innerDraw = d.nested();
    innerDraw.rect(wallWidth-2,78).move(x + 1,y).fill('brown').stroke({width: 4, color: 'black'});
    bricks(d,x,y - 40,wallWidth,80);
    rectArray(20,0,wallWidth / 20 - 1,1,d,x + 10,y + 15,roofStripe);
}

function roofStripe (d,x,y){
    let innerDraw = d.nested();
    innerDraw.rect(10,50).move(x,y).fill('orange');
    innerDraw.circle(10).center(x+5,y).fill('orange');
    innerDraw.circle(10).center(x+5,y+50).fill('orange');
}
/*--------------------------------------------Building Doors------------------------------------------------*/

function doorA(d,x){
    let innerDraw = d.nested();
    innerDraw.rect(40,70).move(x + wallWidth / 2 - 20,730).fill('grey').stroke({width: 2, color: 'black'});
    innerDraw.circle(6).center(x + wallWidth / 2 - 15,765).fill('green').stroke('black');
}

function doorB(d,x){
    let innerDraw = d.nested();
    innerDraw.rect(60,60).move(x + wallWidth/2 - 30,740).fill('green').stroke({width: 2, color: 'black'});
    // draw door mid stroke
    innerDraw.rect(2,60).move(x + wallWidth/2 - 1 ,740).fill('black');
    // draw door handle
    innerDraw.rect(3,6).move(x + wallWidth/ 2 + 3, 768).fill('grey').stroke('black');
    innerDraw.rect(3,6).move(x + wallWidth/ 2 - 8, 768).fill('grey').stroke('black');
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
                    ]).move(x,y + 475).fill('red').stroke({width: 2});
    
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

//function getRandomColor(){
//    var letters = '0123456789ABCDEF';
//    var colors = '#';
//    var i = 0;
//    while (i < 6) {
//        colors += letters[Math.floor(Math.random() * 16)];
//        i++;
//    }
//    return colors;
//}