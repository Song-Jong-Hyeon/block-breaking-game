var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var ballradius = 10;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false; //오른쪽키보드 눌렸는지 확인하는 변수
var leftPressed = false; //왼쪽키보드 눌렸는지 확인하는 변수
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var bricks = [];
var bricks_color;
var ballcolor="#0095DD";//"#" + Math.round(Math.random() * 0xffffff).toString(16);
var lives=3;
for(var c=0; c<brickColumnCount; c++) {
  bricks[c] = [];
  for(var r=0; r<brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 3 };
  }
}
var score = 0;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
function setup(){
  x = canvas.width/2;
  y = canvas.height-30;
  paddleX = (canvas.width-paddleWidth)/2;
  dx=2;
  dy=-2;
}
function keyDownHandler(e) { //키보드에 손가락 늘렀을 때
  if(e.keyCode == 39) {
    rightPressed = true;
  }
  else if(e.keyCode == 37) {
    leftPressed = true;
  }
}
function keyUpHandler(e){ //키보드에서 손가락 땠을 때
  if(e.keyCode == 39){
    rightPressed = false;
  }
  else if(e.keyCode == 37){
    leftPressed = false;
  }
}
function collisionDetection(){ //충돌 감지 함수
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      var b = bricks[c][r];
      if(b.status > 0) {
          if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
              dy = -dy;
              b.status --;
              score++;
              if(score == brickRowCount*brickColumnCount*3) {
                alert("YOU WIN, CONGRATULATION!");
                setup();
                document.location.reload();
              }
          }
        }
      }
    }
  }
function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: "+score, 8, 20);
}
function drawlives(){
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("LIFE:"+lives, canvas.width-65, 20);
}
function drawBall(){ // 공 그림
  ctx.beginPath();
  ctx.fillStyle=ballcolor;
  ctx.arc(x, y, ballradius, 0, Math.PI*2);
  ctx.fill();
  ctx.closePath();
}
function drawPaddle(){ //paddle 그림
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}
function drawBricks(){ //벽돌 그리기
  for(var c=0; c<brickColumnCount; c++){
    for(var r=0; r<brickRowCount; r++){
      if(bricks[c][r].status>0){
      var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
      var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
      bricks[c][r].x=brickX;
      bricks[c][r].y=brickY;
      if(bricks[c][r].status==3)
        bricks_color="#005599";
      else if(bricks[c][r].status==2)
        bricks_color="#0075BB";
      else
        bricks_color="#0095DD";
      ctx.beginPath();
      ctx.rect(brickX,brickY,brickWidth,brickHeight);
      ctx.fillStyle=bricks_color;
      ctx.fill();
      ctx.closePath();
      }
    }
  }
}
function draw(){ //랜더링, 모든 오브젝트를 그림.
  ctx.clearRect(0,0,canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  collisionDetection();
  drawlives();
  if(x + dx > canvas.width - ballradius || x + dx < ballradius) //공 좌우 벽에서 튕김
    dx = -dx;
  if(y + dy < ballradius) //공이 위쪽 벽에서 튕김
    dy = -dy;
  else if(y+dy>canvas.height-ballradius){
    if(x+ballradius>=paddleX  && x-ballradius<=paddleX+paddleWidth){
      //ballcolor="#" + Math.round(Math.random() * 0xffffff).toString(16);
      dy= -(dy+Math.random()/2);
    }
    else{
      lives--;
      if(!lives){
        alert("GAME OVER");
        setup();
        document.location.reload();
      }
      else{
        setup();
      }
    }
  }
  if(rightPressed && paddleX < canvas.width-paddleWidth) // paddle 오른쪽 이동
    paddleX+=5;
  else if(leftPressed && paddleX >0) //paddle 왼쪽 이동
    paddleX-=5;
  x+=dx;
  y+=dy;
}
setInterval(draw, 10); // 10ms 간격으로 draw 함수 호출.
