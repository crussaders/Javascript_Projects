// game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    gussesLeft = 3;

// UI Elements

const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');


// assign min and max num
minNum.textContent = min;
maxNum.textContent = max;

// play again event listener
game.addEventListener('mousedown', function(e) {
    if(e.target.className === 'play-again') {
        window.location.reload();
    }
});

guessBtn.addEventListener('click', function () {
    let guess = parseInt(guessInput.value);

    // validate
    if(isNaN(guess) || guess > max || guess < min){
        setMessage(`Enter the number between ${min} and ${max}`, 'red');
    }


     // check if won 
    if(guess === winningNum) {
        // setMessage('You Won', 'green');
        // // disbled input
        // guessInput.disabled = true;
        // // change border color
        // guessInput.style.borderColor = 'green';

        gameOver(true,`you won, the correct number is ${winningNum}`);
    } else {

        // wrong number
       gussesLeft -= 1 

        if(gussesLeft === 0) {
            
            // disbled input
            // guessInput.disabled = true;
          
            // setMessage( `this is ${winningNum} correct number`, 'red' );
              // border color
            //  guessInput.style.borderColor = 'red';
            gameOver(false,`this is ${winningNum} correct number, you Lost!`);

        } else {
            // clear value
            guessInput.value = '';
            guessInput.style.borderColor = 'red';
            // Game Constinue- answer wrong
            setMessage( `You have ${gussesLeft} attempts left`, 'red' );
            // gameOver(false,`You have ${gussesLeft} attempts left`);
        }
    }
});

    // Game Over
    function gameOver(won, msg) {
        let color;
        won === true ? color = 'green' : color = 'red';

        setMessage(msg, color);
        // disbled input
        guessInput.disabled = true;
        // change border color
        guessInput.style.borderColor = color;


        // play again
        guessBtn.value = 'Play Again';
        guessBtn.className = 'play-again';
    }
    function getRandomNum (min, max) {
     return Math.floor(Math.random() * (max-min+1)+min);

    }
    // setMessage
 function setMessage(msg, color) {
    
    message.style.color = color;
    message.textContent = msg;
}