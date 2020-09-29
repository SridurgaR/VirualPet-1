//Create variables here
var dogImg, happyDog;
var database;
var foodStock, foodS;

function preload(){
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  // The dog image added
  dog = createSprite(250,280,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.3;

  database = firebase.database(); //inlitalize

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  drawSprites();
  //add styles here
  textSize(18);
  fill("black");
  stroke(10);
  text("Food Remaining : " + foodS, 50, 150);
  text("Note: Press the UP ARROW to feed dog milk", 10, 100)
}

//functions to read value from DB
  function readStock(data){
    foodS=data.val();
  }
  //function to write values in DB
  function writeStock(x){

    if(x <= 0){
      x =0;
    }
    else{
      x= x - 1;
    }

    database.ref('/').update({
      Food:x
    })
  }

