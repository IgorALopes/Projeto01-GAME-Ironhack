// HTML ELEMENTS //////////
let startBtn = document.getElementById("startBtn")
let playerHealthStatus = document.getElementById("playerStatus")
let enemyHealthStatus = document.getElementById("enemyStatus")
let gameLogTxt = document.querySelector("#gameLog p")
let attackBtn = document.getElementById("attackBtn")
let hpBtn = document.getElementById("hpBtn");
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
            return goToGameLog(`${this.name} has received ${dmg} points of damage.`)
        } else if (this.health <= 0) {
            return goToGameLog(`You died! Game Over!`)
        }
    }
    healingPotion() { //ERROR. Não esta retornando `Your health is full.`
        const heal = 15
        console.log(this.fullHealth)
        this.health += heal
        console.log(this.health)
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
let player = new Player("Joseph Climber", 100, 10)
//_// END Player Config
//
//_// ENEMIES
//
//_//_// Skeleton - Enemy 1
class Skeleton extends Characters {
    constructor(name, health, strength) {
        super(name, health, strength)
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
                this.health = 50
                enemyHealthStatus.innerText = skeleton.health
            }, 6000)
        }
    }   
}
let skeleton = new Skeleton("Skeleton", 50, 18)
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
function goToGameLog(log) {
    gameLogTxt.style.display = "block"
    gameLogTxt.innerText = log
    return setTimeout(() => gameLogTxt.style.display = "none", 5000)
}
function enemyAttack() {
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
// CLICK EVENTS //////////
window.addEventListener('load', () => {
    startBtn.addEventListener('click', start)

    attackBtn.addEventListener('click', () => {
        attackBtn.setAttribute("disabled", true)
        attackBtn.innerHTML// IMG
        playerAttack();
        setTimeout(enemyAttack, 2000)
        setTimeout(() => {
            attackBtn.removeAttribute("disabled")
            attackBtn.innerHTML //IMG
        }, 4000)
    });
  
    hpBtn.addEventListener('click', player.healingPotion);
});
// END CLICK EVENTS //////////
//