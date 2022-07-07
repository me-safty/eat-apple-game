//==================================================
let box = document.querySelector(".box");
let snake = document.querySelector(".snake");
let block = document.querySelector(".b");
let end = document.querySelector(".end");
let retry = document.querySelector(".end button");
let score = document.querySelector(".score");
let hScore = document.querySelector(".hScore");
//==================================================
retry.onclick = _ => location.reload();
//==================================================
if (localStorage.highScore) {
  hScore.innerHTML = `HIGH SCORE: ${localStorage.highScore}`;
}
//==================================================
let moveX = 0;
let moveY = 0;
let numStep = 20; 
let timeStep = 100;
let hard = 5;
let x = 0;
let y = 0;
document.documentElement.style.setProperty('--blockWidth', `${numStep + 20}px`);
//==================================================
createAxis();
// let redB = document.querySelector(".apple");
let redBs = document.querySelectorAll(".apple");
//==================================================
function move(chr, e, move, op, eq) {
  if (e.key === chr) {  
    //=====================
    let count = setInterval(_ => {
      if (op === 'sub') {
        move === 'y' ? moveY -= numStep : moveX -= numStep;
      } else if (op = 'sum') {
        move === 'x' ? moveX += numStep : moveY += numStep;
      }
      block.style.transform = `translate(${moveX}px, ${moveY}px)`;
      console.log(moveY);
      console.log(moveX);
      //=====================
      if (move === 'y') {
        if (moveY === eq) {
          clearInterval(count);
          end.classList.add("show");
          removeApple();
          snake.remove();
          saveHighScore();
          // setTimeout(_ => {
          // }, 100);
        }
      } else if (move === 'x') {
        if (moveX === eq) {
          clearInterval(count);
          end.classList.add("show");
          snake.remove();
          removeApple();
          saveHighScore();
          // setTimeout(_ => {
          // }, 100);
        }
      }
      addblock();
    }, timeStep);
    //=====================
    clear(chr, count);
  }
}
//==================================================
function clear(chr, int) {
  document.addEventListener("keyup", e => {
    if (chr === 'w') {
      if (e.key === 'a' || e.key === 'd' || e.key === 's') {
        clearInterval(int);
      }
    }
    if (chr === 's') {
      if (e.key === 'a' || e.key === 'd' || e.key === 'w') {
        clearInterval(int);
      }
    }
    if (chr === 'a') {
      if (e.key === 's' || e.key === 'd' || e.key === 'w') {
        clearInterval(int);
      }
    }
    if (chr === 'd') {
      if (e.key === 's' || e.key === 'a' || e.key === 'w') {
        clearInterval(int);
      }
    }
  });
}
//==================================================
document.addEventListener("keyup", e => move('w', e, 'y', 'sub', -800 + numStep));
document.addEventListener("keyup", e => move('s', e, 'y', 'sum', numStep));
document.addEventListener("keyup", e => move('d', e, 'x', 'sum', 800 - numStep));
document.addEventListener("keyup", e => move('a', e, 'x', 'sub', -numStep));
//==================================================
function createAxis() {
  let arr = [];
  for (let i = -numStep - 20; i >= -760; i -= numStep) {
    arr.push(i);
  }
  let arrp = [];
  for (let i = 0; i <= 760; i += numStep) {
    arrp.push(i);
  }
  console.log(arr);
  console.log(arrp);
  let xAxis = arrp[Math.floor(Math.random() * arrp.length)];
  let yAxis = arr[Math.floor(Math.random() * arr.length)];
  console.log(xAxis);
  console.log(yAxis);
  createApple(xAxis, yAxis);
  x = xAxis;
  y = yAxis;
}
//==================================================
function createApple(xAxis, yAxis) {
  let apple = document.createElement("div");
  apple.classList.add("apple");
  apple.style.transform = `translate(${xAxis}px, ${yAxis}px)`;
  box.appendChild(apple);
}
//==================================================
function addblock() {
  redBs = document.querySelectorAll(".apple");
  if (moveY === y && moveX === x + numStep) {
    removeApple();
    createAxis();
    score.innerHTML = `SCORE: ${redBs.length}`;
    timeStep -= hard;
    if (timeStep < 30) {
      hard = 2
    }
  }
  if (moveX === x && moveY === y + numStep) {
    removeApple();
    createAxis();
    score.innerHTML = `SCORE: ${redBs.length}`;
    timeStep -= hard;
    if (timeStep < 30) {
      hard = 2
    }
  }
}
//==================================================
function removeApple() {
  redBs.forEach(e => e.style.display = 'none');
}
//==================================================
function saveHighScore() {
  let highScore = redBs.length - 1;
  if (localStorage.highScore) {
    if (highScore > localStorage.highScore) {
      localStorage.setItem("highScore", highScore);
    }
  } else {
    localStorage.setItem("highScore", highScore);
  }
  hScore.innerHTML = `HIGH SCORE: ${localStorage.highScore}`;
}
//==================================================
// function clear(chr, int) {
//   let chrs = ['w','s','d','a'];
//   let target = chr;
//   for (let i = 0; i < chrs.length; i++) {
//     target = chr[i];
//   }
//   document.addEventListener("keyup", e => {
//     if (chr === 'w') {
//       if (e.key === 'a' || e.key === 'd' || e.key === 's') {
//         clearInterval(int);
//       }
//     }
//   });
// }