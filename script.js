
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext("2d");

let  width = canvas.width =  window.innerWidth;
let  height = canvas.height = window.innerHeight;

let maxStars = 150;
let stars = [];
let count = 0;
let passedX = 0;
let passedY = 0;
let futureX = 0;
let futureY = 0;
let starX_dir = 0;
let starY_dir = 0;

//создаём новый квадратный canvas для звезды и при помощи радиального градиента делаем из квадрата круг
let star = document.createElement('canvas');
let ctxStar = star.getContext('2d');
    star.width = 100;
    star.height = 100;
let half = star.width/2;
let gradient = ctxStar.createRadialGradient(half, half, 0, half, half, half);
    gradient.addColorStop(0.025, '#fff');
    gradient.addColorStop(0.1, 'hsl(217, 61%, 33%)');
    gradient.addColorStop(0.25, 'hsl(217, 64%, 6%)');
    gradient.addColorStop(1, 'transparent');

    ctxStar.fillStyle = gradient;
    ctxStar.beginPath();
    ctxStar.arc(half, half, half, 0, Math.PI * 2);
    ctxStar.fill();


//смена координат при движении мышки
canvas.onmousemove = function(event){
    passedX = event.clientX;
    passedY = event.clientY;

    setTimeout(function(){
        futureX = event.clientX;
        futureY = event.clientY;
    },0.01);

    if (((passedX - futureX) <= 0 ) && ((passedY - futureY) === 0)){
        starX_dir += 1.5;
        starY_dir -= 0;
    }
    if(((passedX - futureX) <= 0 ) && ((passedY - futureY) >= 0)){
        starX_dir += 1.5;
        starY_dir -= 1.5;
    }
    if(((passedX - futureX) === 0 ) && ((passedY - futureY) >= 0)){
        starX_dir -= 0;
        starY_dir -= 1.5;
    }
    if(((passedX - futureX) >= 0 ) && ((passedY - futureY) >= 0)){
        starX_dir -= 1.5;
        starY_dir -= 1.5;
    }
    if(((passedX - futureX) >= 0 ) && ((passedY - futureY) === 0)){
        starX_dir -= 1.5;
        starY_dir -= 0;
    }
    if(((passedX - futureX) >= 0 ) && ((passedY - futureY) <= 0)){
        starX_dir -= 1.5;
        starY_dir += 1.5;
    }
    if(((passedX - futureX) === 0 ) && ((passedY - futureY) <= 0)){
        starX_dir -= 0;
        starY_dir -= 1.5;
    }
    if(((passedX - futureX) <= 0 ) && ((passedY - futureY) <= 0)){
        starX_dir += 1.5;
        starY_dir += 1.5;
    }
}
//функциия принимающая два числа и возвращающая рандомное число в  данном диапазоне,
// включая как минимальное, так и максимальное значение
function random(min, max) {
    if (arguments.length < 2) {
      max = min;
      min = 0;
    }
    
    if (min > max) {
      let hold = max;
      max = min;
      min = hold;
    }
  
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//рандомно вставляем canvas звезды, делаем мигание, и при движении мышки меняем координаты
class Star {
    constructor(){
        this.radius = random(60, width/4) / 12;
        this.x = random(width);
        this.y = random(height);
        this.alpha = random(2, 10) / 10;

        count++;
        stars[count] = this;
    }
    draw() {
        this.x += starX_dir;
        this.y += starY_dir;

        let twinkle = random(10);
        
        if (twinkle === 1 && this.alpha > 0) {
        this.alpha -= 0.05;
        } else if (twinkle === 2 && this.alpha < 1) {
        this.alpha += 0.05;
        }

        ctx.globalAlpha = this.alpha;
        ctx.drawImage(star, this.x - this.radius, this.y - this.radius, this.radius, this.radius);
  
    } 
}

for (let i = 0; i < maxStars; i++) {
    new Star();
}

function animation() {
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = 'hsla(217, 64%, 6%, 1)';
    ctx.fillRect(0, 0, width, height);
    
    ctx.globalCompositeOperation = 'lighter';
    for (let i = 1, l = stars.length; i < l; i++) {
        stars[i].draw();
    };  
    
    starX_dir = 0;
    starY_dir = 0;

    window.requestAnimationFrame(animation);
}

animation();

//окно старта
let start = document.querySelector(".start");
let end = document.querySelector(".end");
let startButton = document.querySelector('button');

end.style.display = 'none';

startButton.onclick = function(){
    setTimeout(function(){
        start.style.display = 'none';
        for (let i = 0; i < maxStars; i++) {
            new Star();
        }
        end.style.display = "flex";
    } ,500);
    
}

end.onclick = function(){
    setTimeout(function(){
        start.style.display = 'flex';
    } ,500);
    end.style.display = "none";
}
