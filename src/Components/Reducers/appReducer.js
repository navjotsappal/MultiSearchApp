const initialState = {
    currentPage: -1
}

const appReducer = (state = initialState, action) => {
    if(action.type === 'CHANGE_PAGE'){
        return {
            currentPage: action.id
        }
    }
    return state
}

export default appReducer;