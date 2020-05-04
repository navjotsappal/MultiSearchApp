import { combineReducers } from 'redux'
import pictureReducer from './pictureReducer'
import musicReducer from './musicReducer'
import movieReducer from './movieReducer'
import appReducer from './appReducer'

const reducers = combineReducers({pictureReducer, movieReducer, musicReducer, appReducer})

export default reducers;