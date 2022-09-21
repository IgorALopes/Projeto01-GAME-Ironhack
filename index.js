// HTML ELEMENTS //////////
let loadBtn = document.getElementById("loadBtn")
let startBtn = document.getElementById("startBtn")
let tryAgainBtn = document.getElementById("tryAgainBtn")
let playerHealthStatus = document.getElementById("playerStatus")
let enemyHealthStatus = document.getElementById("enemyStatus")
let gameLogTxt = document.querySelector("#gameLog p")
let playerTurnStatus = document.getElementById("playerTurnStatus")
let enemyTurnStatus = document.getElementById("enemyTurnStatus")
let attackBtn = document.getElementById("attackBtn")
let hpBtn = document.getElementById("hpBtn");
let playerSprite = document.getElementById("playerImg")
let enemySprite = document.getElementById("enemy1Img")
let exit = document.getElementById("exit")
let end = document.getElementById("end")
let HTMLbody = document.getElementById("HTMLbody")
// END HTML ELEMENTS //////////
//
// AUDIO
const musicIntro = new Audio('./assets/audio/Intro - Magical Forest - Sir Cubworth.mp3');
const musicBattle = new Audio('./assets/audio/Battle - Downtown Metropolis Chase - Aaron Kenny.mp3');
const musicGameOver = new Audio('./assets/audio/Game Over - Anitmatter - The Westerlies.mp3')
const musicEnd = new Audio('./assets/audio/End - Medieval Astrology - Underbelly & Ty Mayer.mp3')
const sfxAxeAttack = new Audio('./assets/audio/sfxAxeAttack.wav')
const sfxPlayerSwordAttack = new Audio('./assets/audio/sfxPlayerSwordAttack.wav')
const sfxDeathSkeleton = new Audio('./assets/audio/sfxDeathSkeleton.mp3')
const sfxReviveSkeleton = new Audio('./assets/audio/sfxReviveSkeleton .mp3')
const sfxHealingPot = new Audio('./assets/audio/sfxHealingPot.wav')
const sfxPlayerDeath = new Audio('./assets/audio/sfxPlayerDeath.wav')
// END AUDIO
//
// CHARACTER CLASSES //////////
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
//_// Player Config
class Player extends Characters {
    constructor(name, health, strength) {
        super(name, health, strength);
        this.fullHealth = health;
    }
    receiveDamage(dmg) {
        this.health -= dmg
        if (this.health > 0) {
            return goToGameLog(`You received ${dmg} points of damage.`)
        } else if (this.health <= 0) {
            return goToGameLog(`You died! Game Over!`)
        }
    }
    healingPotion() {
        const heal = 50
        this.health += heal
        if (this.health >= this.fullHealth) {
            this.health = this.fullHealth
            playerHealthStatus.innerText = `HP / ${player.health}`
            return goToGameLog(`Your health is full.`)
        } else {
            playerHealthStatus.innerText = `HP / ${player.health}`
            return goToGameLog(`You healed ${heal} points of health.`)
        }
    }
}
let player = new Player("Joseph Climber", 100, 20)
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
            return goToGameLog(`${this.name} received ${dmg} points of damage.`)
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
let skeleton = new Skeleton("Skeleton", 100, 25)
//_//_// END Skeleton - Enemy 1
//
//_// END ENEMIES
//
// END CHARACTER CLASSES //////////
//
//GENERAL FUNCTIONS AND SETUPS //////////
playerHealthStatus.innerText = `HP / ${player.health}`
enemyHealthStatus.innerText = `HP / ${skeleton.health}`

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
    playerHealthStatus.innerText = `HP / ${player.health}`
    return dmg
}
function playerAttack() {
    let dmg = skeleton.receiveDamage(player.attack())
    enemyHealthStatus.innerText = `HP / ${skeleton.health}`
    return dmg
}
// END GENERAL FUNCTIONS AND SETUPS //////////
//
// CLICK EVENTS, TURNS AND CHAR ANIMATION //////////
window.addEventListener('load', () => {
    
    loadBtn.addEventListener('click', () => {
        musicIntro.play();
        musicIntro.volume = 0.3
        musicIntro.loop = true;
        loadBtn.style.display = "none"
        document.getElementById("start").style.display = "flex";
    })

    startBtn.addEventListener('click', () => {
        start()
        musicIntro.pause()
        musicBattle.play();
        musicBattle.volume = 0.05
        musicBattle.loop = true;

    })
    
    tryAgainBtn.addEventListener('click', () => {document.location.reload(true)})

    attackBtn.addEventListener('click', () => {
        // Disable buttons
        attackBtn.setAttribute("disabled", true)
        hpBtn.setAttribute("disabled", true)
        attackBtn.style.backgroundImage = "url('./assets/img/attackBtn disabled.png')";
        hpBtn.style.backgroundImage = "url('./assets/img/hpBtn disabled.png')";
        playerTurnStatus.style.display = "none"
        enemyTurnStatus.style.display = "block"
        // Player attack
        playerAttack();
        playerSprite.setAttribute("src", "./assets/sprites/FreeKnight_v1/AttackCombo2hitNoLoop.gif")
        enemySprite.setAttribute("src", "./assets/sprites/Skeleton/GIFS/Skeleton Hit left no loop.gif")
        sfxPlayerSwordAttack.play()
        sfxPlayerSwordAttack.volume = 0.3
        // Enemy Death
        if (skeleton.health <= 0) {
            setTimeout(() => {
                enemySprite.setAttribute("src", "./assets/sprites/Skeleton/GIFS/Skeleton Dead left no loop.gif")
                playerSprite.setAttribute("src", "./assets/sprites/FreeKnight_v1/Idle.gif")
                sfxDeathSkeleton.play()
                sfxDeathSkeleton.volume = 0.1
                exit.style.display = "block"
            }, 650)
            // Skeleton Revive
            setTimeout(() => {
                enemySprite.setAttribute("src", "./assets/sprites/Skeleton/GIFS/Skeleton Dead revive left no loop.gif")
                sfxReviveSkeleton.play()
                sfxReviveSkeleton.volume = 0.1
            }, 3000)
            setTimeout(() => {
                enemySprite.setAttribute("src", "./assets/sprites/Skeleton/GIFS/Skeleton Idle left.gif")
                exit.style.display = "none"
            }, 4500)
        } else {
            setTimeout(() => {
            playerSprite.setAttribute("src", "./assets/sprites/FreeKnight_v1/Idle.gif")
            enemySprite.setAttribute("src", "./assets/sprites/Skeleton/GIFS/Skeleton Idle left.gif")
            }, 650)
            //Enemy Attack
            setTimeout(() => {
                enemy1Attack();
                setTimeout(() => {
                    enemySprite.setAttribute("src", "./assets/sprites/Skeleton/GIFS/Skeleton Attack left no loop.gif")
                }, 1000)
                setTimeout(() => {
                    sfxAxeAttack.play()
                    sfxAxeAttack.volume = 0.3
                    playerSprite.setAttribute("src", "./assets/sprites/FreeKnight_v1/Hit.gif")
                }, 1500)
                // Player Death
                if (player.health <= 0) {
                    setTimeout(() => {
                        sfxPlayerDeath.play()
                        sfxPlayerDeath.volume = 0.05
                    }, 1500)
                    setTimeout(() => {
                        playerSprite.setAttribute("src", "./assets/sprites/FreeKnight_v1/Death no loop.gif")
                    }, 2000)
                    setTimeout(() => {
                        enemySprite.setAttribute("src", "./assets/sprites/Skeleton/GIFS/Skeleton Idle left.gif")
                        musicBattle.pause()
                        musicGameOver.play();
                        musicGameOver.volume = 0.2
                        musicGameOver.loop = true;
                        tryAgainWindow()
                    }, 2500)
                } else {
                    setTimeout(() => {
                        playerSprite.setAttribute("src", "./assets/sprites/FreeKnight_v1/Idle.gif")
                    }, 2000)
                    setTimeout(() => {
                        enemySprite.setAttribute("src", "./assets/sprites/Skeleton/GIFS/Skeleton Idle left.gif")
                    }, 2500) 
                }
            }, 1500)
        }
        // Enable buttons
        setTimeout(() => {
            attackBtn.style.backgroundImage = "url('./assets/img/attackBtn.png')";
            hpBtn.style.backgroundImage = "url('./assets/img/hpBtn.png')"; 
            attackBtn.removeAttribute("disabled")
            hpBtn.removeAttribute("disabled")
            playerTurnStatus.style.display = "block"
            enemyTurnStatus.style.display = "none"
        }, 6000)
    });
  
    hpBtn.addEventListener('click', () => {
        attackBtn.setAttribute("disabled", true)
        hpBtn.setAttribute("disabled", true)
        attackBtn.style.backgroundImage = "url('./assets/img/attackBtn disabled.png')";
        hpBtn.style.backgroundImage = "url('./assets/img/hpBtn disabled.png')";
        playerTurnStatus.style.display = "none"
        enemyTurnStatus.style.display = "block"
        player.healingPotion();
        playerSprite.setAttribute("src", "./assets/sprites/FreeKnight_v1/HealFx.gif")
        sfxHealingPot.play()
        sfxHealingPot.volume = 0.15
        //Enemy Attack
        setTimeout(() => {
            enemy1Attack();
            setTimeout(() => {
                enemySprite.setAttribute("src", "./assets/sprites/Skeleton/GIFS/Skeleton Attack left no loop.gif")
            }, 1000)
            setTimeout(() => {
                sfxAxeAttack.play()
                sfxAxeAttack.volume = 0.3
                playerSprite.setAttribute("src", "./assets/sprites/FreeKnight_v1/Hit.gif")
            }, 1500)
            // Player Death
            if (player.health <= 0) {
                setTimeout(() => {
                    sfxPlayerDeath.play()
                    sfxPlayerDeath.volume = 0.05
                }, 1500)
                setTimeout(() => {
                    playerSprite.setAttribute("src", "./assets/sprites/FreeKnight_v1/Death no loop.gif")
                }, 2000)
                setTimeout(() => {
                    enemySprite.setAttribute("src", "./assets/sprites/Skeleton/GIFS/Skeleton Idle left.gif")
                    musicBattle.pause()
                    musicGameOver.play();
                    musicGameOver.volume = 0.1
                    musicGameOver.loop = true;
                    tryAgainWindow()
                }, 2500)
            } else {
                setTimeout(() => {
                    playerSprite.setAttribute("src", "./assets/sprites/FreeKnight_v1/Idle.gif")
                }, 2000)
                setTimeout(() => {
                    enemySprite.setAttribute("src", "./assets/sprites/Skeleton/GIFS/Skeleton Idle left.gif")
                }, 2500) 
            }
        }, 1500)
        setTimeout(() => {
            attackBtn.style.backgroundImage = "url('./assets/img/attackBtn.png')";
            hpBtn.style.backgroundImage = "url('./assets/img/hpBtn.png')";
            attackBtn.removeAttribute("disabled")
            hpBtn.removeAttribute("disabled")
            playerTurnStatus.style.display = "block"
            enemyTurnStatus.style.display = "none"
        }, 5000)
    });

    exit1.addEventListener('click', () => {
        document.getElementById("gameDisplay").style.display = "none";
        HTMLbody.style.height = "1200px";
        end.style.display = "flex";
        musicBattle.pause()
        musicEnd.play();
        musicEnd.volume = 0.2
        musicEnd.loop = true;
    })
    exit2.addEventListener('click', () => {
        document.getElementById("gameDisplay").style.display = "none";
        HTMLbody.style.height = "1200px";
        end.style.display = "flex";
        musicBattle.pause()
        musicEnd.play();
        musicEnd.volume = 0.2
        musicEnd.loop = true;
    })
});
// END CLICK EVENTS, TURNS AND CHAR ANIMATION //////////
//
