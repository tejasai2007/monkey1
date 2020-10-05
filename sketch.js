var bananaGroup,obstacleGroup,ground;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;

var score;
var survivalTime = 0;   

var PLAY = 1;
var END = 0;

var gameState = PLAY;

function preload(){
  
  monkey_running =                loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 createCanvas(600,400);
  
 score = 0;
  
 monkey = createSprite(100,310,20,20);
 monkey.addAnimation("running", monkey_running);
 monkey.scale = 0.1;
 
 

  
  ground = createSprite(300,350,600,30);
  ground.velocityX = -4;
  ground.x = ground.x/2;
  
  monkey.setCollider("rectangle",0,0,350,600);
  //monkey.debug = true;
  
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
 
}


function draw() {
 background("white");
  monkey.collide(ground);  
 if(gameState === PLAY){
  
   survivalTime = 0;
   
  if(keyDown("space")&&monkey.y >= 250) {
     monkey.velocityY = -15;
  }
   monkey.velocityY = monkey.velocityY + 1;
   
 
   
   survivalTime = Math.round(frameCount/getFrameRate());
 
  obstacles();
  bananas();

   if(obstacleGroup.isTouching(monkey)){
    gameState = END;
     
   }
 }
if(gameState === END){
 obstacleGroup.setVelocityEach(0);
  obstacleGroup.destroyEach();
  ground.velocityX = 0;
  monkey.velocityY = 0;
  
  
  stroke("black");
  textSize(15 + 15);
  fill("yellow");
  text("GAME OVER !",200,200);
  
 bananaGroup.setLifetimeEach(0);
}

  stroke("black");
  textSize(15);
  fill("black");
  
  text("Score: " + score,500,50);
  text("survivalTime: " + survivalTime + ";",380,50);
 
  if(ground.x <= 300){
    ground.x = ground.width/2;  
     
   }
 
  drawSprites();
}


function bananas(){
 if(frameCount%80 === 0){
  banana = createSprite(500,100,20,20);     
  banana.addImage(bananaImage);
  banana.scale = 0.1;
  banana.velocityX = -4;
  banana.y = Math.round(random(120,200));
  bananaGroup.add(banana);
  bananaGroup.setLifetimeEach(-1);
  }
}

function obstacles(){
 if(frameCount%300 === 0){
  obstacle = createSprite(600,300,20,20);
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.2;
  obstacle.velocityX = -7;
  obstacle.lifetime = -1 ;
  obstacleGroup.add(obstacle);
 }
}

