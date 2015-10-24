var endGame = false;
var Height = 606;
var Width = 505;
var unitHeight = 83;
var unitWidth = 101;
var spriteMargin = 20;
var playerStart = [2*unitWidth,5*unitHeight];

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.y = (Math.random() * unitHeight * 2 + 0.5 * unitHeight);
    this.x = 0;
    this.speed = [Math.random()*Width*0.5,0];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed[0] * dt;
    if (this.y+spriteMargin > player.y > this.y-spriteMargin) {
      console.log('y collision');
      if (this.x-spriteMargin < player.x < this.x+spriteMargin) {
        console.log('x collision');
        player.reset();
      }};
    if (this.x >= (Width-Width*0.01)) {
      this.x = -0.05*Width;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var player = function() {
  this.sprite = 'images/char-boy.png';
  this.speed = [0,0];
  this.x = playerStart[0];
  this.y = playerStart[1];
  this.pts = 0;
  console.log(this.x,this.y);
};

player.prototype.update = function(dt) {
  this.x += this.speed[0]*unitWidth;
  this.y += this.speed[1]*unitHeight;
  this.speed = [0,0];
  console.log(this.x,this.y);
  //winning
  if (this.y === 0) {
    player.reset();
  }
  //handle board edges
  if (this.x < 0) {
    player.x = Width-unitWidth;
  }
  if (this.x > Width-unitWidth) {
    player.x =0;
  }
  //bottom edge
  if (this.y > Height-unitHeight*2) {
    this.y = playerStart[1];
  }

};

player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

player.prototype.handleInput = function(input) {
  var motion;
  if (input === 'left') {
    this.speed[0] = -1;
  }
  if (input === 'right') {
    this.speed[0] = 1;
  }
  if (input === 'up') {
    this.speed[1] = -1;
  }
  if (input === 'down') {
    this.speed[1] = 1;
  }

}

player.prototype.reset = function () {
  this.x = playerStart[0];
  this.y = playerStart[1];
}

var Gem = function() {
  this.sprite = 'images/Gem Blue.png';
  this.x = 2 * unitWidth;
  this.y = 2 * unitHeight;
  this.pts = 10;
}

Gem.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var numEnemies = 5;
for (;numEnemies > 0; numEnemies--) {
  allEnemies.push(new Enemy);
}
var player = new player;

var allGems = [];
var numGems = 4;
for (;numGems > 0; numGems--) {
  allGems.push(new Gem);
}

// This listens for key presses and sends the keys to your
// player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
