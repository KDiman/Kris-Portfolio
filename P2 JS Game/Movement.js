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
      startGame();

      console.log("Start");

      break;
    case 75:
      console.log("shield");
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

    case 13:
      console.log("Start");
      break;
  }
});
