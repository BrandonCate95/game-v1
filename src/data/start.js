import { fightMoves as moves } from './moves'
import * as portrait from './img/portraits'
var possibleNames = ['Lisa', 'Karl', 'Jim', 'Bob', 'Bill']
const NUMBER_OF_OPPONENTS = 3
const stats = { hp: 100, mana: 100, str: 10, def: 10, agi: 10 }

function useableStat(obj, name){
    return obj.baseStats[name] + ( obj.currentStats[name] ? obj.currentStats[name] : 0 ) + ( obj.buffs[name] ? obj.buffs[name] : 0 )
}

var pics = []
Object.entries(portrait).forEach(value => pics.push(value[1]))
console.log(pics)

class character {
    constructor(
        name,
        portrait, 
        player,
        baseStats, 
        level, 
        exp, 
        gold, 
        statPoints, 
        baseMoves,
        target, 
        currentStats,
        buffs,
        currentMove, 
        currentCastTime, 
        castTimeout, 
        casting, 
        effects
    ){
        this.name = name
        this.portrait = portrait
        this.player = player || false
        this.baseStats = baseStats ? Object.assign({}, stats, baseStats) : stats
        this.level = level || 1
        this.exp = exp || 10
        this.gold = gold || 0
        this.statPoints = statPoints || 0
        this.moves = baseMoves || Object.assign([], moves)
        this.target = target || null
        this.currentStats = currentStats || {}
        this.buffs = buffs || {}
        this.currentMove = currentMove || null
        this.currentCastTime = currentCastTime || null
        this.castTimeout = castTimeout || null
        this.casting = casting || false
        this.effects = effects || []
    }
    get hp(){ return useableStat(this, 'hp') }
    get mana(){ return useableStat(this, 'mana') }
    get str(){ return useableStat(this, 'str') }
    get def(){ return useableStat(this, 'def') }
    get agi(){ return useableStat(this, 'agi') }
    get clone(){
        return new character(
            this.name, 
            this.portrait,
            this.player,
            this.baseStats, 
            this.level, 
            this.exp, 
            this.gold, 
            this.statPoints, 
            this.moves,              
            this.target, 
            this.currentStats,
            this.buffs,
            this.currentMove, 
            this.currentCastTime, 
            this.castTimeout, 
            this.casting, 
            this.effects
        )
    }
}

var characters = {}
for(var i = 0; i < NUMBER_OF_OPPONENTS; i++){
    const name = possibleNames[Math.floor(Math.random() * possibleNames.length)]
    const pic = pics[Math.floor(Math.random() * pics.length)]
    characters[name] = new character(
        name, 
        pic,
        false,
        { str: 10 + Math.floor( Math.random() * 10 ) }        
    )
    possibleNames = possibleNames.filter(x => x !== name)
    pics = pics.filter(x => x !== pic)
}
characters.player = new character('mark', pics[Math.floor(Math.random() * pics.length)], true)

export { characters }

export const startingScreen = {
    main: 'start1',
    turnInterval: null
}

export const initalFight = {
    turnInterval: null,
    player: {
        currentMove: null,
        currentCastTime: null,
        castTimeout: null,
        casting: false,
        effects: [],
    },
    opponent: {
        name: null,
        currentMove: null,
        currentCastTime: null,
        castTimeout: null,
        casting: false,
        effects: [],
    }
} 