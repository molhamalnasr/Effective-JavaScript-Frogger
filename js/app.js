const controler = {
    playerMoveVertical: 100,
    playerMoveHorizontal: 80,
    lives: 3,
    rounds: 0
};

const startingPoints = {
    enemyStartX: -100,
    enemyEndX: 505,
    firstEnemyY: 60,
    secondEnemyY: 140,
    ThirdEnemyY: 220,
    playerVerticalPos: 200,
    playerHorisontalPos: 380
};

var gameStatus = document.querySelector('.gameStatus').style;

// Enemies our player must avoid
var Enemy = function(x, y, movmentSpeed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    this.x = x;
    this.y = y;
    this.movmentSpeed = movmentSpeed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //to keep the game runs at the same movmentSpeed
    this.x += this.movmentSpeed * dt;

    //to repeat the enemies movements when off screen
    if(this.x > startingPoints.enemyEndX) {
        this.x = startingPoints.enemyStartX;

        this.movmentSpeed = Math.floor(50 + (Math.random() * 200));
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

//player function Expression
var Player = function (x, y, playerSpeed) {
    this.x = x;
    this.y = y;
    this.playerSpeed = playerSpeed;
    this.sprite = 'images/char-boy.png';
};

//update the player movments
Player.prototype.update = function() {

    // reset player position on off-screen
    if(this.x < 0 || this.x >= 500 || this.y > startingPoints.playerHorisontalPos) {
        this.x = startingPoints.playerVerticalPos;
        this.y = startingPoints.playerHorisontalPos;

        //reset the rounds
        //and save the rounds in the last live
        if(controler.lives != 1 && controler.rounds != 0){
            controler.rounds--;
        }

        //reduce player lives
        if(controler.lives != 0) {
            document.getElementById('heart-' + controler.lives).children[1].style.display = 'none';
            controler.lives--;
        }
    }

    //display game over div
    if(controler.lives == 0) {
        gameStatus.display = 'block';
    }

    //reset the game one player tuched the water
    if(this.y < 0) {
        this.x = startingPoints.playerVerticalPos;
        this.y = startingPoints.playerHorisontalPos;

        //increase the rounds number
        controler.rounds++;
    }

    //Update the rounds number
    document.querySelector('.rounds').textContent = controler.rounds;

    //manipulate the Summary
    const text = controler.rounds == 1 ? 'round' : 'rounds';
    document.querySelector('.summary').textContent = `${controler.rounds} ${text}`;

};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (pressedKey) {
    switch(pressedKey) {
        case 'left':
            this.x -= controler.playerMoveVertical;
            break;
        case 'right':
            this.x += controler.playerMoveVertical;
            break;
        case 'up':
            this.y -= controler.playerMoveHorizontal;
            break;
        case 'down':
            this.y += controler.playerMoveHorizontal;
    };
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//allEnemies array to add new anameies on screes
var allEnemies = [];
//calling Player Function Expression
var player = new Player(startingPoints.playerVerticalPos, startingPoints.playerHorisontalPos, 20);

//Enemies vertical position on the screen
var enemiesPositions = [startingPoints.firstEnemyY, startingPoints.secondEnemyY, startingPoints.ThirdEnemyY];

//Loop over the Enemies vertical positions array and
//call the Enemy Function Expression each time for new position
enemiesPositions.forEach(function(verticalPos) {
    var enemy = new Enemy(startingPoints.enemyStartX, verticalPos, 50 + (Math.floor(Math.random() * 200)));
    allEnemies.push(enemy);
});


//restart the game
document.querySelector('.resetGame').addEventListener('click', function() {
    location.reload();
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
