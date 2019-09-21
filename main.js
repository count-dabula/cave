var config = {
  type: Phaser.AUTO,
  width: 980,
  height: 700,
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 500
      },
      debug: false
    }
  },
};

var game = new Phaser.Game(config);
var player;

var Blocks = {

  STONE: function(game, x, y) {
    return new Block(game, x, y, "stone", true, true)
  },
  AIR: function(game, x,y){
    return new Block(game, x, y, "air", false, true);
  }

};

function Block(game, x, y, type, collides, physics, canBreak) {

  var block = game.add.image(x, y, type);
  if(physics){
  	game.physics.world.enable(block);
  	block.body.allowGravity = false;
  	block.body.setImmovable(true);
}

  if(collides)game.physics.add.collider(player, block);

  if(canBreak){
  	block.on('pointerover', function(){
            console.log("test");
        });
  }

  return block;

}

function preload() {

  this.load.image("sky", "assets/sky.png");
  this.load.image("stone", "assets/stone.png");
  this.load.image("air", "assets/air.png");
  this.load.image("player", "assets/PlayerCharacter.png");

}

function create() {

  //background image
  this.add.image(400, 300, "sky");

  //player sprite
  player = this.add.sprite(200, 100, "player");
  //gives physics to player
  this.physics.world.enable(player);

  //allows curser to move
  cursors = this.input.keyboard.createCursorKeys();

  var world_dat = [

    "111111111111111111111111111111111111111111111",
    "110000000000000000000000000000000000000001111",
    "110000000000000000000000000000000000000000011",
    "111111111111111111111111111111111111111111111",
    "111111111111111111111111111111111111111111111"

  ];

  generateWorld(this, world_dat);
  this.input.on('gameobjectdown',function(pointer, gameobject){

    console.log("Hello World");

  });

}

function update() {

  //controls left and right movements with cursor and a and d keys
  if (cursors.left.isDown || this.input.keyboard.addKey("A").isDown) {
    console.log("left");
    player.x -= 4;
  } else if (cursors.right.isDown || this.input.keyboard.addKey("D").isDown) {
    console.log("right");
    player.x += 4;
  }

  //controls the up movement for the player with curser and the w key
  if (cursors.up.isDown && player.body.touching.down) {
    console.log("up");
    player.body.setVelocityY(-200);
  }
}

function generateWorld(game, world) {

  for (var i = 0; i < world.length; i++) {
    var tiles = world[i].split("");
    for (var a = 0; a < tiles.length; a++) {
      if (tiles[a] == 1) {
        new Blocks.STONE(game, 128 * a, 128 * i);
      }
      if (tiles[a] == 0) {
        new Blocks.AIR(game, 126 * a, 128 * i);
      }
    }
  }
}