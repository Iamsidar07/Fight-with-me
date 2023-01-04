// ** Grabs elements from the DOM and stores them into variables **
const nameOfPlayer1=prompt("Player 1 name: ");
const nameOfPlayer2=prompt("Player 2 name: ");
let playButton = document.getElementById('play')
let resultDiv = document.getElementById('result')
let p1NameDiv = document.getElementById('p1Name')
let p2NameDiv = document.getElementById('p2Name')
let p1HealthDiv = document.getElementById('p1Health')
let p2HealthDiv = document.getElementById('p2Health')

const updateGame = (p1, p2, gameState) => {
  // console.log(p1, p2)
  p1NameDiv.innerText = p1.name;
  p2NameDiv.innerText = p2.name;
  p1HealthDiv.innerText = p1.health;
  p2HealthDiv.innerText = p2.health;
  if(p1.health<=0||p2.health<=0){
    // console.log(p1.health,p2.health)
    game.isOver=true;
    gameState = game.isOver;
    // console.log('declare winner',game.declareWinner(gameState,p1,p2),gameState)
    resultDiv.innerText=game.declareWinner(gameState,p1,p2)
  }
  return gameState;
  
}



class Player {
  constructor(name, health, attackDmg) {
    this.name = name
    this.health = health
    this.attackDmg = attackDmg
  }
  strike(player, enemy, attackDmg) {
    // console.log('I am srike');
    let damageAmount = Math.ceil(Math.random() * attackDmg);
    enemy.health -= damageAmount;
    p2HealthDiv.innerText = enemy.health;
    updateGame(p1,p2,gameState);
    let message = `${player.name} attack ${enemy.name} for ${damageAmount}`
    return message;
  }

  heal(player) {
    // console.log('i am heal')
    let hpAmount = Math.ceil(Math.random() * 5);
    player.health += hpAmount;
    updateGame(p1, p2, gameState);
    return `${player.name} gain ${hpAmount}HP⚡`
  }

}

class Game {
  constructor() {
    this.isOver = false
  }
  declareWinner(isOver, p1, p2,) { //-1,9,true
    // console.log('I am declare winner',p1.name,p2.name)
    let message;
    if (isOver == true && p1.health <= 0) {
      message = `${p2.name} WINS!🥇`;
      document.getElementById('victory').play();
    }
    else if (isOver == true && p2.health <= 0) {
      message = `${p1.name} WINS!🥇`;
      document.getElementById('victory').play();
    }
    
    return message;
  }

  reset(p1, p2) {
    // console.log('I am reset')
    p1.health = 100;
    p2.health = 100;
    this.isOver = false;
    resultDiv.innerText = "";
    updateGame(p1, p2, gameState);
  }

  play(p1, p2) {
    // console.log('i am play')
    this.reset(p1, p2);
    while (!(p1.health<0|| p2.health<0)) {
       p1.strike(p1,p2, p1.attackDmg)
      p2.heal(p2)
      p2.strike(p2,p1, p2.attackDmg);
      p1.heal(p1)
    }
    this.declareWinner(this.isOver, p1, p2);
  }


}

let p1 = new Player(nameOfPlayer1, 100, 10);
let p2 = new Player(nameOfPlayer2, 100, 15);

let game = new Game();
let gameState = game.isOver;
updateGame(p1, p2, gameState);

playButton.onclick = () => {
  // console.log('Play button')
  game.play(p1, p2)
};

// ** Player 1 Controls **
document.addEventListener('keydown', function(e) {
  // console.log(e.key)
  let playerKey = e.key;
  // if you press Q AND the enemy health is greater than 0 AND isOver is still false then strike()
  if ((playerKey == 'q' || playerKey == 'Q') && p2.health >= 0 && game.isOver == false) {

    p1.strike(p1,p2,p1.attackDmg);
    //play attack sound
document.getElementById('p1attack').play();
  }


  // After striking then play attack sound

});

document.addEventListener('keydown', function(e) {

  // if you press a AND the player health is greater than 0 AND isOver is still false then strike()
  if ((e.key == 'a' || e.key == 'A') && p1.health >= 0 && game.isOver == false) {

    p1.heal(p1)
 let p1Heal=document.getElementById('p1heal');
  p1Heal.play();
    
  }
  // After healing then play heal sound


});

// ** Player 2 Controls **
document.addEventListener('keydown', function(e) {

  // if you press p AND enemy health is greater than 0 AND isOver is still false then stike()
  if ((e.key == 'p' || e.key == 'P') && p1.health >= 0 && game.isOver == false) {
    // console.log(p2.strike(p2, p1, p2.attackDmg));
    //play attack sound
document.getElementById('p2attack').play();
  }


  // After striking then play attack sound

});


document.addEventListener('keydown', function(e) {
  // if you press l AND the player health is greater than 0 AND isOver is still false then heal()
  
  if ((e.key == 'l' || e.key == 'L') && p2.health >= 0 && game.isOver == false) {
    // console.log(p2.heal(p2))

    //heal sound
    document.getElementById('p2heal').play();
  }

 
  // After healing then play heal sound


});

