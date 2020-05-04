const randomWords = require('random-words')

const initialState ={
    pictureKeyword: randomWords(1)[0],
    picturesAmount: 15,
    pictures: []
}

const pictureReducer = (state = initialState, action ) => {
    if(action.type === 'PICTURE_KEYWORD'){
        return {
            ...state,
            pictureKeyword: action.keyword,
            picturesAmount: action.amount,
            pictures: action.images
        }
    }
    return state
}

export default pictureReducer;