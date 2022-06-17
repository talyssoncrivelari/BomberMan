
let intro, battleModeOption, themeSound;
let startBattleSound, battleThemeSound;
let battleStage01;

let playerPC, playerPCImg;
let topStop, lowDown, leftDown, rightDown;
let upWalkingAni, downWalkingAni, leftWalkingAni, rightWalkingAni;

let upControl, downControl, leftControl, rightControl;
let gameState = 0;

let wallGroup;

function preload() {

  themeSound = loadSound("./audio/Intro.mp3");
  startBattleSound = loadSound("./audio/BattleStart.mp3");
  battleThemeSound = loadSound("./audio/BattleTheme.mp3");

  upWalkingAni = loadAnimation("./assets/UpAnimation/UpWalking01.png", "./assets/UpAnimation/UpWalking01.png");
  topStop = loadImage("./assets/UpAnimation/TopStop.png");
  downWalkingAni = loadAnimation("./assets/DownAnimation/DownWalking01.png", "./assets/DownAnimation/DownWalking01.png");
  lowDown = loadImage("./assets/DownAnimation/LowDown.png");
  leftWalkingAni = loadAnimation("./assets/LeftAnimation/LeftWalking01.png", "./assets/LeftAnimation/LeftWalking01.png");
  leftDown = loadImage("./assets/LeftAnimation/LeftDown.png");
  rightWalkingAni = loadAnimation("./assets/RightAnimation/RightWalking01.png", "./assets/RightAnimation/RightWalking01.png");
  rightDown = loadImage("./assets/RightAnimation/RightDown.png");

  playerPCImg = loadAnimation("./assets/DownAnimation/LowDown.png");

}

function setup() {

  displayW = windowWidth;
  displayH = windowHeight;
  createCanvas(displayW, displayH);

  playerPC = createSprite(displayW/9 + 5, displayH/32 - 5);
  playerPC.addAnimation("down", playerPCImg);
  //playerPC.visible = false;
  /*playerPC = createSprite(200, 200);
  playerPC.addImage(topStop);*/
  playerPC.scale = 5;
  
  upControl = createImg("./assets/Arrows/Up_Arrow.png");
  upControl.position(displayW/8, displayH - 210);
  upControl.size(displayW/13, displayH/6);
  //upControl.hide();
  downControl = createImg("./assets/Arrows/Down_Arrow.png");
  downControl.position(displayW/8, displayH - 90);
  downControl.size(displayW/13, displayH/6);
  //downControl.hide();
  leftControl = createImg("./assets/Arrows/Left_Arrow.png");
  leftControl.position(displayW/17 - 5, displayH - 140);
  leftControl.size(displayW/10, displayH/7 - 6);
  //leftControl.hide();
  rightControl = createImg("./assets/Arrows/Right_Arrow.png");
  rightControl.position(displayW/5 - 25, displayH - 140);
  rightControl.size(displayW/10, displayH/7 - 6);
  //rightControl.hide();

  intro = createImg("./assets/SuperBomberman4Intro.png");
  intro.position(displayW/2048, displayH/2048);
  intro.size(displayW, displayH);
  intro.hide();
  battleModeOption = createImg("./assets/BattleGameOption.png");
  battleModeOption.position(displayW/4, displayH/2 + 150);
  battleModeOption.size(displayW/3 + 200, displayH/16);
  battleModeOption.hide();
  battleModeOption.class("startButton");
  battleModeOption.mouseClicked(forBattleMode);

  battleStage01 = createImg("./assets/BattleStage01.png");
  battleStage01.position(displayW/2048, displayH/2048);
  battleStage01.size(displayW, displayH);
  battleStage01.hide();
  battleStage01.class("stage1")


  
  

  if(gameState == 0) {
    //playerPC.visible = true;
    intro.show();
    battleModeOption.show();
    themeSound.play();
    themeSound.loop();
    upControl.show();
    downControl.show();
    leftControl.show();
    rightControl.show();
    
  }
  
    /*playerPC = new Player(displayW/2, displayH/2);
    wallGroup = new Group();
    wallGenerator(30);*/
}

function draw() {

 // background("green");

  //upControl.mouseClicked(forUp);

  if(gameState == 1) {
  
    
    //playerPC.visible = true
     battleStage01.show();
    /*if(startBattleSound.isPlaying() >= 1) {
      startBattleSound.stop();
    }*/
    if(startBattleSound.isPlaying() == false) {
      gameState = 1.1;
    }
    if(gameState == 1.1) {
      battleThemeSound.play();
      battleThemeSound.looping = false;
    }
  }

  console.log(gameState);
  drawSprites();
}

function wallGenerator(y) {
  for(let w = 0; w < 4; w++) {
    let wall = createSprite(w * 170 + 25, y, 25, 25);
    wall.shapeColor = "grey";
    wallGroup.add(wall);
  }
}

function forBattleMode() {
  if(gameState == 0) {
    gameState = 1;
    themeSound.stop();
    intro.hide();
    battleModeOption.hide();
    startBattleSound.play();
  }
}

function forUp() {
  //playerPC.position({x:0, y:0}, {x:0, y:5});
}

function forDown() {

}

function forLeft() {

}

function forRight() {

}