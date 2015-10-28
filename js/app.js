var Height = 606;
var Width = 505;
var unitHeight = 83;
var unitWidth = 101;
var playerStart = [2 * unitWidth, 4.75 * unitHeight];
var xMargin = unitWidth / 2;
var yMargin = unitHeight / 2;
var allEnemies = [];
var allGems = [];



/** @function enemy creates a new enemy object, setting its position
 * to a randomized but discrete y position and giving it a randomized speed.
 * Also assigns its sprite. Note enemies always begin at left extreme.
 */
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.y = Math.floor(Math.random() * 3) * unitHeight + 0.75 * unitHeight;
    this.x = 0;
    this.speed = [Math.floor(Math.random() * 3 + 1) * unitWidth, 0];
};

/** @function update the enemy object according to speed and location.
 * Implements wrap-around for the sides of the board, and updates position
 * incrementally for smooth animation.
 */
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed[0] * dt;
    if (this.x >= (Width - Width * 0.01)) {
        this.x = -0.05 * Width;
    }
};

/** @function render simply draws the enemy object on the canvas.
 */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/** @function player creates a new player object, setting its position
 * to the default start and making it stationary. Also assigns its sprite and
 * initializes its point tally.
 */
var player = function() {

    this.sprites = ['images/char-cat-girl.png',
                    'images/char-horn-girl.png',
                    'images/char-boy.png',
                    'images/char-pink-girl.png',
                    'images/char-princess-girl.png'];
    this.selection = 2;
    this.speed = [0, 0];
    this.x = playerStart[0];
    this.y = playerStart[1];
    this.pts = 0;
};

/** @function update the player object according to speed and location.
 * Implements wrap-around for the sides of the board, and ensures player
 * cannot move below the bottom edge of the board. Reaching the water
 * is handled as a collision within the engine. Movement is discrete rather
 * than pseudo-continuous, as with enemies.
 */
player.prototype.update = function() {
    this.x += this.speed[0] * unitWidth;
    this.y += this.speed[1] * unitHeight;
    this.speed = [0, 0];
    //handle board edges
    if (this.x < 0) {
        player.x = Width - unitWidth;
    }
    if (this.x > Width - unitWidth) {
        player.x = 0;
    }
    //bottom edge
    if (this.y > Height - unitHeight * 2) {
        this.y = playerStart[1];
    }
};

/** @function render simply draws the player object on the canvas.
 */
player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprites[this.selection]), this.x, this.y);
};

/** @function handleInput receives input from the user and translates it into
 * spatial logic within the game, assigning a corresponding speed to the
 * player.
 */
player.prototype.handleInput = function(input) {

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

/** @function reset acts as a positional reset for our player upon victory or
 * obliteration by bugs. Invoked by the engine's reset() function.
 */
player.prototype.reset = function() {
    this.x = playerStart[0];
    this.y = playerStart[1];
}

/** @function Gem Defines the Gem class, with randomized appearance and
 * position, but a single standard point value, which is passed to the player
 * object when the latter collects (through collision with) the gem.
 */
var Gem = function() {
    var image = Math.floor((Math.random() * 3) + 1);
    if (image === 1) {
        this.sprite = 'images/Gem Blue.png';
    }
    if (image === 2) {
        this.sprite = 'images/Gem Green.png';
    }
    if (image === 3) {
        this.sprite = 'images/Gem Orange.png';
    }
    this.x = Math.floor(Math.random() * 5) * unitWidth + 0.25 * unitWidth;
    this.y = Math.floor((Math.random() * 3) + 1) * unitHeight + 0.5 * unitHeight;
    this.pts = 30;

}

/** @function render() displays a gem by drawing it on the canvas.
 */
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 50, 80);
}

/** @var selector is the selector object within the character selection screen
  */
var selector = function() {
  this.sprite = 'images/Selector.png';
  this.message = "Press 1-5 to Choose an Avatar and Press Enter when Ready";
  this.y = 4.5*unitHeight;
  this.x = 2*unitWidth;
  this.selectionMade = false;

}

/** @function render displays the player prompt and possible character
  * choices within the character selection screen.
  */
selector.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  ctx.fillStyle = "#ddd";
  ctx.fillRect(unitWidth/7, 2.6*unitHeight, 4.75*unitWidth, 0.3*unitHeight);
  ctx.fillStyle = "#555";
  ctx.font = "bolder small-caps 15px sans-serif";
  ctx.fillText(this.message, unitWidth/6, 2.8 * unitHeight);
  player.sprites.forEach(function(sprite) {
      ctx.drawImage(Resources.get(sprite), player.sprites.indexOf(sprite)*unitWidth, 4.5*unitHeight);
  });
}

/** @function handleInput accepts keyboard inputs during character selection.
  * Once the player presses the enter key, the player has made a selection
  * and this function is not invoked again during the game.
  */
selector.prototype.handleInput = function(input) {
  var selectionMade = this.selectionMade;
    if (!selectionMade) {
      sprites = player.sprites;
      if (input === '1') {
        this.x = 0;
        player.selection = 0;
      }
      if (input === '2') {
        this.x = unitWidth;
        player.selection = 1;
      }
      if (input === '3') {
        this.x = 2 * unitWidth;
        player.selection = 2;
      }
      if (input === '4') {
        this.x = 3 * unitWidth;
        player.selection = 3;
      }
      if (input === '5') {
        this.x = 4 * unitWidth;
        player.selection = 4;
      }
      if (input === 'enter') {
        this.selectionMade = true;
      }}
}

/** @function: createEnemies allows us to create a distinct batch of enemies on
 * each reset of the game, with new positions and speeds
 */
function createEnemies() {
    var numEnemies = 3;
    allEnemies = [];
    for (; numEnemies > 0; numEnemies--) {
        allEnemies.push(new Enemy);
    }
}

/** @function createGems allows creation of a distinct batch of gem collectibles
 * for each playthrough or reset of the game, with new positions and images
 */
function createGems() {
    var numGems = 3;
    allGems = [];
    for (; numGems > 0; numGems--) {
        allGems.push(new Gem);
    }
}

/** @var player creates a living instance of our player prototype, allowing it
 * to be manipulated by the user and game engine as required. selector does
 * a similar operation for the character selection screen.
 */
var player = new player;
var selector = new selector;

// This listens for key presses and sends the keys to your
// player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        13: 'enter',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        49: '1',
        50: '2',
        51: '3',
        52: '4',
        53: '5'
    };
    player.handleInput(allowedKeys[e.keyCode]);
    if (!selector.selectionMade) {
      selector.handleInput(allowedKeys[e.keyCode]);
    }
});
