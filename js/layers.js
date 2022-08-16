addLayer("p", {
    name: "placeheld", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "placeheld points", // Name of prestige currency
    baseResource: "placeholders", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('p', 13)) mult = mult.times(upgradeEffect('p', 13))
        if (hasUpgrade('p', 16)) mult = mult.times(upgradeEffect('p', 16))
        if (hasUpgrade('P', 16)) mult = mult.times(upgradeEffect('P', 16))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for placeheld points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "Double the points",
            description: "Double your income!",
            cost: new Decimal(1),
        },
        12: {
            title: "X?",
            description: "INCREASE!",
            cost: new Decimal(1),
            effect() {
                return player[this.layer].points.add(1).pow(0.25)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        13: {
            title: "P?",
            description: "MORE?",
            cost: new Decimal(4),
            effect() {
                return player.points.add(1).pow(0.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },        
        14: {
            title: "XX?",
            description: "INCREASE!!",
            cost: new Decimal(6),
            effect() {
                return player[this.layer].points.add(2).pow(0.35)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        15: {
            title: "XXX?",
            description: "INCREASE!?",
            cost: new Decimal(10),
            effect() {
                return player[this.layer].points.add(1).pow(0.25)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        16: {
            title: "PP?",
            description: "MORE??",
            cost: new Decimal(50),
            effect() {
                return player.points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        }, 
        17: {
            title: "P??????",
            description: "Unlock Place? wait, what?",
            cost: new Decimal(200),

        }
    }
})
addLayer("P", {
    name: "Place", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#824742",
    requires: new Decimal(200), // Can be a function that takes requirement increases into account
    resource: "place points", // Name of prestige currency
    baseResource: "placeholder points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    branches: ["p"],
    exponent: .5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(2)
        if (hasUpgrade('P', 13)) mult = mult.times(upgradeEffect('P', 13))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "P", description: "P: Reset for place points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return (hasUpgrade("p", 17)) },
    hotkeys: [
        {key: "o", description: "Press o to perform a booster reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    addToBase() {
        let base = new Decimal(1);
    },
    effectBase() {
        let base = new Decimal(2);
        
        // ADD
        base = base.plus(tmp.P.addToBase);
    },
    upgrades: {
        11: {
            title: "Double the points",
            description: "Double your income!",
            cost: new Decimal(1),
        },
        12: {
            title: "X?",
            description: "INCREASE!",
            cost: new Decimal(2),
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        13: {
            title: "P?",
            description: "MORE?",
            cost: new Decimal(5),
            effect() {
                return player.points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },       
        14: {
            title: "XX?",
            description: "INCREASE!!",
            cost: new Decimal(10),
            effect() {
                return player[this.layer].points.add(2).pow(0.3)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        15: {
            title: "XXX?",
            description: "INCREASE!?",
            cost: new Decimal(50),
            effect() {
                return player[this.layer].points.add(1).pow(0.2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        }, 
        16: {
            title: "PP?",
            description: "MORE??",
            cost: new Decimal(100),
            effect() {
                return player.points.add(1).pow(0.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        }, 
    }
})