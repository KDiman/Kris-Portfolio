const canvas = document.querySelector("canvas");

const context = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 800;
const gravity = 1;


// function BGM(){
//   let bgm = new Audio ="./MyGameAssets/Dungeon.mp3"
// audio.play} 
// BGM()
class Sprite {
  constructor({ position, imageSrc }) {
    this.position = position;
    this.image = new Image();
    this.image.src = imageSrc;
  }
  draw() {
    if (!this.image) return;
    context.drawImage(this.image, this.position.x, this.position.y);
  }

  update() {
    this.draw();
  }
}

class Player {
  constructor() {
    this.position = { x: 300, y: 550 };

    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = 10;
    this.height = 30;
    this.attack = {
      position: this.position,
      width: 30,
      height: 20,
    };
    this.isAttacking = false;
  }

  draw() {
    context.fillStyle = "red";
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
    if (this.isAttacking) {
      context.fillStyle = "yellow";
      context.fillRect(
        this.attack.position.x,
        this.attack.position.y,
        this.attack.width,
        this.attack.height
      );
    }
  }

  update() {
    context.fillStyle = "0,255,0,0.2";
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
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

class Monster {
  constructor() {
    this.position = {
      x: 50,
      y: 50,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = 20;
    this.height = 20;
  }

  draw() {
    context.fillStyle = "green";
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity;
    else this.velocity.y = 0;
  }
}
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
  constructor(x, y, width, height) {
    this.position = {
      x,
      y,
    };
    this.width = width;
    this.height = height;
  }
  draw() {
    context.fillStyle = "blue";
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

class Wall {
  constructor(x, y, width, height) {
    this.position = {
      x,
      y,
    };
    this.width = width;
    this.height = height;
  }
  draw() {
    context.fillStyle = "blue";
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

const walls = [new Wall(590, 0, 10, 800), new Wall(0, 0, 10, 800)];
const throne = new Wall(500, 685, 60, 90);
const platforms = [
  new Platform(150, 600, 600, 10),
  new Platform(-525, 700, 600, 10),
  new Platform(150, 300, 600, 10),
  new Platform(550, 500, 600, 10),
  new Platform(550, 200, 600, 10),
  new Platform(-150, 450, 600, 10),
  new Platform(-150, 100, 600, 10),
  new Platform(0, 0, 600, 10),
  new Platform(0, 790, 600, 10),
];

let jumping = false;
const key = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
  //   up: { pressed: false },
};
// player.draw();

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

      console.log("hit");
    }

    platforms.forEach((platform) => {
      if (
        monster.position.y - monster.height + monster.velocity.y <=
          platform.position.y + platform.height &&
        monster.position.x + monster.height + monster.velocity.x >=
          platform.position.x &&
        monster.position.y + monster.height + monster.velocity.y >=
          platform.position.y &&
        monster.position.x - monster.height + monster.velocity.x <=
          platform.position.x + platform.width
      ) {
        monster.velocity.y = 0;
        if (monster.velocity.x === 0) {
          monster.velocity.x = 1;
        } else if (monster.position.x === 550) {
          monster.velocity.x = -1;
        } else if (monster.position.x === 50) {
          monster.velocity.x = 1;
        }
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
        document.querySelector("#gameOver").innerHTML = "GAME OVER";

        document.querySelector("#gameOver").style.display = "flex";
        document.querySelector("#Canvas").style.display = "none";
        document.querySelector("#Timer").style.display = "none";
        monsters.splice(i, 1);
        console.log("Game Over");
      }
    });
  }

  walls.forEach((walls) => {
    if (
      player.position.y - player.height + player.velocity.y <=
        walls.position.y + walls.height &&
      player.position.x + player.height + player.velocity.x >=
        walls.position.x &&
      player.position.y + player.height + player.velocity.y >=
        walls.position.y &&
      player.position.x - player.height + player.velocity.x <=
        walls.position.x + walls.width
    ) {
      player.velocity.y = 0;
      player.velocity.x = 0;
    }
  });

  platforms.forEach((platform) => {
    if (
      player.position.y - player.height + player.velocity.y <=
        platform.position.y + platform.height &&
      player.position.x + player.height + player.velocity.x >=
        platform.position.x &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x - player.height + player.velocity.x <=
        platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
      //   player.velocity.x = 0;
    }
  });
  if (key.left.pressed) {
    player.velocity.x = -5;
  } else if (key.right.pressed) {
    player.velocity.x = 5;
    //   } else if (key.up.pressed) {
    //     player.velocity.y = -10;
  } else player.velocity.x = 0;
}
animate();
spawnMonsters();

// Platform collision detection

function maxJumps() {
  if (player.velocity.y <= 0) {
    player.velocity.y = -15;
  }
  if (player.position.y >= 0) {
    jumping = true;
  }
}

let timer = 150;
function countDown() {
  setTimeout(countDown, 1000);
  if (timer > 0) {
    timer--;
    document.querySelector("#timer").innerHTML = timer;
  }
  if (timer === 0) {
    document.querySelector("#gameOver").innerHTML = "YOU WIN";
    document.querySelector("#gameOver").style.display = "flex";
    document.querySelector("#Canvas").style.display = "none";
    document.querySelector("#Timer").style.display = "none";
  }
}
countDown();

animate();
addEventListener("keydown", ({ keyCode }) => {
  console.log(keyCode);
  switch (keyCode) {
    case 65:
      console.log("left");
      key.left.pressed = true;
      break;
    case 68:
      console.log("right");
      key.right.pressed = true;
      break;
    case 87:
      //   key.up.pressed = true;
      console.log("up");
      maxJumps();
      break;
    case 83:
      console.log("down");
      //   player.velocity.y += 5;
      break;
    case 74:
      player.attacking();
      console.log("attack");
      break;
    case 82:
      location.reload(true);
      console.log("Restart");
      break;
    case 13:
     
      console.log("Start");
      break;
  }
});

addEventListener("keyup", ({ keyCode }) => {
  // console.log(keyCode)
  switch (keyCode) {
    case 65:
      console.log("left");
      key.left.pressed = false;
      break;
    case 68:
      console.log("right");
      key.right.pressed = false;
      break;
    case 87:
      console.log("up");

      break;
    case 83:
      console.log("down");
      //   player.velocity.y +=5
      break;
    case 74:
      console.log("attack");
      break;
    case 75:
      console.log("shield");
      break;
  }
});
