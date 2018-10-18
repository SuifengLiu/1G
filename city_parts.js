"use strict"
/*--------------------------------------------------Array----------------------------------------------------*/
 function rectArray(hDis,vDis,hNum,vNum,d,x,y,func, w, h, pos) {
    if (vNum == 0){
        var buildingWidth = hDis * hNum;
        func(d, pos + buildingWidth * 0.15, y + vDis, w, h);
        func(d, pos + buildingWidth * 0.73, y + vDis, w, h);
    } else {
        let i = 0;
        let j = 0;
        while(i < hNum){
            while(j < vNum){
                func(d,x + i * hDis,y - j * vDis,w,h);
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
    innerDraw.rect(d.width(),100).move(0,800).fill('grey').stroke('black');
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
function baseArray(d,x,numOfFloor, width, height){
    rectArray(0,height,1,numOfFloor,d,x,800 - height,buildingBase, width, height);
}

function buildingBase(d,x,y, width, height){
    let innerDraw = d.nested();
    innerDraw.rect(width,height).move(x,y).fill('orange').stroke({width: 1.5, color: 'black'});
    innerDraw.rect(width,10).move(x,y).fill('grey').stroke({width: 1.5, color: 'black'});
    // create the bricks
    bricks(d,x,y,width, height);
}

function bricks(d,x,y,w,h){
    rectArray(10,10,w/10,h/10,d,x,y + h - 5, wallStripes, w, h);
    rectArray(10,10,w/10 - 1,h/10,d,x + 5,y + h - 10, wallStripes);
}

function wallStripes(d,x,y){
    let innerDraw = d.nested();
    innerDraw.rect(10,5).move(x,y).fill('none').stroke({color: 'black', opacity: 0.05});
}
/*--------------------------------------------Building Windows-----------------------------------------------*/
function windowAArray(d,x,floorNum,winNum,w,h){
    rectArray(w / winNum,h,winNum,floorNum - 1,d,x + 11 * (6-winNum) + (5-winNum),720-h,windowA, w,d, x);
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

function windowBArray(d,x,floorNum,winNum, w, h){
    rectArray(w / winNum,h,winNum,floorNum - 1,d,x + 7 * (6-winNum) + (5-winNum),760-h,windowB, w,d, x);
}

function windowB(d,x,y){
    let innerDraw = d.nested();
    innerDraw.rect(33,32).move(x,y).fill('white');
    innerDraw.circle(33).center(x + 16.5,y).fill('white');
    innerDraw.rect(30,30).move(x + 1.5,y).fill('lightblue');
    innerDraw.circle(30).center(x + 16.5,y).fill('lightblue');
    innerDraw.rect(2,46).center(x + 16.5,y + 7).fill('white');
}

function windowCArray(d,x,floorNum,winNum, w, h){
    rectArray(w / winNum,h,winNum,floorNum - 1,d,x + 11 * (6-winNum) + (5-winNum),720-h,windowC, w, h, x);
}

function windowC(d,x,y){
    let innerDraw = d.nested();
    innerDraw.rect(40,60).move(x,y).fill('lightblue').stroke({width: 2, color: 'white'});
    // two panes
    innerDraw.rect(2,60).move(x + 18.5,y).fill('white');
}

function windowDArray(d,x,floorNum,winNum, w, h){
    rectArray(w / winNum,h,winNum,floorNum - 1,d,x + 7 * (6-winNum) + (5-winNum),740-h,windowD, w,h, x);
}

function windowD(d,x,y){
    let innerDraw = d.nested();
    innerDraw.rect(30,30).move(x,y).fill('lightblue').stroke({width: 2, color: 'white'});
    // four panes
    innerDraw.rect(30,2).move(x,y + 13.5).fill('white');
    innerDraw.rect(2,30).move(x + 13.5,y).fill('white');
}

function windowEArray(d,x,floorNum,winNum,w, h){
    rectArray(w / winNum,h,winNum,floorNum - 1,d,x + 7 * (6-winNum) + (5-winNum),720-h,windowE,w,h, x);
}

function windowE(d,x,y){
    let innerDraw = d.nested();
    innerDraw.rect(30,20).move(x,y).fill('lightblue').stroke({width: 2, color: 'white'});
}
/*--------------------------------------------Building Roofs------------------------------------------------*/
function roofA(d,x,y, w, h){
    let innerDraw = d.nested();
    innerDraw.rect(w-2,78).move(x + 1,y).fill('brown').stroke({width: 4, color: 'black'});
    bricks(d,x,y,w,80);
    rectArray(20,0,w / 20 - 1,1,d,x + 12.5,y + 15,roofStripe);
}

function roofB(d,x,y, w){
    let innerDraw = d.nested();
    innerDraw.polygon([
        [3,60],
        [w - 3,60],
        [w - 40,0],
        [40,0]
    ]).move(x + 3,y).fill('brown').stroke({width: 4, color: 'black'});
}

function roofC(d,x,y, w){
    let innerDraw = d.nested();
    innerDraw.polygon([
        [3,69],
        [w - 3,69],
        [w / 2,0]
    ]).move(x + 3,y).fill('brown').stroke({width: 4, color: 'black'});
}

function roofD(d,x,y, w){
    let innerDraw = d.nested();
    innerDraw.polygon([
        [40,59],
        [w - 40,59],
        [w / 2,0]
    ]).move(x + 40,y).fill('brown').stroke({width: 4, color: 'black'});
}

function roofE(d,x,y, w){
    let innerDraw = d.nested();
    innerDraw.rect(w-2,78).move(x + 1,y).fill('brown').stroke({width: 4, color: 'black'});
    bricks(d,x,y,w,80);
    rectArray(20,0,w / 20 - 1,1,d,x + 10,y + 15,roofStripe);
}

function roofStripe (d,x,y){
    let innerDraw = d.nested();
    innerDraw.rect(10,50).move(x,y).fill('orange');
    innerDraw.circle(10).center(x+5,y).fill('orange');
    innerDraw.circle(10).center(x+5,y+50).fill('orange');
}
/*--------------------------------------------Building Doors------------------------------------------------*/

function doorA(d,x, w){
    let innerDraw = d.nested();
    innerDraw.rect(40,70).move(x + w / 2 - 20,730).fill('grey').stroke({width: 2, color: 'black'});
    innerDraw.circle(6).center(x + w / 2 - 15,765).fill('green').stroke('black');
}

function doorB(d,x,w){
    let innerDraw = d.nested();
    innerDraw.rect(60,60).move(x + w/2 - 30,740).fill('green').stroke({width: 2, color: 'black'});
    // draw door mid stroke
    innerDraw.rect(2,60).move(x + w/2 - 1 ,740).fill('black');
    // draw door handle
    innerDraw.rect(3,6).move(x + w/ 2 + 3, 768).fill('grey').stroke('black');
    innerDraw.rect(3,6).move(x + w/ 2 - 8, 768).fill('grey').stroke('black');
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
