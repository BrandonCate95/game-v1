import { characters as initialCharacters } from '../data/start'
import { store } from '../index'
import { useMove } from '../actions'
import { combatStats } from '../data/meta'

const characters = ( state = initialCharacters, action ) => {
    switch(action.type){
        case 'TURN':{
            const newState = Object.assign({}, state)
            Object.values(newState).forEach(character => {
                character.moves.forEach(move => {
                    if(move.currentCooldown && move.currentCooldown > 0) move.currentCooldown -= 1
                })
            })
            return newState
        }
        case 'CHARACTER_CHANGE':{
            let character = state[action.name].clone
            Object.entries(action.changes).forEach(([key, value]) => {
                if(combatStats.indexOf(key) >= 0) character.currentStats[key] = ( character.currentStats[key] ? character.currentStats[key] : 0 ) + value
                else character[key] = character[key] + value
            })
            return Object.assign({}, state, { [action.name]: character })
        }
        case 'CHARACTER_EFFECT':{
            let character = state[action.name].clone
            character.effects = [
                ...character.effects,
                action.effect
            ]
            return Object.assign({}, state, { [action.name]: character })
        }
        case 'SET_CHARACTER_TARGET':{
            let character = state[action.name].clone
            character.target = action.targetName
            return Object.assign({}, state, { [action.name]: character })
        }
        case 'START_CASTING_MOVE':{
            let character = state[action.name].clone
            character.currentMove = action.move
            character.currentCastTime =action.move.casttime
            character.castTimeout = setTimeout(() => store.dispatch( useMove( character.player ? 'player' : character.name, action.move )), action.move.casttime * 1000 )
            character.casting = true
            return Object.assign({}, state, { [action.name]: character })
        }
        case 'SET_MOVE_COOLDOWN':{
            let character = state[action.name].clone
            const move = character.moves.filter(move => move.name === action.move.name).reduce(move => move)
            const newMove = Object.assign({}, move, { currentCooldown: move.cooldown })
            character.moves[character.moves.indexOf(move)] = newMove
            return Object.assign({}, state, { [action.name]: character })
        }
        case 'END_CASTING_MOVE':{
            let character = state[action.name].clone
            clearTimeout(character.castTimeout)
            character.currentMove = null
            character.currentCastTime = null
            character.castTimeout = null
            character.casting = false
            return Object.assign({}, state, { [action.name]: character })
        }
        case 'RESTORE_CHARACTER':{
            let character = state[action.name].clone
            if(character.castTimeout) clearTimeout(character.castTimeout)
            character.currentStats = {} 
            character.currentMove = null
            character.currentCastTime = null
            character.castTimeout = null
            character.casting = false
            character.target= null
            character.moves.forEach(move => {
                if(move.currentCooldown && move.currentCooldown > 0) move.currentCooldown = 0
            })
            character.effects = []            
            return Object.assign({}, state, { [action.name]: character })
        }
        default:
            return state
    }
}

export default characters