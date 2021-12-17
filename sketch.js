var PLAY = 1;
var END = 0;
var gameState = PLAY;
var forkey, forkeyrun; 
var obstacle1, obstacle2, obstacle3;
var trash, trash1, trash2, trash3;
var back, backimg;
var restart, restart1;
var score = 0;
var trashGroup, obstacleGroup;

function preload(){
    forkeyrun = loadAnimation ("for-1.png","for-2.png");
    obstacle1 = loadImage ("Buzz.png");
    obstacle2 = loadImage ("Jessie.png");
    obstacle3 = loadImage ("Woody.png");
    trash1 = loadImage ("trash1.png");
    trash2 = loadImage ("trash2.png");
    trash3 = loadImage ("trash3.png");
    backimg = loadImage ("back.png");
    restart1 = loadImage ("restart.png"); 
}

function setup() {
    createCanvas (1200,400);
    ground = createSprite (600,200,700,399);
    ground.addImage ("ground1", backimg);
    ground.scale = 0.85;
    forkey = createSprite (200,200,20,70);
    forkey.addAnimation ("forkeyruns", forkeyrun);
    forkey.scale = 0.3; 
    trashGroup = new Group ();
    obstacleGroup =  new Group ();
    restart = createSprite (600,200,10,10);
    restart.addImage ("restart1",restart1);
    restart.scale = 0.5;
    score=0;
}

function draw() {
 background (0);
 drawSprites ();
 edges= createEdgeSprites();
 forkey.collide(edges);
 textSize (16);
 fill ("black");
 text ("Puntos: " + score,1050,20);
 textSize (16);
 fill ("black");
 text ("Forkey no quiere ser un juguete. Escapa de los jugetes y atrapa la basura para acomular puntos.",01,15);

 if (gameState === PLAY){
     restart.visible = false;
     spawnObstacles ();
     spawnTrash ();
     forkey.x = World.mouseX;
     forkey.y = World.mouseY;
     edges= createEdgeSprites();
     forkey.collide(edges);
     textSize (16);
     fill ("black");
     text ("Puntos: " + score,1050,20);
     textSize (16);
     fill ("black");
     text ("Forkey no quiere ser un juguete. Escapa de los jugetes y atrapa la basura para acomular puntos.",01,15);
     if (trashGroup.isTouching(forkey)) {
         trashGroup.destroyEach();
         score=score+5;
     }
     if (forkey.isTouching (obstacleGroup)){
     gameState = END;
     } 
 }
 if (gameState === END){
     restart.visible = true;
     obstacleGroup.setLifetimeEach(-1);
     trashGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     trashGroup.setVelocityYEach(0);    
   }
   forkey.setCollider("rectangle",0,0,forkey.width,forkey.height);
   forkey.debug = true;
   if(mousePressedOver(restart)) {
    reset();
  }
}
function spawnObstacles(){
    if (frameCount % 50 === 0){
           var obstacle = createSprite(1200,165,10,40);
           obstacle.y = Math.round(random(50,350));
           obstacle.velocityX = -12;
            var rand = Math.round(random(3));
            switch(rand) {
              case 1: obstacle.addImage(obstacle1);
                      break;
              case 2: obstacle.addImage(obstacle2);
                      break;
              case 3: obstacle.addImage(obstacle3);
                default: break;
            }
            obstacle.scale = 0.15;
            obstacle.lifetime = 1400;
            obstacleGroup.add(obstacle);
       }
    console.log (gameState);
}

function spawnTrash (){
    if (frameCount % 133 === 0){
        var trash = createSprite(600,0.10,10,40);
        trash.x = Math.round(random(80,1120));
        trash.velocityY = 4;
         var rand = Math.round(random(1,3));
         switch(rand) {
           case 1: trash.addImage(trash1);
                   break;
           case 2: trash.addImage(trash2);
                   break;
           case 3: trash.addImage(trash3);
             default: break;
         }
         trash.scale = 0.18;
         trash.lifetime = 500;
         trashGroup.add(trash);
        }
}
function reset (){
    gameState = PLAY;
    obstacleGroup.destroyEach();
    trashGroup.destroyEach();
    score=0;
}
