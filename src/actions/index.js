import { checkRequirements } from '../utilities'
import { STAT_POINTS_ON_LEVEL } from '../data/meta'

export function startFight(opponent){
    return (dispatch, getState) => {
        dispatch(setCharacterTarget('player', opponent.name))
        dispatch(setCharacterTarget(opponent.name, 'player'))

        dispatch(setTurnInterval(setInterval(() => dispatch(turn()), 1000)))

        return dispatch(changeScreen({ main: 'fight' })) 
    }
}

export function pause(){
    return dispatch => {
        dispatch(endTurnInterval())
        return dispatch(setPause())
    }
}

export function resume(){
    return dispatch => {
        dispatch(setTurnInterval(setInterval(() => dispatch(turn()), 1000)))
        return dispatch(endPause())
    }
}

const setPause = () => ({
    type: 'SET_PAUSE'
})

const endPause = () => ({
    type: 'END_PAUSE'
})

// function characterBuff(name, changes, time){
//     return (dispatch, getState) => {
//         dispatch(characterChange(name, changes))
//         return dispatch(characterAddBuff(name, changes, time))
//     }
// }




export function tryMove(character){
    return (dispatch, getState) => {
        if(!(character.casting)) return dispatch(setMove(character, false))
        else return
    }
}

export function setMove(character, move){
    return (dispatch, getState) => {
        if(!move){
            const possibleMoves = checkRequirements(character)
            move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]
        }
    
        if(move.self) move.selfEffects = character
        if(move.target) move.targetEffects = character
        return dispatch(startCastingMove( character.player ? 'player' : character.name, move ))
    }
}

export function useMove(characterName, move){
    return (dispatch, getState) => {
        const character = getState().characters[characterName]
        const cName = character.player ? 'player' : character.name
        const target = getState().characters[character.target]
        const tName = target.player ? 'player' : target.name

        if(move.self){
            move.selfEffects = character
            dispatch(characterChange( cName, move.self, cName ))
            dispatch(characterEffect( cName, move.selfText(character) ))
        } 
        if(move.target){
            move.targetEffects = character
            dispatch(characterChange( tName, move.target, cName ))
            dispatch(characterEffect( tName, move.targetText(character, target) ))
        } 

        dispatch(setMoveCooldown(cName, move))
        return dispatch(endCastingMove(cName, tName))
    }
}

export function back(skipScreens = []){
    return (dispatch, getState) => {
        const screens = getState().screen
        const currentScreen = screens[screens.length - 1]
        if(!skipScreens.includes(currentScreen)) skipScreens = [...skipScreens, currentScreen]

        var i = screens.length - 1
        var found = false
        while(!found && i >= 0){
            if(!skipScreens.includes(screens[i])){
                found = true
                return dispatch(changeScreen(screens[i]))
            }
            i--
        }
    }
}

export function checkForDeath(name, from){
    return (dispatch, getState) => {
        let character = getState().characters[name]
        let fromCharacter = getState().characters[from]
    
        if(character.hp <= 0) return dispatch(characterDeath(character, fromCharacter))
        else return
    }
}

function characterDeath(character, fromCharacter){
    // many ways to handle this for now I will restore characters stats then award stats
    return (dispatch, getState) => {
        if(fromCharacter.player){
            dispatch(changeScreen({main: 'win', changes: { exp: 10, gold: 50 }}))
            dispatch(characterChange('player', { exp: 10, gold: 50 }))
        }
        if(character.player){
            dispatch(changeScreen({main: 'lose', changes: { gold: -50 }}))
            dispatch(characterChange('player', { gold: -50 }))
        }
        
        dispatch(restoreCharacter(character.player ? 'player' : character.name))
        dispatch(restoreCharacter(fromCharacter.player ? 'player' : fromCharacter.name))
        return dispatch(endTurnInterval())
    }
}

export function levelUp(){
    return (dispatch) => {
        dispatch(characterChange('player', {
            level: 1,
            statPoints: STAT_POINTS_ON_LEVEL,
        }))
        return dispatch(changeScreen({main: 'level up'}))
    }
}

const addPopup = (popup) => ({
    type: 'ADD_POPUP',
    popup
})

const removePopup = (popup) => ({
    type: 'REMOVE_POPUP',
    popup
})

const setCharacterTarget = (name, targetName) => ({
    type: 'SET_CHARACTER_TARGET',
    name,
    targetName
})

// sets timeout function
const startCastingMove = (name, move) => ({
    type: 'START_CASTING_MOVE',
    name,
    move
})

const characterEffect = (name, effect) => ({
    type: 'CHARACTER_EFFECT',
    name,
    effect
})

const setMoveCooldown = (name, move) => ({
    type: 'SET_MOVE_COOLDOWN',
    name,
    move
})

const endCastingMove = (name, targetName) => ({
    type: 'END_CASTING_MOVE',
    name,
    targetName
})

const endTurnInterval = () => ({
    type: 'END_TURN_INTERVAL'
})

const restoreCharacter = (name) => ({
    type: 'RESTORE_CHARACTER',
    name
})

// const characterAddBuff = (name, changes, time) => ({
//     type: 'ADD_CHARACTER_BUFF',
//     name,
//     changes,
//     time
// })

export const characterChange = (name, changes, from) => ({
    type: 'CHARACTER_CHANGE',
    name,
    changes,
    from
})

const setTurnInterval = (interval) => ({
    type: 'SET_TURN_INTERVAL',
    interval
})

const turn = () => ({
    type: 'TURN'
})

export const changeScreen = (screen) => ({
    type: 'CHANGE_SCREEN',
    screen
})