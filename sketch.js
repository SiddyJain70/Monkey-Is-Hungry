var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup;
var jungleImage,jungle;
var ground,groundImage;

var monkeydeadImage;

var score=0;
var survivalTime=0;


var gameOverImg,restartImg;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  jungleImage = loadImage("jungle image.jpg");
 
  restartImg = loadImage("restart.png");
  gameOverImg = loadImage("gameOver.png");
  
 monkeydeadImage = loadImage("sprite_1.png"); 
}



function setup() {
  
  createCanvas(800,400);
  
  jungle=createSprite(0,0,800,400);
  jungle.addImage(jungleImage);
  jungle.scale=1.5;
  jungle.x=jungle.width/2;
  jungle.velocityX=-4;
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
 
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = false;
  
  score = 0;
  survivalTime=0;
  
}


function draw() {

background(255);
  
  
  if(gameState === PLAY){
    
    gameOver.visible = false;
    restart.visible = false;
    
    survivalTime =survivalTime + Math.round(frameRate()/60);
    
   if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(jungle.x<100){
    jungle.x=jungle.width/2;
  }
  
  if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
    score = score + 2;
    }
  
  if(keyDown("space") && monkey.y >= 300) {
      monkey.velocityY = -20;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);
    spawnFood();
    spawnObstacles();
    
     if(obstaclesGroup.isTouching(monkey)){
    gameState = END;
       
       ground.velocityX=0;
       jungle.velocityX=0;
        monkey.velocityX=0;
       
       FoodGroup.destroyEach();
       obstaclesGroup.destroyEach();
       
       
      
     
     }
  }
  else if (gameState === END) {
    
      gameOver.visible = true;
      restart.visible = true;
   
    
      ground.velocityX = 0;
      monkey.velocityY = 0;
     
   
  
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);    
  
    monkey.visible=false;
    
     if(mousePressedOver(restart)) {
      reset();
  
   }
}
  
 
  //stop trex from falling down
  monkey.collide(ground);
  
  
    
 
  
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
  
  stroke("black");
    textSize(20);
    fill("yellow");
   
    text("Survival Time: "+ survivalTime, 100,50)
 
  
}

function reset(){
  
  gameState=PLAY;
  
  monkey.visible=true;
  gameOver.visible=false;
  restart.visible=false;
  
 FoodGroup.destroyEach();
 obstaclesGroup.destroyEach();
  
  jungle.x=jungle.width/2;
  jungle.velocityX=-4;
  
   ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  score=0;
  survivalTime=0;
}


function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImage);
    banana.scale = 0.09;
    banana.velocityX = -5;
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleImage);
    
    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.3;
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
