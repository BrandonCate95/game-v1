import * as imgs from './img/moves'

export const fightMoves = [
    { 
        name: 'attack',
        img: imgs.Attack,
        description: 'A quick attack that deals moderate damage',
        self: { mana: -10 },
        baseSelf: { mana: -10 },
        set selfEffects(character) {
            this.self.mana = Math.floor(this.baseSelf.mana - character.str / 2)  
        },
        target: { hp: -5 },
        baseTarget: { hp: -5 },
        set targetEffects(character) {
            this.target.hp = Math.floor(this.baseTarget.hp - character.str / 2 + ( Math.random() * 5 ))
        },
        cooldown: 1,
        casttime: 1,
        requirements: [['mana', '>', 0], ['hp', '<', 150]],
        selfText: (self) => `${self.name} loses ${self.currentMove.self.mana} mana`,
        targetText: (self, target) => `${target.name} is hurt for ${self.currentMove.target.hp} hp`,
    },
    { 
        name: 'power attack',
        img: imgs.Power,
        description: 'A slow attack that deals large damage', 
        self: { mana: -10 },
        baseSelf: { mana: -10 },
        set selfEffects(character) {
            this.self.mana = Math.floor(this.baseSelf.mana - character.str / 2)  
        },
        target: { hp: -15 },
        baseTarget: { hp: -15 },
        set targetEffects(character) {
            this.target.hp = Math.floor(this.baseTarget.hp - character.str / 2 + ( Math.random() * 5 ))
        },
        cooldown: 2,
        casttime: 3,
        requirements: [['mana', '>', 0], ['hp', '<', 150]],
        selfText: (self) => `${self.name} loses ${self.currentMove.self.mana} mana`,
        targetText: (self, target) => `${target.name} is hurt for ${self.currentMove.target.hp} hp`,
    },
    { 
        name: 'restore',
        img: imgs.Heal, 
        description: 'A spell that restores some mana',
        self: { mana: 10 },
        baseSelf: { mana: 10 },
        set selfEffects(character) {
            this.self.mana = Math.floor(this.baseSelf.mana + character.str / 2)  
        },
        cooldown: 1,
        casttime: 3,
        requirements: [['mana', '<', 200]],
        selfText: (self) => `${self.name} gains ${self.currentMove.self.mana} mana`,
    }
    // { 
    //     name: 'when', 
    //     self: { mana: -10 },
    //     baseSelf: { mana: -10 },
    //     set selfEffects(character) {
    //         this.self.mana = Math.floor(this.baseSelf.mana - character.str / 2)  
    //     },
    //     target: { hp: -15 },
    //     baseTarget: { hp: -15 },
    //     set targetEffects(character) {
    //         this.target.hp = Math.floor(this.baseTarget.hp - character.str / 2 + ( Math.random() * 5 ))
    //     },
    //     cooldown: 2,
    //     casttime: 3,
    //     requirements: [['mana', '>', 0], ['hp', '<', 150]],
    //     selfText: (self) => `${self.name} loses ${self.currentMove.self.mana} mana`,
    //     targetText: (self, target) => `${target.name} is hurt for ${self.currentMove.target.hp} hp`,
    // },
    // { 
    //     name: 'meditate', 
    //     self: { mana: 10 },
    //     baseSelf: { mana: 10 },
    //     set selfEffects(character) {
    //         this.self.mana = Math.floor(this.baseSelf.mana + character.str / 2 + ( Math.random() * 5 )) 
    //     },
    //     cooldown: 1,
    //     casttime: 1,
    //     requirements: [['mana', '<', 200]],
    //     selfText: (self) => `${self.name} gains ${self.currentMove.self.mana} mana`,
    // }
]