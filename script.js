const startBtn = document.getElementById("startBtn");
const menu = document.getElementById("menu");
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let score = 0; // 👈 NUEVO: contador de puntos

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

function drawScore() {
  ctx.font = "24px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Puntos: " + score, 20, 40);
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
  drawScore(); // 👈 mostrar el puntaje en pantalla

  // Colisión con el paquete (misión cumplida)
  if (
    player.x < package.x + package.width &&
    player.x + player.width > package.x &&
    player.y < package.y + package.height &&
    player.y + player.height > package.y
  ) {
    score += 10; // 👈 suma 10 puntos por entrega
    resetPackage(); // mover el paquete a otro lugar
  }

  requestAnimationFrame(update);
}

function resetPackage() {
  // 👈 el paquete aparece en otra parte aleatoria
  package.x = Math.random() * (canvas.width - 100);
  package.y = canvas.height - 150;
}

document.addEventListener("keydown", (e) => {
  keys[e.key] = true;
  if (e.key === " " && !player.jumping) {
    player.jumping = true;
    player.velocityY = -15;
  }
});

document.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

// Cambiar sprite al iniciar
startBtn.addEventListener("click", () => {
  player.image.src = "assets/capucha.png";
  menu.style.display = "none";
  canvas.style.display = "block";
  update();
});
