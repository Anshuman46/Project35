var balloon,database;
var balloonPosition;

function preload(){
  backgroundImg = loadImage("Hot Air Ballon-01.png");
  balloonImage = loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png");

}


function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(1000,640);

  balloon = createSprite(100, 400, 20, 20);
  balloon.addAnimation("balloon",balloonImage);
  balloon.scale = 0.4;

  var ballposition = database.ref("Balloon/Position");
  ballposition.on("value", readPosition, showError);
}

function draw() {
  background(backgroundImg); 

  strokeWeight(2);
  stroke("lightgreen");
  fill("blue");
  textSize(20);
  text("Use the arrow keys to move the Hot Air Balloon", 30, 30);
  
  if(keyDown(LEFT_ARROW)){
    writePosition(-10, 0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(10, 0);
                                                                
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-10);
    }
    else if(keyDown(DOWN_ARROW)){ writePosition(0, 10);
      if (balloon.scale <1){ balloon.scale = balloon.scale+0.05; }
    }
    else if(keyDown(32)){
      if (balloon.scale <1){ writePosition(0, -10); }
      if (balloon.scale >0.1){ balloon.scale = balloon.scale-0.05;}
    } 

  drawSprites();
}

function readPosition(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
  }

  function writePosition(x, y){
    database.ref('Balloon/Position').set({
      'x': balloon.x + x,
      'y': balloon.y + y,
    })
  }

  function showError(){
    console.log("error");
  }