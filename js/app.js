// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.startup();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > ctx.canvas.width) {
      this.startup();
    }
    if (this.row == player.y) {
      player.checkCollision(this.x, 100);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if (DEBUG) {
      ctx.strokeStyle = "red";
      ctx.strokeRect(this.x , this.y + 75 , 100, 75);
    }

};
// Set the starting position and speed
Enemy.prototype.startup = function() {
  this.speed = 200 + (Math.floor(Math.random() * 10) * 20); // spped valus 200 - 400 (steps of 20)
  // this.y = 60 +( (Math.floor(Math.random()*3)) * 85) ; // starting positions 60,145,230
  this.row = Math.floor(Math.random() * 3) + 1;  // starting row 1-3
  this.y = 60 + ((this.row - 1) * 85);  // get our actual position based off the the row
  this.x = 1;
  }

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.x = 2;  // using tile locations
  this.y = 5; // will convert when drawing
  this.stepX = 100; // how far we move left and right
  this.stepY = 80; // how far we move up and down

};
Player.prototype.checkCollision = function(x, len) {
  // assuming we are on the same y row so only checking the x position
  if ((x < (this.x * this.stepX) + 25) && ( x + len > (this.x * this.stepX) + 75 )) {
    console.log("collision");
    this.die();
  }
}
Player.prototype.die = function() {
  // we have died so reset to bottom of screen
  this.y = 5;
}
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x * this.stepX, -20 + (this.y * this.stepY));
  if (DEBUG) {
    ctx.strokeStyle = "red";
    ctx.strokeRect((this.x * this.stepX) + 25, (-20 + (this.y * this.stepY)) + 100, 50, 50);
  }
};
Player.prototype.update = function(dt) {
  // check if we have won
  if (this.y == 0) {
    this.y = 5;
  }

};
Player.prototype.handleInput = function(key) {

  switch (key) {
    case "left":
      this.x > 0 ? this.x -= 1 : this.x = 0;
      break;
    case "right":
      this.x < BOARD_WIDTH-1 ? this.x += 1 : this.x = BOARD_WIDTH-1;
      break;
    case "up":
      this.y > 0 ? this.y -= 1 : this.y = 0;
      break;
    case "down":
      this.y < BOARD_HEIGHT-1 ? this.y += 1 : this.y = BOARD_HEIGHT-1;
      break;
    case "quit":
      allEnemies.length = 0;
      break;
    default:

  }

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var BOARD_WIDTH = 5;
var BOARD_HEIGHT = 6;
var DEBUG = true;  // will show collision areas

var allEnemies = [];
var player = new Player;
allEnemies.push(new Enemy);
setTimeout(function() {allEnemies.push(new Enemy);}, 1000);
setTimeout(function() {allEnemies.push(new Enemy);}, 2000);
setTimeout(function() {allEnemies.push(new Enemy);}, 3000);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        81: 'quit'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
