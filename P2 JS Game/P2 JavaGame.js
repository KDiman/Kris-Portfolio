const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 800;
const gravity = 1;
const isPaused = false;
let jumping = false;
const key = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};
// window.addEventListener("DOMContentLoaded", (event) => {
//   const audiobgm = document.querySelector("#audioBgm");
//   audiobgm.play();
// });

const monsterImg = new Image();
monsterImg.src = "MyGameAssets/monsterUpdated.png";
const monsterSpriteWidth = 60;
const monsterSpriteHeight = 40;
let monsterState = "";
let monsterGameFrame = 0;
const monsterStaggerFrames = 10;
const monsterSpriteAnimations = [];
const monsterAnimationStates = [
  { name: "walkRight", frames: 6 },
  { name: "walkLeft", frames: 6 },
];
monsterAnimationStates.forEach((monsterState, i) => {
  let frames = {
    mloc: [],
  };
  for (let j = 0; j < monsterState.frames; j++) {
    let positionX = j * monsterSpriteWidth;
    let positionY = i * monsterSpriteHeight;
    frames.mloc.push({ x: positionX, y: positionY });
  }
  monsterSpriteAnimations[monsterState.name] = frames;
});

const playerImg = new Image();
playerImg.src = "Finn Sprite.png";
const spriteWidth = 40;
const spriteHeight = 40;
let playerState = "";
let gameFrame = 0;
const staggerFrames = 10;
const spriteAnimations = [];
const animationStates = [
  { name: "idleRight", frames: 9 },
  { name: "idleLeft", frames: 9 },
  { name: "runRight", frames: 6 },
  { name: "runLeft", frames: 6 },
  { name: "jumpRight", frames: 1 },
  { name: "jumpLeft", frames: 1 },
  { name: "attackRight", frames: 5 },
  { name: "attackLeft", frames: 5 },
];

animationStates.forEach((state, i) => {
  let frames = {
    loc: [],
  };
  for (let j = 0; j < state.frames; j++) {
    let positionX = j * spriteWidth;
    let positionY = i * spriteHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations[state.name] = frames;
});

class Player {
  constructor() {
    this.position = { x: 300, y: 550 };

    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = 0;
    this.height = 40;
    this.attack = {
      position: this.position,
      width: 10,
      height: 20,
    };
    this.isAttacking = false;

    this.hitbox = {
      x: this.position.x,
      y: this.position.y,
    };
    this.lastDirection = "right";
  }

  draw() {
    // context.fillStyle = "red";
    // context.fillRect(this.position.x, this.position.y, this.width, this.height);
    // if (this.isAttacking) {
    //   context.fillStyle = "yellow";
    //   context.fillRect(
    //     this.attack.position.x,
    //     this.attack.position.y,
    //     this.attack.width,
    //     this.attack.height
    //   );
    // }
  }

  update() {
    // context.fillStyle = "rgba (0,255,0,0.2)";
    // context.fillRect(this.position.x, this.position.y, this.width, this.height);

    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity;
    else this.velocity.y = 0;
  }
  attacking() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}

const player = new Player({
  position: {},
});

const monsters = [];
function spawnMonsters() {
  setInterval(() => {
    const position = {
      x: 50,
      y: 50,
    };
    const velocity = {
      x: 0,
      y: 0,
    };
    const width = 20;
    const height = 20;

    monsters.push(new Monster(position, velocity, width, height));
    // console.log(monsters)
  }, 3000);
}

class Platform {
  constructor(x, y, width, height, image) {
    this.position = {
      x,
      y,
    };
    this.image = image;
    this.width = width;
    this.height = height;
  }
  draw() {
    context.drawImage(this.image, this.position.x, this.position.y);
  }
}

class Wall {
  constructor(x, y, width, height, image) {
    this.position = {
      x,
      y,
    };
    this.width = width;
    this.height = height;
    this.image = image;
  }
  draw() {
    // context.fillStyle = "blue";
    // context.fillRect(this.position.x, this.position.y, this.width, this.height);
    context.drawImage(this.image, this.position.x, this.position.y);
  }
}
class Throne {
  constructor(x, y, width, height, image) {
    this.position = {
      x,
      y,
    };
    this.width = width;
    this.height = height;
    this.image = image;
  }
  draw() {
    context.drawImage(this.image, this.position.x, this.position.y);
  }
}
const WallImage = new Image();
WallImage.src = "MyGameAssets/Wall1.png";
const walls = [
  new Wall(570, 0, 10, 800, WallImage),
  new Wall(-10, 0, 10, 800, WallImage),
];
const throneImage = new Image();
throneImage.src = "MyGameAssets/Statue.png";
const throne = new Throne(500, 690, 40, 90, throneImage);

const platformImage = new Image();
platformImage.src = "MyGameAssets/brick2.png";

const platforms = [
  new Platform(150, 600, 600, 10, platformImage),
  new Platform(-525, 700, 600, 10, platformImage),
  new Platform(150, 300, 600, 10, platformImage),
  new Platform(525, 500, 600, 10, platformImage),
  new Platform(525, 200, 600, 10, platformImage),
  new Platform(-150, 450, 600, 10, platformImage),
  new Platform(-150, 100, 600, 10, platformImage),
  new Platform(300, 780, 700, 10, platformImage),
  new Platform(-150, 780, 700, 10, platformImage),
];

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./MyGameAssets/Final/Background_0.png",
});
const background1 = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./MyGameAssets/Final/Background_1.png",
});

function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.save();
  context.scale(1, 2);
  background.update();
  background1.update();
  context.restore();
  throne.draw();
  player.update();

  walls.forEach((walls) => {
    walls.draw();
  });
  platforms.forEach((platform) => {
    platform.draw();
  });

  for (let i = monsters.length - 1; 0 < i; i--) {
    const monster = monsters[i];
    let over = monster.update();

    if (
      player.attack.position.x + player.attack.width >= monster.position.x &&
      player.attack.position.x + player.attack.position.y <=
        monster.position.x + monster.position.y - monster.width &&
      player.attack.position.y + player.attack.height >= monster.position.y &&
      player.attack.position.y <= monster.position.y + monster.height &&
      player.isAttacking
    ) {
      player.isAttacking = false;
      monsters.splice(i, 1);
      attackDamage();
      console.log("hit");
    }

    platforms.forEach((platform) => {
      if (
        monster.position.y + monster.height <= platform.position.y &&
        monster.position.y + monster.height + monster.velocity.y >=
          platform.position.y &&
        monster.position.x + monster.width >= platform.position.x &&
        monster.position.x <= platform.position.x + platform.width
      ) {
        monster.velocity.y = 0;
        if (monster.velocity.x === 0) {
          monster.velocity.x = 1;
          monster.lastDirection = "left";

          this.image = monsterState = "walkRight";
        } else if (monster.position.x === 550) {
          this.image = monsterState = "walkLeft";
          monster.lastDirection = "right";
          monster.velocity.x = -1;
        } else if (monster.position.x === 50) {
          this.image = monsterState = "walkRight";
          monster.velocity.x = 1;
          monster.lastDirection = "left";
        }
        if (monster.velocity.y < 0) {
          if ((monster.lastDirection = "left")) {
            this.image = monsterState = "walkRight";
          } else if ((monster.lastDirection = "right")) {
            this.image = monsterState = "walkLeft";
          }
        } else if (monster.velocity.y > 0) {
          if ((monster.lastDirection = "left")) {
            this.image = monsterState = "walkRight";
          } else if ((monster.lastDirection = "right")) {
            this.image = monsterState = "walkLeft";
          }
        }

        let monsterPosition =
          Math.floor(monsterGameFrame / monsterStaggerFrames) %
          monsterSpriteAnimations[monsterState].mloc.length;
        let frameMX = monsterSpriteWidth * monsterPosition;
        let frameMY =
          monsterSpriteAnimations[monsterState].mloc[monsterPosition].y;

        context.drawImage(
          monsterImg,
          frameMX,
          frameMY,
          monsterSpriteWidth,
          monsterSpriteHeight,
          monster.position.x,
          monster.position.y,
          monsterSpriteWidth,
          monsterSpriteHeight
        );
      }
    });

    walls.forEach((thrones) => {
      if (
        monster.position.y - monster.height + monster.velocity.y <=
          throne.position.y + throne.height &&
        monster.position.x + monster.height + monster.velocity.x >=
          throne.position.x &&
        monster.position.y + monster.height + monster.velocity.y >=
          throne.position.y &&
        monster.position.x - monster.height + monster.velocity.x <=
          throne.position.x + throne.width
      ) {
        gameOver();
        monsters.splice(i);
        console.log("Game Over");
      }
    });
  }

  platforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
    }
  });
  if (key.left.pressed) {
    player.velocity.x = -4;
    this.image = playerState = "runLeft";
    player.lastDirection = "right";
    walkSFX();
  } else if (key.right.pressed) {
    player.velocity.x = 4;
    this.image = playerState = "runRight";
    player.lastDirection = "left";
    walkSFX();
  } else player.velocity.x = 0;

  if (player.velocity.x === 0)
    if (player.lastDirection === "left") {
      this.image = playerState = "idleRight";
    } else if (player.lastDirection === "right") {
      this.image = playerState = "idleLeft";
    }

  if (player.velocity.y > 0) {
    if (player.lastDirection === "left") {
      this.image = playerState = "jumpRight";
    } else if (player.lastDirection === "right") {
      this.image = playerState = "jumpLeft";
    }
  }

  if (player.isAttacking) {
    if (player.lastDirection === "left") {
      attackSFX();
      this.image = playerState = "attackRight";
    } else if (player.lastDirection === "right") {
      attackSFX();
      this.image = playerState = "attackLeft";
    }
  }

  let position =
    Math.floor(gameFrame / staggerFrames) %
    spriteAnimations[playerState].loc.length;
  let frameX = spriteWidth * position;
  let frameY = spriteAnimations[playerState].loc[position].y;

  context.drawImage(
    playerImg,
    frameX,
    frameY,
    spriteWidth,
    spriteHeight,
    player.position.x,
    player.position.y,
    spriteWidth,
    spriteHeight
  );

  gameFrame++;
}
animate();

function maxJumps() {
  if (player.velocity.y <= 0) {
    player.velocity.y = -15;
  }
  if (player.position.y >= 0) {
    jumping = true;
  }
  jumpSFX();
}

let timer = 60;
function countDown() {
  setTimeout(countDown, 1000);
  if (timer > 0) {
    timer--;
    document.querySelector("#timer").innerHTML = timer;
  }
  if (timer === 0) {
    youWin();
  }
}

function startGame() {
  document.querySelector("#start").style.display = "none";
  document.querySelector("#Canvas").style.display = "flex";
  countDown();
  spawnMonsters();
  BGM();
}

function gameOver() {
  document.querySelector("#start").style.display = "none";
  document.querySelector("#Canvas").style.display = "none";
  document.querySelector("#gameOver").style.display = "flex";
  document.querySelector("#timer").style.display = "none";
  document.querySelector("#youWin").style.display = "none";
}
function youWin() {
  document.querySelector("#gameOver").style.display = "none";
  document.querySelector("#start").style.display = "none";
  document.querySelector("#Canvas").style.display = "none";
  document.querySelector("#youWin").style.display = "flex";
  document.querySelector("#timer").style.display = "none";
  startbgm.play();
}
