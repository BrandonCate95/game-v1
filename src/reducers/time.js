const time = (state={turnInterval:null,pause:false}, action) => {
    switch(action.type){
        case 'SET_TURN_INTERVAL':
            return Object.assign({}, state, { 
                turnInterval: action.interval
            })
        case 'END_TURN_INTERVAL':
            clearInterval(state.turnInterval)
            return Object.assign({}, state, { 
                turnInterval: null
            })         
        case 'SET_PAUSE':
            return Object.assign({}, state, {
                pause: true
            })
        case 'END_PAUSE':
            return Object.assign({}, state, {
                pause: false
            })
        default:
            return state
    }
}

export default time