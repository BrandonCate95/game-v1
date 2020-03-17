const popup = (state=[], action) => {
    switch(action.type){
        case 'ADD_POPUP':
            return [
                ...state,
                action.popup
            ]
        case 'REMOVE_POPUP':
            return Object.assign([], state).filter(popup !== action.popup)
        default:
            return state
    }
}

export default popup