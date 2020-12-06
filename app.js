
var great_div_DOM = document.querySelector('.greatdiv');

var xpadded,ypadded;
var sizex,sizey;


sizex = 30;
sizey = 30;


var offsetx = 100;
var offsety = 100;

class Point{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
}

class Obstacle{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
}

var snake = [] ;

var x,y;
var dir = 'r';
var speed = 0;

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}


function init(){

  for (let x = 0; x < sizex; x++) {
      for (let y = 0; y < sizey; y++) {
          xpadded = ("00" + x).slice (-3);
          ypadded = ("00" + y).slice (-3);
          great_div_DOM.innerHTML += "<div class=\"insidediv\" id=\"indiv-"+ xpadded +"-"+ ypadded + "\"></div>\n";
          document.querySelector("#indiv-"+ xpadded +"-"+ ypadded).style.left = x*23 + offsetx + "px";
          document.querySelector("#indiv-"+ xpadded +"-"+ ypadded).style.top = y*23 + offsety + "px";

      }

    }
}


//.shift() enlève le debut de la liste
//.push() append at end

function draw_point(x,y){

  snake.push(new Point(x,y));

  xpadded = ("00" + x).slice (-3);
  ypadded = ("00" + y).slice (-3);

  document.querySelector("#indiv-"+ xpadded +"-"+ ypadded).style.backgroundColor = "black";

  var a = snake.shift();

  xpadded = ("00" + a.x).slice (-3);
  ypadded = ("00" + a.y).slice (-3);

  document.querySelector("#indiv-"+ xpadded +"-"+ ypadded).style.backgroundColor = "white";


}

function draw_obs(x,y){


  xpadded = ("00" + x).slice (-3);
  ypadded = ("00" + y).slice (-3);

  document.querySelector("#indiv-"+ xpadded +"-"+ ypadded).style.backgroundColor = "red";

}

function erase_pnt(x,y){


  xpadded = ("00" + x).slice (-3);
  ypadded = ("00" + y).slice (-3);

  document.querySelector("#indiv-"+ xpadded +"-"+ ypadded).style.backgroundColor = "black";

}




document.addEventListener('keydown', logKey);

function logKey(e) {
  switch (e.code) {
    case 'ArrowUp':
      dir = 'u'
      break;
    case 'ArrowDown':
      dir= 'd';
      break;

    case 'ArrowLeft':
      dir = 'l';
      break;

    case 'ArrowRight':
      dir = 'r';
      break;


  }
}







x=0;
y=0;
for (var i = 0; i < 5; i++) {
    snake.push(new Point(x,y))
    x++;
}

var obs = new Obstacle(5,5 );

init();

async function loop(timestamp) {
  await sleep(400-speed);

  draw_obs(obs.x, obs.y);

  if(x == obs.x && y == obs.y){
    snake.unshift(new Point (0,0));

    speed += 30;
    erase_pnt(obs.x, obs.y);
    obs = new Obstacle(Math.floor(Math.random() * sizex) , Math.floor(Math.random() * sizey));


  }

  switch (dir) {
    case 'u':
      y--;
      draw_point(x,y);
      break;
    case 'd':
      y++;
      draw_point(x,y);
      break;

    case 'l':
      x--;
      draw_point(x,y);
      break;

    case 'r':
      x++;
      draw_point(x,y);
      break;



  }

  window.requestAnimationFrame(loop)
}


window.requestAnimationFrame(loop)
