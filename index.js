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
        } else if (health < 1) {
            return goToGameLog(`${this.name} is dead!`)
        }
    }   
}






function start() {
    document.getElementById("start").style.display = "none";
    document.getElementById("gameDisplay").style.display = "block";
}
function goToGameLog(log) {
    document.querySelector("#gameLog p").style.display = "block"
    document.querySelector("#gameLog p").innerText = log
    return setTimeout(() => document.querySelector("#gameLog p").style.display = "none", 3000)
}
function playerAttack() {
    let dmg = skeleton.receiveDamage(player.attack())
    return dmg
}





//
// PLAYER CONFIG //////////
//
class Player extends Characters {
    constructor(name, health, strength) {
        super(name, health, strength)
    }
    receiveDamage(dmg) {
        this.health -= dmg
        if (this.health > 0) {
            return goToGameLog(`${playerName} has received ${dmg} points of damage.`)
        } else if (this.health < 1) {
            return goToGameLog(`You died! Game Over!`)
        }
    }
    fullHealth = this.health
    healingPotion() {
        const heal = 15
        this.health += heal
        if (this.health >= this.fullHealth) {
            this.health = this.fullHealth
            return goToGameLog(`Your health is full.`)
        } else {
            return goToGameLog(`You healed ${heal} points of health.`)
        }
    }
}
let player = new Player("Joseph Climber", 100, 10)
console.log(player)
//
// END PLAYER CONFIG ////////////
//
//





// ENEMIES /////////////
//
// Skeleton - Enemy 1
class Skeleton extends Characters {
    constructor(name, health, strength) {
        super(name, health, strength)
        this.fullHealth = health
    }
    receiveDamage(dmg) {
        this.health -= dmg
        if (this.health > 0) {
            return goToGameLog(`${this.name} has received ${dmg} points of damage.`)
        } else if (this.health < 1) {
            setInterval(this.ressurrect(), 4000)
            return goToGameLog(`${this.name} is dead!`)
        }
    }   
    ressurrect() {
        this.health = this.fullHealth
        return goToGameLog(`${this.name} is back alive again! Do something while he's knocked out!`)
    }
}
let skeleton = new Skeleton("Skeleton", 50, 18)
console.log(skeleton)
// END Skeleton - Enemy 1





window.addEventListener('load', () => {
    const startBtn = document.getElementById("startBtn");
    startBtn.addEventListener('click', start)

    const attackBtn = document.getElementById('attackBtn');
    attackBtn.addEventListener('click', playerAttack);
  
    const hpBtn = document.getElementById('hpBtn');
    hpBtn.addEventListener('click', player.healingPotion);
});