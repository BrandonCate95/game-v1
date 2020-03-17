import { startingScreen } from '../data/start'

const screen = (state=[startingScreen], action) => {
    switch(action.type){
        case 'CHANGE_SCREEN':
            return [
                ...state,
                action.screen
            ]     
        default:
            return state
    }
}

export default screen