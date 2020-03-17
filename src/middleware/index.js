import { tryMove, checkForDeath } from '../actions'

export const AI = store => next => action => {

    switch(action.type){
        case 'TURN':
            if(Math.random()* 10 >= 5) store.dispatch(tryMove( store.getState().characters[store.getState().characters.player.target] ))
            break
        case 'END_CASTING_MOVE':
            store.dispatch(checkForDeath(action.targetName, action.name)) // if change originated from an enemy check to see if change caused death
            break
        default:
            break
    }

    return next(action)
}