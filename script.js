const startBtn = document.getElementById("startBtn");
const menu = document.getElementById("menu");
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = {
  x: 50,
  y: canvas.height - 150,
  width: 50,
  height: 50,
  speed: 5,
  jumping: false,
  velocityY: 0,
  image: new Image()
};
player.image.src = "assets/player.png";

let packageImg = new Image();
packageImg.src = "assets/package.png";

let package = {
  x: canvas.width - 100,
  y: canvas.height - 150,
  width: 40,
  height: 40
};

let keys = {};

function drawPlayer() {
  ctx.drawImage(player.image, player.x, player.y, player.width, player.height);
}

function drawPackage() {
  ctx.drawImage(packageImg, package.x, package.y, package.width, package.height);
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Gravedad
  if (player.jumping) {
    player.velocityY += 0.8;
    player.y += player.velocityY;

    if (player.y >= canvas.height - 150) {
      player.y = canvas.height - 150;
      player.jumping = false;
      player.velocityY = 0;
    }
  }

  if (keys["ArrowRight"]) player.x += player.speed;
  if (keys["ArrowLeft"]) player.x -= player.speed;

  drawPlayer();
  drawPackage();

  // Colisión con el paquete (mision cumplida)
  if (
    player.x < package.x + package.width &&
    player.x + player.width > package.x &&
    player.y < package.y + package.height &&
    player.y + player.height > package.y
  ) {
    alert("¡Misión cumplida! Entrega realizada ✅");
    document.location.reload();
  }

  requestAnimationFrame(update);
}

document.addEventListener("keydown", (e) => {
  keys[e.key] = true;
  if (e.key === " " && !player.jumping) {
    player.jumping = true;
    player.velocityY = -15;
