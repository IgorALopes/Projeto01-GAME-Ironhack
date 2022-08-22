class Enemies {
    constructor(name, health, strength) {
        this.health = health
        this.strength = strength
        this.name = name
    }
    attack() {
        return this.strength
    }
    receiveDamage(dmg) {
        this.health -= dmg
        if (this.health > 0) {
            return goToGameLog(`${this.name} has received ${dmg} points of damage.`)
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

// PLAYER CONFIG //////////

let playerName = 'Joseph Climber'
const fullHealth = 100
let health = 100
const strength = 10

function attack() {
    return strength
}

function receiveDamage(dmg) {
    health -= dmg
    if (health > 0) {
        return goToGameLog(`${playerName} has received ${dmg} points of damage.`)
    } else if (health <= 0) {
        return goToGameLog(`You died! Game Over!`)
    }
}

function HealingPotion() {
    let heal = 15
    health += heal
    if (health >= fullHealth) {
        health = fullHealth
        return goToGameLog(`Your health is full.`)
    } else {
        return goToGameLog(`You healed ${heal} points of health.`)
    }
}

// END PLAYER CONFIG ////////////


