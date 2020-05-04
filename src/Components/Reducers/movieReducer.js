const initialState = {
    movieKeyword: '',
    movies: []
}

const movieReducer = (state = initialState, action) => {

    if(action.type === 'MOVIE_KEYWORD') {
        return {
            ...state,
            movieKeyword: action.keyword,
            movies: action.movies
        }
    }

    return state

}

export default movieReducer;