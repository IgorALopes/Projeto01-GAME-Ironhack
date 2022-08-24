// HTML ELEMENTS //////////
let startBtn = document.getElementById("startBtn")
let tryAgainBtn = document.getElementById("tryAgainBtn")
let playerHealthStatus = document.getElementById("playerStatus")
let enemyHealthStatus = document.getElementById("enemyStatus")
let gameLogTxt = document.querySelector("#gameLog p")
let attackBtn = document.getElementById("attackBtn")
let hpBtn = document.getElementById("hpBtn");
let playerSprite = document.getElementById("playerImg")
let enemySprite = document.getElementById("enemy1Img")
// END HTML ELEMENTS //////////
//
// CHARACTER CLASSES //////////
//
class Characters {
    constructor(name, health, strength) {
        this.name = name
        this.health = health
        this.strength = strength
    }
    attack() {
        return this.strength
    }
    receiveDamage(dmg) {
        this.health -= dmg
        if (this.health > 0) {
            return goToGameLog(`${this.name} has received ${dmg} points of damage.`)
        } else if (health <= 0) {
            return goToGameLog(`${this.name} is dead!`)
        }
    }   
}
//
//_// Player Config
class Player extends Characters {
    constructor(name, health, strength) {
        super(name, health, strength);
        this.fullHealth = health;
    }
    receiveDamage(dmg) {
        this.health -= dmg
        console.log(this.health)
        if (this.health > 0) {
            return goToGameLog(`You has received ${dmg} points of damage.`)
        } else if (this.health <= 0) {
            return goToGameLog(`You died! Game Over!`)
        }
    }
    healingPotion() {
        const heal = 15
        this.health += heal
        if (this.health >= this.fullHealth) {
            this.health = this.fullHealth
            playerHealthStatus.innerText = player.health
            return goToGameLog(`Your health is full.`)
        } else {
            playerHealthStatus.innerText = player.health
            return goToGameLog(`You healed ${heal} points of health.`)
        }
    }
}
let player = new Player("Joseph Climber", 10, 10)
//_// END Player Config
//
//_// ENEMIES
//
//_//_// Skeleton - Enemy 1
class Skeleton extends Characters {
    constructor(name, health, strength) {
        super(name, health, strength)
        this.fullHealth = health
    }
    receiveDamage(dmg) {
        this.health -= dmg
        if (this.health > 0) {
            return goToGameLog(`${this.name} has received ${dmg} points of damage.`)
        } else if (this.health <= 0) {
            goToGameLog(`${this.name} is dead!`)
            // RESSURRECTION SKILL
            setTimeout(() => {
                goToGameLog(`Skeleton is alive again! Do something while he's knocked out!`) 
                this.health = this.fullHealth
                enemyHealthStatus.innerText = skeleton.health
            }, 6000)
        }
    }   
}
let skeleton = new Skeleton("Skeleton", 100, 18)
//_//_// END Skeleton - Enemy 1
//
//_// END ENEMIES
//
// END CHARACTER CLASSES //////////
//

playerHealthStatus.innerText = player.health
enemyHealthStatus.innerText = skeleton.health

function start() {
    document.getElementById("start").style.display = "none";
    document.getElementById("gameDisplay").style.display = "block";
}
function tryAgainWindow() {
    document.getElementById("gameOver").style.display = "flex"
}
function goToGameLog(log) {
    gameLogTxt.style.display = "block"
    setTimeout(() => gameLogTxt.innerText = log, 500)
    //return setTimeout(() => gameLogTxt.style.display = "none", 3000)
}
function enemy1Attack() {
    let dmg = player.receiveDamage(skeleton.attack())
    playerHealthStatus.innerText = player.health
    return dmg
}
function playerAttack() {
    let dmg = skeleton.receiveDamage(player.attack())
    enemyHealthStatus.innerText = skeleton.health
    return dmg
}

//
// CLICK EVENTS, TURNS AND CHAR ANIMATION //////////
window.addEventListener('load', () => {
    startBtn.addEventListener('click', start)
    
    tryAgainBtn.addEventListener('click', () => {document.location.reload(true)})

    attackBtn.addEventListener('click', () => {
        // Disable buttons
        attackBtn.setAttribute("disabled", true)
        hpBtn.setAttribute("disabled", true)
        attackBtn.style.backgroundImage = "url('assets/img/attackBtn disabled.png')";
        hpBtn.style.backgroundImage = "url('assets/img/hpBtn disabled.png')";
        // Player attack
        playerAttack();
        playerSprite.src = "./assets/sprites/FreeKnight_v1/__AttackCombo2hitNoLoop.gif"
        enemySprite.src = "./assets/sprites/Skeleton/GIFS/Skeleton Hit left no loop.gif"
        // Enemy Death
        if (skeleton.health <= 0) {
            setTimeout(() => {
                enemySprite.src = "./assets/sprites/Skeleton/GIFS/Skeleton Dead left no loop.gif"
                playerSprite.src = "./assets/sprites/FreeKnight_v1/__Idle.gif"
            }, 650)
            // Skeleton Revive
            setTimeout(() => {
                enemySprite.src = "./assets/sprites/Skeleton/GIFS/Skeleton Dead revive left no loop.gif"
            }, 3000)
            setTimeout(() => {
                enemySprite.src = "assets/sprites/Skeleton/GIFS/Skeleton Idle left.gif"
            }, 4500)
        } else {
            setTimeout(() => {
            playerSprite.src = "./assets/sprites/FreeKnight_v1/__Idle.gif"
            enemySprite.src = "assets/sprites/Skeleton/GIFS/Skeleton Idle left.gif"
            }, 650)
            //Enemy Attack
            setTimeout(() => {
                enemy1Attack();
                setTimeout(() => {
                enemySprite.src = "assets/sprites/Skeleton/GIFS/Skeleton Attack left no loop.gif"
                }, 1000)
                setTimeout(() => {playerSprite.src = 
                    "./assets/sprites/FreeKnight_v1/__Hit.gif"
                }, 1500)
                // Player Death
                if (player.health <= 0) {
                setTimeout(() => {
                    playerSprite.src = "./assets/sprites/FreeKnight_v1/__Death no loop.gif"
                }, 2000)
                setTimeout(() => enemySprite.src = "assets/sprites/Skeleton/GIFS/Skeleton Idle left.gif", 2500)
                setTimeout(() => tryAgainWindow(), 2500)
                } else {
                    setTimeout(() => {
                        playerSprite.src = "./assets/sprites/FreeKnight_v1/__Idle.gif"
                    }, 2000)
                    setTimeout(() => {
                        enemySprite.src = "assets/sprites/Skeleton/GIFS/Skeleton Idle left.gif"
                    }, 2500) 
                }
            }, 1500)
        }
        // Enable buttons
        setTimeout(() => {
            attackBtn.style.backgroundImage = "url('assets/img/attackBtn.png')";
            hpBtn.style.backgroundImage = "url('assets/img/hpBtn.png')"; 
            attackBtn.removeAttribute("disabled")
            hpBtn.removeAttribute("disabled")
        }, 6000)
    });
  
    hpBtn.addEventListener('click', () => {
        attackBtn.setAttribute("disabled", true)
        hpBtn.setAttribute("disabled", true)
        attackBtn.style.backgroundImage = "url('assets/img/attackBtn disabled.png')";
        hpBtn.style.backgroundImage = "url('assets/img/hpBtn disabled.png')";
        player.healingPotion();
        playerSprite.src = "./assets/sprites/FreeKnight_v1/__HealFx.gif"
        //Enemy Attack
        setTimeout(() => {
            enemy1Attack();
            setTimeout(() => {
            enemySprite.src = "assets/sprites/Skeleton/GIFS/Skeleton Attack left no loop.gif"
            }, 1000)
            setTimeout(() => {playerSprite.src = 
                "./assets/sprites/FreeKnight_v1/__Hit.gif"
            }, 1500)
            // Player Death
            if (player.health <= 0) {
            setTimeout(() => {
                playerSprite.src = "./assets/sprites/FreeKnight_v1/__Death no loop.gif"
            }, 2000)
            setTimeout(() => enemySprite.src = "assets/sprites/Skeleton/GIFS/Skeleton Idle left.gif", 2500)
            setTimeout(() => tryAgainWindow(), 2500)
            } else {
                setTimeout(() => {
                    playerSprite.src = "./assets/sprites/FreeKnight_v1/__Idle.gif"
                }, 2000)
                setTimeout(() => {
                    enemySprite.src = "assets/sprites/Skeleton/GIFS/Skeleton Idle left.gif"
                }, 2500) 
            }
        }, 1500)
        setTimeout(() => {
            attackBtn.style.backgroundImage = "url('assets/img/attackBtn.png')";
            hpBtn.style.backgroundImage = "url('assets/img/hpBtn.png')";
            attackBtn.removeAttribute("disabled")
            hpBtn.removeAttribute("disabled")
        }, 5000)
    });
});
// END CLICK EVENTS, TURNS AND CHAR ANIMATION //////////
//
