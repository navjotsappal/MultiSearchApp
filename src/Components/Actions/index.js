export const typePicture = (keyword, amount, images) => {
    return {
        type: "PICTURE_KEYWORD",
        keyword,
        amount,
        images
    }
}

export const typeMovie = (keyword, movies) => {
    return {
        type: "MOVIE_KEYWORD",
        keyword,
        movies
    }
}

export const typeMusic = (keyword, music) => {
    return {
        type: "MUSIC_KEYWORD",
        keyword,
        music
    }
}

export const topSongs = () => {
    return {
        type: "TOP_SONGS",
    }
}

export const changePage = (id) => {
    return {
        type: "CHANGE_PAGE",
        id
    }
}
