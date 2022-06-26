
let battleModeOption, themeSound;
let startBattleSound, battleThemeSound;

let playerPC, redEnemy, greenEnemy, blueEnemy, yellowEnemy, enemyGroup;

let upControl, downControl, leftControl, rightControl;
let gameState = 1;
let bombs = 1;

let wallGroup, topWall, bottonWall, leftWall, rightWall, wallImg, destroyerWallGroup;
let brick, brickGroup;

function preload() {
  
  themeSound = loadSound("./audio/Intro.mp3");
  startBattleSound = loadSound("./audio/BattleStart.mp3");
  startBattleSound.looping = false;
  battleThemeSound = loadSound("./audio/BattleTheme.mp3");
/*
  introImg = loadImage("./assets/SuperBomberman4Intro.png");
  battleStage01Img = loadImage("./assets/BattleStage01.png");
  upWalkingAni = loadAnimation("./assets/UpAnimation/UpWalking01.png", "./assets/UpAnimation/UpWalking01.png");
  topStop = loadImage("./assets/UpAnimation/TopStop.png");
  downWalkingAni = loadAnimation("./assets/DownAnimation/DownWalking01.png", "./assets/DownAnimation/DownWalking01.png");
  lowDown = loadImage("./assets/DownAnimation/LowDown.png");
  leftWalkingAni = loadAnimation("./assets/LeftAnimation/LeftWalking01.png", "./assets/LeftAnimation/LeftWalking01.png");
  leftDown = loadImage("./assets/LeftAnimation/LeftDown.png");
  rightWalkingAni = loadAnimation("./assets/RightAnimation/RightWalking01.png", "./assets/RightAnimation/RightWalking01.png");
  rightDown = loadImage("./assets/RightAnimation/RightDown.png");

  playerPCImg = loadImage("./assets/DownAnimation/LowDown.png");
*/
  wallImg = loadImage("./assets/wall.png");

}

function setup() {

  displayW = windowWidth;
  displayH = windowHeight;
  createCanvas(displayW, displayH);

  playerPC = createSprite(displayW/2 - 357, displayH/2 - 225, 45, 45);
  playerPC.visible = false;
  playerPC.shapeColor = "white";

  enemyGroup = new Group();
  redEnemy = createSprite(displayW/2 + 363.5, displayH/2 - 225, 45, 45);
  redEnemy.visible = false;
  redEnemy.shapeColor = "red";
  enemyGroup.add(redEnemy);
  greenEnemy = createSprite(displayW/2 + 3, displayH/2, 45, 45);
  greenEnemy.visible = false;
  greenEnemy.shapeColor = "green";
  enemyGroup.add(greenEnemy);
  blueEnemy = createSprite(displayW/2 - 357, displayH/2 + 225, 45, 45);
  blueEnemy.visible = false;
  blueEnemy.shapeColor = "blue";
  enemyGroup.add(blueEnemy);
  yellowEnemy = createSprite(displayW/2 + 363.5, displayH/2 + 225, 45, 45);
  yellowEnemy.visible = false;
  yellowEnemy.shapeColor = "yellow";
  enemyGroup.add(yellowEnemy)

  battleModeOption = createImg("./assets/BattleGameOption.png");
  battleModeOption.position(displayW/4, displayH/2 + 150);
  battleModeOption.size(displayW/3 + 200, displayH/16);
  battleModeOption.hide();
  battleModeOption.class("startButton");
  battleModeOption.mouseClicked(forBattleMode);

  topWall = createSprite(displayW/2, displayH/2 - 270, displayW, 45);
  topWall.shapeColor = "grey";
  bottonWall = createSprite(displayW/2, displayH/2 + 270, displayW, 45);
  bottonWall.shapeColor = "grey";
  leftWall = createSprite(-24.5, displayH/2, 270, displayH);
  leftWall.shapeColor = "grey";
  rightWall = createSprite(displayW + 30.5, displayH/2, 270, displayH);
  rightWall.shapeColor = "grey";
  
  upControl = createImg("./assets/Arrows/Up_Arrow.png");
  upControl.position(displayW/8, displayH - 210);
  upControl.size(displayW/13, displayH/6);
  upControl.hide();
  downControl = createImg("./assets/Arrows/Down_Arrow.png");
  downControl.position(displayW/8, displayH - 90);
  downControl.size(displayW/13, displayH/6);
  downControl.mouseClicked(forDown);
  downControl.hide();
  leftControl = createImg("./assets/Arrows/Left_Arrow.png");
  leftControl.position(displayW/17 - 5, displayH - 140);
  leftControl.size(displayW/10, displayH/7 - 6);
  leftControl.mouseClicked(forLeft);
  leftControl.hide();
  rightControl = createImg("./assets/Arrows/Right_Arrow.png");
  rightControl.position(displayW/5 - 25, displayH - 140);
  rightControl.size(displayW/10, displayH/7 - 6);
  rightControl.mouseClicked(forRight);
  rightControl.hide();

  if(gameState == 2) {
    if(startBattleSound.isPlaying() !== true) {
      //battleThemeSound.play();
    }
  }
  if(gameState == 0) {

    battleModeOption.show();
    
    /*themeSound.play();
    themeSound.loop();*/
  }
    wallGroup = new Group();
    wallGenerator(displayH/2 - 180);
    wallGenerator(displayH/2 - 90);
    wallGenerator(displayH/2);
    wallGenerator(displayH/2 + 90);
    wallGenerator(displayH/2 + 180);

    destroyerWallGroup = new Group();
    bombs = new Group();

    brickGroup = new Group();
    wBrickGenerator1(displayH/2 - 135);
    wBrickGenerator1(displayH/2 + 135);
    wBrickGenerator2(displayH/2 - 45);
    wBrickGenerator2(displayH/2 + 45);
    wBrickGenerator3(displayH/2 - 45);
    wBrickGenerator3(displayH/2 + 45);
    wBrickGenerator4(displayH/2 - 225);
    wBrickGenerator4(displayH/2 + 225);

    hBrickGenerator1(displayW/2 - 266.5);
    hBrickGenerator1(displayW/2 - 177);
    hBrickGenerator1(displayW/2 - 87);
    hBrickGenerator1(displayW/2 + 273.5);
    hBrickGenerator1(displayW/2 + 183.5);
    hBrickGenerator1(displayW/2 + 93);
    hBrickGenerator2(displayW/2 - 357);
    hBrickGenerator2(displayW/2 + 363);
    hBrickGenerator3(displayW/2 + 3);
    hBrickGenerator4(displayW/2 + 3);

}

function draw() {

  background("darkgreen");

  playerPC.collide(topWall);
  playerPC.collide(bottonWall);
  playerPC.collide(leftWall);
  playerPC.collide(rightWall);
  playerPC.collide(wallGroup);
  playerPC.collide(brickGroup);
  redEnemy.collide(topWall);
  redEnemy.collide(bottonWall);
  redEnemy.collide(leftWall);
  redEnemy.collide(rightWall);
  redEnemy.collide(wallGroup);
  redEnemy.collide(brickGroup);
  greenEnemy.collide(topWall);
  greenEnemy.collide(bottonWall);
  greenEnemy.collide(leftWall);
  greenEnemy.collide(rightWall);
  greenEnemy.collide(wallGroup);
  greenEnemy.collide(brickGroup);
  blueEnemy.collide(topWall);
  blueEnemy.collide(bottonWall);
  blueEnemy.collide(leftWall);
  blueEnemy.collide(rightWall);
  blueEnemy.collide(wallGroup);
  greenEnemy.collide(brickGroup);
  yellowEnemy.collide(topWall);
  yellowEnemy.collide(bottonWall);
  yellowEnemy.collide(leftWall);
  yellowEnemy.collide(rightWall);
  yellowEnemy.collide(wallGroup);
  yellowEnemy.collide(brickGroup);
  
  if(gameState == 1) {

    /*upControl.show();
    downControl.show();
    leftControl.show();
    rightControl.show();*/
    playerPC.visible = true;
    redEnemy.visible = true;
    greenEnemy.visible = true;
    blueEnemy.visible = true;
    yellowEnemy.visible = true;

    if(startBattleSound.isPlaying() == false) {
      gameState = 2;
    }

  }

  if(gameState == 2) {
    if(keyDown("S")) {
      playerPC.y = playerPC.y + 8;
    }
    if(keyDown("W")) {
      playerPC.y = playerPC.y - 8;
    }
    if(keyDown("A")) {
      playerPC.x = playerPC.x - 8;
    }
    if(keyDown("D")) {
      playerPC.x = playerPC.x + 8;
    }
  }
  
  //console.log(gameState);
  drawSprites();
}

function wallGenerator(y) {
  for(let w = 0; w < 8; w++) {
    let wall = createSprite(w * 90 + displayW/5.5, y, 45, 45);
    //wall.addImage(wallImg);
    //wall.scale = 3.5;
    wall.shapeColor = "grey";
    //wall.visible = false;
    wallGroup.add(wall);
  }
}

function wBrickGenerator1(y) {
  for(let b = 0; b < 17; b++) {
    brick = createSprite(b * 45 + displayW/2 - 357, y, 45.1, 45);
    brick.shapeColor = "darkgrey";
    brickGroup.add(brick);
  }
}

function wBrickGenerator2(y) {
  for(let b = 0; b < 7; b++) {
    brick = createSprite(b * 45 + displayW/2 - 357, y, 45.1, 45);
    brick.shapeColor = "darkgrey";
    brickGroup.add(brick);
  }
}

function wBrickGenerator3(y) {
  for(let b = 0; b < 7; b++) {
    brick = createSprite(b * 45 + displayW/2 + 93, y, 45.1, 45);
    brick.shapeColor = "darkgrey";
    brickGroup.add(brick);
  }
}

function wBrickGenerator4(y) {
  for(let b = 0; b < 13; b++) {
    brick = createSprite(b * 45 + displayW/2 - 267, y, 45.1, 45);
    brick.shapeColor = "darkgrey";
    brickGroup.add(brick);
  }
}

function hBrickGenerator1(x) {
  for(let b = 0; b < 5; b++) {
    brick = createSprite(x, b * 90 + displayH/2 - 180, 45.1, 44.8);
    brick.shapeColor = "darkgrey";
    brickGroup.add(brick);
  }
}

function hBrickGenerator2(x) {
  for(let b = 0; b < 3; b++) {
    brick = createSprite(x, b * 90 + displayH/2 - 90, 45.1, 44.8);
    brick.shapeColor = "darkgrey";
    brickGroup.add(brick);
  }
}

function hBrickGenerator3(x) {
  for(let b = 0; b < 2; b++) {
    brick = createSprite(x, b * 90 + displayH/2 - 180, 45.1, 44.8);
    brick.shapeColor = "darkgrey";
    brickGroup.add(brick);
  }
}

function hBrickGenerator4(x) {
  for(let b = 0; b < 2; b++) {
    brick = createSprite(x, b * 90 + displayH/2 + 90, 45.1, 44.8);
    brick.shapeColor = "darkgrey";
    brickGroup.add(brick);
  }
}

function forBattleMode() {
  if(gameState == 0) {
    gameState = 1;
    themeSound.stop();
    battleModeOption.hide();
    startBattleSound.play();
  }
}

function forUp() {
  if(gameState == 2) {
    playerPC.y = playerPC.y - 5;
  }
}

function forDown() {
  if(gameState == 2) {
    playerPC.y = playerPC.y + 5;
  }
}

function forLeft() {
  if(gameState == 2) {
    playerPC.x = playerPC.x - 5;
  }
}

function forRight() {
  if(gameState == 2) {
    playerPC.x = playerPC.x + 5;
  }
}

function keyPressed() {
  if(keyCode === 32 && gameState == 2) {
    console.log(bombs);
    bombGenerator(playerPC.x, playerPC.y);
  }
}

function bombGenerator(x, y) {
  bomb = createSprite(x, y, 65, 45);
  bomb.shapeColor = "black";
  bomb.debug = true;
  bomb.setCollider("rectangle", 0, 0, 180, 200);
  bombs.add(bomb);
  setTimeout(() => {
    bomb.destroy();
  }, 2000);
}

function explosion(index) {
  
}
