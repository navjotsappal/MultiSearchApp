const initialState ={
    musicKeyword: '',
    music: [],
    displayTopSongs: true
}

const musicReducer = (state = initialState, action) => {
    if(action.type === 'MUSIC_KEYWORD') {
        return {
            ...state,
            musicKeyword: action.keyword,
            music: action.music
        }
    }else if (action.type === 'TOP_SONGS'){
        return{
            ...state,
            displayTopSongs: !state.displayTopSongs

        }
    }

    return state

}
 export default musicReducer;