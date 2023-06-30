function BGM() {
  let bgm = new Audio();
  bgm.src = "MyGameAssets/Dungeon.mp3";
  bgm.play();
}

function startBgm() {
  let startbgm = new Audio();
  startbgm.src = "MyGameAssets/SFX/Dungeon - Abandoned Site.ogg";
  startbgm.play();
}

function attackSFX() {
  let attackSfx = new Audio();
  attackSfx.src = "MyGameAssets/SFX/07_human_atk_sword_1.wav";
  attackSfx.play();
}

function walkSFX() {
  let walkSfx = new Audio();
  walkSfx.src = "MyGameAssets/SFX/16_human_walk_stone_1.wav";
  walkSfx.play();
}

function attackDamage() {
  let damage = new Audio();
  damage.src = "MyGameAssets/SFX/21_orc_damage_1.wav";
  damage.play();
}
function jumpSFX() {
  let jumpSfx = new Audio();
  jumpSfx.src = "MyGameAssets/SFX/12_human_jump_1.wav";
  jumpSfx.play();
}
