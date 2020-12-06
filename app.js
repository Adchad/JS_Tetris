
var great_div_DOM = document.querySelector('.greatdiv');

var xpadded,ypadded;
var tetro;

var sizex = 12;
var sizey = 21;

var offsetx = 790;
var offsety = 200;

var speed = 400;
var dir = 'd';

var score=0;

var new_tetro=false;

var score_DOM = document.querySelector('.score');

score_DOM.innerHTML="SCORE  "+score;

class Point{

  constructor(x,y){
    this.x = x;
    this.y = y;
    this.state=false;
    this.color='black';
  }

  getCoordinates(){
    return [this.x,this.y];
  }

  setCoordinates(x,y){
    this.x = x;
    this.y = y;
  }

  getState(){
    return this.state;
  }
  draw(){

    if(this.state==true){
      xpadded = ("00" + this.x).slice (-3);
      ypadded = ("00" + this.y).slice (-3);
    
      document.querySelector("#indiv-"+ xpadded +"-"+ ypadded).style.backgroundColor = this.color;
    }
    else{
      xpadded = ("00" + this.x).slice (-3);
      ypadded = ("00" + this.y).slice (-3);
    
      document.querySelector("#indiv-"+ xpadded +"-"+ ypadded).style.backgroundColor = "white";
    }
  }

  setColor(color){
    this.color=color;
  }


  add(){
    this.state=true;
  }
  remove(){
    this.state=false;
  }




}

var shapes =[
  [
  
    [ 1 , 1 ],
    [ 1 , 1 ]
  ],

  [

    [ 1 , 0 , 0 ],
    [ 1 , 0 , 0 ],
    [ 1 , 1 , 0 ]
  ],

  [
    [ 0 , 0 , 1 ],
    [ 0 , 0 , 1 ],
    [ 0 , 1 , 1 ]
  ],

  [
    [ 1 , 0 , 0 , 0],
    [ 1 , 0 , 0 , 0],
    [ 1 , 0 , 0 , 0],
    [ 1 , 0 , 0 , 0]
  ],

  [

    [ 1 , 0 , 0],
    [ 1 , 1 , 0],
    [ 1 , 0 , 0]
  ],

  [

    [ 0 , 0 , 0],
    [ 0 , 1 , 1],
    [ 1 , 1 , 0]
  ],

  [

    [ 0 , 0 , 0],
    [ 1 , 1 , 0],
    [ 0 , 1 , 1]
  ]



]


var colors=[
  "#FFD500","#FF971C","#0341AE","#00ffff","#800080","#72CB3B","#FF3213"

]


function generateShape(){
  var val= Math.floor(Math.random() * shapes.length);
  return [shapes[val],colors[val] ];
}

class Tetromino {
  constructor(map,shape,color, x, y){

    this.map=map;
    this.x=x;
    this.y=y;
    this.shape = JSON.parse(JSON.stringify(shape)); 
    this.color=color;
    this.array=[];
    this.shape_size=this.shape.length;

  }

  update() {
    this.array=[];
    for(var i=0; i<this.shape_size; ++i){
      for(var j=0; j<this.shape_size; ++j){
        if(this.shape[i][j]===1){
          this.array.push(this.map[this.y+j][this.x+i])	;
          this.map[this.y+j][this.x+i].setColor(this.color);
          console.log(this.map[this.y+j][this.x+i]);
        }
      }
    }
  }

  rotate(){
    var old_shape=JSON.parse(JSON.stringify(this.shape));
    var old_array=JSON.parse(JSON.stringify(this.array));


    for( var i = 0 ; i<this.shape_size/2 ; i++ ){
      for(var j = i; j< this.shape_size- i -1; j++ ) {
        var temp = this.shape[i][j];
        this.shape[i][j] = this.shape[j][this.shape_size - 1 -i];
        this.shape[ j][this.shape_size - 1 -i] = this.shape[this.shape_size - 1 - i][this.shape_size - 1 - j];
        this.shape[this.shape_size - 1 - i][this.shape_size - 1 - j] = this.shape[this.shape_size - 1 -j][ i];
        this.shape[this.shape_size - 1 -j][ i] = temp;
      }
    }
    this.update();

    for(var i of this.array){
      if(old_array.includes(i)===false){
        var coord = i.getCoordinates();
        var cell=this.map[coord[1]][coord[0]];
        if(cell.getState()==true){

          console
          this.shape=JSON.parse(JSON.stringify(old_shape));
          this.update();
          return
        }
      }
     
    }



  }

  move(direction){
    if(this.detectCollision(direction)===false){
      switch (direction) {
        case 'd':
          this.y++;
          break;
    
        case 'l':
          this.x--;
          break;
        case 'r':
          this.x++;
          break;
      }
      this.update();
    }
  }

  draw(){
    for(var i=0; i<this.array.length; ++i){
      this.array[i].add();
    }
  }

  erase(){
    for(var i=0; i<this.array.length; ++i){
      this.array[i].remove();
    }
  }

  rotateAndDraw(){
    this.erase();
    this.rotate();
    this.draw();
  }

  moveAndDraw(direction){
    this.erase();
    this.move(direction);
    this.draw();
  }

  print(){
    
      console.log(this.y);
    
  }

  detectCollision(direction){
    
    for(var i of this.array){
      var coord = i.getCoordinates();

      switch (direction) {
        case 'd':
          var next_cell=this.map[coord[1]+1][coord[0]];
          break;
        case 'l':
          var next_cell=this.map[coord[1]][coord[0]-1];
          break;
        case 'r':
          var next_cell=this.map[coord[1]][coord[0]+1];
          break;
      }
  
      if(this.array.includes(next_cell)==false){
        if(next_cell.getState()===true){
          return true;
        }
      }

    }
    return false;
  }

  detectLoss(){
    if(this.y==1){
      score_DOM.innerHTML="YOU LOST    RELOAD TO RETRY"
      return true;
    }

    return false;
  }
}


const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}


function init(){

  for (let x = 0; x < sizex; x++) {
      for (let y = 0; y < sizey; y++) {
          xpadded = ("00" + x).slice (-3);
          ypadded = ("00" + y).slice (-3);
          great_div_DOM.innerHTML += "<div class=\"insidediv\" id=\"indiv-"+ xpadded +"-"+ ypadded + "\"></div>\n";
          document.querySelector("#indiv-"+ xpadded +"-"+ ypadded).style.left = x*28 + offsetx + "px";
          document.querySelector("#indiv-"+ xpadded +"-"+ ypadded).style.top = y*28 + offsety + "px";

      }

    }
}


function rotate_current_Tetro(){
  tetro.rotateAndDraw();
}

async function logKey(e) {
  if(new_tetro===false){
    switch (e.code) {

      case 'ArrowLeft':
        dir = 'l';
        tetro.moveAndDraw(dir);
        speed = 200;
        map.draw();
        await sleep(speed);
        break;

      case 'ArrowRight':
        dir = 'r';
        tetro.moveAndDraw(dir);
        speed = 200;
        map.draw();
        await sleep(speed);
        break;

      case 'ArrowDown':
        speed = 100;
        break;
  

      case 'Space':
        rotate_current_Tetro();
        break;
    }
  }
}



class Map {

  constructor(width,height){

    this.width=width;
    this.height=height;
    this.map=[];

    for(var i=0; i<this.height; ++i){
      this.map.push(new Array());
      for(var j=0; j<this.width; ++j){
        this.map[i].push(new Point(j,i));

        if(i==0 || i==this.height-1 ||j==0||j==this.width-1){
          this.map[i][j].add();
        }

      }
    }



  }

  draw(){
    for(var i=0; i<this.height; ++i){
      this.map.push(new Array());
      for(var j=0; j<this.width; ++j){
        this.map[i][j].draw();
      }
    }
  }

  getMap(){
    return this.map;
  }

  testLine(){
    var ctr=0;
    for(var i=1; i<this.height-1;i++){
      ctr=0;
      for(var j=0; j<this.width; ++j){
        if(this.map[i][j].getState()===true){
          ctr++;
        }
      }

      if(ctr===this.width){
        
        
        return i;
        
      }

    }

    return 0;

  }



  clearLine(line){
    score+=1000;
    console.log('score = '+ score);
    score_DOM.innerHTML="SCORE "+score;
    for(var i=line; i>1 ; i--){
      for(var j=0; j<this.width;j++){
        this.map[i][j]=this.map[i-1][j];
        this.map[i][j].setCoordinates(j,i);
      }
    }

    for(var j=0; j<this.width;j++){
      this.map[1][j]=new Point(j,1);
      if(j==0 || j==this.width-1){
        this.map[1][j].add();
      }
    }

  }
}
  

var map=new Map(sizex,sizey);



//MAIN

document.addEventListener('keydown', logKey);

document.addEventListener('keyup', function(){ speed=400; dir='d';});

init();

shape_color=generateShape();
tetro = new Tetromino(map.getMap(),shape_color[0],shape_color[1],4,0);
//GAME LOOP
async function loop(timestamp) {

  await sleep(speed);


 

  if(tetro.detectCollision('d')){
    if(tetro.detectLoss()){
      return;
    }
    var line=map.testLine();
    await sleep(500);
    if(line!=0){
      new_tetro=true;
      while(line!=0){
        map.clearLine(line); 
        line = map.testLine();
      }    
    }

    shape_color=generateShape();
    tetro = new Tetromino(map.getMap(),shape_color[0],shape_color[1],4,0);
    await sleep(500);
    new_tetro=false;
  };

  
  
  //tetro.print();
  //console.log(dir); 
  
  
  tetro.moveAndDraw(dir);
  map.draw();



  //console.table(map);
  
  window.requestAnimationFrame(loop)
} 
window.requestAnimationFrame(loop)
