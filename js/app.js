
var endGame = false;
var Height = 606;
var Width = 505;
var unitHeight = 83;
var unitWidth = 101;
var xMargin = unitWidth/2;
var yMargin = unitHeight/2;
var playerStart = [2*unitWidth,4.25*unitHeight];

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.y = Math.floor(Math.random()*3)*unitHeight + 0.75*unitHeight;
    this.x = 0;
    this.speed = [Math.floor(Math.random()*3+1)*unitWidth,0];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed[0] * dt;
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
};

player.prototype.update = function() {
  this.x += this.speed[0]*unitWidth;
  this.y += this.speed[1]*unitHeight;
  this.speed = [0,0];
  console.log(this.x,this.y);
  //handle board edges
  if (this.x < 0) {
    player.x = Width-unitWidth;
  }
  if (this.x > Width-unitWidth) {
    player.x = 0;
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

var Gem = function() {
  var image = Math.floor((Math.random()*3)+1);
  if (image === 1) {
    this.sprite = 'images/Gem Blue.png';
  }
  if (image === 2) {
    this.sprite = 'images/Gem Green.png';
  }
  if (image === 3) {
    this.sprite = 'images/Gem Orange.png';
  }
  this.x = Math.floor(Math.random() * 5) * unitWidth + 0.25*unitWidth;
  this.y = Math.floor((Math.random() * 3)+1) * unitHeight + 0.5*unitHeight;
  this.pts = 10;
}

Gem.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 50, 80);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var numEnemies = 3;
for (;numEnemies > 0; numEnemies--) {
  allEnemies.push(new Enemy);
}
var player = new player;

var allGems = [];
var numGems = 3;
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
