var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

var foodSize = 30;
var scale = 20;
var snakeSize = 30;
var x = 0;
var y = 0
var snakeX = 3;
var snakeY = 0;
var row = canvas.height / scale;
var column = canvas.width / scale;
var foodX = (Math.floor(Math.random() * row) * scale);
var foodY = (Math.floor(Math.random() * column) * scale);
var snakeColor = 'red';
var foodColor = 'blue';
var eatSnake = 0;
var audio = new Audio('files/eat.wav');
var total = 0;
var tail = [];
var score = 0;
var bg = new Audio('files/bg.mp3');

var fruitImg = 'files/fruit.png';
var snakeImg = 'files/spaceship.png';


document.addEventListener('keyup', keyUpFunction, false);
document.addEventListener('keydown', keyDownFunction, false);

function keyUpFunction(e){
    if(e.key == 'up' || e.key == 'ArrowUp'){
        snakeY = -3;
    }
    if(e.key == 'down' || e.key == 'ArrowDown'){
        snakeY = 3;
    }
    if(e.key == 'right' || e.key == 'ArrowRight'){
        snakeX = 3;
    }
    if(e.key == 'left' || e.key == 'ArrowLeft'){
        snakeX = -3;
    }
}

function keyDownFunction(e){
    if(e.key == 'up' || e.key == 'ArrowUp'){
        snakeY = -3;
        snakeX = 0;
    }
    if(e.key == 'down' || e.key == 'ArrowDown'){
        snakeY = 3;
        snakeX = 0;
    }
    if(e.key == 'right' || e.key == 'ArrowRight'){
        snakeX = 3;
        snakeY = 0;
    }
    if(e.key == 'left' || e.key == 'ArrowLeft'){
        snakeX = -3;
        snakeY = 0;
    }
}

function food(){

    if(eatSnake == 1){
        foodX = (Math.floor(Math.random() * row) * scale);
        foodY = (Math.floor(Math.random() * column) * scale);
        eatSnake = 0;
    }
    var img = new Image();   // Create new img element
    img.src = fruitImg; 
    ctx.drawImage(img, foodX, foodY, foodSize, foodSize);
}

function eat(){
    if( x > foodX && x < foodX + scale && y > foodY && y < foodY + scale || x + scale > foodX && x + scale < foodX + scale && y + scale > foodY && y < foodY + scale){
        food();
        eatSnake = 1;
        audio.play();
        total++;
        score += 10;
    }
}

function collision(){
    if(x > canvas.width){
        x = 0;
    }
    if(x < 0){
        x = canvas.width;
    }
    if(y > canvas.height){
        y = 0;
    }
    if(y < 0){
        y = canvas.height;
    }
}

function snake(){

    for (i = 0; i < tail.length; i++) {
        img = new Image();   // Create new img element
        img.src = snakeImg; 
        ctx.drawImage(img, x, y, snakeSize, snakeSize);
    }

    var img = new Image();   // Create new img element
    img.src = snakeImg; 
    ctx.drawImage(img, x, y, snakeSize, snakeSize);
}

function faceImage(){
    snakeImg = 'files/face.png';
}
function face1(){
    snakeImg = 'files/face1.png';
}
function face2(){
    snakeImg = 'files/pacman.png';
}
function fruitImage(){
    fruitImg = 'files/fruit.png';
}
function fruit1(){
    fruitImg = 'files/fruit1.png';
}
function fruit2(){
    fruitImg = 'files/fruit2.png';
}

function music(){
    return bg.paused ? bg.play() : bg.pause();
}

function engine(){
    ctx.clearRect( 0, 0, canvas.width, canvas.height);
    snake();
    collision();
    food();
    eat();
    x += snakeX;
    y += snakeY;

    document.getElementById('score-text').innerHTML = score;

    for (i = 0; i < tail.length - 1; i++) {
        tail[i] = tail[i + 1];
    }

    tail[total - 1] = { x: x, y: y };
}

setInterval(engine, 30);