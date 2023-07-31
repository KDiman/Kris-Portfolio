class Monster {
  constructor(monsterimage) {
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
    this.monsterimage = monsterState = "walkRight";
    this.lastDirection = "right";
  }

  draw() {
    // context.fillStyle = "green";
    // context.fillRect(this.position.x, this.position.y, this.width, this.height);
    // context.drawImage(this.image, this.position.x, this.position.y);
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
